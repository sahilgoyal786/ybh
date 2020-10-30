import React, {Component} from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const LeaderBoard = () => {
  const navigation = useNavigation();
  const data = [
    {key: 'Abigail Akon '},
    {key: 'Carla Houston'},
    {key: 'Bob Smith'},
    {key: 'Mike Smith'},
    {key: 'Juan CarLos'},
    {key: 'Jane Smith'},
    {key: 'Sally Selcen'},
    {key: 'David Smith'},
    {key: 'Joe Smith'},
    {key: 'James Smith'},
    {key: 'Kaitlyn Kristy'},
    {key: 'Sally Selcen'},
    {key: 'Abigail Akon'},
    {key: 'Sally Selcen'},
    {key: 'Mike Smith'},
    {key: 'Abigail Akon'},
    {key: 'Sally Selcen'},
    {key: 'Mike Smith'},
    {key: 'Bob Smith'},
    {key: 'Abigail Akon'},
    {key: 'Sally Selcen'},
    {key: 'Mike Smith'},
  ];
  let leaderBoardStandings = [];
  for (let i = 0; i < data.length; i++) {
    leaderBoardStandings.push(
      <ViewFlatList key={i}>
        <Text style={styles.item}>
          {i + 1}. {data[i]['key']}
        </Text>
      </ViewFlatList>,
    );
  }
  return (
    <BoxView>
      <ViewBox>
        <TextRank>Your Rank: 50,953</TextRank>
      </ViewBox>
      <TitleRank style={{fontFamily: 'FuturaPT-Medium'}}>
        Leader Board
      </TitleRank>
      <View style={{height: 334}}>
        <ScrollView style={{flex: 1}}>{leaderBoardStandings}</ScrollView>
      </View>
    </BoxView>
  );
};

const BoxView = styled(View)({
  backgroundColor: '#9A6FC0',
  borderRadius: 6,
});
const ViewFlatList = styled(View)({
  borderBottomWidth: 0.5,
  borderBottomColor: 'rgba(0,0,0,.1)',
});
const ViewBox = styled(View)({
  backgroundColor: '#F6BC18',
  paddingHorizontal: widthPercentageToDP(2.7),
  borderTopRightRadius: 4,
  borderTopLeftRadius: 4,
  paddingVertical: heightPercentageToDP(1),
});
const TextRank = styled(Text)({
  fontSize: 11,
  textAlign: 'left',
  color: '#484848',
  fontFamily: 'FuturaPT-Medium',
});
const TitleRank = styled(Text)({
  color: '#ffffff',
  fontWeight: '600',
  marginTop: 2,
  marginBottom: 4,
  marginLeft: 8,
});

const styles = StyleSheet.create({
  item: {
    color: '#ffffff',
    marginLeft: widthPercentageToDP(2),
    fontSize: 12,
    fontFamily: 'FuturaPT-Medium',
    width: widthPercentageToDP(27),
    margin: 6,
  },
});

export default LeaderBoard;
