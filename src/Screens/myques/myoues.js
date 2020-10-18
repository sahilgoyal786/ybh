import React, {useState} from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
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
import {welcomepagebackground, menu, addbtmimg} from '../../common/images';
// import {CheckBox} from 'react-native-elements';
const MyQues = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  return (
    <BackgroundImage source={welcomepagebackground}>
      <WelcomeView>
        <WelcomeText>My Question</WelcomeText>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <MenuIcon source={menu} initHeight="30" initWidth="30" />
        </TouchableOpacity>
      </WelcomeView>
      <MainView style={{marginTop: heightPercentageToDP(10)}}>
        <FirstText>
          Morbi vel urn et risus efficitururn et risus, Morbi vel urn et risus
          vel urn et
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

      <View style={{alignItems: 'center', marginTop: heightPercentageToDP(2)}}>
        <ImagesView source={addbtmimg} initHeight="50" initWidth="388" />
      </View>
    </BackgroundImage>
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
  marginTop: heightPercentageToDP(4),
  marginLeft: widthPercentageToDP(9),
});
const BackgroundImage = styled(ImageBackground)({
  height: heightPercentageToDP(117),
  // width: widthPercentageToDP(100),
});
export default MyQues;
