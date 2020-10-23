import React, {Component} from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';

const LeaderBoard = () => {
  const navigation = useNavigation();
  return (
    <BoxView>
      <ViewBox>
        <TextRank>Your Rank: 50,953</TextRank>
      </ViewBox>
      <TitleRank style={{fontFamily: 'FuturaPT-Medium'}}>
        Leader Board
      </TitleRank>
      <View style={{height: 334}}>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={[
              {key: '1. Abigail Akon '},
              {key: '2. Carla Houston'},
              {key: '3. Bob Smith'},
              {key: '4. Mike Smith'},
              {key: '5. Juan CarLos'},
              {key: '6. Jane Smith'},
              {key: '7. Sally Selcen'},
              {key: '8. David Smith'},
              {key: '9. Joe Smith'},
              {key: '10. James Smith'},
              {key: '11. Kaitlyn Kristy'},
              {key: '12. Sally Selcen'},
              {key: '13. Abigail Akon'},
              {key: '14. Sally Selcen'},
              {key: '15. Mike Smith'},
              {key: '16. Abigail Akon'},
              {key: '17. Sally Selcen'},
              {key: '18. Mike Smith'},
              {key: '19. Bob Smith'},
              {key: '20. Abigail Akon'},
              {key: '21. Sally Selcen'},
              {key: '22. Mike Smith'},
            ]}
            renderItem={({item}) => (
              <ViewFlatList>
                <Text style={styles.item}>{item.key}</Text>
              </ViewFlatList>
            )}
          />
        </SafeAreaView>
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
