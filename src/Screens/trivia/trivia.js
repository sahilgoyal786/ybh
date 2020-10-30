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
} from 'react-native';
import Button from '../../components/button';

import {ListItem, CheckBox, Toast, Body} from 'native-base';

import {bottomCurve, sync} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from '@react-navigation/native';
import Header from '../../components/header';
import LeaderBoard from '../../components/leaderBoard';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import storage from '../../components/apis/storage';
import ContentLoader from 'react-native-easy-content-loader';

const Trivia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionID, setCurrentQuestionID] = useState();
  const [question, setQuestion] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [savedResponses, setSavedResponses] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [page, setPage] = useState(1);
  const userDetail = React.useContext(userDetailContext);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // alert('Screen was unfocused');
        storage.setData(
          'AnsweredTriviaQuestions',
          JSON.stringify(answeredQuestions),
        );
        storage.setData('SavedTriviaResponses', JSON.stringify(savedResponses));
      };
    }, []),
  );

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      Toast.show({text: 'Please choose an answer'});
      return;
    }

    setSavedResponses(
      savedResponses !== null? savedResponses.concat({
        ques_id: currentQuestionID,
        ans_id: selectedAnswer,
      }) : [{
        ques_id: currentQuestionID,
        ans_id: selectedAnswer,
      }]
    );
    setAnsweredQuestions(answeredQuestions.concat(currentQuestionID));
    presentQuestion();
  };

  const sendResponsesToServer = () => {
    console.log('Sending reponses to server', savedResponses);
    if (savedResponses.length) {
      setIsLoading(true);
      let ques_id_values = [];
      let ans_id_values = [];
      for (let index = 0; index < savedResponses.length; index++) {
        const {ques_id, ans_id} = savedResponses[index];
        ques_id_values.push(ques_id);
        ans_id_values.push(ans_id);
      }
      network.getResponse(
        EndPoints.postTriviaAnswers,
        'POST',
        {ques_id: ques_id_values, ans_id: ans_id_values},
        userDetail.token,
        (response) => {
          console.log(response);
          if (response.message) {
            setIsLoading(false);
            setSavedResponses([]);
            presentQuestion();
          }
        },
        (response) => {
          setIsLoading(false);
          console.log(response);
        },
      );
    }
  };
  const presentQuestion = (
    allQuestionsTemp = null,
    answeredQuestionsTemp = null,
  ) => {
    let allQuestions = [];
    let allAnsweredQuestions = [];
    if (allQuestionsTemp !== null) {
      allQuestions = allQuestionsTemp;
      allAnsweredQuestions = answeredQuestionsTemp;
    } else {
      allAnsweredQuestions = answeredQuestions;
      allQuestions = questions;
    }
    let question = null;
    let index = 0;
    do {
      question = allQuestions.pop();
      index++;
    } while (question.id && allAnsweredQuestions.indexOf(question.id) > -1);
    setQuestion(question);
    setSelectedAnswer(null);
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
        if (questionsTemp) {
          console.log('Loading questions from storage');
          setQuestions(JSON.parse(questionsTemp));
          presentQuestion(JSON.parse(questionsTemp), answeredQuestionsTemp);
          // console.log(JSON.parse(questions).pop());
        } else {
          console.log('Loading questions from server');
          network.getResponse(
            EndPoints.getTriviaQuestions + '?page=' + page,
            'GET',
            {},
            userDetail.token,
            (response) => {
              storage.setData('TriviaQuestions', JSON.stringify(response.data));
              setQuestions(response.data);
              presentQuestion(response.data, answeredQuestionsTemp);
            },
            (error) => {
              console.log('error', error);
            },
          );
        }

        let SavedTriviaResponses = await storage.getData(
          'SavedTriviaResponses',
        );
        if(SavedTriviaResponses !== null){
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
  }, []);

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
                            setCurrentQuestionID(question.id);
                            setSelectedAnswer(answer.id);
                          }}
                          key={answer.id}
                          color="purple"
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setCurrentQuestionID(question.id);
                            setSelectedAnswer(answer.id);
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
                    </MainLatestView>
                  </ContainerView>
                </View>
              )}
            </View>
            <View style={{flex: 1}}>
              <View style={{marginRight: widthPercentageToDP(3)}}>
                <Button
                  onPress={() => {
                    sendResponsesToServer();
                    Toast.show({
                      text:
                        'Refreshing database in background, please check back soon.',
                      duration: 2000,
                    });
                  }}
                  style={{
                    width: widthPercentageToDP(100 / 3) - 17,
                  }}
                  icon={sync}
                  isLoading={isLoading}
                  name={'Sync'}
                  linear
                />
                <LeaderBoard />
              </View>
            </View>
          </QuesVIew>
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
