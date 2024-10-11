# Cerdasnih App

<img src="frontend/public/logo+teks.png" alt="Cerdasnih Logo" width="300"/>

## Project Objective
The **Cerdasnih App** aims to offer an interactive quiz platform where users can challenge their knowledge across various categories and difficulty levels. The primary focus is on engaging users in an enjoyable and educational experience.

---

## Main Features

### 1. Quiz Challenge:
- **Category and Difficulty Selection**:
  Users can choose from a variety of quiz categories (e.g., General Knowledge, Music, History) and select their preferred difficulty level (easy, medium, or hard).

- **Real-Time Quiz Progress**: 
  Track quiz progress, including the number of questions completed, remaining time, and overall score.

- **Interactive Feedback**: 
  Users get instant feedback on their answers during the quiz, helping them learn from both correct and incorrect answers.

### 2. Dynamic Typing Effect on Home Page:
- **Rotating Categories**: 
  The home page displays an engaging typing effect that dynamically shows quiz categories one by one, enticing users to start a new challenge.

### 3. Persistent Quiz Data:
- **Quiz Auto-Save**:
  If a user exits the quiz before completion, the application saves the current progress and score, allowing them to resume the quiz later.

- **Time-Limited Quizzes**: 
  Quizzes have a time limit to create a competitive and challenging environment. The remaining time is always visible to the user.

### 4. Result Summary and Feedback:
- After completing a quiz, users receive a detailed breakdown of their performance, including the number of correct and incorrect answers, score percentage, and motivational messages based on their performance.

---

## Technologies Used

### Frontend:
- **React.js**: 
  The frontend is built using React.js for a dynamic and responsive user interface.

- **React Router**: 
  Enables smooth navigation between pages such as **Home**, **Quiz Categories**, **Login**, and **Results**.

- **CSS**: 
  Custom CSS is used to create a consistent and engaging user experience across the application.

### Backend:
- **LocalStorage**: 
  The application uses the browser's localStorage to persist quiz data and user progress, enabling seamless resumption of quizzes.

- **Axios**: 
  Axios is used for making API requests to fetch quiz questions from an external trivia API.

### Trivia API:
- **Open Trivia Database (OpenTDB)**: 
  The quiz data (questions, answers, and categories) is fetched from OpenTDB, a free-to-use trivia database.

---

## Contribution

We welcome contributions from the community. If you'd like to contribute to this project, please open a new issue or submit a pull request after making changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For further questions or technical support, please contact us at [falihrahmat534@gmail.com](mailto:falihrahmat534@gmail.com).

![Beranda Screenshot](frontend/public/screenshoot-homepage.png)

![Login Screenshot](frontend/public/screenshoot-login.png)

![Pilihan Kategori Screenshot](frontend/public/screenshoot-categoryselection.png)

![Kuis Screenshot](frontend/public/screenshoot-quiz.png)

![Hasil Kuis Screenshot](frontend/public/screenshoot-result.png)