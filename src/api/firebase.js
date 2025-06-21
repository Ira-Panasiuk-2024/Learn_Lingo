import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
  query,
  orderByChild,
  limitToFirst,
  startAt,
  push,
} from 'firebase/database';
import teachersData from '../teachers.json';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await set(ref(db, 'users/' + userCredential.user.uid + '/profile'), {
      email: userCredential.user.email,
      name: name,
      createdAt: new Date().toISOString(),
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const onAuthChange = callback => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const seedTeachers = async () => {
  const teachersRef = ref(db, 'teachers');
  try {
    const snapshot = await get(child(teachersRef, '/'));

    if (!snapshot.exists() || Object.keys(snapshot.val() || {}).length === 0) {
      const updates = {};
      teachersData.forEach((teacher, index) => {
        const teacherId = `teacher${index + 1}`;
        updates[teacherId] = {
          ...teacher,
          id: teacherId,
        };
      });
      await set(teachersRef, updates);
    }
  } catch (error) {
    throw error;
  }
};

export const addTeacher = async teacherData => {
  try {
    const teacherRef = ref(db, `teachers/${teacherData.id}`);
    await set(teacherRef, teacherData);
    return teacherData.id;
  } catch (error) {
    throw error;
  }
};

export const getTeachers = async (limit = null) => {
  const teachersRef = ref(db, 'teachers');

  try {
    if (limit === null) {
      const snapshot = await get(child(teachersRef, '/'));
      if (snapshot.exists()) {
        const teachersObject = snapshot.val();
        const teachersArray = Object.keys(teachersObject).map(
          key => teachersObject[key]
        );
        return {
          teachers: teachersArray,
          lastVisibleKey: null,
        };
      } else {
        return {
          teachers: [],
          lastVisibleKey: null,
        };
      }
    }

    const teachersQuery = query(
      teachersRef,
      orderByChild('id'),
      limitToFirst(limit)
    );

    const snapshot = await get(teachersQuery);
    if (snapshot.exists()) {
      const teachersObject = snapshot.val();
      const teachersArray = Object.keys(teachersObject)
        .map(key => teachersObject[key])
        .sort((a, b) => a.id.localeCompare(b.id));

      const resultTeachers = teachersArray.slice(0, limit);
      const newLastVisibleKey =
        resultTeachers.length > 0
          ? resultTeachers[resultTeachers.length - 1].id
          : null;

      return {
        teachers: resultTeachers,
        lastVisibleKey: newLastVisibleKey,
      };
    } else {
      return {
        teachers: [],
        lastVisibleKey: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

export const getTeacherById = async teacherId => {
  const teacherRef = ref(db, `teachers/${teacherId}`);
  try {
    const snapshot = await get(teacherRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getTeachersPaginated = async (lastTeacherId = null, limit = 4) => {
  const teachersRef = ref(db, 'teachers');
  let teachersQuery;

  if (lastTeacherId) {
    teachersQuery = query(
      teachersRef,
      orderByChild('id'),
      startAt(lastTeacherId),
      limitToFirst(limit + 1)
    );
  } else {
    teachersQuery = query(teachersRef, orderByChild('id'), limitToFirst(limit));
  }

  try {
    const snapshot = await get(teachersQuery);
    if (snapshot.exists()) {
      const teachersObject = snapshot.val();
      let teachersArray = Object.keys(teachersObject)
        .map(key => teachersObject[key])
        .sort((a, b) => a.id.localeCompare(b.id));

      if (lastTeacherId && teachersArray.length > 0) {
        const startIndex = teachersArray.findIndex(t => t.id === lastTeacherId);
        if (startIndex !== -1) {
          teachersArray = teachersArray.slice(startIndex + 1);
        }
      }
      return teachersArray.slice(0, limit);
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

export const addFavoriteTeacher = async (userId, teacherId) => {
  if (!userId || !teacherId) {
    throw new Error('userId and teacherId are required');
  }

  const favoriteTeacherRef = ref(db, `users/${userId}/favorites/${teacherId}`);
  try {
    await set(favoriteTeacherRef, {
      teacherId: teacherId,
      addedAt: new Date().toISOString(),
      isFavorite: true,
    });
  } catch (error) {
    throw error;
  }
};

export const removeFavoriteTeacher = async (userId, teacherId) => {
  if (!userId || !teacherId) {
    throw new Error('userId and teacherId are required');
  }

  const favoriteTeacherRef = ref(db, `users/${userId}/favorites/${teacherId}`);
  try {
    await remove(favoriteTeacherRef);
  } catch (error) {
    throw error;
  }
};

export const getUserFavorites = async userId => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const userFavoritesRef = ref(db, `users/${userId}/favorites`);
  try {
    const snapshot = await get(userFavoritesRef);
    if (snapshot.exists()) {
      const favoritesData = snapshot.val();

      const simpleFavorites = {};
      Object.keys(favoritesData).forEach(teacherId => {
        if (typeof favoritesData[teacherId] === 'boolean') {
          simpleFavorites[teacherId] = favoritesData[teacherId];
        } else if (favoritesData[teacherId]?.isFavorite) {
          simpleFavorites[teacherId] = true;
        }
      });
      return simpleFavorites;
    }
    return {};
  } catch (error) {
    throw error;
  }
};

export const getUserFavoritesDetailed = async userId => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const userFavoritesRef = ref(db, `users/${userId}/favorites`);
  try {
    const snapshot = await get(userFavoritesRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return {};
  } catch (error) {
    throw error;
  }
};

export const isTeacherFavorite = async (userId, teacherId) => {
  if (!userId || !teacherId) {
    return false;
  }

  const favoriteTeacherRef = ref(db, `users/${userId}/favorites/${teacherId}`);
  try {
    const snapshot = await get(favoriteTeacherRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return typeof data === 'boolean' ? data : data?.isFavorite || false;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getFavoriteTeachersWithData = async userId => {
  if (!userId) {
    throw new Error('userId is required');
  }

  try {
    const favorites = await getUserFavorites(userId);
    const favoriteTeachers = [];

    for (const teacherId of Object.keys(favorites)) {
      if (favorites[teacherId]) {
        const teacher = await getTeacherById(teacherId);
        if (teacher) {
          favoriteTeachers.push({
            ...teacher,
            isFavorite: true,
          });
        }
      }
    }

    return favoriteTeachers;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async userId => {
  const userProfileRef = ref(db, `users/${userId}/profile`);
  try {
    const snapshot = await get(userProfileRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const bookTrialLesson = async bookingData => {
  try {
    const bookingsRef = ref(db, 'bookings');
    const newBookingRef = push(bookingsRef);

    const booking = {
      ...bookingData,
      id: newBookingRef.key,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await set(newBookingRef, booking);

    if (bookingData.userId) {
      const userBookingRef = ref(
        db,
        `users/${bookingData.userId}/bookings/${booking.id}`
      );
      await set(userBookingRef, {
        bookingId: booking.id,
        teacherId: bookingData.teacherId,
        teacherName: bookingData.teacherName,
        createdAt: booking.createdAt,
        status: booking.status,
      });
    }

    if (bookingData.teacherId) {
      const teacherBookingRef = ref(
        db,
        `teachers/${bookingData.teacherId}/bookings/${booking.id}`
      );
      await set(teacherBookingRef, {
        bookingId: booking.id,
        userId: bookingData.userId,
        userEmail: bookingData.email,
        userName: bookingData.fullName,
        createdAt: booking.createdAt,
        status: booking.status,
      });
    }

    return booking.id;
  } catch (error) {
    throw error;
  }
};

export const getUserBookings = async userId => {
  const userBookingsRef = ref(db, `users/${userId}/bookings`);
  try {
    const snapshot = await get(userBookingsRef);
    if (snapshot.exists()) {
      const bookingsObject = snapshot.val();
      return Object.keys(bookingsObject).map(key => bookingsObject[key]);
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

export const getTeacherBookings = async teacherId => {
  const teacherBookingsRef = ref(db, `teachers/${teacherId}/bookings`);
  try {
    const snapshot = await get(teacherBookingsRef);
    if (snapshot.exists()) {
      const bookingsObject = snapshot.val();
      return Object.keys(bookingsObject).map(key => bookingsObject[key]);
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const bookingRef = ref(db, `bookings/${bookingId}`);
    await update(bookingRef, {
      status,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

export const getBookingById = async bookingId => {
  const bookingRef = ref(db, `bookings/${bookingId}`);
  try {
    const snapshot = await get(bookingRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
