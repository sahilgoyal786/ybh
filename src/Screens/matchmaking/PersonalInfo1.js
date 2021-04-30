import React from 'react';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve,ProfileIcon1,ProfileNextIcon} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet,TextInput,ScrollView,View,Image} from 'react-native';
import Header from '../../components/header';

const PersonalInfo1 = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
          <TopImage source={ProfileIcon1} resizeMode="contain"></TopImage>
          <TextInput name="username" style={styles.input} placeholder="User Name"/>
          <TextInput name="dob" style={styles.input} placeholder="Date of Birth"/>
          <TextInput name="tribe" style={styles.input} placeholder="Tribe"/>
          <TextInput name="email" style={styles.input} placeholder="Email"/>
          <Row>
            <TextInput name="state" style={styles.input} placeholder="State"/>
            <TextInput name="country" style={styles.input} placeholder="Country"/>
          </Row>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo2')}>
            <ProfileNext source={ProfileNextIcon}></ProfileNext>
          </TouchableOpacity>
        </ProfileWrap>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#484848',
    color: '#484848',
    fontSize: 18,
    marginBottom: 20,
    flex: 1,
    marginLeft: 8,
    marginRight: 8
  }
});
const Row = styled(View)({
  flex: 1,
  flexDirection: 'row',
  
});
const ProfileWrap = styled(View)({
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
  width: '6.667%',
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
const ProfileNext= styled(Image)({
  width: 70,
  height: 70,
  margin: 'auto',
  marginTop: 20
});
export default PersonalInfo1;