# Learn Lingo 🌍

#### 🇺🇸 English

## 📖 About the Project

Learn Lingo is a modern web application for a company that provides online
language learning services with professional tutors. The platform connects
students with experienced language teachers, offering personalized learning
experiences across multiple languages and skill levels.

### ✨ Key Features

- **Home Page:** Showcases company advantages and statistics (32,000+
  experienced tutors, 300,000+ 5-star reviews, 120+ subjects taught, 200+ tutor
  nationalities)
- **Teachers Page:** Browse and filter language tutors by language, student
  level, and hourly rate
- **Favorites Page:** Private page for authenticated users to manage their
  favorite teachers
- **User Authentication:** Complete registration and login system with Firebase
- **Advanced Filtering:** Filter teachers by teaching language, student
  proficiency level, and price per hour
- **Interactive Teacher Cards:** Expandable cards with detailed teacher
  information and student reviews
- **Trial Lesson Booking:** Modal form for booking trial lessons with teachers
- **Responsive Design:** Optimized for desktop with multiple color theme
  variants

### 🛠️ Technologies Used

- **Frontend:** React.js
- **Build Tool:** Vite
- **Authentication & Database:** Firebase (Authentication + Realtime Database)
- **Form Management:** React Hook Form
- **Validation:** Yup
- **Routing:** React Router
- **Styling:** Modular CSS
- **State Management:** React Context/useState
- **Data Storage:** Firebase Realtime Database for favorites + localStorage for
  theme selection

### 🎨 Design

The application features a modern, clean design with 5 distinctive color palette
options:

- Warm yellow theme
- Fresh green theme
- Elegant blue theme
- Light pink theme
- Dark pink theme

**Figma Design:**
<a href="https://www.figma.com/design/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo?node-id=0-1&p=f&t=WIgYICo7ZwOJiiu9-0" target="_blank" rel="noopener noreferrer">View
Design</a>

**Technical Requirements:**
<a href="https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?usp=sharing" target="_blank" rel="noopener noreferrer">View
Requirements</a>

## 🚀 Features Implementation

**Authentication System**

- User registration with email/password/name
- User login/logout functionality
- Protected routes for authenticated users
- Form validation with React Hook Form & Yup
- Modal windows with ESC key, backdrop and X button closing

**Teacher Management**

- Load teachers from Firebase Realtime Database
- Pagination with "Load More" functionality (4 cards per page)
- Favorite/unfavorite teachers (heart button)
- Persistent favorites across page refreshes
- Expandable teacher cards with detailed information
- Student reviews and ratings display

**Filtering System**

- Filter by teaching language
- Filter by student proficiency level
- Filter by hourly rate
- Real-time filter application

**Trial Lesson Booking**

- Modal form for lesson booking
- Multiple reason selection (Career, Kids, Living abroad, etc.)
- Form validation for all required fields
- Teacher information display in booking form

## 🔥 Firebase Configuration

The application uses Firebase for:

- **Authentication:** User registration and login
- **Realtime Database:** Storage of teacher data, user-selected teachers and
  trial lesson booking
- **Data Structure:** Teachers collection with fields: name, surname, languages,
  levels, rating, reviews, price_per_hour, lessons_done, avatar_url,
  lesson_info, conditions, experience
- **User Favorites:** Stored in Firebase Database for persistence across devices
- **Theme Selection:** Stored in localStorage for quick access

## 🌐 Live Demo

**Live Application:**
<a href="https://learn-lingo-eight-phi.vercel.app" target="_blank" rel="noopener noreferrer">View
Live Demo</a>

**GitHub Repository:**
<a href="https://github.com/Ira-Panasiuk-2024/Learn_Lingo" target="_blank" rel="noopener noreferrer">View
Source Code</a>

## 🎯 Technical Requirements Met

✅ Desktop-responsive semantic HTML layout matching the design

✅ No browser console errors

✅ React with Vite bundler

✅ Firebase authentication and database integration

✅ Interactive functionality as per specifications

✅ Clean, formatted code without comments

✅ Comprehensive README documentation

✅ Deployed on Vercel

### 🏃‍♂️ Getting Started

1. **Clone the repository**

bash

**git** clone https://github.com/Ira-Panasiuk-2024/Learn_Lingo

**cd** Learn_Lingo

2. **Install dependencies**

bash

**npm install**

3. **Configure Firebase**

- Create a Firebase project
- Add your Firebase configuration to the project
- Set up Authentication and Realtime Database

4. **Run the development server**

bash

**npm** run dev

5. **Build for production**

bash

**npm** run build

---

#### 🇺🇦 Українська

## 📖 Про проєкт

Learn Lingo — це сучасний веб-застосунок для компанії, що надає послуги
онлайн-вивчення мов з професійними викладачами. Платформа з'єднує студентів з
досвідченими викладачами мов, пропонуючи персоналізований досвід навчання
різними мовами та рівнями знань.

### ✨ Основні можливості

- **Головна сторінка:** Showcases company advantages and statistics (32,000+
  experienced tutors, 300,000+ 5-star reviews, 120+ subjects taught, 200+ tutor
  nationalities)
- **Teachers Page:** Демонструє переваги компанії та статистику (32,000+
  досвідчених викладачів, 300,000+ 5-зіркових відгуків, 120+ предметів, 200+
  національностей викладачів)
- **Сторінка викладачів:** Перегляд та фільтрація викладачів за мовою, рівнем
  учнів та погодинною ставкою
