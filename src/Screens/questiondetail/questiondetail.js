import React, {Component, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/button';

import {Textarea, Form, Toast} from 'native-base';

import {
  welcomepagebackground,
  menu,
  thumpup,
  thumpdown,
  headerView,
  botomView,
  bottomCurve,
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';

const QuestionDetail = ({navigation, route}) => {
  const {question} = route.params;

  const userDetail = useContext(userDetailContext);
  console.log(question);

  const [yourResponse, setYourResponse] = React.useState('');
  const [responses, setResponses] = React.useState(question.answers);
  const [isLoading, setisLoading] = React.useState(false);

  React.useEffect(() => {
    renderResponses();
  }, [responses]);

  const castVote = (score, id) => {
    // console.log(EndPoints.voteOnResponse);
    setisLoading(true);
    network.getResponse(
      EndPoints.voteOnResponse,
      'POST',
      {
        vote: score,
        response_id: id,
      },
      userDetail.token,
      (response) => {
        setisLoading(false);
        // console.log(response);
        if (response.message) {
          Toast.show({text: response.message});
          let updated_response = response.response;
          // console.log(response.response);
          let responsesTemp = responses;
          for (let index = 0; index < responsesTemp.length; index++) {
            // console.log(responsesTemp[index]['id'], updated_response.id);
            if (
              responsesTemp[index]['id'].toString() ==
              updated_response.id.toString()
            ) {
              responsesTemp[index] = updated_response;
              break;
            }
          }
          setResponses(responsesTemp);
        }
      },
      (error) => {
        setisLoading(false);
        // console.log(response);
        if (error.response.data && error.response.data.message) {
          Toast.show({text: error.response.data.message});
        }
      },
    );
  };
  const renderResponses = () => {
    let responsesView = [];
    if (responses.length == 0) {
      return (
        <Text style={{marginLeft: 5, marginBottom: 20, marginTop: 5}}>
          No one has responded yet, be the first one
        </Text>
      );
    }
    responses.forEach((element) => {
      responsesView.push(
        <Card
          style={{marginTop: heightPercentageToDP(1)}}
          key={Math.random().toString()}>
          <BasicText>{element.ans}</BasicText>

          <Score>
            <User>
              - {element.user.username}{' '}
              <TimingText>({element.published_at})</TimingText>
            </User>
            <TouchableOpacity onPress={() => castVote(1, element.id)}>
              <ResponsiveImage
                style={{
                  fontSize: 13,
                  color: '#484848',
                  marginTop: heightPercentageToDP(1.3),
                  marginLeft: widthPercentageToDP(53),
                }}
                source={thumpup}
                initHeight="15"
                initWidth="15"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                color: '#484848',
                marginTop: heightPercentageToDP(1.3),
              }}>
              {isLoading ? (
                <ActivityIndicator color="purple" />
              ) : (
                element.up_votes_count - element.down_votes_count
              )}
            </Text>
            <TouchableOpacity onPress={() => castVote(0, element.id)}>
              <ResponsiveImage
                style={{
                  color: '#484848',
                  marginTop: heightPercentageToDP(1.3),
                  marginLeft: widthPercentageToDP(0.5),
                }}
                source={thumpdown}
                initHeight="15"
                initWidth="15"
              />
            </TouchableOpacity>
          </Score>
        </Card>,
      );
    });
    return responsesView;
  };

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
      <Header title="Question Detail" backButton={true} />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        contentContainerStyle={{padding: 10, paddingBottom: 40}}>
        <Heading>Question</Heading>
        <Card style={{marginTop: heightPercentageToDP(1)}}>
          <BasicText>{question.ques}</BasicText>
          <Score>
            <User>
              - {question.user.username}{' '}
              <TimingText>({question.published_at})</TimingText>
            </User>
          </Score>
        </Card>
        <Heading style={{marginTop: 15}}>Responses</Heading>
        {renderResponses()}
        <ViewTextarea>
          <Form>
            <Textarea
              rowSpan={10}
              placeholder="Share your wisdom..."
              value={yourResponse}
              onChangeText={(text) => setYourResponse(text)}
            />
          </Form>
        </ViewTextarea>
        <View style={{alignSelf: 'center'}}>
          <Button
            isLoading={isLoading}
            onPress={() => {
              if (yourResponse.length > 10) {
                setisLoading(true);
                network.getResponse(
                  EndPoints.postAdviceResponse,
                  'POST',
                  {
                    question_id: question.id,
                    response: yourResponse,
                  },
                  userDetail.token,
                  (response) => {
                    setisLoading(false);
                    console.log(response);
                    setYourResponse('');
                    if (response.message) {
                      Toast.show({text: response.message});
                      setResponses(responses.concat(response.answer));
                    }
                  },
                  (error) => {
                    setisLoading(false);
                    if (error.response.data && error.response.data.message) {
                      Toast.show({text: error.response.data.message});
                    }
                  },
                );
              } else {
                Toast.show({
                  text: 'Please enter a valid response before sending.',
                });
              }
            }}
            style={{
              marginTop: heightPercentageToDP(3),
              width: widthPercentageToDP(94),
            }}
            name={'Submit Your Response'}
            linear
          />
        </View>
      </ScrollView>
    </View>
  );
};
const ViewTextarea = styled(View)({
  padding: 10,
  borderRadius: 4,
  borderWidth: 1.5,
  borderColor: '#F4F5F6',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0.1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 9,
  elevation: 3,
  background: 'white',
});
const Score = styled(View)({
  marginLeft: widthPercentageToDP(3),
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const User = styled(Text)({
  fontSize: 13,
  color: '#484848',
  marginTop: heightPercentageToDP(0.9),
  marginLeft: -widthPercentageToDP(3),
  fontFamily: 'FuturaPT-Book',
  fontStyle: 'italic',
});
const TimingText = styled(Text)({
  fontFamily: 'FuturaPT-Book',
  fontSize: 8,
  color: '#484848',
  marginLeft: widthPercentageToDP(4),
});
const BasicText = styled(Text)({
  // padding: 15,
  fontFamily: 'FuturaPT-Light',
  fontSize: 16,
});
const Question = styled(Text)({
  // padding: 15,
  fontFamily: 'FuturaPT-Light',
  fontSize: 16,
});
const Card = styled(View)({
  borderRadius: 4,
  padding: 10,
  borderWidth: 1,
  borderColor: '#F4F5F6',
  shadowColor: '#F4F5F6',
  shadowOffset: {
    width: 0,
    height: 0.1,
  },
  shadowOpacity: 0.9,
  shadowRadius: 7,
  elevation: 3,
  background: 'white',
  marginBottom: 10,
});
const Heading = styled(Text)({
  fontSize: 16,
  color: '#484848',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginLeft: 5,
});
export default QuestionDetail;
