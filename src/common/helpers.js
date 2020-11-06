import {Toast} from 'native-base';
import storage from '../components/apis/storage';
import network from '../components/apis/network';
import EndPoints from '../components/apis/endPoints';

export const SyncContent = async (userDetail, updateUserDetail) => {
  Toast.show({text: 'Syncing...'});

  await storage.setData('lastSyncDate', todaysDate());
  getRelationshipMeterQuestionsFromServer(userDetail);
  getTriviaQuestionsFromServer(userDetail);
  sendResponsesToServer(userDetail, updateUserDetail);
  fetchLeaderBoard(userDetail, updateUserDetail);
};

const getRelationshipMeterQuestionsFromServer = async (userDetail) => {
  network.getResponse(
    EndPoints.getRelationshipMeterQuestions,
    'GET',
    {},
    userDetail.token,
    (response) => {
      storage.setData('RelationshipMeterQuestions', JSON.stringify(response));
    },
    (error) => {
      console.log('error', error);
    },
  );
};

const getTriviaQuestionsFromServer = async (userDetail) => {
  network.getResponse(
    EndPoints.getTriviaQuestions,
    'GET',
    {},
    userDetail.token,
    (response) => {
      // console.log(response);
      storage.setData('TriviaQuestions', JSON.stringify(response));
    },
    (error) => {
      console.log('error', error);
    },
  );
};

const sendResponsesToServer = async (userDetail, updateUserDetail) => {
  let savedResponses = await storage.getData('SavedTriviaResponses');
  if (savedResponses !== null) {
    savedResponses = JSON.parse(savedResponses);
    if (savedResponses.length) {
      let ques_id_values = [];
      let ans_id_values = [];
      for (let index = 0; index < savedResponses.length; index++) {
        const {ques_id, ans_id} = savedResponses[index];
        ques_id_values.push(ques_id);
        ans_id_values.push(ans_id);
      }
      console.log({ques_id: ques_id_values, ans_id: ans_id_values});
      network.getResponse(
        EndPoints.postTriviaAnswers,
        'POST',
        {ques_id: ques_id_values, ans_id: ans_id_values},
        userDetail.token,
        (response) => {
          console.log(response);
          if (response.message) {
            let userDetailTemp = userDetail;
            updateUserDetail(
              userDetail,
              userDetailTemp.user['rank'],
              response.rank,
            );
            storage.setData('SavedTriviaResponses', JSON.stringify([]));
            storage.removeData(EndPoints.leaderBoard.url);
            fetchLeaderBoard(userDetail, updateUserDetail);
          }
        },
        (response) => {
          console.log(response);
        },
      );
    }
  }
};

export const todaysDate = () => {
  let d = new Date();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    d.getDate() +
    ' ' +
    months[d.getMonth()] +
    ', ' +
    d.getHours() +
    ':' +
    d.getMinutes()
  );
};

export const fetchLeaderBoard = (userDetail, updateUserDetail) => {
  console.log('fetchLeaderBoard');
  network.getResponse(
    EndPoints.leaderBoard,
    'GET',
    {},
    userDetail.token || '',
    (response) => {
      updateUserDetail(userDetail, {leaderBoard: response});
    },
    (error) => console.log('error', error),
  );
};
