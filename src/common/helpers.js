import {Toast} from 'native-base';
import storage from '../components/apis/storage';
import network from '../components/apis/network';
import EndPoints from '../components/apis/endPoints';

export const SyncContent = async (userDetail, changeUserDetail) => {
  Toast.show({text: 'Syncing...'});

  await storage.setData('lastSyncDate', todaysDate());

  let userDetailTemp = userDetail;
  userDetailTemp['syncTotal'] = 0;
  userDetailTemp['synced'] = 0;
  changeUserDetail(userDetailTemp);

  getRelationshipMeterQuestionsFromServer(userDetail, changeUserDetail);
  getTriviaQuestionsFromServer(userDetail, changeUserDetail);
  sendResponsesToServer(userDetail, changeUserDetail);
  fetchLeaderBoard(userDetail, changeUserDetail);
};

const updateSync = (userDetail, changeUserDetail, completed = false) => {
  let userDetailTemp = userDetail;
  if (!completed) {
    userDetailTemp['syncTotal'] += 10;
    changeUserDetail(userDetailTemp);
  } else {
    userDetailTemp['synced'] += 10;
    changeUserDetail(userDetailTemp);
  }
};
const getRelationshipMeterQuestionsFromServer = async (
  userDetail,
  changeUserDetail,
) => {
  updateSync(userDetail, changeUserDetail);
  network.getResponse(
    EndPoints.getRelationshipMeterQuestions,
    'GET',
    {},
    userDetail.token,
    (response) => {
      storage.setData('RelationshipMeterQuestions', JSON.stringify(response));
      updateSync(userDetail, changeUserDetail, true);
    },
    (error) => {
      console.log('error', error);
      updateSync(userDetail, changeUserDetail, true);
    },
  );
};

const getTriviaQuestionsFromServer = async (userDetail, changeUserDetail) => {
  updateSync(userDetail, changeUserDetail);
  network.getResponse(
    EndPoints.getTriviaQuestions,
    'GET',
    {},
    userDetail.token,
    (response) => {
      // console.log(response);
      storage.setData('TriviaQuestions', JSON.stringify(response));
      updateSync(userDetail, changeUserDetail, true);
    },
    (error) => {
      console.log('error', error);
      updateSync(userDetail, changeUserDetail, true);
    },
  );
};

const sendResponsesToServer = async (userDetail, changeUserDetail) => {
  updateSync(userDetail, changeUserDetail);
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
            userDetailTemp.user['rank'] = response.rank;
            changeUserDetail(userDetailTemp);
            storage.setData('SavedTriviaResponses', JSON.stringify([]));
            storage.removeData(EndPoints.leaderBoard.url);
            updateSync(userDetail, changeUserDetail, true);
            fetchLeaderBoard(userDetail, changeUserDetail);
          }
        },
        (response) => {
          console.log(response);
          updateSync(userDetail, changeUserDetail, true);
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

export const fetchLeaderBoard = (userDetail, changeUserDetail) => {
  console.log('fetchLeaderBoard');
  updateSync(userDetail, changeUserDetail);
  network.getResponse(
    EndPoints.leaderBoard,
    'GET',
    {},
    userDetail.token || '',
    (response) => {
      let userDetailTemp = userDetail;
      userDetailTemp.leaderBoard = response;
      changeUserDetail(userDetailTemp);
      console.log('changeUserDetail for LeaderBoard');
      updateSync(userDetail, changeUserDetail, true);
    },
    (error) => {
      console.log('error', error);
      updateSync(userDetail, changeUserDetail, true);
    },
    false,
    '',
    true,
  );
};
