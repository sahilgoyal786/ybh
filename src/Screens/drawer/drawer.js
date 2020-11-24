import React, {Component, useEffect} from 'react';
import {Toast} from 'native-base';
import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {menuubackground, placeholderProfilePhoto} from '../../common/images';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import storage from '../../components/apis/storage';
import {AuthContext} from '../../common/AuthContext';
import {
  todaysDate,
  SyncContent,
  getRelationshipMeterQuestionsFromServer,
  getTriviaQuestionsFromServer,
  sendResponsesToServer,
} from '../../common/helpers';
import userDetailContext from '../../common/userDetailContext';
import FastImage from 'react-native-fast-image';
import {white_downarrow} from '../../common/images';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ProgressBar from 'react-native-progress/Bar';
import {DrawerActions} from '@react-navigation/native';

const Drawer = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [syncTotal, setSyncTotal] = React.useState(0);
  const [synced, setSynced] = React.useState(0);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  let d = new Date();
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [lastSyncDate, setLastSyncDate] = React.useState(null);
  const [showAdviceSubmenu, setShowAdviceSubmenu] = React.useState(false);

  useEffect(() => {
    console.log('test--');
  }, [userDetail]);
  const ontest = () => {
    console.log('userDetail--', userDetail);
  };
  const updateSync = (userDetailBuffer, completed = false) => {
    let userDetailTemp = userDetailBuffer;
    if (!completed) {
      changeUserDetail(userDetailTemp);
    } else {
      userDetailTemp['synced'] += 10;
      setSynced(userDetailTemp['synced']);
      changeUserDetail(userDetailTemp);
    }
    console.log(userDetailTemp['synced'] + '/' + userDetailTemp['syncTotal']);
  };
  const onSynce = async () => {
    let userDetailTemp = userDetail;
    userDetailTemp['syncTotal'] = 30;
    userDetailTemp['synced'] = 0;
    changeUserDetail(userDetailTemp);

    Toast.show({text: 'Syncing...'});
    setIsSyncing(true);

    await storage.setData('lastSyncDate', todaysDate());

    updateSync(userDetail, false);
    await getRelationshipMeterQuestionsFromServer(userDetail, changeUserDetail)
      .then((status) => {
        updateSync(userDetail, true);
      })
      .catch((err) => {
        updateSync(userDetail, true);
      });
    updateSync(userDetail, false);
    await getTriviaQuestionsFromServer(userDetail, changeUserDetail)
      .then((status) => {
        updateSync(userDetail, true);
      })
      .catch((err) => {
        updateSync(userDetail, true);
      });
    updateSync(userDetail, false);
    await sendResponsesToServer(userDetail, changeUserDetail)
      .then((status) => {
        updateSync(userDetail, true);
      })
      .catch((err) => {
        updateSync(userDetail, true);
      });
  };
  return (
    <View style={{backgroundColor: '#603186', flex: 1}}>
      <ImageBackground
        source={menuubackground}
        style={{width: '100%'}}
        resizeMode="cover">
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo('Profile'));
          }}>
          <MainView>
            <View>
              <FirstView>
                <ImagesView
                  source={
                    userDetail && userDetail.user.avatar
                      ? {uri: userDetail.user.avatar}
                      : placeholderProfilePhoto
                  }
                />
              </FirstView>
            </View>
            <ThirdView>
              <UserNameText>
                {userDetail && userDetail.user.username}
              </UserNameText>
            </ThirdView>
          </MainView>
        </TouchableOpacity>
      </ImageBackground>
      <MainThirdView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={async () => {
              await onSynce();
              Toast.show({text: 'Sync completed'});
              setTimeout(() => setIsSyncing(false), 1000);
            }}>
            <View
              style={{
                padding: 10,
                borderColor: 'white',
                borderWidth: 2,
                alignSelf: 'flex-start',
                // justifyContent: 'flex-start',
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <FontAwesome5Icon
                name="sync"
                style={{
                  color: 'white',
                  fontSize: 12,
                  marginRight: 8,
                  textAlignVertical: 'center',
                }}
              />
              <Text style={{color: 'white'}}>Sync</Text>
            </View>
          </TouchableOpacity>
          {/* <Text
            style={{
              color: 'white',
              fontSize: 12,
              paddingLeft: 4,
            }}>
            (Last Sync: {lastSyncDate})
          </Text> */}
        </View>
        {isSyncing && (
          <ProgressBar
            progress={
              isNaN(userDetail['synced']) ||
              isNaN(userDetail['syncTotal']) ||
              userDetail['syncTotal'] == 0
                ? 0
                : userDetail['synced'] / userDetail['syncTotal']
            }
            width={200}
            color="white"
            style={{marginBottom: 20}}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo('Home'));
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontWeight: '400',
              fontFamily: 'FuturaPT-Light',
            }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo('Thrive'));
          }}>
          <PageText>Thrive</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo('Profile'));
          }}>
          <PageText>My Profile</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowAdviceSubmenu(!showAdviceSubmenu);
          }}>
          <PageText>My Advice</PageText>
          <Image
            source={white_downarrow}
            style={{
              height: 16,
              width: 16,
              position: 'absolute',
              right: 10,
              bottom: 0,
              transform: [{rotateX: showAdviceSubmenu ? '180deg' : '0deg'}],
            }}
          />
        </TouchableOpacity>
        {showAdviceSubmenu && (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(
                  DrawerActions.jumpTo('MyQuestions', {
                    Category: '',
                    title: 'My Questions',
                    type: 'my_questions',
                  }),
                );
              }}>
              <PageText>My Questions</PageText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(
                  DrawerActions.jumpTo('MyResponses', {
                    Category: '',
                    title: 'My Reponses',
                    type: 'my_responses',
                  }),
                );
              }}>
              <PageText>My Responses</PageText>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo('MyPhotos'));
          }}>
          <PageText>My Photos</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo('Privacy'));
          }}>
          <PageText>Privacy Policy</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo('TnC'));
          }}>
          <PageText>Terms & Conditions</PageText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOut(userDetail)}>
          <PageText>Logout</PageText>
        </TouchableOpacity>
      </MainThirdView>
    </View>
  );
};
const PageText = styled(Text)({
  marginTop: heightPercentageToDP(2.7),
  fontSize: 18.5,
  color: '#FFFFFF',
  fontWeight: 400,
  fontFamily: 'FuturaPT-Book',
});
const MainThirdView = styled(View)({
  marginLeft: widthPercentageToDP(10),
  marginTop: heightPercentageToDP(4),
  flexGrow: 1,

  // color: '#FFFFFF',
});
const SyncView = styled(View)({});
const UserNameText = styled(Text)({
  color: '#FFFFFF',
  fontWeight: 400,
  fontFamily: 'FuturaPT-Book',
  fontSize: 18,
  marginLeft: widthPercentageToDP(3),
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(6),
  marginLeft: widthPercentageToDP(8),
  // alignItems: 'center',
});
const MainView = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  height: 100,
  marginBottom: 100,
});
const ImagesView = styled(FastImage)({
  // borderRadius: 0,
  borderWidth: 2,
  height: 70,
  width: 70,
  borderRadius: 50,
  borderColor: '#ffffff',
});
const ThirdView = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(3),
  marginTop: heightPercentageToDP(4),
});
export default Drawer;
