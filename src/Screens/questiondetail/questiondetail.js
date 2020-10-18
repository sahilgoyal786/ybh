import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Button from '../../components/button';

import {Textarea, Form} from 'native-base';

import {
  welcomepagebackground,
  menu,
  thumpup,
  thumpdown,
  headerView,
  botomView
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const QuestionDetail = () => {
  const navigation = useNavigation();

  return (
    <View >
        
    <Image source={headerView}/>
        <WelcomeView>
          <WelcomeText>Question Detail</WelcomeText>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <MenuIcon source={menu} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        </WelcomeView>
        <BackgroundImage source={botomView}>
        <View  style={{ flex:Platform.OS === 'ios' ? 1 : .69}}>
            <ScrollView >
          <WelcomeTextThrive>View List of Blogs</WelcomeTextThrive>
          <MainView style={{marginTop: heightPercentageToDP(1)}}>
            <FirstText>
              Morbi vel urn et risus efficitururn et risus, Morbi vel urn et
              risus vel urn et
            </FirstText>
          </MainView>
          <WelcomeTextComments>Comments</WelcomeTextComments>
          <MainView style={{marginTop: heightPercentageToDP(1)}}>
            <FirstText>
              Morbi vel urn et risus efficitururn et risus, Morbi vel urn et
              risus vel urn et Morbi vel urn et risus efficitururn et risus,
              Morbi vel urn et risus
            </FirstText>

            <ViewComent>
              <TextComments>-Jacob Neil</TextComments>
              <ResponsiveImage
                style={{
                  fontSize: 13,
                  color: '#484848',
                  marginTop: heightPercentageToDP(1.2),
                  marginLeft: widthPercentageToDP(53),
                }}
                source={thumpup}
                initHeight="15"
                initWidth="15"
              />
              <Text
                style={{
                  fontSize: 13,
                  color: '#484848',
                  marginTop: heightPercentageToDP(1.3),
                }}>
                4
              </Text>
              <ResponsiveImage
                style={{
                  color: '#484848',
                  marginTop: heightPercentageToDP(1.2),
                  marginLeft: widthPercentageToDP(0.5),
                }}
                source={thumpdown}
                initHeight="15"
                initWidth="15"
              />
            </ViewComent>
            <TimingText>30 Mins Ago</TimingText>
          </MainView>
          <MainView style={{marginTop: heightPercentageToDP(0.1)}}>
            <FirstText>
              Morbi vel urn et risus efficitururn et risus, Morbi vel urn et
              risus vel urn et Morbi vel urn et risus efficitururn et risus,
              Morbi vel urn et risus
            </FirstText>

            <ViewComent>
              <TextComments>-Deborah Neil</TextComments>
              <ResponsiveImage
                style={{
                  fontSize: 13,
                  color: '#484848',
                  marginTop: heightPercentageToDP(1.2),
                  marginLeft: widthPercentageToDP(53),
                }}
                source={thumpup}
                initHeight="15"
                initWidth="15"
              />
              <Text
                style={{
                  fontSize: 13,
                  color: '#484848',
                  marginTop: heightPercentageToDP(1.3),
                }}>
                0
              </Text>
              <ResponsiveImage
                style={{
                  color: '#484848',
                  marginTop: heightPercentageToDP(1.2),
                  marginLeft: widthPercentageToDP(0.5),
                }}
                source={thumpdown}
                initHeight="15"
                initWidth="15"
              />
            </ViewComent>
            <TimingText>6 Hours Ago</TimingText>
          </MainView>
          <ViewTextarea>
            <Form>
              <Textarea rowSpan={10} placeholder="100 Characters" />
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
              name={'Submit Your Response'}
              linear
            />
          </View>
          </ScrollView>
        </View>
       </BackgroundImage>
      </View>
  );
};
const ViewTextarea = styled(View)({
  padding: 10,
  margin: 10,
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
});
const ViewComent = styled(View)({
  marginLeft: widthPercentageToDP(3),
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const TextComments = styled(Text)({
  fontSize: 13,
  color: '#484848',
  marginTop: heightPercentageToDP(0.9),
  marginLeft: -widthPercentageToDP(3),
  fontFamily: 'FuturaPT-Book',
});
const TimingText = styled(Text)({
  fontFamily: 'FuturaPT-Book',
  fontSize: 8,
  color: '#484848',
  marginLeft: widthPercentageToDP(4),
});
const FirstText = styled(Text)({
  // padding: 15,
  fontFamily: 'FuturaPT-Light',
  fontSize: 16,
});
const MainView = styled(View)({
  borderRadius: 4,
  margin: 10,
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
const WelcomeTextComments = styled(Text)({
  fontSize: 16,
  color: '#484848',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  // marginTop: heightPercentageToDP(7),
  marginLeft: widthPercentageToDP(7),
});
const WelcomeTextThrive = styled(Text)({
  fontSize: 16,
  color: '#484848',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginTop: heightPercentageToDP(8),
  marginLeft: widthPercentageToDP(7),
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  // marginTop: heightPercentageToDP(4),
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 25,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const BackgroundImage = styled(ImageBackground)({
  height:Platform.OS === 'ios' ? '87%' : '100%' ,
  bottom:0,
  marginTop:50,
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: "-14%",
  marginLeft:8
});

export default QuestionDetail;
