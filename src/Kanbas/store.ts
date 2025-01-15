import { configureStore } from "@reduxjs/toolkit";
import quizzesReducer from "./Courses/Quizzes/reducer"
import accountReducer from "./Account/reducer";
import enrollmentReducer from "./reducer";
import assignmentReducer from "./Courses/Assignments/reducer";

const store = configureStore({
  reducer: {
    accountReducer, enrollmentReducer, assignmentReducer, quizzes: quizzesReducer
  },
});
export default store;