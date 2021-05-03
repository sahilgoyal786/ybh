import React from 'react';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve,placeholderProfilePhoto} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Text,ScrollView,View,Image} from 'react-native';
import Header from '../../components/header';
const PhotoVerification = () => {
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
      <Header title="Photo Verification" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 40, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={{marginBottom: 20,alignItems: 'center'}}>
          <Heading>Keep your face still and look into the circle.</Heading>
          <Text style={{fontSize:16,lineHeight:24}}>Without verifying your photo you cannot use this app. We have to make sure is a safe environment.</Text>
          <Image source={placeholderProfilePhoto} style={{
            width: 120,
            height: 120,
            borderRadius: 120,
            marginTop: 20,
            marginBottom: 20,
          }}></Image>
          <Text style={{fontSize:17,lineHeight:24,textAlign:'center'}}>Your photo will not be posted or stored once verified.</Text>
          <Button
            onPress={() => {
              navigation.navigate('MyConnection');
            }}
            style={{
              width: '100%',
              marginTop: 40
            }}
            name={'Take Picture to Verify'}
            linear
          />
        </View>
      </ScrollView>
    </View>
  );
};
const Heading = styled(Text)({
  fontSize: 20,
  marginBottom: 10,
  color: '#7b43a5',
  lineHeight: 26
});
export default PhotoVerification;