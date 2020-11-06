import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';

import ResponsiveImage from 'react-native-responsive-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../components/button';
import {Textarea, Form} from 'native-base';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  welcomepagebackground,
  menu,
  addbtmimg,
  headerView,
  botomView,
} from '../../common/images';
// import {CheckBox} from 'react-native-elements';
import Header from '../../components/header';

const MyResponse = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  return (
    <View>
      <Header title="My Response" backButton="true" />
      <BackgroundImage source={botomView}>
        <View style={{flex: Platform.OS === 'ios' ? 1 : 0.69}}>
          <ScrollView>
            <MainView
              style={{
                marginTop: heightPercentageToDP(10),
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#F4F5F6',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0.1,
                },
                backgroundColor: 'white',
                shadowOpacity: 0.2,
                shadowRadius: 9,
                elevation: 3,
              }}>
              <FirstText>
                Morbi vel urn et risus efficitururn et risus, Morbi vel urn et
                risus vel urn et
              </FirstText>
            </MainView>
            <ViewTextarea>
              <Form>
                <Textarea rowSpan={10} placeholder="My Response" />
              </Form>
            </ViewTextarea>
            <View style={{alignSelf: 'center'}}>
              <Button
                onPress={() => {
                  navigation.navigate('Welcomeuser');
                }}
                style={{
                  marginTop: heightPercentageToDP(3),
                  width: widthPercentageToDP(94),
                }}
                name={'Submit Your Question'}
                linear
              />
            </View>

            <View
              style={{
                alignItems: 'center',
                marginTop: heightPercentageToDP(2),
              }}>
              <ImagesView source={addbtmimg} initHeight="50" initWidth="388" />
            </View>
          </ScrollView>
        </View>
      </BackgroundImage>
    </View>
  );
};
const ImagesView = styled(ResponsiveImage)({
  marginLeft: 5,
  resizeMode: 'cover',
  justifyContent: 'center',
});
const ViewTextarea = styled(View)({
  padding: 10,
  margin: 15,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#F4F5F6',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0.1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 9,
  elevation: 3,
  backgroundColor: 'white',
  // marginTop: heightPercentageToDP(10),
});
const FirstText = styled(Text)({
  padding: 15,
  fontFamily: 'FuturaPT-Light',
  fontSize: 16,
});
const MainView = styled(View)({
  borderRadius: 4,
  margin: 15,
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
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 22,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginLeft: widthPercentageToDP(1),
  marginTop: -heightPercentageToDP(0.1),
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-14%',
  marginLeft: 8,
});
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? '89%' : '100%',
  bottom: 0,
  marginTop: 50,
});
export default MyResponse;
