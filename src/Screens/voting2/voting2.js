import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import {welcomepagebackground} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {
  menu,
  dots,
  wlcmimg,
  addimage,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  bottomadd,
} from '../../common/images';
import {Right} from 'native-base';
import {lightYellow, White, ShadeYellow} from '../../common/colors';

import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const Voting2 = () => {
  const navigation = useNavigation();

  return (
    <>
      {/* <SafeAreaView /> */}
      <ScrollView>
        <BackgroundImage source={welcomepagebackground}>
          <WelcomeView>
            <WelcomeText>Welcome John</WelcomeText>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <MenuIcon source={menu} initHeight="30" initWidth="30" />
            </TouchableOpacity>
          </WelcomeView>

          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <MainView>
              <View>
                <FirstView>
                  <ImagesView
                    source={wlcmimg}
                    initHeight="150"
                    initWidth="255"
                    borderRadius={5}
                  />
                  <LinearGradientColor
                    colors={[lightYellow, 'transparent']}
                    start={{x: 0.1, y: 0.1}}
                    end={{x: 0.5, y: 0.1}}
                    locations={[0.9, 0.1]}>
                    <TextSignup>Image of the week</TextSignup>
                  </LinearGradientColor>
                </FirstView>
              </View>

              <ThirdView>
                <ResponsiveImage
                  source={addimage}
                  initHeight="80"
                  initWidth="120"
                  borderRadius={5}
                />
              </ThirdView>
            </MainView>
            <ContainerView>
              <MainLatestView>
                <LatestPhoto>
                  <Text
                    style={{
                      marginLeft: widthPercentageToDP(4),
                      marginVertical: heightPercentageToDP(2),
                      fontSize: 18,
                      // fontWeight: '400',
                      fontFamily: 'FuturaPT-Medium',
                    }}>
                    Latest Photos
                  </Text>
                  <RowimageFirst>
                    <ImagesView
                      source={image9}
                      initHeight="80"
                      initWidth="80"
                      borderRadius={5}
                    />
                    <ImagesView
                      source={image10}
                      initHeight="80"
                      initWidth="80"
                      borderRadius={5}
                    />
                    <ImagesView
                      source={image11}
                      initHeight="80"
                      initWidth="80"
                      borderRadius={5}
                    />
                  </RowimageFirst>
                  <RowimageSecond>
                    <ImagesView
                      source={image12}
                      initHeight="80"
                      initWidth="80"
                      borderRadius={5}
                    />
                    <ImagesView
                      source={image13}
                      initHeight="80"
                      initWidth="80"
                      borderRadius={5}
                    />
                    <ImageBackgroundView source={image14}>
                      <ViewMore>
                        <TextMore
                          onPress={() => {
                            navigation.navigate('MyQuestionAdvice');
                          }}>
                          More
                        </TextMore>
                      </ViewMore>
                    </ImageBackgroundView>
                  </RowimageSecond>
                </LatestPhoto>
                <ImageBackground
                  source={dots}
                  style={{
                    height: heightPercentageToDP(8),
                    width: widthPercentageToDP(20),
                    alignItems: 'center',
                    marginBottom: -heightPercentageToDP(6),
                    marginLeft: widthPercentageToDP(7),
                    marginTop: heightPercentageToDP(3),
                  }}>
                  <Title>Thrive</Title>
                </ImageBackground>
                <ThriveView>
                  <SuspendisseView>
                    <TextThirive>
                      <TitleSuspend>Suspendisse Lectus at </TitleSuspend>
                      Lorem dolor sit amet, consectetur adipiscing elit,Lorem
                      ipsum dolor amet, consectetur adipiscing elit Lorem ipsum
                      dolor sit amet,dolor sit amet consectetur adipiscing ipsum
                      dolor consectetur consectetur elit...
                      <Text
                        onPress={() => {
                          navigation.navigate('PhotoViewing');
                        }}
                        style={{
                          textDecorationLine: 'underline',
                          color: '#9A6FC0',
                        }}>
                        More
                      </Text>
                    </TextThirive>
                  </SuspendisseView>

                  <ImagesView
                    source={image15}
                    initHeight="80"
                    initWidth="80"
                    borderRadius={5}
                  />
                </ThriveView>
              </MainLatestView>
              <BoxView>
                <ViewBox style={{}}>
                  <TextRank>Your Rank: 50,953</TextRank>
                </ViewBox>
                <TitleRank
                  style={{fontWeight: '600', fontFamily: 'FuturaPT-Medium'}}>
                  Leader Board
                </TitleRank>
                <View>
                  <FlatList
                    data={[
                      {key: '1. Abigail Akon'},
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
                </View>
              </BoxView>
            </ContainerView>
            <LastImage>
              <ResponsiveImage
                source={bottomadd}
                initHeight="100"
                initWidth="390"
                borderRadius={3}
              />
            </LastImage>
          </ScrollView>
        </BackgroundImage>
      </ScrollView>
    </>
  );
};
const TextSignup = styled(Text)({
  color: White,
  fontWeight: '500',
  fontSize: 14,
  fontFamily: 'FuturaPT-Book',
  marginLeft: widthPercentageToDP(25),
});
const LinearGradientColor = styled(LinearGradient)({
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomRightRadius: 5,
  position: 'absolute',
  top: heightPercentageToDP(12.5),
  padding: 10,
  width: widthPercentageToDP(60),
  left: widthPercentageToDP(2.8),
});
const TitleSuspend = styled(Text)({
  fontSize: 14,
  fontWeight: '600',
  marginBottom: 6,
  color: '#000',
  fontFamily: 'FuturaPT-Medium',
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: heightPercentageToDP(4),
  marginLeft: widthPercentageToDP(9),
});
const WelcomeText = styled(Text)({
  fontSize: 22,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const ViewFlatList = styled(View)({
  borderBottomWidth: 0.7,
  borderBottomColor: 'rgba(0,0,0,.1)',
  paddingBottom: 1,
});
const LastImage = styled(View)({
  marginTop: heightPercentageToDP(3),
  marginLeft: widthPercentageToDP(4),
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
  textAlign: 'center',
  marginTop: 2,
  marginBottom: 4,
  marginLeft: -20,
});
const ImageBackgroundView = styled(ImageBackground)({
  width: 80,
  height: 80,
  marginLeft: 5,
  borderRadius: 6,
  overflow: 'hidden',
});
const ViewMore = styled(View)({
  backgroundColor: '#F5C84B',
  height: 80,
  width: 80,
  opacity: 0.9,
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
});
const TextThirive = styled(Text)({
  fontSize: 9,
  color: 'gray',
  marginLeft: widthPercentageToDP(10),
  letterSpacing: 0.3,
  marginTop: 2,
  fontFamily: 'FuturaPT-Medium',
});
const TextMore = styled(Text)({
  textDecorationLine: 'underline',
  color: 'white',
  fontFamily: 'FuturaPT-Medium',
});
const BackgroundImage = styled(ImageBackground)({
  height: heightPercentageToDP(117),
  // width: widthPercentageToDP(100),
});
const MainView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(1),
});
const SecondView = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(2),
  marginTop: heightPercentageToDP(1),
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(4),
  marginLeft: widthPercentageToDP(2),
});
const ThirdView = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(3),
  marginTop: heightPercentageToDP(4),
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: 5,
  borderRadius: 0,
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  // marginTop: heightPercentageToDP(4),
  marginRight: widthPercentageToDP(4),
});
const ClickVote = styled(View)({
  position: 'absolute',
  top: heightPercentageToDP(9.5),
  left: widthPercentageToDP(18.5),
  backgroundColor: '#F6BC18',
  paddingVertical: heightPercentageToDP(1),
  paddingHorizontal: widthPercentageToDP(6.8),
  opacity: 0.8,
  borderRadius: 5,
});
const SuspendisseView = styled(View)({
  width: widthPercentageToDP(55),
  position: 'absolute',
  top: heightPercentageToDP(-1),
  left: widthPercentageToDP(8),
  backgroundColor: '#FAF9FF',
  paddingVertical: heightPercentageToDP(1.5),
  paddingHorizontal: widthPercentageToDP(4.5),
  borderRadius: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 2.22,

  elevation: 3,
});
const ContainerView = styled(View)({
  flexDirection: 'row',
});

const MainLatestView = styled(View)({});
const LatestPhoto = styled(View)({});
const RowimageSecond = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(2),
  marginTop: heightPercentageToDP(1),
});
const RowimageFirst = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(2),
  marginTop: heightPercentageToDP(-1),
});

const Title = styled(Text)({
  marginLeft: -widthPercentageToDP(14),
  // marginTop: heightPercentageToDP(3),
  // fontWeight: 400,
  fontSize: 18,
  fontFamily: 'FuturaPT-Medium',
});
const ThriveView = styled(View)({
  marginTop: heightPercentageToDP(2.9),
  marginLeft: widthPercentageToDP(2),
});
const BoxView = styled(View)({
  // flexDirection: 'row',
  backgroundColor: '#9A6FC0',
  marginTop: heightPercentageToDP(-5),
  marginLeft: widthPercentageToDP(4.5),
  paddingHorizontal: widthPercentageToDP(0),
  borderRadius: 6,
});

const styles = StyleSheet.create({
  item: {
    color: '#ffffff',
    marginLeft: widthPercentageToDP(2),
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 12,
    fontFamily: 'FuturaPT-Medium',
    width: widthPercentageToDP(26.2),
  },
});

export default Voting2;
