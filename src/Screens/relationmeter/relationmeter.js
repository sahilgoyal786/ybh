import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import RNSpeedometer from '../../components/speedometer/index';
import {stick, menu,headerView,
  botomView,} from '../../common/images';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
// import React, {Component} from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {welcomepagebackground} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/header';

const RelationMeter = () => {
  const navigation = useNavigation();

  return (   
    <View >
        <Header title="Love Meter" backButton="true" />
        <BackgroundImage source={botomView}>
        <View  style={{ flex:Platform.OS === 'ios' ? 1 : .69}}>
            <ScrollView >
        <View>
          <RNSpeedometer needleImage={stick} value={20} size={400} />
        </View>
        <ViewSec
          style={{
            marginTop: heightPercentageToDP(14),
          }}>
          <ViewNumber>
            <OneText>1</OneText>
          </ViewNumber>

          <TextLong>
            Morbi vel urn et risus efficitururn et risus, Morbi vel urn et risus
            efficitururn et risus, Morbi vel urn et risus efficitururn et risus,
            Morbi vel urn et risus efficitururn et risus Morbi vel urn et.
          </TextLong>
        </ViewSec>
        <ContainerView>
          <YesView>
            <AgreeText>Yes</AgreeText>
          </YesView>
          <SkipView>
            <AgreeText style={{color: '#000'}}>Skip</AgreeText>
          </SkipView>
          <NoView>
            <AgreeText>No</AgreeText>
          </NoView>
        </ContainerView>
       
        </ScrollView>
        </View>
       </BackgroundImage>
      </View>
    
  );
};
const OneText = styled(Text)({
  fontWeight: '600',
  color: 'white',
  fontFamily: 'FuturaPT-Medium',
});
const ContainerView = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: heightPercentageToDP(3),

});
const YesView = styled(View)({
  backgroundColor: '#0BC677',
  padding: 35,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
});
const SkipView = styled(View)({
  backgroundColor: '#F2E9FE',
  padding: 35,
});
const NoView = styled(View)({
  backgroundColor: '#F55F5E',
  padding: 35,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
});
const AgreeText = styled(Text)({
  color: '#FFFFFF',
  fontSize: 16,
  fontFamily: 'FuturaPT-Book',
});
const ViewSec = styled(View)({
  flexDirection: 'row',
  borderWidth: 4,
  borderColor: '#986CBF',
  margin: 15,
  padding: 20,
  backgroundColor: '#FAF9FF',
  borderRadius: 4,
});
const TextLong = styled(Text)({
  marginLeft: widthPercentageToDP(1),
  fontFamily: 'FuturaPT-Light',
  fontSize: 17,
});
const ViewNumber = styled(View)({
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: heightPercentageToDP(0.1),
  marginLeft: -widthPercentageToDP(2),
  borderRadius: 50,
  backgroundColor: '#986CBF',
  height: 20,
  width: 20,
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 25,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: "-14%",
  marginLeft:15
});
const BackgroundImage = styled(ImageBackground)({

 height:Platform.OS === 'ios' ? '87%' : '100%' ,
 bottom:0,
 marginTop:50,

});
export default RelationMeter;
