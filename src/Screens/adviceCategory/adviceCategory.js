import React, {useState} from 'react';
import {Text, View, Image, ActivityIndicator} from 'react-native';
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
import {ActionTypes} from '../../redux/ActionTypes';
import GlobalStyles, {GlobalImages} from '../../common/styles';
const AdviceCategory = ({route, navigation}) => {
  const dispatch = useDispatch();
  const ques = useSelector((state) => state.Questions.questionList);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('latest');
  const [dialog, setDialog] = useState(false);
  const [Search, setSearch] = useState(false);
  const [keyword, setKeyword] = React.useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);

  const {Category} = route.params;

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
            <FontAwesome5Icon
              name="info-circle"
              style={{fontSize: 40, color: '#A073C4'}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('QuestionDetail', {question: item});
            }}>
            <Text
              style={{
                ...GlobalStyles.secondaryTextColor,
                width: widthPercentageToDP(100) - 70,
                fontSize: 16,
                paddingLeft: 10,
                paddingBottom: 10,
                fontFamily: 'FuturaPT-Light',
                minHeight: 50,
              }}
              numberOfLines={2}>
              {item.ques}
            </Text>
          </TouchableOpacity>
        </View>
      </SecView>
    );
  };

  const LoadQuestions = () => {
    console.log('LoadQuestions');
    // const tempImagesArray = [];
    if (totalPages && page == totalPages) {
      console.log('return');
      return;
    }
    let current_page = page + 1;
    setPage(current_page);
    setLoadingMore(true);
    try {
      let data = {
        filter_category: Category.toLowerCase(),
        page: current_page,
        sort_by: sortCriteria,
        keyword,
      };
      if (route.params.type) {
        if (route.params.type == 'my_questions') {
          data.author = 'me';
        } else if (route.params.type == 'my_responses') {
          data.responder = 'me';
        }
      }
      console.log(data);
      network.getResponse(
        EndPoints.getAllAdviceQuestions,
        'POST',
        data,
        userDetail.token,
        (response) => {
          response = response['advice-questions'];
          if (response.data.length) {
            if (current_page !== 1) {
              dispatch({
                type: ActionTypes.GET_QUESTION_LIST_SUCCESS,
                payload: {data: questions.concat(response.data)},
              });
              setQuestions(questions.concat(response.data));
            } else {
              dispatch({
                type: ActionTypes.GET_QUESTION_LIST_SUCCESS,
                payload: {data: response.data},
              });
              setQuestions(response.data);
            }
          } else {
            setQuestions([]);
          }
          setTotalPages(response.last_page);
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

  React.useEffect(() => {
    setPage(0);
  }, [sortCriteria]);
  React.useEffect(() => {
    if (page == 0) {
      dispatch({
        type: ActionTypes.GET_QUESTION_LIST_SUCCESS,
        payload: {data: []},
      });
      LoadQuestions();
    }
  }, [page]);

  const performSearch = () => {
    setPage(0);
  };

  return (
    <FlatList
      style={{...GlobalStyles.screenBackgroundColor}}
      bounces={false}
      alwaysBounceVertical={false}
      onEndReached={() => {
        if (ques.length && totalPages && page <= totalPages) {
          LoadQuestions();
        }
      }}
      onEndReachedThreshold={ques.length ? 0.5 : 0}
      contentContainerStyle={
        (ques.length
          ? {}
          : {
              flex: 1,
            },
        {
          minHeight: heightPercentageToDP(100) - 30,
        })
      }
      data={ques}
      renderItem={({item, index}) => renderItem(item, index)}
      keyExtractor={() => Math.random().toString()}
      numColumns={1}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          {isLoading || loadingMore ? (
            <ActivityIndicator color="#A073C4" size="large" />
          ) : (
            <Text style={{...GlobalStyles.secondaryTextColor}}>
              No questions have been asked yet, be the first one.
            </Text>
          )}
        </View>
      }
      ListHeaderComponent={
        <View style={{...GlobalStyles.screenBackgroundColor}}>
          <Header
            title={Category !== '' ? Category : route.params.title}
            backButton="true"
          />
          {Category !== '' && (
            <ButtonView>
              <TouchableOpacity onPress={() => setDialog(true)}>
                <Button
                  style={{
                    marginBottom: 10,
                    width: widthPercentageToDP(100) - 100,
                  }}
                  name={'Ask A Question'}
                  linear
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (Search && keyword != '') {
                    setKeyword('');
                    performSearch();
                  }
                  setSearch(!Search);
                }}>
                <Button
                  style={{
                    marginBottom: 10,
                    width: 50,
                  }}
                  name={
                    <FontAwesome5Icon
                      name={Search ? 'times' : 'search'}
                      style={{fontSize: 20}}
                    />
                  }
                  secondary={true}
                />
              </TouchableOpacity>
            </ButtonView>
          )}
          {Search && (
            <View
              style={{
                ...GlobalStyles.shadowColor,
                ...GlobalStyles.secondaryBorderColor,
                flexDirection: 'row',
                marginHorizontal: 20,
                borderWidth: 1,
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
                  ...GlobalStyles.secondaryTextColor,
                  height: 60,
                  fontSize: 18,
                  flexGrow: 1,
                  paddingLeft: 15,
                }}
                onChangeText={(text) => setKeyword(text)}
                onSubmitEditing={() => performSearch()}
              />
              <FontAwesome5Icon
                name={loadingMore ? 'spinner' : 'search'}
                style={{
                  ...GlobalStyles.secondaryTextColor,
                  width: 40,
                  fontSize: 17,
                  textAlign: 'center',
                  lineHeight: 60,
                  fontWeight: '300',
                }}
                onPress={() => performSearch()}
              />
            </View>
          )}
          <RNPickerSelect
            placeholder={{
              label: 'Order By:',
              key: Math.random().toString(),
            }}
            items={[
              {
                label: 'Popular First',
                value: 'popular',
              },
              {
                label: 'Latest First',
                value: 'latest',
              },
            ]}
            onValueChange={(value) => {
              console.log(value);
            }}
            style={{
              inputAndroid: {
                ...GlobalStyles.secondaryTextColor,
                backgroundColor: 'transparent',
                textAlign: 'right',
                paddingRight: 35,
                alignSelf: 'flex-end',
              },
              inputIOS: {
                ...GlobalStyles.secondaryTextColor,
                backgroundColor: 'transparent',
                alignSelf: 'flex-end',
                textAlign: 'right',
                paddingRight: 35,
              },
              iconContainer:
                Platform.OS == 'android'
                  ? {
                      bottom: 16,
                      right: 20,
                    }
                  : {},
            }}
            value={sortCriteria}
            onValueChange={(value) => {
              setSortCriteria(value);
            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                // <Image source={downarrow} style={{width: 12, height: 12}} />
                <FontAwesome5Icon
                  name="caret-down"
                  style={{
                    ...GlobalStyles.secondaryTextColor,
                    fontSize: 15,
                  }}
                />
              );
            }}
          />
        </View>
      }
      ListFooterComponentStyle={{
        zIndex: -1,
        paddingBottom: 40,
        flex: 1,
        justifyContent: 'flex-end',
      }}
      ListFooterComponent={
        <View
          style={{
            height: 230,
            position: 'absolute',
            bottom: -100,
            zIndex: -10,
          }}>
          {loadingMore && (
            <ActivityIndicator
              color="#A073C4"
              style={{
                marginTop: 100,
                position: 'absolute',
                alignSelf: 'center',
              }}
            />
          )}
          <Image
            source={GlobalImages.footer}
            style={{
              width: widthPercentageToDP(100),
              height: 230,
            }}
            resizeMode="contain"
          />

          <Dialog
            visible={dialog}
            onTouchoutside={() => setDialog(false)}
            dialogStyle={{...GlobalStyles.secondaryBackgroundColor}}>
            <View>
              <Textarea
                rowSpan={10}
                value={text}
                placeholder="Describe your situation..."
                style={{
                  ...GlobalStyles.secondaryTextColor,
                  ...GlobalStyles.primaryBorderColor,
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                }}
                onChangeText={(text) => setText(text)}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                isLoading={isLoading}
                onPress={() => {
                  if (text.length < 20) {
                    Toast.show({
                      text: 'Please describe your situation, before submitting.',
                    });
                  } else {
                    setIsLoading(true);
                    network.getResponse(
                      EndPoints.postAdviceQuestion,
                      'POST',
                      {ques: text, category: Category.toLowerCase()},
                      userDetail.token,
                      (response) => {
                        setIsLoading(false);
                        if (response.message) {
                          // setQuestions(questions.concat(response.question));
                          Toast.show({text: response.message});
                        }
                        setDialog(false);
                      },
                      (error) => {
                        setIsLoading(false);
                        if (
                          error.response &&
                          error.response.data &&
                          error.response.data.message
                        ) {
                          Toast.show({text: response.message});
                        }
                      },
                    );
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
                  // navigation.navigate('Welcomeuser');
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
        </View>
      }
    />
  );
};
const SecView = styled(View)({
  ...GlobalStyles.customBorderColor,
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomWidth: 0.7,
  margin: 10,
  marginBottom: 10,
});

const ButtonView = styled(View)({
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  width: widthPercentageToDP(100) - 40,
  marginLeft: 20,
  marginRight: 20,
});
export default AdviceCategory;
