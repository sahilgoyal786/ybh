import {ActionTypes} from '../ActionTypes';
export const QuestionReducers = (
  state = {
    questionList: [],
    loading: false,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.GET_QUESTION_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
        errorMessage: '',
      };
    case ActionTypes.GET_QUESTION_LIST_SUCCESS:
      console.log('questions--', action.payload.data);
      return {
        ...state,
        loading: false,
        questionList: action.payload.data,
      };
    case ActionTypes.UPDATE_QUESTION_ANSWER:
      let list = state.questionList.map((item, index) => {
        if (item.id == action.payload.id) {
          let temp = {
            ...item,
            answers: action.payload.data,
          };
          return temp;
        } else {
          return item;
        }
      });
      return {
        ...state,
        questionList: list,
      };
    default:
      return state;
  }
};
