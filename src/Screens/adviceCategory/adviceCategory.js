import React, {useState} from 'react';
import {Text, View, Image, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
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
const AdviceCategory = ({route, navigation}) => {
  const dispatch = useDispatch();
  const ques = useSelector((state) => state.Questions.questionList);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('latest');
  const [dialog, setDialog] = useState(false);
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
              style={{fontSize: 40, color: 'purple'}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('QuestionDetail', {question: item});
            }}>
            <Text
              style={{
                width: widthPercentageToDP(100) - 70,
                fontSize: 16,
                paddingLeft: 10,
                paddingBottom: 10,
                color: '#000',
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
    setQuestions([]);
  }, [sortCriteria]);
  React.useEffect(() => {
    if (page == 0) {
      LoadQuestions();
    }
  }, [page]);

  return (
    <FlatList
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
            <ActivityIndicator color="purple" size="large" />
          ) : (
            <Text>No questions have been asked yet, be the first one.</Text>
          )}
        </View>
      }
      ListHeaderComponent={
        <View style={{backgroundColor: 'white'}}>
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
                  }}
                  name={'Ask A Question'}
                  linear
                />
              </TouchableOpacity>
            </ButtonView>
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
                backgroundColor: 'transparent',
                width: 140,
                alignSelf: 'flex-end',
                color: 'black',
              },
              inputIOS: {
                backgroundColor: 'transparent',
                width: 140,
                alignSelf: 'flex-end',
                color: 'black',
              },
              iconContainer: {
                top: 16,
                right: 15,
              },
            }}
            value={sortCriteria}
            onValueChange={(value) => {
              setSortCriteria(value);
            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                <Image source={downarrow} style={{width: 12, height: 12}} />
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
              color="purple"
              style={{
                marginTop: 100,
                position: 'absolute',
                alignSelf: 'center',
              }}
            />
          )}
          <Image
            source={bottomCurve}
            style={{
              width: widthPercentageToDP(100),
              height: 200,
            }}
            resizeMode="contain"
          />

          <Dialog visible={dialog} onTouchoutside={() => setDialog(false)}>
            <View>
              <Textarea
                rowSpan={10}
                value={text}
                placeholder="Describe your situation..."
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
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
                      text:
                        'Please describe your situation, before submitting.',
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
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomWidth: 0.7,
  borderBottomColor: 'rgba(0,0,0,.1)',
  margin: 10,
  marginBottom: 10,
});

const ButtonView = styled(View)({
  justifyContent: 'center',
  alignItems: 'center',
});
export default AdviceCategory;
