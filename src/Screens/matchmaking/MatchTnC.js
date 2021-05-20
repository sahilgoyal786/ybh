import React from 'react';
import Button from '../../components/button';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {bottomCurve} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import Header from '../../components/header';

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
      <Header title="Terms & Conditions" backButton="true" showRightDrawer={false}/>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{padding: 15, paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={{marginBottom: 20}}>
          <Heading>Disclamer</Heading>
          <Text>Morbi interdum quam eu augue pharetra vulputate. Nam tempus nulla vel mi venenatis egestas. Sed quis dui vel velit placerat lacinia. Aenean ac dolor nec tortor imperdiet tempor. Sed luctus nunc eget porta facilisis ligula lorem ultrices orci non lobortis neque.</Text>
          <Heading style={{
              marginTop: 25
            }}
          >Terms</Heading>
          <Text>Proin auctor facilisis justo ac rhoncus orci euismod id. Morbi ullamcorper dignissim felis vitae commodo. Praesent elementum nibh eu elit porttitor id luctus lacus efficitur. Nullam laoreet consectetur neque at maximus. Aenean aliquam eu turpis ut scelerisque. Sed enim magna fringilla eget nisl suscipit efficitur tempus magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum tincidunt metus lectus in pharetra ex fermentum vitae.</Text>
          <Button
            onPress={() => {
              navigation.navigate('Plans');
            }}
            style={{
              width: '100%',
              marginTop: 40
            }}
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
