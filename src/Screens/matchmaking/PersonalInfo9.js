import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve,ProfileIcon9,ProfileNextIcon} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text,ScrollView,View,Image} from 'react-native';
import Header from '../../components/header';
const PersonalInfo9 = () => {
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
          <TopImage source={ProfileIcon9} resizeMode="contain"></TopImage>
          <Heading>How tall are you?</Heading>
          <View style={{flex: 1, flexDirection: 'row'}}>
            
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo10')}>
            <ProfileNext source={ProfileNextIcon}></ProfileNext>
          </TouchableOpacity>
        </ProfileWrap>
      </ScrollView>
    </View>
  );
};
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
  width: '60%',
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
export default PersonalInfo9;