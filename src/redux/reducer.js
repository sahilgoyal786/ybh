import { combineReducers } from "redux";
import { QuestionReducers } from "./question/questionReducer";
export default combineReducers({
    Questions: QuestionReducers,
});