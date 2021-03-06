import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import Button from '../../components/button';
let RNFS = require('react-native-fs');

import {ListItem, CheckBox, Toast, Body} from 'native-base';

import {bottomCurve} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import LeaderBoard from '../../components/leaderBoard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import storage from '../../components/apis/storage';
import ContentLoader from 'react-native-easy-content-loader';
import userDetailContext from '../../common/userDetailContext';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {sendResponsesToServer} from '../../common/helpers';
import {ActivityIndicator} from 'react-native';
import {Share} from 'react-native';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import GlobalStyles, {GlobalImages} from '../../common/styles';
const Trivia = ({navigation}) => {
  const [question, setQuestion] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(null);
  const [savedResponses, setSavedResponses] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(0);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [triviaBottom, setTriviaBottom] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);

  const shareClicks = () => {
    network.getResponse(
      EndPoints.shareClicks,
      'POST',
      {page: 'Trivia'},
      userDetail.token,
      (response) => {
        console.log('success', response);
      },
      (error) => {
        console.log('error', error);
      },
    );
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      Toast.show({text: 'Please choose an answer'});
      return;
    }

    setSavedResponses(
      savedResponses !== null
        ? savedResponses.concat({
            ques_id: question.id,
            ans_id: selectedAnswer,
          })
        : [
            {
              ques_id: question.id,
              ans_id: selectedAnswer,
            },
          ],
    );
    if (selectedAnswer == question.ans_id) {
      setResult(1);
    } else {
      setResult(-1);
    }
    setAnsweredQuestions(answeredQuestions.concat(question.id));
  };

  const presentQuestion = () => {
    let allAnsweredQuestions = Object.assign([], answeredQuestions);
    let allQuestions = Object.assign([], questions);
    let questionTemp = null;
    do {
      if (allQuestions.length) {
        questionTemp = allQuestions.pop();
      } else {
        questionTemp = null;
      }
    } while (
      questionTemp !== null &&
      questionTemp.id &&
      allAnsweredQuestions.indexOf(questionTemp.id) > -1
    );
    setQuestion(questionTemp);
    setSelectedAnswer(null);
    setResult(0);
  };

  const LoadQuestions = () => {
    const bootstrapAsync = async () => {
      try {
        let SavedTriviaResponses = await storage.getData(
          'SavedTriviaResponses',
        );
        if (SavedTriviaResponses !== null) {
          setSavedResponses(JSON.parse(SavedTriviaResponses));
        }
        let questionsTemp = await storage.getData('TriviaQuestions');
        let answeredQuestionsTemp = await storage.getData(
          'AnsweredTriviaQuestions',
        );
        console.log(answeredQuestionsTemp);
        if (answeredQuestionsTemp && answeredQuestionsTemp !== null) {
          answeredQuestionsTemp = JSON.parse(answeredQuestionsTemp);
        } else {
          answeredQuestionsTemp = [];
        }
        setAnsweredQuestions(answeredQuestionsTemp);
        if (questionsTemp) {
          // console.log('Loading questions from storage');
          setQuestions(JSON.parse(questionsTemp));
          // console.log(JSON.parse(questions).pop());
        } else {
          // console.log('Loading questions from server');
          Toast.show({text: 'Please press sync to sync with the server'});
        }
      } catch (exception) {
        console.log('exception', exception);
      }
    };
    bootstrapAsync();
  };

  React.useEffect(() => {
    LoadQuestions();
  }, []);

  React.useEffect(() => {
    LoadQuestions();
  }, [userDetail]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (questions == null) {
        LoadQuestions();
      }
      storage.getData('trivia_bottom').then((data) => {
        if (data) {
          setTriviaBottom(JSON.parse(data));
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    if (questions && answeredQuestions) {
      presentQuestion();
    }
  }, [questions]);
  React.useEffect(() => {
    if (questions && answeredQuestions) {
      const storeAsync = async () => {
        // console.log('sett in storage answeredQuestions', answeredQuestions);
        await storage.setData(
          'AnsweredTriviaQuestions',
          JSON.stringify(answeredQuestions),
        );
        await storage.setData(
          'SavedTriviaResponses',
          JSON.stringify(savedResponses),
        );
      };
      storeAsync();
    }
  }, [answeredQuestions]);

  return (
    <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
      <Image
        source={GlobalImages.footer}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Trivia" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 60}}>
        {questions && questions.length >= 0 ? (
          <>
            <QuesVIew>
              <View style={{flex: 2}}>
                {question && question.id && !isSyncing && (
                  <View>
                    <TitleText>Question:</TitleText>
                    <View style={{marginBottom: 10}}>
                      <TitleTextlong>{question.ques}</TitleTextlong>
                    </View>
                    {question.answers.map((answer, index) => {
                      return (
                        <ListItem
                          key={answer.id}
                          noIndent
                          style={{
                            borderColor: 'transparent',
                            paddingLeft: 10,
                            marginTop: 0,
                          }}>
                          <CheckBox
                            checked={answer.id == selectedAnswer}
                            onPress={() => {
                              if (result == 0) setSelectedAnswer(answer.id);
                            }}
                            key={answer.id}
                            color="#A073C4"
                          />
                          <TouchableOpacity
                            onPress={() => {
                              if (result == 0) setSelectedAnswer(answer.id);
                            }}>
                            <Body style={{padding: 10, paddingRight: 20}}>
                              <Text
                                style={{
                                  ...GlobalStyles.secondaryTextColor,
                                  textTransform: 'capitalize',
                                }}>
                                {answer.ans}
                              </Text>
                            </Body>
                          </TouchableOpacity>
                        </ListItem>
                      );
                    })}
                    <ContainerView>
                      <MainLatestView>
                        {result == 0 && (
                          <Button
                            onPress={() => {
                              submitAnswer();
                            }}
                            style={{
                              width: widthPercentageToDP(40),
                              marginTop: heightPercentageToDP(2),
                            }}
                            name={'Submit'}
                            linear
                          />
                        )}
                      </MainLatestView>
                    </ContainerView>
                    <View style={{marginTop: 20, marginLeft: 15}}>
                      {result == 1 && (
                        <Text style={{color: 'green'}}>
                          <FontAwesome5 name={'check'} />
                          <Text> Yay! Correct</Text>
                        </Text>
                      )}
                      {result == -1 && (
                        <Text style={{color: 'red'}}>
                          <FontAwesome5 name={'times'} />{' '}
                          <Text> Oops! Wrong</Text>
                        </Text>
                      )}
                      {result !== 0 && (
                        <Button
                          onPress={() => {
                            presentQuestion();
                          }}
                          style={{
                            width: widthPercentageToDP(40),
                            marginTop: heightPercentageToDP(2),
                          }}
                          name={'Next Question'}
                          linear
                        />
                      )}
                    </View>
                  </View>
                )}
                {isSyncing && (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 300,
                    }}>
                    <ActivityIndicator color="purple" size="large" />
                    <Text>Syncing...</Text>
                  </View>
                )}
                {question == null && (
                  <>
                    <Text
                      style={{
                        ...GlobalStyles.secondaryTextColor,
                        fontSize: 25,
                        marginBottom: 10,
                      }}>
                      Superb!
                    </Text>
                    <Text
                      style={{
                        ...GlobalStyles.secondaryTextColor,
                        paddingRight: 20,
                      }}>
                      Seems you've completed all the questions, please come back
                      later for more.
                    </Text>
                  </>
                )}

                <Button
                  linear
                  style={{
                    width: widthPercentageToDP(200 / 3) - 20,
                    marginTop: 80,
                  }}
                  onPress={() => {
                    shareClicks();
                    Share.share({
                      message:
                        'Hey! Come have fun with doing trivia and more on ybhapp. Download app from https://ybhive.app',
                      url: 'https://ybhive.app',
                    });
                  }}
                  name="Invite Friends"
                />
              </View>
              <View style={{flex: 1}}>
                <View style={{marginRight: 12}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!isSyncing) {
                        if (savedResponses.length) {
                          sendResponsesToServer(
                            userDetail,
                            changeUserDetail,
                          ).then(() => setIsSyncing(false));
                          setIsSyncing(true);
                        } else {
                          Toast.show({
                            text: 'Nothing to sync, please answer some questions first and then press sync.',
                            duration: 3000,
                          });
                        }
                      }
                    }}>
                    <View
                      style={{
                        padding: 10,
                        borderColor: 'purple',
                        borderWidth: 2,
                        justifyContent: 'center',
                        borderRadius: 5,
                        flexDirection: 'row',
                        marginBottom: 5,
                      }}>
                      <FontAwesome5Icon
                        name="sync"
                        style={{
                          color: 'purple',
                          fontSize: 12,
                          marginRight: 8,
                          textAlignVertical: 'center',
                        }}
                      />
                      <Text style={{color: 'purple'}}>Sync</Text>
                    </View>
                  </TouchableOpacity>
                  <LeaderBoard userDetailTemp={userDetail} />
                </View>
              </View>
            </QuesVIew>

            <LastImage>
              {triviaBottom && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(triviaBottom.url)}>
                  <Image
                    source={{
                      uri:
                        'file://' +
                        RNFS.DocumentDirectoryPath +
                        '/' +
                        triviaBottom.path,
                    }}
                    style={{
                      width: '100%',
                      aspectRatio: 208 / 79,
                      padding: 0,
                      marginBottom: 10,
                    }}
                  />
                </TouchableOpacity>
              )}
            </LastImage>
          </>
        ) : (
          <ContentLoader />
        )}
      </ScrollView>
    </View>
  );
};

const MainLatestView = styled(View)({});

const ContainerView = styled(View)({
  flexDirection: 'row',
});
const TitleTextlong = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  width: widthPercentageToDP(45),
  fontSize: 18,
  width: '96%',
  fontFamily: 'FuturaPT-Light',
});
const TitleText = styled(Text)({
  color: '#905BBC',
  fontSize: 18,
  fontWeight: 600,
  fontFamily: 'FuturaPT-Book',
});
const QuesVIew = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 15,
  flex: 1,
  flexDirection: 'row',
});
const Checkicons = styled(ResponsiveImage)({
  tintColor: '#000',
});
const LastImage = styled(View)({
  marginLeft: 13,
  marginTop: 20,
  width: widthPercentageToDP(100) - 26,
});
export default Trivia;
