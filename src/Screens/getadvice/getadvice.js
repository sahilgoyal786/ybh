import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Image,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import {welcomepagebackground} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
//import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Header from '../../components/header';

import {
  menu,
  dummyimage,
  botomView,
  dots,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  addimage,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  
  headerView,
  blogimg,
  bottomadd,
} from '../../common/images';
import {Right} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const GetAdvice = () => {
  const navigation = useNavigation();

  return (

    <View >
        
        <Header title="Welcome John" />

        <BackgroundImage source={botomView} style={{height: heightPercentageToDP(100) - 140}}>
          <ScrollView alwaysBounceHorizontal={false} alwaysBounceVertical={false} bounces={false}>
          <MainView>
            <View style={{marginLeft:-6}}>
              <FirstView>
                <ImagesView
                  source={image1}
                  initHeight="59"
                  initWidth="59"
                  borderRadius={5}
                />
                <ImagesView
                  source={image2}
                  initHeight="59"
                  initWidth="59"
                  borderRadius={5}
                />
                <ImagesView
                  source={image3}
                  initHeight="59"
                  initWidth="59"
                  borderRadius={5}
                />
                <ImagesView
                  source={image4}
                  initHeight="59"
                  initWidth="59"
                  borderRadius={5}
                />
              </FirstView>
              <SecondView>
                <ImagesView
                  source={image5}
                  initHeight="59"
                  initWidth="59"
                  borderRadius={5}
                />
                <ImagesView
                  source={image6}
                  initHeight="59"
                  initWidth="59"
                  borderRadius={5}
                />
                <ImagesView
                  source={image7}
                  initHeight="59"
                  initWidth="59"
                  borderRadius={5}
                />
                <ImagesView
                  source={image8}
                  initHeight="59"
                  initWidth="59"
                  borderRadius={5}
                />
              </SecondView>
            </View>

            <ClickVote
              onPress={() => {
                navigation.navigate('AdviceFinance');
              }}>
              <Text
                onPress={() => {
                  navigation.navigate('VotingPage');
                }}
                style={{fontFamily: 'FuturaPT-Medium', color: '#000'}}>
                Click To Vote
              </Text>
            </ClickVote>
            <ThirdView style={{marginRight:3}}>
              <ResponsiveImage
                source={addimage}
                initHeight="80"
                initWidth="126"
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
                  <ImageBackgroundView source={image13}>
                    <ViewMore>
                      <TextMore
                        onPress={() => {
                          navigation.navigate('PhotoWorld');
                        }}>
                        More
                      </TextMore>
                    </ViewMore>
                  </ImageBackgroundView>
                </RowimageSecond>
              </LatestPhoto>
                <Text
                  style={{
                    marginLeft: widthPercentageToDP(4),
                    marginVertical: heightPercentageToDP(2),
                    marginBottom: 7,
                    fontSize: 18,
                    // fontWeight: '400',
                    fontFamily: 'FuturaPT-Medium',
                  }}>
                  Thrive
                </Text>
              <ThriveView>
                  <ImageBackground source={blogimg} style={{width:255,height:82}}>  
                  <View
                 >
                  <ResponsiveImage
                    source={image15}
                    initHeight="64"
                    initWidth="50"
                    borderRadius={5}
                  />
                </View>
                  <TextThirive>
                    <TitleSuspend>Suspendisse Lectus at                                  
                      
                       </TitleSuspend>

                       <Text>       </Text>
                       <Text>       </Text>
                       <Text>       </Text>
                       <Text>       </Text>
                       <Text>       </Text>
                       <Text>       </Text>
                    Lorem dolor sit amet, consecteturt Lorem dolor sit amet consecteturt ...
                    <Text
                      onPress={() => {
                        navigation.navigate('MyPhotos');
                      }}
                      style={{
                        textDecorationLine: 'underline',
                        color: '#9A6FC0',
                      }}>
                      More
                    </Text>
                  </TextThirive> 
                
                </ImageBackground>
               
              </ThriveView>
            </MainLatestView>
            <BoxView>
              <ViewBox>
                <TextRank>Your Rank: 50,953</TextRank>
              </ViewBox>
              <TitleRank
                style={{ fontFamily: 'FuturaPT-Medium'}}>
                Leader Board
              </TitleRank>
              <View style={{height:320}}>
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
              </View>
            </BoxView>
            
          </ContainerView>
          <LastImage>
            <ResponsiveImage
              source={bottomadd}
              initHeight="100"
              initWidth="395"
            />
          </LastImage>
          
          </ScrollView>
       </BackgroundImage>
      </View>

 
  );
};
const TitleSuspend = styled(Text)({
  fontSize: 13,
 fontWeight:'bold',
  marginBottom: 6,
  color: '#000',
  fontFamily: 'FuturaPT-Medium',
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: "-14%",
  marginLeft:8

});
const WelcomeText = styled(Text)({
  fontSize: 22,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const ViewFlatList = styled(View)({
  borderBottomWidth: 0.5,
  borderBottomColor: 'rgba(0,0,0,.1)',
});
const LastImage = styled(View)({
  marginTop: heightPercentageToDP(3),
  marginLeft: 10,
  marginRight: 10,
 
 
 
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
  //borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
});
const TextThirive = styled(Text)({
  fontSize: 12,
  color: 'gray',
  paddingLeft:30,
  marginLeft: widthPercentageToDP(10),
  letterSpacing: 0.3,
  marginTop: -55,
  fontFamily: 'FuturaPT-Medium',
});
const TextMore = styled(Text)({
  textDecorationLine: 'underline',
  color: 'white',
  fontFamily: 'FuturaPT-Medium',
});
const BackgroundImage = styled(ImageBackground)({
  height:Platform.OS === 'ios' ? '87%' : '100%' ,
  bottom:0,
 
  // width: widthPercentageToDP(100),
});
const MainView = styled(View)({
  flexDirection: 'row',
  justifyContent:'space-around',
});
const SecondView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(1),
  justifyContent:'space-around',
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(4),
  justifyContent:'space-around',
  //marginLeft: widthPercentageToDP(1),
});
const ThirdView = styled(View)({
  
  marginTop: heightPercentageToDP(4),
  //marginRight:3,
  marginLeft:7,
  borderRadius: 6,
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: 5,
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
  top: Platform.OS === 'ios' ? heightPercentageToDP(-1) : heightPercentageToDP(-2),
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
  justifyContent:'space-between',
  height:350,
  
});

const MainLatestView = styled(View)({});
const LatestPhoto = styled(View)({});
const RowimageSecond = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(1),
  marginTop: heightPercentageToDP(1),
});
const RowimageFirst = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(1),
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
  marginTop: 0,
  marginLeft: widthPercentageToDP(2),
});
const BoxView = styled(View)({
  backgroundColor: '#9A6FC0',
  marginTop: heightPercentageToDP(-4),
  marginRight: 10,
  marginLeft:4,
  borderRadius: 6,

});

const styles = StyleSheet.create({
  item: {
    color: '#ffffff',
    marginLeft: widthPercentageToDP(2),
    fontSize: 12,
    fontFamily: 'FuturaPT-Medium',
    width: widthPercentageToDP(27),
    margin:6,
  },
});

export default GetAdvice;

