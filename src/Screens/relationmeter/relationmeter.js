import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import RNSpeedometer from '../../components/speedometer/index';
import {
  stick,
  menu,
  headerView,
  botomView,
  bottomCurve,
  relationmeter,
} from '../../common/images';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
// import React, {Component} from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {welcomepagebackground} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/header';
import EndPoints from '../../components/apis/endPoints';
import storage from '../../components/apis/storage';
import network from '../../components/apis/network';
import userDetailContext from '../../common/userDetailContext';
import ContentLoader from 'react-native-easy-content-loader';

const RelationMeter = (navigation) => {
  const [isLoading, setIsLoading] = useState(false);
  const [relationshipMeterScore, setRelationshipMeterScore] = useState(100);
  const [currentQuestionID, setCurrentQuestionID] = useState();
  const [question, setQuestion] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [page, setPage] = useState(1);
  const userDetail = React.useContext(userDetailContext);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const submitAnswer = (answer) => {
    setIsLoading(true);
    if (answer == 'SKIP') {
      setSelectedAnswer(0);
    } else {
      question.answers.map((value, index) => {
        if (value.ans == answer) {
          setSelectedAnswer(value.id);
        }
      });
    }
    network.getResponse(
      EndPoints.postRelationshipMeterAnswers,
      'POST',
      {ques_id: currentQuestionID, ans_id: selectedAnswer},
      userDetail.token,
      (response) => {
        if (response.message) {
          setIsLoading(false);
          //console.log('AnsweredRelationshipMeterQuestions', answeredQuestions);
          let tempArray = answeredQuestions;
          tempArray.push(currentQuestionID);
          setAnsweredQuestions(tempArray);
          // console.log('AnsweredRelationshipMeterQuestions', answeredQuestions);
          storage.setData(
            'AnsweredRelationshipMeterQuestions',
            JSON.stringify(answeredQuestions),
          );
          presentQuestion();
          if (answer == 'YES')
            setRelationshipMeterScore(relationshipMeterScore + getRandomInt(2));
          else
            setRelationshipMeterScore(relationshipMeterScore - getRandomInt(2));
        }
      },
      (response) => {
        setIsLoading(false);
        // console.log(response);
      },
    );
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
    setCurrentQuestionID(question.id);
    // console.log(question);
  };
  const LoadQuestions = () => {
    const bootstrapAsync = async () => {
      try {
        let questionsTemp = await storage.getData('RelationshipMeterQuestions');
        let answeredQuestionsTemp = await storage.getData(
          'AnsweredRelationshipMeterQuestions',
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
            EndPoints.getRelationshipMeterQuestions + '?page=' + page,
            'GET',
            {},
            userDetail.token,
            (response) => {
              storage.setData(
                'RelationshipMeterQuestions',
                JSON.stringify(response.data),
              );
              setQuestions(response.data);
              presentQuestion(response.data, answeredQuestionsTemp);
            },
            (error) => {
              console.log('error', error);
            },
          );
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
      <Header title="Love Meter" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 60}}>
        <View>
          <RNSpeedometer
            needleImage={stick}
            value={relationshipMeterScore}
            size={400}
          />
        </View>
        {questions && questions.length && question && question.id ? (
          <>
            <ViewSec
              style={{
                marginTop: heightPercentageToDP(1),
              }}>
              <TextLong>{question.ques}</TextLong>
            </ViewSec>
            <ContainerView>
              <TouchableOpacity
                onPress={() => (isLoading ? '' : submitAnswer('YES'))}>
                <YesView>
                  <AgreeText>
                    {isLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text>Yes</Text>
                    )}
                  </AgreeText>
                </YesView>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (isLoading ? '' : submitAnswer('SKIP'))}>
                <SkipView>
                  <AgreeText style={{color: '#000'}}>
                    {isLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text>Skip</Text>
                    )}
                  </AgreeText>
                </SkipView>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (isLoading ? '' : submitAnswer('NO'))}>
                <NoView>
                  <AgreeText>
                    {isLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text>No</Text>
                    )}
                  </AgreeText>
                </NoView>
              </TouchableOpacity>
            </ContainerView>
          </>
        ) : (
          <ContainerView style={{padding: 20}}>
            <ContentLoader />
          </ContainerView>
        )}
      </ScrollView>
    </View>
  );
};
const OneText = styled(Text)({
  fontWeight: '600',
  color: 'white',
  fontFamily: 'FuturaPT-Medium',
});
const ContainerView = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: heightPercentageToDP(3),
});
const YesView = styled(View)({
  backgroundColor: '#0BC677',
  padding: 35,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
});
const SkipView = styled(View)({
  backgroundColor: '#F2E9FE',
  padding: 35,
});
const NoView = styled(View)({
  backgroundColor: '#F55F5E',
  padding: 35,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
});
const AgreeText = styled(Text)({
  color: '#FFFFFF',
  fontSize: 16,
  fontFamily: 'FuturaPT-Book',
});
const ViewSec = styled(View)({
  flexDirection: 'row',
  borderWidth: 4,
  borderColor: '#986CBF',
  margin: 15,
  padding: 20,
  backgroundColor: '#FAF9FF',
  borderRadius: 4,
});
const TextLong = styled(Text)({
  marginLeft: widthPercentageToDP(1),
  fontFamily: 'FuturaPT-Light',
  fontSize: 17,
});
const ViewNumber = styled(View)({
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: heightPercentageToDP(0.1),
  marginLeft: -widthPercentageToDP(2),
  borderRadius: 50,
  backgroundColor: '#986CBF',
  height: 20,
  width: 20,
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 25,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-14%',
  marginLeft: 15,
});
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? '87%' : '100%',
  bottom: 0,
  marginTop: 50,
});
export default RelationMeter;
