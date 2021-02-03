import React, {useState} from 'react';
import {Text, View, Image, ActivityIndicator, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {bottomCurve, downarrow} from '../../common/images';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Button from '../../components/button';
import {Dialog} from 'react-native-simple-dialogs';
import {Textarea, Toast} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {StackActions} from '@react-navigation/native';
import {ActionTypes} from '../../redux/ActionTypes';
import {Share} from 'react-native';
const CompatibilityTestsCategory = ({route, navigation}) => {
  const [questions, setQuestions] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);

  const category = route.params.Category;
  const test_id =
    typeof route.params.test_id !== 'undefined' ? route.params.test_id : null;

  const performSearch = () => {
    if (search.length < 2) {
      Toast.show({
        text: 'Please enter atleast 2 characters to search.',
        duration: 3000,
      });
      return;
    }
    setUser(null);
    setIsLoading(true);
    network.getResponse(
      EndPoints.searchUser,
      'POST',
      {search},
      userDetail.token,
      (response) => {
        setIsLoading(false);
        if (response.users && response.users.length > 0) {
          setResults(response.users);
        } else {
          setResults([]);
        }
      },
      (response) => {
        setIsLoading(false);
        setResults(null);
        console.log(response);
      },
    );
  };
  const submitResponses = () => {
    let ques_ids = new Array();
    let ans_ids = new Array();
    questions.forEach((question) => {
      ques_ids.push(question.id);
      ans_ids.push(myAnswers[question.id]);
    });
    let data = {ques_ids, ans_ids, category};
    if (test_id !== null) {
      data = {ques_ids, ans_ids, test_id, category};
    } else {
      data['invited_user_id'] = user;
    }
    console.log(data);
    setIsLoading(true);
    network.getResponse(
      EndPoints.submitCompatibilityTestResponses,
      'POST',
      data,
      userDetail.token,
      (response) => {
        setIsLoading(false);
        if (response.message) {
          Toast.show({text: response.message, duration: 4000});
          console.log(response);
          if (response.test_id) {
            navigation.dispatch(
              StackActions.replace('CompatibilityTestResult', {
                test_id: response.test_id,
              }),
            );
          } else {
            navigation.navigate('CompatibilityTestRequests');
          }
        }
      },
      (response) => {
        setIsLoading(false);
        setResults(null);
        if (error.response && error.response.data) {
          Toast.show({text: error.response.data.message, duration: 4000});
        }
      },
    );
  };

  const renderItem = (item, index) => {
    return (
      <SecView>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: heightPercentageToDP(0.1),
              marginLeft: widthPercentageToDP(1),
              height: 40,
              width: 40,
            }}>
            <Text
              name="info-circle"
              style={{fontSize: 40, color: '#A073C4', fontWeight: 'bold'}}>
              Q
            </Text>
          </View>
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text
              style={{
                width: widthPercentageToDP(100) - 70,
                fontSize: 16,
                color: '#000',
                fontFamily: 'FuturaPT-Light',
                marginBottom: 5,
              }}>
              {item.ques}
            </Text>
            <View>
              {item.answers.map((choice) => {
                // console.log(choice);
                return (
                  <TouchableOpacity
                    key={choice.id.toString()}
                    onPress={() => {
                      let myAnswersTemp = Object.assign({}, myAnswers);
                      myAnswersTemp[item.id] = choice.id;
                      //   console.log(myAnswersTemp);
                      setMyAnswers(myAnswersTemp);
                    }}>
                    <View
                      style={{
                        paddingVertical: 5,
                        flexDirection: 'row',
                      }}>
                      {myAnswers[item.id] && myAnswers[item.id] == choice.id ? (
                        <FontAwesome5Icon
                          solid
                          name="check-circle"
                          style={{color: '#A073C4', fontSize: 20}}
                        />
                      ) : (
                        <FontAwesome5Icon
                          name="circle"
                          style={{color: '#A073C4', fontSize: 20}}
                        />
                      )}
                      <Text style={{paddingLeft: 10, fontSize: 14}}>
                        {choice.ans}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </SecView>
    );
  };

  const LoadQuestions = () => {
    setLoadingMore(true);
    try {
      let data = {
        category,
      };
      console.log(data);
      network.getResponse(
        EndPoints.getCompatibilityTestQuestions,
        'POST',
        data,
        userDetail.token,
        (response) => {
          setQuestions(response.questions);
          setLoadingMore(false);
        },
        (error) => {
          console.log('error', error);
          setLoadingMore(false);
        },
      );
    } catch (exception) {
      console.log('exception', exception);
    }
  };

  React.useEffect(() => {
    LoadQuestions();
  }, []);

  return (
    <FlatList
      bounces={false}
      alwaysBounceVertical={false}
      contentContainerStyle={
        (questions.length
          ? {}
          : {
              flex: 1,
            },
        {
          minHeight: heightPercentageToDP(100) - 30,
        })
      }
      data={questions}
      renderItem={({item, index}) => renderItem(item, index)}
      keyExtractor={() => Math.random().toString()}
      numColumns={1}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          {loadingMore ? (
            <ActivityIndicator color="#A073C4" size="large" />
          ) : (
            <Text>Coming Soon!!</Text>
          )}
        </View>
      }
      ListHeaderComponent={
        <View style={{backgroundColor: 'white'}}>
          <Header
            title={
              category !== null
                ? category.replace('_', ' ')
                : 'Compatibility Test'
            }
            backButton="true"
          />
          {questions.length > 0 && test_id == null && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  borderWidth: 1,
                  borderColor: '#F4F5F6',
                  shadowColor: '#F4F5F6',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  elevation: 2,
                  marginBottom: 20,
                }}>
                <TextInput
                  style={{
                    height: 60,
                    fontSize: 18,
                    flexGrow: 1,
                    paddingLeft: 15,
                  }}
                  autoCapitalize="none"
                  placeholder="Search a user by email or username"
                  value={search}
                  onBlur={() => setResults(null)}
                  onChangeText={(text) => setSearch(text)}
                  onSubmitEditing={() => performSearch()}
                />
                <FontAwesome5Icon
                  name={loadingMore || isLoading ? 'spinner' : 'search'}
                  style={{
                    width: 40,
                    fontSize: 17,
                    textAlign: 'center',
                    lineHeight: 60,
                    color: 'grey',
                    fontWeight: '300',
                  }}
                  onPress={() => performSearch()}
                />
              </View>
              {results && (
                <View style={{maxHeight: heightPercentageToDP(40)}}>
                  <ScrollView
                    style={{
                      // color: 'purple',
                      width: widthPercentageToDP(100) - 40,
                      marginLeft: 20,
                      marginTop: -23,
                      borderWidth: 1,
                      borderColor: '#F4F5F6',
                      shadowColor: '#F4F5F6',
                      shadowOpacity: 0.2,
                      shadowRadius: 10,
                      elevation: 2,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      borderTopWidth: 0,
                      paddingVertical: 10,
                    }}>
                    {results.map((result) => {
                      return (
                        <Text
                          key={result.id.toString()}
                          style={{
                            padding: 8,
                            paddingLeft: 15,
                            color: '#A073C4',
                          }}
                          onPress={() => {
                            console.log(result);
                            setUser(result.id);
                            typeof result.email === 'undefined'
                              ? setSearch(result.username)
                              : setSearch(result.email);
                            setResults(null);
                          }}>
                          {result.email ? result.email : result.username}
                        </Text>
                      );
                    })}
                    <Text
                      key="invite_user"
                      style={{
                        padding: 8,
                        paddingLeft: 15,
                        color: '#A073C4',
                        fontWeight: 'bold',
                      }}
                      onPress={() => {
                        Share.share({
                          message:
                            'I am inviting you to come and take a compatibility test with me. Let’s see how compatible we are. Download app from https://ybhive.app',
                          url: 'https://ybhive.app',
                        });
                      }}>
                      Not on YBH? Invite Them!
                    </Text>
                  </ScrollView>
                </View>
              )}
            </View>
          )}
        </View>
      }
      ListFooterComponentStyle={{
        zIndex: -1,
        paddingBottom: 40,
        flex: 1,
        justifyContent: 'flex-end',
      }}
      ListFooterComponent={
        <>
          {questions.length > 0 && (
            <Button
              style={{
                marginBottom: 10,
                width: widthPercentageToDP(100) - 20,
                marginLeft: 10,
              }}
              onPress={() => {
                if (test_id === null) {
                  if (user === null) {
                    Toast.show({
                      text:
                        'Please choose a user to send the compatibility test to.',
                      duration: 3000,
                    });
                    return;
                  } else if (
                    questions.length !== Object.keys(myAnswers).length
                  ) {
                    Toast.show({
                      text:
                        'Please answer all the questions before sending the test over to someone.',
                      duration: 3000,
                    });
                    return;
                  }
                }
                submitResponses();
              }}
              isLoading={isLoading}
              name={'Send'}
              linear
            />
          )}
          <View
            style={{
              height: 230,
              position: 'absolute',
              bottom: -100,
              zIndex: -10,
            }}>
            <Image
              source={bottomCurve}
              style={{
                width: widthPercentageToDP(100),
                height: 230,
              }}
              resizeMode="contain"
            />
          </View>
        </>
      }
    />
  );
};
const SecView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomWidth: 0.7,
  borderBottomColor: 'rgba(0,0,0,.1)',
  margin: 10,
  marginBottom: 10,
  paddingBottom: 15,
});

export default CompatibilityTestsCategory;
