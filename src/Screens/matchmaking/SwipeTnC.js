import React from 'react';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {bottomCurve, SwipeTnCIcon} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Text, ScrollView, View, Image} from 'react-native';
import Header from '../../components/header';
import GlobalStyles from '../../common/styles';
const SwipeTnC = () => {
  const navigation = useNavigation();
  return (
    <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
      <Image
        source={bottomCurve}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header
        title="Terms & Conditions"
        backButton="true"
        showRightDrawer={false}
      />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 15, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <ProfileWrap>
          <TopImage source={SwipeTnCIcon} resizeMode="contain"></TopImage>
          <Text
            style={{
              ...GlobalStyles.secondaryTextColor,
              width: '100%',
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 10,
            }}>
            Before you swipe.
          </Text>
          <Text
            style={{
              ...GlobalStyles.secondaryTextColor,
              width: '100%',
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 10,
            }}>
            Welcome! here we treat everyone with kindness and respect.
          </Text>
          <Text
            style={{
              ...GlobalStyles.secondaryTextColor,
              width: '100%',
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 10,
            }}>
            In our mission to actively keep people safe while trying to meet
            then significant other. We ask you to join us in adhering to our
            guidelines.
          </Text>
          <Button
            onPress={() => navigation.navigate('PhotoVerification')}
            style={{width: '100%', marginTop: 30}}
            name={'I Agree'}
            linear
          />
        </ProfileWrap>
      </ScrollView>
    </View>
  );
};
const ProfileWrap = styled(View)({
  alignItems: 'center',
});
const TopImage = styled(Image)({
  width: '100%',
  height: 80,
  marginBottom: 20,
});
export default SwipeTnC;
