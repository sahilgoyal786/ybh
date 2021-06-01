import {Toast} from 'native-base';
import storage from '../components/apis/storage';
import network from '../components/apis/network';
import EndPoints from '../components/apis/endPoints';
let RNFS = require('react-native-fs');

export const SyncContent = async (userDetail, changeUserDetail) => {
  Toast.show({text: 'Syncing...'});

  await storage.setData('lastSyncDate', todaysDate());

  let userDetailTemp = userDetail;
  userDetailTemp['syncTotal'] = 0;
  userDetailTemp['synced'] = 0;
  changeUserDetail(userDetailTemp);

  // await getRelationshipMeterQuestionsFromServer(userDetail, changeUserDetail);
  // await getTriviaQuestionsFromServer(userDetail, changeUserDetail);
  await getQuestionsFromServer(userDetail, changeUserDetail);
  await sendResponsesToServer(userDetail, changeUserDetail);
  await fetchLeaderBoard(userDetail, changeUserDetail);
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
  // console.log(userDetailTemp['synced'] + '/' + userDetailTemp['syncTotal']);
};
export const getQuestionsFromServer = async (userDetail, changeUserDetail) => {
  return new Promise((resolve, reject) => {
    network.getResponse(
      EndPoints.getAllQuestions,
      'GET',
      {},
      userDetail.token,
      (response) => {
        // console.log(response);
        storage.setData(
          'RelationshipMeterQuestions',
          JSON.stringify(response['relationship_meter_questions']),
        );
        storage.setData(
          'TriviaQuestions',
          JSON.stringify(response['trivia_questions']),
        );
        resolve(true);
      },
      (error) => {
        console.log('error', error);
        updateSync(true);
      },
    );
  });
};
export const getRelationshipMeterQuestionsFromServer = async (
  userDetail,
  changeUserDetail,
) => {
  return new Promise((resolve, reject) => {
    network.getResponse(
      EndPoints.getRelationshipMeterQuestions,
      'GET',
      {},
      userDetail.token,
      (response) => {
        storage.setData('RelationshipMeterQuestions', JSON.stringify(response));
        resolve(true);
      },
      (error) => {
        console.log('error', error);
        updateSync(true);
      },
    );
  });
};

export const getTriviaQuestionsFromServer = async (
  userDetail,
  changeUserDetail,
) => {
  return new Promise((resolve, reject) => {
    network.getResponse(
      EndPoints.getTriviaQuestions,
      'GET',
      {},
      userDetail.token,
      (response) => {
        // console.log(response);
        storage.setData('TriviaQuestions', JSON.stringify(response));
        resolve(true);
      },
      (error) => {
        console.log('error', error);
        resolve(true);
      },
    );
  });
};

export const getTipsOfTheDay = async (userDetail, changeUserDetail) => {
  return new Promise((resolve, reject) => {
    network.getResponse(
      EndPoints.getTipsOfTheDay,
      'GET',
      {},
      userDetail.token,
      (response) => {
        // console.log('response', response);
        storage.setData('TipsOfTheDay', JSON.stringify(response));
        resolve(true);
      },
      (error) => {
        console.log('error', error);
        resolve(true);
      },
    );
  });
};

export const sendResponsesToServer = async (userDetail, changeUserDetail) => {
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
      // console.log({ques_id: ques_id_values, ans_id: ans_id_values});
      return new Promise((resolve, reject) => {
        network.getResponse(
          EndPoints.postTriviaAnswers,
          'POST',
          {ques_id: ques_id_values, ans_id: ans_id_values},
          userDetail.token,
          (response) => {
            if (response.message) {
              let userDetailTemp = userDetail;
              userDetailTemp.user['rank'] = response.rank;
              storage.setData('SavedTriviaResponses', JSON.stringify([]));
              storage.removeData(EndPoints.leaderBoard.url);
              //fetchLeaderBoard(userDetail, changeUserDetail);
              if (response.leaderboard) {
                userDetailTemp.leaderBoard = response.leaderboard;
              }
              changeUserDetail(userDetailTemp);
              resolve(true);
            }
          },
          (response) => {
            console.log(response);
            resolve(true);
          },
        );
      });
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
    (d.getHours() < 10 ? '0' : '') +
    d.getHours() +
    ':' +
    (d.getMinutes() < 10 ? '0' : '') +
    d.getMinutes()
  );
};

export const fetchLeaderBoard = (userDetail, changeUserDetail) => {
  // console.log('fetchLeaderBoard');
  updateSync(userDetail, changeUserDetail);
  return new Promise((resolve, reject) => {
    network.getResponse(
      EndPoints.leaderBoard,
      'GET',
      {},
      userDetail.token || '',
      (response) => {
        let userDetailTemp = userDetail;
        userDetailTemp.leaderBoard = response;
        changeUserDetail(userDetailTemp);
        // console.log('changeUserDetail for LeaderBoard');
        updateSync(userDetail, changeUserDetail, true);
        resolve(true);
      },
      (error) => {
        console.log('error', error);
        updateSync(userDetail, changeUserDetail, true);
        resolve(false);
      },
      false,
      '',
      true,
    );
  });
};

const cleanup = (response) => {
  let path = RNFS.DocumentDirectoryPath + '/banners';
  RNFS.exists(path).then((exists) => {
    if (exists) {
      RNFS.readdir(path).then((contents) => {
        contents.forEach((file) => {
          let index = response.findIndex((banner) => {
            return banner.file.path.indexOf(file) > 0;
          });
          if (index >= 0) {
          } else {
            RNFS.unlink(path + '/' + file);
          }
        });
      });
    }
  });
  // response.forEach((element) => {

  // });
};

export const downloadAdBanners = (userDetail, changeUserDetail) => {
  // console.log('downloadAdBanners');

  let path = RNFS.DocumentDirectoryPath + '/banners';
  RNFS.exists(path).then((exists) => {
    if (!exists) {
      // return;
      RNFS.mkdir(path).then(() => downloadAdBanners);
    } else {
      // RNFS.unlink(path);
      // return;
      network.getResponse(
        EndPoints.getAdvertisements,
        'GET',
        {},
        userDetail.token || '',
        (response) => {
          // console.log('downloadAdBanners', response);
          if (response.length > 0) {
            cleanup(response);
            response.forEach((element) => {
              // console.log(element.file);
              let path = RNFS.DocumentDirectoryPath + '/' + element.file.path;
              RNFS.exists(path).then((exists) => {
                // console.log(path, exists);
                if (!exists) {
                  // console.log(element.file.url);
                  RNFS.downloadFile({
                    fromUrl: element.file.url,
                    toFile: path,
                  }).promise.then((file) => {
                    // console.log('DOWNLOADED', file);
                    storage.setData(
                      element.location,
                      JSON.stringify({
                        path: element.file.path,
                        url: element.url,
                      }),
                    );
                  });
                }
              });
            });
          }
        },
        (error) => {
          console.log('changeUserDetail for LeaderBoard');
        },
        false,
        '',
        true,
      );
    }
  });
};
export const GetFormattedDate = (date) => {
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  var year = date.getFullYear();
  return month + '/' + day + '/' + year;
};
