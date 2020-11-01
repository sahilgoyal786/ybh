import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {
  menuubackground,
  image8,
  addimage,
  placeholderProfilePhoto,
  sync,
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import storage from '../../components/apis/storage';
import {AuthContext} from '../../common/AuthContext';
import {SyncContent} from '../../common/helpers';
import {todaysDate} from '../../common/helpers';
import userDetailContext from '../../common/userDetailContext';
import FastImage from 'react-native-fast-image';

const Drawer = () => {
  const navigation = useNavigation();
  const {signOut} = React.useContext(AuthContext);
  const userDetail = React.useContext(userDetailContext);
  let d = new Date();
  const [lastSyncDate, setLastSyncDate] = React.useState(null);

  const refreshDate = () => async () => {
    console.log('useEffect');
    setLastSyncDate(await storage.getData('lastSyncDate'));
  };

  return (
    <View style={{backgroundColor: '#603186', flex: 1}}>
      <ImageBackground
        source={menuubackground}
        style={{width: '100%'}}
        resizeMode="cover">
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
      </ImageBackground>
      <MainThirdView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
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
            navigation.navigate('Thrive');
          }}>
          <PageText>Thrive</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <PageText>My Profile</PageText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyPhotos');
          }}>
          <PageText>My Photos</PageText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOut()}>
          <PageText>Logout</PageText>
        </TouchableOpacity>
      </MainThirdView>
      <SyncView>
        <Text
          style={{
            color: 'white',
            fontSize: 18.5,
            padding: 10,
            borderColor: 'white',
            borderWidth: 2,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: 10,
            borderRadius: 5,
          }}
          onPress={() => SyncContent(userDetail)}>
          <Image
            source={sync}
            style={{width: 16, marginRight: 10, height: 16}}
            resizeMode="contain"
          />
          <> </>
          Sync
        </Text>
        <Text style={{color: 'white', fontSize: 12, paddingLeft: 4}}>
          (Last Sync: {lastSyncDate})
        </Text>
      </SyncView>
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
const SyncView = styled(View)({
  marginLeft: widthPercentageToDP(10),
  marginBottom: 20,
});
const UserNameText = styled(Text)({
  color: '#FFFFFF',
  fontWeight: 400,
  fontFamily: 'FuturaPT-Book',
  fontSize: 18,
  marginLeft: widthPercentageToDP(3),
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(4),
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
