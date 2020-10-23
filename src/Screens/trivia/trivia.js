import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import Button from '../../components/button';

import {Radio, ListItem, CheckBox, Toast} from 'native-base';

import {
  welcomepagebackground,
  menu,
  radioon,
  sync,
  dryclnradio,
  iconchecked,
  unchecked,
  headerView,
  botomView,
  bottomCurve,
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Header from '../../components/header';
import LeaderBoard from '../../components/leaderBoard';

const Trivia = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Image
        source={bottomCurve}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Trivia" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 60}}>
        <QuesVIew>
          <View style={{width: '64%'}}>
            <TitleText>Question:</TitleText>
            <View>
              <TitleTextlong>
                Morbi vel urn et risus efficitururn et risus, Morbi vel urn et
                risus Morbi vel urn et risus efficitururn et risus, Morbi vel
                urn et risus:
              </TitleTextlong>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: heightPercentageToDP(2),
              }}>
              <CheckBox
                title="Consequat quis"
                checkedIcon={
                  <Checkicons
                    source={iconchecked}
                    // initHeight="18"
                    // initWidth="18"
                  />
                }
                uncheckedIcon={
                  <Checkicons
                    source={unchecked}
                    // initHeight="18"
                    // initWidth="18"
                  />
                }
                checked={checked}
                onPress={() => setChecked(!checked)}
                containerStyle={styles.containerchecked}
              />

              <Text
                style={{
                  marginLeft: widthPercentageToDP(5),
                  fontSize: 17,
                  color: '#484848',
                }}>
                Consequat quis
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: heightPercentageToDP(2),
              }}>
              <CheckBox
                title="Suscipit vitae"
                checkedIcon={<Checkicons source={iconchecked} />}
                uncheckedIcon={<Checkicons source={unchecked} />}
                checked={iconchecked}
                onPress={() => setChecked(!iconchecked)}
                containerStyle={styles.containerchecked}
              />

              <Text
                style={{
                  marginLeft: widthPercentageToDP(5),
                  fontSize: 17,
                  color: '#484848',
                }}>
                Suscipit vitae
              </Text>
            </View>
            <ContainerView>
              <MainLatestView>
                <Button
                  onPress={() => {
                    navigation.navigate('Welcomeuser');
                  }}
                  style={{
                    width: widthPercentageToDP(40),
                    marginTop: heightPercentageToDP(2),
                  }}
                  name={'Submit'}
                  linear
                />
              </MainLatestView>
            </ContainerView>
          </View>

          <View
            style={{
              position: 'absolute',
              right: widthPercentageToDP(25),
              top: heightPercentageToDP(1.8),
              zIndex: 10,
            }}>
            <SyncImage source={sync} initHeight="25" initWidth="25" />
          </View>
          <View style={{marginRight: widthPercentageToDP(3)}}>
            <Button
              onPress={() => {
                // navigation.navigate('TriviaSec');
                Toast.show({
                  text:
                    'Refreshing database in background, please check back soon.',
                  duration: 2000,
                });
              }}
              style={{
                width: widthPercentageToDP(30),
              }}
              name={'Sync'}
              linear
            />
            <LeaderBoard />
          </View>
        </QuesVIew>
      </ScrollView>
    </View>
  );
};

//const Checkicons = styled(ResponsiveImage)({});
const LatestPhoto = styled(View)({});

const MainLatestView = styled(View)({});

const ContainerView = styled(View)({
  flexDirection: 'row',
});
const styles = StyleSheet.create({
  item: {
    color: '#ffffff',
    marginLeft: widthPercentageToDP(2),

    fontSize: 12,
    fontFamily: 'FuturaPT-Medium',
    width: widthPercentageToDP(26.2),
    //height:30,
    margin: 6,
  },
  containerchecked: {
    // backgroundColor: 0,
    // borderWidth: 0,
    // marginRight: '6%',
    // fontFamily: 'FuturaPT-Light',
    // color: 'red',
  },
});
const SyncImage = styled(ResponsiveImage)({
  color: '#484848',
  marginTop: heightPercentageToDP(1.2),
  marginLeft: widthPercentageToDP(0.5),
});
const ViewFlatList = styled(View)({
  borderBottomWidth: 0.5,

  borderBottomColor: 'rgba(0,0,0,.1)',
});
const TitleRank = styled(Text)({
  color: '#ffffff',
  fontWeight: '500',
  textAlign: 'center',
  marginTop: 2,
  marginBottom: 4,
  marginRight: 20,
  fontSize: 11,
});
const TextRank = styled(Text)({
  fontSize: 11,
  textAlign: 'left',
  color: '#484848',
  fontFamily: 'FuturaPT-Medium',
});
const ViewBox = styled(View)({
  backgroundColor: '#F6BC18',
  paddingHorizontal: widthPercentageToDP(2.7),
  borderTopRightRadius: 4,
  borderTopLeftRadius: 4,
  paddingVertical: heightPercentageToDP(1),
});
const BoxView = styled(View)({
  backgroundColor: '#9A6FC0',
  // marginTop: heightPercentageToDP(-4),`
  borderRadius: 6,
});
const TitleTextlong = styled(Text)({
  width: widthPercentageToDP(45),
  color: '#484848',
  fontSize: 18,
  width: '96%',
  fontFamily: 'FuturaPT-Light',
  // marginTop: -heightPercentageToDP(6),
});
const TitleText = styled(Text)({
  color: '#905BBC',
  fontSize: 18,
  fontWeight: 600,
  fontFamily: 'FuturaPT-Book',
});
const QuesVIew = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 15,
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
const BackgroundImage = styled(ImageBackground)({
  height: Platform.OS === 'ios' ? '88%' : '100%',
  bottom: 0,
  marginTop: 50,
});
const Checkicons = styled(ResponsiveImage)({
  tintColor: '#000',
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-17%',
  marginLeft: 15,
});
export default Trivia;
