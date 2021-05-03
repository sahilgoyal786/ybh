import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve,placeholderProfilePhoto,UserProfileIcons} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text,ScrollView,View,Image} from 'react-native';
import Header from '../../components/header';
const UserProfile = () => {
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
      <Header title="Deborah" backButton="true"/>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 30, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <UserProfileWrap>
          <UserImage source={placeholderProfilePhoto} resizeMode="contain"></UserImage>
          <UserName>Deborah</UserName>
          <UserData>Age: 28, Virginia</UserData>
          <TouchableOpacity>
            <View
              style={{
                padding: 5,
                backgroundColor: '#7b43a5',
                borderRadius: 5,
                flexDirection: 'row',
                marginTop: 10,
                paddingLeft: 25,
                paddingRight: 25
              }}>
              <IconImage source={UserProfileIcons['connect']} resizeMode="contain"></IconImage>
              <Text style={{color: 'white'}}>Connect</Text>
            </View>
          </TouchableOpacity>
          <ProfileData>
            <ListHalfData>
              <Label>Religion</Label>
              <LabelValue>Islam Sunni</LabelValue>
            </ListHalfData>
            <ListHalfData>
              <Label>Education</Label>
              <LabelValue>Bachelors</LabelValue>
            </ListHalfData>
            <ListHalfData>
              <Label>Profession</Label>
              <LabelValue>Employee</LabelValue>
            </ListHalfData>
            <ListHalfData>
              <Label>Kids</Label>
              <LabelValue>I don't have</LabelValue>
            </ListHalfData>
          </ProfileData>
          <PartnerFunSec>
            <PHeading>What do you like to do for fun with your partner?</PHeading>
            <PValueWrap>
              <PValue>Plan a Date Night (or Day)</PValue>
            </PValueWrap>
          </PartnerFunSec>
          <LookingForSec>
            <PHeading>Type of Person I am looking for!</PHeading>
            <PValueWrap>
              <PValue>Age: 25-32</PValue>
              <PValue>Average</PValue>
              <PValue>Divorced</PValue>
              <PValue>Masters</PValue>
              <PValue>Tribe</PValue>
              <PValue>Small Family</PValue>
              <PValue>No Children</PValue>
              <PValue>Religious</PValue>
            </PValueWrap>
          </LookingForSec>
        </UserProfileWrap>
      </ScrollView>
    </View>
  );
};
const UserProfileWrap = styled(View)({
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center'
});
const UserImage = styled(Image)({
  width: 100,
  height: 100,
  borderRadius: 80,
  marginBottom: 10
});
const IconImage = styled(Image)({
  width: 20,
  height: 20,
  marginRight: 5
});
const UserName = styled(Text)({
  fontSize: 18,
  lineHeight: 25,
  color: '#7b43a5',
  fontWeight: 700,
  textAlign: 'center'
});
const UserData = styled(Text)({
  fontSize: 16,
  color: '#484848',
  textAlign: 'center'
});
const ProfileData = styled(View)({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 30,
  borderBottomWidth: 1,
  borderColor: '#ddd'
});
const ListHalfData = styled(View)({
  flex: '0 0 50%',
  width: '100%',
  marginBottom: 15
});
const Label = styled(Text)({
});
const LabelValue = styled(Text)({
  fontSize: 18,
  lineHeight: 25,
  color: '#484848',
  fontWeight: 700
});
const PartnerFunSec = styled(View)({
  marginTop: 20,
  flex: 1,
  flexDirection: 'column',
  width: '100%'
});
const LookingForSec = styled(View)({
  marginTop: 20,
  flex: 1,
  flexDirection: 'column',
  width: '100%',
  borderTopWidth: 1,
  borderColor: '#ddd',
  paddingTop: 20
});
const PHeading = styled(Text)({
  fontSize: 18,
  lineHeight: 25,
  color: '#484848',
  fontWeight: 700,
  marginBottom: 10
});
const PValueWrap = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
});
const PValue = styled(Text)({
  fontSize:16,
  color:'#7b43a5',
  borderWidth:1,
  borderColor:'#7b43a5',
  padding:7,
  paddingLeft:20,
  paddingRight:20,
  borderRadius:5,
  marginBottom: 8,
  marginRight: 8
});
export default UserProfile;