import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
    assignments: assignments,
};

const enrollmentSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            const newAssignment: any = {
                _id: new Date().getTime().toString(),
                title: action.payload.title,
                course: action.payload.courseId,
                points: action.payload.points,
                dueDate: action.payload.dueDate, 
                availableDate: action.payload.availableDate,
            };
            state.assignments.push(newAssignment);
        },

        deleteAssignment: (state, action) => {
            // Filter out the assignment with the given ID
            state.assignments = state.assignments.filter(
                (assignment: any) => assignment._id !== action.payload.id
            );
        },

        updateAssignment: (state, { payload: updatedAssignment }) => {
            // Map through the assignments and update the matching assignment
            state.assignments = state.assignments.map((assignment: any) =>
                assignment._id === updatedAssignment._id ? updatedAssignment : assignment);
        }
    }
});

// Export actions and reducer
export const { addAssignment, deleteAssignment, updateAssignment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