- **Сторінка обраних:** Приватна сторінка для авторизованих користувачів для
  керування обраними викладачами
- **Авторизація користувачів:** Повна система реєстрації та входу з Firebase
- **Розширена фільтрація:** Фільтрація викладачів за мовою викладання, рівнем
  знань учнів та ціною за годину
- **Інтерактивні картки викладачів:** Розкривні картки з детальною інформацією
  про викладача та відгуками студентів
- **Бронювання пробного уроку:** Модальна форма для бронювання пробних уроків з
  викладачами
- **Адаптивний дизайн:** Оптимізовано для десктопу з кількома варіантами
  кольорових тем

### 🛠️ Використані технології

- **Frontend:** React.js
- **Інструмент збірки:** Vite
- **Авторизація та база даних:** Firebase (Authentication + Realtime Database)
- **Керування формами:** React Hook Form
- **Валідація:** Yup
- **Маршрутизація:** React Router
- **Стилізація:** Модульний CSS
- **Керування станом:** React Context/useState
- **Зберігання даних:** Firebase Realtime Database для обраних + localStorage
  для вибору теми

### 🎨 Дизайн

Застосунок має сучасний, чистий дизайн з 5 різними варіантами кольорових палітр:

- Тепла жовта тема
- Свіжа зелена тема
- Елегантна синя тема
- Світло-рожева тема
- Темно-рожева тема

**Дизайн у Figma:**
<a href="https://www.figma.com/design/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo?node-id=0-1&p=f&t=WIgYICo7ZwOJiiu9-0" target="_blank" rel="noopener noreferrer">Переглянути
дизайн</a>

**Технічне завдання:**
<a href="https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Переглянути
ТЗ</a>

## 🚀 Реалізація функціоналу

**Система авторизації**

- Реєстрація користувачів з email/паролем/ім'ям
- Функціонал входу/виходу з системи
- Захищені маршрути для авторизованих користувачів
- Валідація форм з React Hook Form і Yup
- Модальні вікна з закриттям по ESC, backdrop та кнопці X

**Керування викладачами**

- Завантаження викладачів з Firebase Realtime Database
- Пагінація з функцією "Завантажити більше" (4 картки на сторінку)
- Додавання/видалення викладачів з обраних (кнопка серце)
- Збереження обраних після оновлення сторінки
- Розкривні картки викладачів з детальною інформацією
- Відображення відгуків та рейтингів студентів

**Система фільтрації**

- Фільтр за мовою викладання
- Фільтр за рівнем знань учнів
- Фільтр за погодинною ставкою
- Застосування фільтрів у реальному часі

**Бронювання пробного уроку**

- Модальна форма для бронювання уроку
- Вибір кількох причин (Кар'єра, Діти, Життя за кордоном тощо)
- Валідація форм для всіх обов'язкових полів
- Відображення інформації про викладача у формі бронювання

## 🔥 Конфігурація Firebase

Застосунок використовує Firebase для:

- **Авторизації:** Реєстрація та вхід користувачів
- **Realtime Database:** Зберігання даних вчителя, вибраних користувачем
  вчителів та бронювання пробних уроків
- **Структура даних:** Teachers collection with fields: name, surname,
  languages, levels, rating, reviews, price_per_hour, lessons_done, avatar_url,
  lesson_info, conditions, experience
- **Вибране користувачем:** Зберігається у Firebase Database для синхронізації
  між пристроями
- **Вибір теми:** Зберігається у localStorage для швидкого доступу

## 🌐 Демо

**Живий застосунок:** -
<a href="https://learn-lingo-eight-phi.vercel.app" target="_blank" rel="noopener noreferrer">Переглянути
демо</a>

**GitHub репозиторій:** -
<a href="https://github.com/Ira-Panasiuk-2024/Learn_Lingo" target="_blank" rel="noopener noreferrer">Переглянути
вихідний код</a>

## 🎯 Виконані технічні вимоги

✅ Десктопна семантична HTML верстка відповідно до макету

✅ Відсутність помилок у консолі браузера

✅ React з bundler Vite

✅ Інтеграція з Firebase для авторизації та бази даних

✅ Інтерактивний функціонал згідно з технічним завданням

✅ Чистий, відформатований код без коментарів

✅ Комплексна документація README

✅ Розгорнуто на Vercel

### 🏃‍♂️ Швидкий старт

1. **Клонування репозиторію**

bash

**git** clone https://github.com/Ira-Panasiuk-2024/Learn_Lingo

**cd** Learn_Lingo

2. **Встановлення залежностей**

bash

**npm install**

3. **Налаштування Firebase**

- Створіть проєкт Firebase
- Додайте конфігурацію Firebase до проєкту
- Налаштуйте Authentication та Realtime Database

4. **Запуск сервера розробки**

bash

**npm** run dev

5. **Збірка для продакшену**

bash

**npm** run build

---

## 📄 License / Ліцензія

This project is created for educational purposes. / Цей проєкт створений для
освітніх цілей.

## 👨‍💻 Author / Автор

**Ira Panasiuk:** -
<a href="https://github.com/Ira-Panasiuk-2024" target="_blank" rel="noopener noreferrer">GitHub
Profile</a> / **Ірина Панасюк:** -
<a href="https://github.com/Ira-Panasiuk-2024" target="_blank" rel="noopener noreferrer">GitHub
профіль</a>
