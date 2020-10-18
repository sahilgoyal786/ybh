import React, {useState} from 'react';
import {Text, ScrollView, View, ImageBackground,Image} from 'react-native';
import styled from 'styled-components/native';

import ResponsiveImage from 'react-native-responsive-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  welcomepagebackground,
  menu,
  backicon,
  downarrow,
  headerView,botomView
} from '../../common/images';
import {Form, Content, Picker, Container, Icon} from 'native-base';
import {styles} from '../login/login';
import Header from '../../components/header';

const AdviceFinance = () => {
  const navigation = useNavigation();
  const [Value, setValue] = useState('key11');

  return (
    // <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
    //   <BackgroundImage source={welcomepagebackground}>
    <View>
        <Header title="Advice Finance" backButton="true" />
        <BackgroundImage source={botomView}>
        <View  style={{ flex:Platform.OS === 'ios' ? 1 : .69,bottom:30}}>
            <ScrollView >
        <MainView>
          <FirstViewText>
            <TextMonth>Questions</TextMonth>
          </FirstViewText>

          <Picker
            mode="dropdown"
            placeholder="Select One"
            textStyle={{
              fontSize: 19,
              fontWeight: '400',
              color: '#484848',
              fontFamily: 'FuturaPT-Book',
              // marginRight: widthPercentageToDP(10),
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
        <View
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: '#FAF9FF',
            margin: 15,
            padding: 10,
            // backgroundColor: '#FAF9FF',
            paddingVertical: heightPercentageToDP(1.5),
            paddingHorizontal: widthPercentageToDP(4.5),
            shadowColor: 'rgba(0,0,0,.1)',
            shadowOffset: {
              width: 0,
              height: 0.1,
            },
            shadowOpacity: 0.8,
            shadowRadius: 1,

            elevation: 3,
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MyResponse');
                }}>
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
              </TouchableOpacity>
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
                  8
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
                  9
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
                  10
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
                  11
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
        </View>
        </ScrollView>
        </View>
       </BackgroundImage>
      </View>
  );
};
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
  width: widthPercentageToDP(70),
  marginTop: heightPercentageToDP(1),
  marginLeft: widthPercentageToDP(4.5),

  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const MainView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(5),
  justifyContent: 'space-between',
  // backgroundColor:"red"
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const BackgroundImage = styled(ImageBackground)({
  height:Platform.OS === 'ios' ? '89%' : '100%' ,
  bottom:0,
  marginTop:50,
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: "-14%",
  marginLeft:12
});

const WelcomeText = styled(Text)({
  fontSize: 24,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  // justifyContent: 'center',
  marginLeft: widthPercentageToDP(0.1),
  marginTop: -heightPercentageToDP(0.1),
});

export default AdviceFinance;
