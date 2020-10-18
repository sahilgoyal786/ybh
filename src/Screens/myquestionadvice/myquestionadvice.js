import React, {useState} from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import styled from 'styled-components/native';

import ResponsiveImage from 'react-native-responsive-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../components/button';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  welcomepagebackground,
  menu,
  backicon,
  righticon,
  downarrow,
} from '../../common/images';
import {Form, Content, Picker, Container, Icon} from 'native-base';
import {styles} from '../login/login';

const MyQuestionAdvice = () => {
  const navigation = useNavigation();
  const [Value, setValue] = useState('key11');

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
      <BackgroundImage source={welcomepagebackground}>
        <WelcomeView>
          <WelcomeText>My Question for Advice</WelcomeText>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <MenuIcon source={menu} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        </WelcomeView>
        <MainView>
          <FirstViewText>
            <TextMonth>Counseling</TextMonth>
          </FirstViewText> 
           
            <Picker
              mode="dropdown"
              placeholder="Select One"
              textStyle={{
                fontSize: 19,
                fontWeight: '400',
                color: '#484848',
                fontFamily: 'FuturaPT-Book',
                marginRight: -widthPercentageToDP(10),
              }}
              note={false}
              iosIcon={
                <ResponsiveImage
                  style={{
                    tintColor: '#000',
                    marginRight: widthPercentageToDP(4.5),
                    marginTop: heightPercentageToDP(0.5),
                    fontSize: 19,
                    fontWeight: '400',
                    color: '#484848',
                    fontFamily: 'FuturaPT-Book',
                  }}
                  source={downarrow}
                  initHeight="10"
                  initWidth="10"
                />
              }
              selectedValue={Value}
              onValueChange={(val) => setValue(val)}>
              <Picker.Item label="January" value="key0" />
              <Picker.Item label="February" value="key1" />
              <Picker.Item label="March" value="key2" />
              <Picker.Item label="April" value="key3" />
              <Picker.Item label="May" value="key4" />
              <Picker.Item label="June" value="key5" />
              <Picker.Item label="July" value="key6" />
              <Picker.Item label="August" value="key7" />
              <Picker.Item label="September " value="key8" />
              <Picker.Item label="October" value="key9" />
              <Picker.Item label="November " value="key10" />
              <Picker.Item label="Filter " value="key11" />
            </Picker>
         
        </MainView>
        <View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#FAF9FF',
              margin: 15,
              // padding: 13,
              // backgroundColor: '#FAF9FF',
              paddingVertical: heightPercentageToDP(4),
              paddingHorizontal: widthPercentageToDP(4.5),
              shadowColor: 'rgba(0,0,0,.1)',
              shadowOffset: {
                width: 0,
                height: 0.1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 3,

              elevation: 0.3,
            }}>
            <SecView
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(0,0,0,.1)',
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(0.1),
                    marginLeft: widthPercentageToDP(1),
                    borderRadius: 50,
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: 'FuturaPT-Bold',
                    }}>
                    1
                  </Text>
                </View>
                <Text
                  style={{
                    // backgroundColor: 'pink',
                    width: widthPercentageToDP(72),
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingBottom: 10,
                    color: '#000',
                    fontFamily: 'FuturaPT-Light',
                    // marginTop: heightPercentageToDP(2),
                  }}>
                  Morbi vel urn et risus efficitur vehicla su. Donec egestas
                  erat.?
                </Text>
              </View>
            </SecView>
            <SecView
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(0,0,0,.1)',
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(0.1),
                    marginLeft: widthPercentageToDP(1),
                    borderRadius: 50,
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: 'FuturaPT-Bold',
                    }}>
                    2
                  </Text>
                </View>
                <Text
                  style={{
                    // backgroundColor: 'pink',
                    width: widthPercentageToDP(72),
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingBottom: 10,
                    color: '#000',
                    fontFamily: 'FuturaPT-Light',
                    // marginTop: heightPercentageToDP(2),
                  }}>
                  Morbi vel urn et risus efficitur vehicla su. Donec egestas
                  erat.?
                </Text>
              </View>
            </SecView>
            <SecView
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(0,0,0,.1)',
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(0.1),
                    marginLeft: widthPercentageToDP(1),
                    borderRadius: 50,
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: 'FuturaPT-Bold',
                    }}>
                    3
                  </Text>
                </View>
                <Text
                  style={{
                    // backgroundColor: 'pink',
                    width: widthPercentageToDP(72),
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingBottom: 10,
                    color: '#000',
                    fontFamily: 'FuturaPT-Light',
                    // marginTop: heightPercentageToDP(2),
                  }}>
                  Morbi vel urn et risus efficitur vehicla su. Donec egestas
                  erat.?
                </Text>
              </View>
            </SecView>
            <SecView
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(0,0,0,.1)',
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(0.1),
                    marginLeft: widthPercentageToDP(1),
                    borderRadius: 50,
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: 'FuturaPT-Bold',
                    }}>
                    4
                  </Text>
                </View>
                <Text
                  style={{
                    // backgroundColor: 'pink',
                    width: widthPercentageToDP(72),
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingBottom: 10,
                    color: '#000',
                    fontFamily: 'FuturaPT-Light',
                    // marginTop: heightPercentageToDP(2),
                  }}>
                  Morbi vel urn et risus efficitur vehicla su. Donec egestas
                  erat.?
                </Text>
              </View>
            </SecView>
            <SecView
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(0,0,0,.1)',
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(0.1),
                    marginLeft: widthPercentageToDP(1),
                    borderRadius: 50,
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: 'FuturaPT-Bold',
                    }}>
                    5
                  </Text>
                </View>
                <Text
                  style={{
                    // backgroundColor: 'pink',
                    width: widthPercentageToDP(72),
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingBottom: 10,
                    color: '#000',
                    fontFamily: 'FuturaPT-Light',
                    // marginTop: heightPercentageToDP(2),
                  }}>
                  Morbi vel urn et risus efficitur vehicla su. Donec egestas
                  erat.?
                </Text>
              </View>
            </SecView>
            <SecView
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(0,0,0,.1)',
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(0.1),
                    marginLeft: widthPercentageToDP(1),
                    borderRadius: 50,
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: 'FuturaPT-Bold',
                    }}>
                    6
                  </Text>
                </View>
                <Text
                  style={{
                    // backgroundColor: 'pink',
                    width: widthPercentageToDP(72),
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingBottom: 10,
                    color: '#000',
                    fontFamily: 'FuturaPT-Light',
                    // marginTop: heightPercentageToDP(2),
                  }}>
                  Morbi vel urn et risus efficitur vehicla su. Donec egestas
                  erat.?
                </Text>
              </View>
            </SecView>
            <SecView
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(0,0,0,.1)',
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(0.1),
                    marginLeft: widthPercentageToDP(1),
                    borderRadius: 50,
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: 'FuturaPT-Bold',
                    }}>
                    7
                  </Text>
                </View>
                <TextMorbi>
                  Morbi vel urn et risus efficitur vehicla su. Donec egestas
                  erat.?
                </TextMorbi>
              </View>
            </SecView>
            <SecView
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(0,0,0,.1)',
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <EighttView>
                  <EightText>8</EightText>
                </EighttView>
                <TextLong>
                  Morbi vel urn et risus efficitur vehicla su. Donec egestas
                  erat.?
                </TextLong>
              </View>
            </SecView>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AdviceFinance');
          }}>
          <MoreeView>
            <Text style={{alignSelf:"center"}}>View More</Text>
            <ResponsiveImage
              style={{
                tintColor: '#000',
                marginTop: heightPercentageToDP(0.2),
              }}
              source={righticon}
              initHeight="8"
              initWidth="8"
            />
          </MoreeView>
        </TouchableOpacity>
        <ButtonView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyResponse');
            }}>
            <Button
              onPress={() => {
                navigation.navigate('Welcomeuser');
              }}
              style={{
                marginTop: heightPercentageToDP(3),
                width: widthPercentageToDP(93),
                marginBottom: heightPercentageToDP(10),
              }}
              name={'Submit Your Question'}
              linear
            />
          </TouchableOpacity>
        </ButtonView>
      </BackgroundImage>
    </KeyboardAwareScrollView>
  );
};
const TextMorbi = styled(Text)({
  width: widthPercentageToDP(72),
  fontSize: 16,
  paddingLeft: 10,
  paddingBottom: 10,
  color: '#000',
  fontFamily: 'FuturaPT-Light',
});
const EighttView = styled(View)({
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: heightPercentageToDP(0.1),
  marginLeft: widthPercentageToDP(1),
  borderRadius: 50,
  borderWidth: 1,
  height: 40,
  width: 40,
});
const EightText = styled(Text)({
  fontSize: 16,
  textAlign: 'center',
  fontFamily: 'FuturaPT-Bold',
});
const TextLong = styled(Text)({
  width: widthPercentageToDP(72),
  fontSize: 16,
  paddingLeft: 10,
  paddingBottom: 10,
  color: '#000',
  fontFamily: 'FuturaPT-Light',
});
const MoreeView = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(3.5),
  alignItems: 'center',
  justifyContent: 'center',
  width: widthPercentageToDP(93),
  backgroundColor: '#F2E9FE',
  padding: 10,
  marginTop: heightPercentageToDP(2),
});
const ButtonView = styled(View)({
  justifyContent: 'center',
  alignItems: 'center',
});
const SecView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const TextMonth = styled(Text)({
  fontSize: 19,
  fontWeight: '400',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const FirstViewText = styled(View)({
  width:widthPercentageToDP(70),
  marginTop: heightPercentageToDP(1),
  marginLeft: widthPercentageToDP(4.5),
// backgroundColor:"pink",
  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const MainView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(5),
  justifyContent: 'space-between',
  // backgroundColor:"red",
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const BackgroundImage = styled(ImageBackground)({
  height: heightPercentageToDP(117),
  // width: widthPercentageToDP(100),
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
  // justifyContent: 'center',
  marginLeft: -widthPercentageToDP(2),
  marginTop: -heightPercentageToDP(0.1),
});

export default MyQuestionAdvice;
