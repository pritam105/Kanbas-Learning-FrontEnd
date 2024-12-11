import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import enrollmentReducer from "./reducer";
import assignmentReducer from "./Courses/Assignments/reducer";

const store = configureStore({
  reducer: {
    accountReducer, enrollmentReducer, assignmentReducer
  },
});
export default store;