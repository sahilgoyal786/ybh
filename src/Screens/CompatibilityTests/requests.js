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
import {bottomCurve, placeholderProfilePhoto} from '../../common/images';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Button from '../../components/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import {boolean} from 'yup';
import {Toast} from 'native-base';
import {findIndex} from 'react-native-draggable-grid/src/utils';
import storage from '../../components/apis/storage';

const CompatibilityTestRequests = ({route, navigation}) => {
  const [tests, setTests] = useState([]);
  const [invites, setInvites] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      LoadRequests();
    });
    removeNotificationDot();
    return unsubscribe;
  }, [navigation]);

  const removeNotificationDot = () => {
    if (userDetail['user']['has_new_compat_notification']) {
      storage.removeData('new_compat_notification');
      let userDetailTemp = userDetail;
      delete userDetailTemp['user']['has_new_compat_notification'];
      changeUserDetail(userDetailTemp);
    }
  };

  const postInviteReponse = (invite_id, is_accept) => {
    console.log({invite_id, is_accept});
    network.getResponse(
      EndPoints.respondToCompatibilityTestInvite,
      'POST',
      {invite_id, is_accept},
      userDetail.token,
      (response) => {
        console.log(response);
        if (response.message) {
          Toast.show({text: response.message, duration: 4000});
          if (!is_accept) {
            setTests(
              tests.filter((test) => {
                return test.compatibility_test_invite.id !== invite_id;
              }),
            );
          } else {
            if (response.invite) {
              setTests(
                tests.filter((test) => {
                  if (test.compatibility_test_invite.id == invite_id) {
                    test.compatibility_test_invite = response.invite;
                  }
                  return test;
                }),
              );
            }
          }
        }
      },
      (error) => {
        if (error.response && error.response.data) {
          Toast.show({text: error.response.data.message, duration: 4000});
        }
      },
    );
  };

  const renderItem = (item, index) => {
    console.log(item.compatibility_test_invite);
    return (
      <SecView>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 0,
              height: 50,
              width: 50,
            }}>
            <FastImage
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
              }}
              source={
                item.invited_user.avatar
                  ? {uri: item.invited_user.avatar}
                  : placeholderProfilePhoto
              }
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP(100) - 55,
              flexDirection: 'row',
              marginLeft: 10,
            }}>
            <View style={{flex: 4}}>
              <Text style={{fontSize: 20, color: '#454545'}}>
                {item.invited_user.username}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  paddingRight: 10,
                }}>
                <Text
                  style={{
                    flexGrow: 1,
                    textTransform: 'capitalize',
                    color: 'purple',
                    fontSize: 12,
                  }}>
                  {item.category.replace('_', ' ')}
                </Text>
                <Text style={{color: '#454545'}}>
                  {item.created_at_formatted}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
              {item.status == 'completed' ? (
                <Button
                  linear
                  name={'View Results'}
                  onPress={() => {
                    navigation.navigate('CompatibilityTestResult', {
                      test_id: item.id,
                    });
                  }}
                  style={{width: 130, marginBottom: 5}}
                />
              ) : item.invited_user_id == userDetail.user.id &&
                item.compatibility_test_invite.status !== 'pending' ? (
                <Button
                  linear
                  name={'Answer Now'}
                  style={{width: 130, marginBottom: 5, height: 46}}
                  onPress={() => {
                    navigation.navigate('CompatibilityTestsCategory', {
                      test_id: item.id,
                      Category: item.category,
                    });
                  }}
                />
              ) : item.invited_user_id == userDetail.user.id &&
                item.compatibility_test_invite.status == 'pending' ? (
                <>
                  <Button
                    tertiary={{
                      bg: '#FADE0E',
                      color: '#000000',
                    }}
                    name={'Accept'}
                    onPress={() =>
                      postInviteReponse(item.compatibility_test_invite.id, true)
                    }
                    style={{width: 90, marginRight: 5, marginBottom: 5}}
                  />
                  <Button
                    tertiary={{
                      bg: '#EB7170',
                      color: '#FFFFFF',
                    }}
                    onPress={() =>
                      postInviteReponse(
                        item.compatibility_test_invite.id,
                        false,
                      )
                    }
                    name={
                      <FontAwesome5Icon name="trash" style={{fontSize: 20}} />
                    }
                    style={{width: 40, marginBottom: 5}}
                  />
                </>
              ) : (
                <>
                  <Button
                    tertiary={{
                      bg: '#FFF',
                      color: '#000000',
                    }}
                    name={'Pending'}
                    style={{width: 90, marginRight: 5, marginBottom: 5}}
                  />
                  <Button
                    tertiary={{
                      bg: '#EB7170',
                      color: '#FFFFFF',
                    }}
                    name={
                      <FontAwesome5Icon name="trash" style={{fontSize: 20}} />
                    }
                    onPress={() =>
                      postInviteReponse(
                        item.compatibility_test_invite.id,
                        false,
                      )
                    }
                    style={{width: 40, marginBottom: 5}}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </SecView>
    );
  };

  const LoadRequests = () => {
    console.log('LoadRequests');
    setLoadingMore(true);
    try {
      network.getResponse(
        EndPoints.getCompatibilityTests,
        'GET',
        {},
        userDetail.token,
        (response) => {
          console.log('response', response);
          removeNotificationDot();
          if (
            response.compatibilityTests &&
            response.compatibilityTests.length > 0
          ) {
            setTests(response.compatibilityTests);
          }
          if (response.invites && response.invites.length > 0) {
            setInvites(response.invites);
          }
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
    LoadRequests();
  }, []);

  return (
    <FlatList
      bounces={false}
      alwaysBounceVertical={false}
      contentContainerStyle={
        (tests.length
          ? {}
          : {
              flex: 1,
            },
        {
          minHeight: heightPercentageToDP(100) - 30,
        })
      }
      data={tests}
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
            <Text>No tests/requests to show.</Text>
          )}
        </View>
      }
      ListHeaderComponent={
        <View style={{backgroundColor: 'white'}}>
          <Header title={'My Tests/Requests'} backButton="true" />
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
            source={bottomCurve}
            style={{
              width: widthPercentageToDP(100),
              height: 230,
            }}
            resizeMode="contain"
          />
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
  paddingBottom: 10,
  margin: 10,
});

const ButtonView = styled(View)({
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  width: widthPercentageToDP(100) - 40,
  marginLeft: 20,
  marginRight: 20,
});
export default CompatibilityTestRequests;
