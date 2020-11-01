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
import {Toast} from 'native-base';

const RelationMeter = (navigation) => {
  const [isLoading, setIsLoading] = useState(false);
  const [relationshipMeterScore, setRelationshipMeterScore] = useState(50);
  const [question, setQuestion] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [savedResponses, setSavedResponses] = useState([]);
  const [page, setPage] = useState(1);
  const userDetail = React.useContext(userDetailContext);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const submitAnswer = (answer) => {
    let ans_id = 0;
    if (answer !== 'SKIP') {
      question.answers.map((value, index) => {
        if (value.ans == answer) {
          ans_id = value.id;
        }
      });
    }

    setSavedResponses(
      savedResponses !== null
        ? savedResponses.concat({
            ques_id: question.id,
            ans_id: ans_id,
          })
        : [
            {
              ques_id: question.id,
              ans_id: ans_id,
            },
          ],
    );
    setAnsweredQuestions(answeredQuestions.concat(question.id));
  };

  const presentQuestion = () => {
    let allAnsweredQuestions = answeredQuestions;
    let allQuestions = questions;
    console.log('allAnsweredQuestions==', allAnsweredQuestions);
    let questionTemp = null;
    do {
      questionTemp = allQuestions.pop();
    } while (
      questionTemp.id &&
      allAnsweredQuestions.indexOf(questionTemp.id) > -1
    );
    console.log(
      allAnsweredQuestions,
      questionTemp.id,
      allAnsweredQuestions.indexOf(questionTemp.id),
    );
    setQuestion(questionTemp);
    console.log(questionTemp);
  };
  const LoadQuestions = () => {
    const bootstrapAsync = async () => {
      try {
        let questionsTemp = await storage.getData('RelationshipMeterQuestions');
        let answeredQuestionsTemp = await storage.getData(
          'AnsweredRelationshipMeterQuestions',
        );
        if (
          answeredQuestionsTemp &&
          answeredQuestionsTemp !== null &&
          answeredQuestionsTemp !== 'null'
        ) {
          answeredQuestionsTemp = JSON.parse(answeredQuestionsTemp);
        } else {
          answeredQuestionsTemp = [];
        }
        // console.log('-----answeredQuestionsTemp', answeredQuestionsTemp);
        setAnsweredQuestions(answeredQuestionsTemp);
        if (questionsTemp) {
          // console.log('Loading questions from storage');
          setQuestions(JSON.parse(questionsTemp));
          // console.log(JSON.parse(questions).pop());
        } else {
          // console.log('Loading questions from server');
          network.getResponse(
            EndPoints.getRelationshipMeterQuestions,
            'GET',
            {},
            userDetail.token,
            (response) => {
              storage.setData(
                'RelationshipMeterQuestions',
                JSON.stringify(response.data),
              );
              setQuestions(response.data);
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

  React.useEffect(() => {
    if (questions && answeredQuestions) {
      presentQuestion();
    }
  }, [questions]);
  React.useEffect(() => {
    if (questions && answeredQuestions) {
      presentQuestion();
      const storeAsync = async () => {
        console.log('sett in storage answeredQuestions', answeredQuestions);
        await storage.setData(
          'AnsweredRelationshipMeterQuestions',
          JSON.stringify(answeredQuestions),
        );
        await storage.setData(
          'SavedRelationShipMeterResponses',
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
                minHeight: 152,
              }}>
              <TextLong numberOfLines={5}>{question.ques}</TextLong>
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
