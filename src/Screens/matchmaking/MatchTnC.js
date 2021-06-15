import React from 'react';
import Button from '../../components/button';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {bottomCurve} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import Header from '../../components/header';
import HTML from 'react-native-render-html';

const MatchTnC = () => {
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
        <View style={{marginBottom: 20}}>
          <HTML source={''}></HTML>
          <Button
            onPress={() => navigation.navigate('PersonalInfo')}
            style={{width: '100%', marginTop: 40}}
            name={'Next'}
            linear
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: 110,
  },
});
const Heading = styled(Text)({
  fontSize: 20,
  marginBottom: 10,
});
const Strong = styled(Text)({
  fontWeight: 'bold',
  marginTop: 10,
});

export default MatchTnC;
