import { ActionTypes } from "../ActionTypes";

export const UpdateQuestionList = (data, since_id) => {
  return dispatch => {
    getDataSuccess(dispatch, data, since_id);
  };
};