import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};
  
export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const fetchQuizzesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};
  
export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};

export const publishQuiz = async (quizId: string) => {
    const response = await axios.put(`${QUIZZES_API}/${quizId}/publish`);
    return response.data;
};
  
export const unpublishQuiz = async (quizId: string) => {
    const response = await axios.put(`${QUIZZES_API}/${quizId}/unpublish`);
    return response.data;
};

export const fetchQuizDetails = async (courseId: string, quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const updateQuizDetails = async (quizId: string, quiz: any) => {
    const response = await axios.put(`${QUIZZES_API}/${quizId}`, quiz);
    return response.data;
};