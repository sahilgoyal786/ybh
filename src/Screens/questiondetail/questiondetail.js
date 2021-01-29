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
import {CheckBox} from 'react-native-elements';
import Numeral from 'numeral';
import {Dialog} from 'react-native-simple-dialogs';
import {bottomCurve, iconchecked, unchecked} from '../../common/images';
import styled from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {ActionTypes} from '../../redux/ActionTypes';
import reducer from '../../redux/reducer';
import ResponsiveImage from 'react-native-responsive-image';

const QuestionDetail = ({navigation, route}) => {
  const {question} = route.params;
  const dispatch = useDispatch();
  const [userDetail, changeUserDetail] = useContext(userDetailContext);
  const [dialog, setDialog] = React.useState(false);
  console.log(question);

  const [yourResponse, setYourResponse] = React.useState('');
  const [responses, setResponses] = React.useState(question.answers);
  const [isLoading, setisLoading] = React.useState(false);
  const [anonymousChecked, setAnonymousChecked] = React.useState(false);
  const [editReponse, setEditReponse] = React.useState(false);
  const [replyTo, setReplyTo] = React.useState(false);

  React.useEffect(() => {
    // renderResponses();
  }, [responses]);

  React.useEffect(() => {
    // renderResponses();
  }, []);

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
        // console.log(response);
        if (response.message) {
          Toast.show({text: response.message});
          let updated_response = response.response;
          // console.log(response.response);
          let responsesTemp = responses;
          for (let index = 0; index < responsesTemp.length; index++) {
            // console.log(responsesTemp[index]['id'], updated_response.id);
            if (
              responsesTemp[index].id.toString() ==
              updated_response.id.toString()
            ) {
              responsesTemp[index] = updated_response;
              break;
            }
          }
          setResponses(responsesTemp);
        }
        setisLoading(false);
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
  const deleteResponse = (response_id) => {
    setisLoading(true);
    network.getResponse(
      EndPoints.deleteAdviceResponse,
      'POST',
      {response_id},
      userDetail.token,
      (response) => {
        setisLoading(false);
        if (response.message) {
          const index = responses.findIndex((advice_response) => {
            return advice_response.id === response_id;
          });
          let responsesTemp = Object.assign([], responses);
          responsesTemp.splice(index, 1);
          setResponses(responsesTemp);
          dispatch({
            type: ActionTypes.UPDATE_QUESTION_ANSWER,
            payload: {
              data: responsesTemp,
              id: question.id,
            },
          });
        }
      },
      (response) => {
        setisLoading(false);
        console.log(response);
      },
    );
  };
  const renderResponse = (element) => {
    return (
      <Card
        style={{marginTop: heightPercentageToDP(1)}}
        key={Math.random().toString()}>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <BasicText>{element.ans}</BasicText>
          <View style={{alignContent: 'flex-end'}}>
            {element.user_id == userDetail.user.id && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 3,
                  width: 75,
                  marginVertical: 10,
                  alignSelf: 'flex-end',
                }}>
                <FontAwesome5Icon
                  name="edit"
                  style={{
                    fontSize: 20,
                    color: '#A073C4',
                  }}
                  onPress={() => {
                    setEditReponse(element);
                    setDialog(true);
                    setReplyTo(false);
                    setYourResponse(element.ans);
                  }}
                />
                <FontAwesome5Icon
                  name={isLoading ? 'spinner' : 'trash'}
                  style={{
                    fontSize: 20,
                    color: '#D30000',
                  }}
                  onPress={() =>
                    isLoading ? console.log() : deleteResponse(element.id)
                  }
                />
              </View>
            )}
          </View>
        </View>

        <Score>
          <User>
            - {element.user_name}{' '}
            <TimingText>({element.published_at})</TimingText>
          </User>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <FontAwesome5Icon
              name="reply"
              style={{
                color: '#A073C4',
                fontSize: 15,
                marginRight: 5,
              }}
              onPress={() => {
                setReplyTo({
                  user_name: element.user_name,
                  user_id: element.user_id,
                  id: element.id,
                });
                setYourResponse('@' + element.user_name + ' ');
                setDialog(true);
              }}
            />
            <Text
              style={{
                fontSize: 13,
                color: '#484848',
                height: 20,
                marginLeft: 10,
              }}>
              {isLoading ? (
                <Text>...</Text>
              ) : element.up_votes_count > 1000 ? (
                Numeral(element.up_votes_count).format('0a')
              ) : (
                element.up_votes_count
              )}
            </Text>
            <TouchableOpacity onPress={() => castVote(1, element.id)}>
              <FontAwesome5Icon
                name="thumbs-up"
                style={{fontSize: 15, color: 'grey', marginLeft: 5}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                color: '#484848',
                marginLeft: 15,
              }}>
              {isLoading ? (
                <Text>...</Text>
              ) : element.down_votes_count > 1000 ? (
                Numeral(element.down_votes_count).format('0a')
              ) : (
                element.down_votes_count
              )}
            </Text>
            <TouchableOpacity onPress={() => castVote(0, element.id)}>
              <FontAwesome5Icon
                name="thumbs-down"
                style={{fontSize: 15, color: 'grey', marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
        </Score>
      </Card>
    );
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
        resizeMode="contain"
      />
      <Header title="Question Detail" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        contentContainerStyle={{padding: 10, paddingBottom: 40}}>
        <Heading>Question</Heading>
        <Card style={{marginTop: heightPercentageToDP(1)}}>
          <BasicTextFullWidth>{question.ques}</BasicTextFullWidth>
          <Score>
            <User>
              <TimingText>({question.published_at})</TimingText>
            </User>
          </Score>
        </Card>
        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}>
          <Heading>Responses</Heading>
          <Text
            style={{
              textAlign: 'right',
              marginRight: 5,
              color: '#A073C4',
            }}
            onPress={() => {
              setReplyTo(false);
              setYourResponse('');
              setDialog(true);
            }}>
            Post Your Reponse
          </Text>
        </View>
        <FlatList
          data={responses}
          renderItem={({item}) => renderResponse(item)}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={{marginLeft: 5, marginBottom: 20, marginTop: 15}}>
              No one has responded yet, be the first one
            </Text>
          }
        />
        <View style={{alignSelf: 'center'}}>
          <Button
            isLoading={false}
            onPress={() => {
              setReplyTo(false);
              setYourResponse('');
              setDialog(true);
            }}
            style={{
              marginTop: heightPercentageToDP(3),
              width: widthPercentageToDP(94),
            }}
            name={'Post Your Response'}
            linear
          />
        </View>
        <Dialog
          visible={dialog}
          onTouchoutside={() => {
            setEditReponse(false);
            setYourResponse('');
            setDialog(false);
          }}>
          <View>
            <Textarea
              rowSpan={10}
              placeholder="Share your wisdom..."
              value={yourResponse}
              onChangeText={(text) => setYourResponse(text)}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
              }}
            />

            <CheckBox
              title="Post as anonymous"
              textStyle={{
                fontSize: 16,
                fontWeight: '400',
                fontFamily: 'FuturaPT-Medium',
                color: 'black',
              }}
              checkedIcon={
                <FontAwesome5Icon
                  name="check-square"
                  style={{fontSize: 20, color: '#A073C4'}}
                  solid
                />
              }
              uncheckedIcon={
                <FontAwesome5Icon
                  name="square"
                  style={{fontSize: 20, color: '#A073C4'}}
                />
              }
              checked={anonymousChecked}
              onPress={() => setAnonymousChecked(!anonymousChecked)}
              containerStyle={styles.containerchecked}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              isLoading={isLoading}
              onPress={() => {
                if (yourResponse.length > 1) {
                  setisLoading(true);
                  if (editReponse == false) {
                    console.log({
                      question_id: question.id,
                      response: yourResponse,
                      replied_to: replyTo && replyTo.id ? replyTo.id : null,
                      anonymous: anonymousChecked,
                    });
                    network.getResponse(
                      EndPoints.postAdviceResponse,
                      'POST',
                      {
                        question_id: question.id,
                        response: yourResponse,
                        replied_to: replyTo && replyTo.id ? replyTo.id : null,
                        anonymous: anonymousChecked,
                      },
                      userDetail.token,
                      (response) => {
                        setisLoading(false);
                        setDialog(false);
                        console.log('response--', response);
                        setYourResponse('');
                        if (response.message) {
                          dispatch({
                            type: ActionTypes.UPDATE_QUESTION_ANSWER,
                            payload: {
                              data: responses.concat(response.answer),
                              id: question.id,
                            },
                          });
                          setResponses(responses.concat(response.answer));
                          Toast.show({text: response.message});
                          // setResponses(responses.concat(response.answer));
                        }
                      },
                      (error) => {
                        setisLoading(false);
                        if (
                          error.response.data &&
                          error.response.data.message
                        ) {
                          Toast.show({text: error.response.data.message});
                        }
                      },
                    );
                  } else {
                    network.getResponse(
                      EndPoints.updateAdviceResponse,
                      'POST',
                      {
                        question_id: question.id,
                        response: yourResponse,
                        response_id: editReponse.id,
                      },
                      userDetail.token,
                      (response) => {
                        setisLoading(false);
                        setDialog(false);
                        console.log('response--', response);
                        setYourResponse('');
                        if (response.message) {
                          let responsesTemp = Object.assign([], responses);
                          const index = responses.findIndex(
                            (advice_response) => {
                              console.log(
                                advice_response.id,
                                response.answer.id,
                              );
                              return advice_response.id === response.answer.id;
                            },
                          );
                          responsesTemp[index] = response.answer;
                          // console.log(response.answer);
                          setResponses(responsesTemp);
                          dispatch({
                            type: ActionTypes.UPDATE_QUESTION_ANSWER,
                            payload: {
                              data: responsesTemp,
                              id: question.id,
                            },
                          });
                          Toast.show({text: response.message});
                          // setResponses(responses.concat(response.answer));
                        }
                      },
                      (error) => {
                        setisLoading(false);
                        if (
                          error.response.data &&
                          error.response.data.message
                        ) {
                          Toast.show({text: error.response.data.message});
                        }
                      },
                    );
                  }
                } else {
                  Toast.show({
                    text: 'Please enter a valid response before sending.',
                  });
                }
              }}
              style={{
                marginTop: heightPercentageToDP(3),
                width: widthPercentageToDP(35),
              }}
              name={'Submit'}
              linear
            />
            <Button
              onPress={() => {
                setEditReponse(false);
                setYourResponse('');
                setDialog(false);
              }}
              style={{
                marginTop: heightPercentageToDP(3),
                width: widthPercentageToDP(35),
              }}
              name={'Cancel'}
              secondary
            />
          </View>
        </Dialog>
      </ScrollView>
    </View>
  );
};
const Score = styled(View)({
  marginLeft: 20,
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const User = styled(Text)({
  fontSize: 13,
  color: '#A073C4',
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
  width: widthPercentageToDP(100) - 40,
  textAlign: 'justify',
});
const BasicTextFullWidth = styled(Text)({
  // padding: 15,
  fontFamily: 'FuturaPT-Light',
  fontSize: 16,
  width: widthPercentageToDP(100) - 40,
  textAlign: 'justify',
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

export const styles = StyleSheet.create({
  containerchecked: {
    backgroundColor: 0,
    borderWidth: 0,
    marginRight: '6%',
    fontFamily: 'FuturaPT-Light',
    color: 'red',
    marginTop: 20,
    paddingLeft: 0,
    marginLeft: 0,
  },
});

const Checkicons = styled(ResponsiveImage)({
  tintColor: '#000',
});

export default QuestionDetail;
