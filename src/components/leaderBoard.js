import React, {Component, useContext} from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import userDetailContext from '../common/userDetailContext';
import {ActivityIndicator} from 'react-native';
import GlobalStyles from '../common/styles';
const LeaderBoard = ({userDetailTemp = false}) => {
  let temp = userDetailTemp;
  const data = temp ? (temp.leaderBoard ? temp.leaderBoard.users : []) : [];
  let leaderBoardStandings = [];
  for (let i = 0; i < data.length && i < 30; i++) {
    leaderBoardStandings.push(
      <ViewFlatList key={i}>
        <Text style={styles.item} numberOfLines={1}>
          {i + 1}. {data[i]['username']}
        </Text>
      </ViewFlatList>,
    );
  }
  if (temp) {
    return (
      <BoxView>
        <ViewBox>
          {temp.leaderBoard && temp.leaderBoard.authUser ? (
            <>
              <TextRank>Your Rank: {temp.leaderBoard.authUser.rank}</TextRank>
              <TextRank style={{fontSize: 12}}>
                (Points: {temp.leaderBoard.authUser.points})
              </TextRank>
            </>
          ) : (
            <ActivityIndicator color="white" />
          )}
        </ViewBox>
        <TitleRank style={{fontFamily: 'FuturaPT-Medium'}}>
          Leader Board
        </TitleRank>
        <View style={{height: 384}}>
          {leaderBoardStandings.length ? (
            <ScrollView style={{flex: 1}}>{leaderBoardStandings}</ScrollView>
          ) : (
            <ActivityIndicator color="white" size="large" />
          )}
        </View>
      </BoxView>
    );
  } else return <></>;
};

const BoxView = styled(View)({
  ...GlobalStyles.LeaderBackgroundColor,
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
  color: '#484848',
  textAlign: 'left',
  fontFamily: 'FuturaPT-Medium',
});
const TitleRank = styled(Text)({
  ...GlobalStyles.whiteTextColor,
  fontWeight: '600',
  marginTop: 2,
  marginBottom: 4,
  marginLeft: 8,
});

const styles = StyleSheet.create({
  item: {
    ...GlobalStyles.whiteTextColor,
    marginLeft: widthPercentageToDP(2),
    fontSize: 12,
    fontFamily: 'FuturaPT-Medium',
    width: widthPercentageToDP(27),
    margin: 6,
  },
});

export default LeaderBoard;
