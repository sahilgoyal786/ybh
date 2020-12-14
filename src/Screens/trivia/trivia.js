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

const Trivia = ({navigation}) => {
  const [question, setQuestion] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(null);
  const [savedResponses, setSavedResponses] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(0);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [triviaBottom, setTriviaBottom] = React.useState(false);

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
        let questionsTemp = await storage.getData('TriviaQuestions');
        let answeredQuestionsTemp = await storage.getData(
          'AnsweredTriviaQuestions',
        );
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

        let SavedTriviaResponses = await storage.getData(
          'SavedTriviaResponses',
        );
        if (SavedTriviaResponses !== null) {
          setSavedResponses(JSON.parse(SavedTriviaResponses));
        }
      } catch (exception) {
        console.log('exception', exception);
      }
    };
    bootstrapAsync();
  };

  React.useEffect(() => {
    LoadQuestions();
    storage.getData('trivia_bottom').then((data) => {
      if (data) {
        setTriviaBottom(JSON.parse(data));
      }
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (questions == null) {
        LoadQuestions();
      }
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
    <View style={{flex: 1}}>
      <Image
        source={bottomCurve}
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
        {questions && questions.length ? (
          <>
            <QuesVIew>
              <View style={{flex: 2}}>
                {question && question.id && (
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
                            color="purple"
                          />
                          <TouchableOpacity
                            onPress={() => {
                              if (result == 0) setSelectedAnswer(answer.id);
                            }}>
                            <Body style={{padding: 10, paddingRight: 20}}>
                              <Text style={{textTransform: 'capitalize'}}>
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
              </View>
              <View style={{flex: 1}}>
                <View style={{marginRight: 12}}>
                  <LeaderBoard userDetailTemp={userDetail} />
                </View>
              </View>
            </QuesVIew>
            {triviaBottom && (
              <TouchableOpacity
                onPress={() => Linking.openURL(triviaBottom.url)}>
                <ResponsiveImage
                  source={{
                    uri:
                      Platform.OS == 'android'
                        ? 'file://' + triviaBottom.path
                        : triviaBottom.path,
                  }}
                  style={{
                    marginLeft: 12,
                    marginTop: 20,
                    width: widthPercentageToDP(100) - 24,
                  }}
                  initHeight="150"
                  initWidth="396"
                />
              </TouchableOpacity>
            )}
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
  width: widthPercentageToDP(45),
  color: '#484848',
  fontSize: 18,
  width: '96%',
  fontFamily: 'FuturaPT-Light',
  // marginTop: -heightPercentageToDP(6),
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
export default Trivia;
