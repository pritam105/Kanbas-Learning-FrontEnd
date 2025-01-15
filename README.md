# Kanbas Learning (Canvas Clone) 📚🎓

**End-To-End Deployed Application:** [Kanbas Learning](https://quizzes--kanbas-react-web-app-f24.netlify.app/#/Kanbas)

### **Note:** ⚠️
1) Please give it a few minutes to load as the backend server may take some time to initialize. You might see a blank white screen for up to 30 seconds.
2) User credentials are available at `src/Kanbas/Database/users.json`, or you can sign up to create a new account.
3) For illustration purpose any user can change their role to **Student** or **Faculty**. This is done just for any user to verify all the functionalities of the Kanbas WebApp. In real scenario only the **Admin** can change roles of the users.

---

## **Features** ✨

### **Authentication** 🔐
- **Sign Up & Login**: Users can sign up and log in to access the platform.
- **Role-Based Access**: Different roles such as **Student** and **Faculty** are available, each with different permissions.

### **Dashboard** 📊 (Student & Faculty)
- **Student View:** 
  - 🎓 See all the courses they are enrolled in.
  - 📜 View all published courses.
  - ➕ Enroll in and unenroll from courses directly from the dashboard.
- **Faculty View:** 
  - 🛠️ Manage and create courses, modules, assignments, and quizzes.
  - 🎓 Enroll and unenroll students from courses.
  - 📝 CRUD functionality is fully implemented for all courses, modules, assignments, and quizzes.

### **Courses & Modules** 📚
- Each course consists of multiple **modules**, **assignments**, and **quizzes**.
- **CRUD for Faculty**: Faculty can add, edit, and delete modules, assignments, and quizzes within the courses.

### **Quizzes** 📝
- Fully developed end-to-end as part of the final project.
- **Quiz Creation:** 
  - 💡 Faculty can create a new quiz, adding various types of questions: **Fill-in-the-Blank (FIB), Multiple Choice Questions (MCQ),** and **True/False**.
  - 🔢 Faculty can assign points to each question.
  - ⏳ Set the number of attempts allowed for each quiz and whether the correct answers should be shown after the last attempt.
- **Preview and Publish:** Faculty can preview quizzes before publishing them and must publish the quiz for it to be visible to students.
- **Student Interaction:** 
  - 🏆 Students can take quizzes and see their score for the latest attempt.
  - ✅ If configured, the correct answers will be displayed after the last attempt.

---

### **Technologies Used** ⚙️
- **Frontend:** React.js (TypeScript), Redux, HTML5, CSS, Bootstrap
- **Backend:** Node.js, Express.js (JavaScript)
- **Database:** MongoDB

---

Feel free to explore and test the application! Let me know if you have any questions or need additional details. 💬
