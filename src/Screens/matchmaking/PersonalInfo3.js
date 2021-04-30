import React from 'react';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {
  bottomCurve,
  ProfileIcon3,
  ProfileNextIcon,
  MaleIcon,
  FemaleIcon
} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet,Text,ScrollView,View,Image} from 'react-native';
import Header from '../../components/header';

const PersonalInfo3 = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={bottomCurve}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Personal Info" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 15, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <ProfileWrap>
          <ProgressWrap>
            <ProgressInner></ProgressInner>
          </ProgressWrap>
          <TopImage source={ProfileIcon3} resizeMode="contain"></TopImage>
          <Heading>Gender</Heading>
          <SingleElement style={{borderColor: '#f9bc16'}}>
            <PImage source={MaleIcon}></PImage>
            <PText>Male</PText>
          </SingleElement>
          <SingleElement>
            <PImage source={FemaleIcon}></PImage>
            <PText>Female</PText>
          </SingleElement>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo4')}>
            <ProfileNext source={ProfileNextIcon}></ProfileNext>
          </TouchableOpacity>
        </ProfileWrap>
      </ScrollView>
    </View>
  );
};
const SingleElement = styled(View)({
  flex: 1,
  flexDirection: 'row',
  width: '100%',
  padding: 12,
  borderWidth: 2,
  borderColor: '#fff',
  borderRadius: 5,
  backgroundColor: '#fff',
  marginBottom: 15,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.8,
  shadowRadius: 2,  
  elevation: 5
});
const PImage = styled(Image)({
  width: 30,
  height: 30,
  marginRight: 20
});
const PText = styled(Text)({
  fontSize: 20,
  color: '#484848',
  fontWeight: 600,
  lineHeight: 30
});
const ProfileWrap = styled(View)({
  alignItems: 'center',
});
const ProgressWrap = styled(View)({
  width: 250,
  height: 3,
  backgroundColor: '#f9bc16',
  borderRadius: 5,
  margin: 'auto',
  marginTop: 20,
  marginBottom: 20,
  position: 'relative'
});
const ProgressInner = styled(View)({
  width: '20%',
  height: 3,
  backgroundColor: '#7b43a5',
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
  position: 'absolute',
  left: 0
});
const TopImage = styled(Image)({
  width: '100%',
  height: 80,
  marginBottom: 20
});
const Heading = styled(Text)({
  fontSize: 20,
  marginBottom: 25,
  alignItems: 'center',
  color: '#484848',
  fontWeight: 700,
});
const ProfileNext= styled(Image)({
  width: 70,
  height: 70,
  margin: 'auto',
  marginTop: 20
});
export default PersonalInfo3;