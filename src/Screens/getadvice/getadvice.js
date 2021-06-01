import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Textarea, Form, Toast} from 'native-base';
import {bottomCurve} from '../../common/images';
import * as images from '../../common/images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import Button from '../../components/button';
import {Dialog} from 'react-native-simple-dialogs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const GetAdvice2 = () => {
  const navigation = useNavigation();
  const [dialog, setDialog] = useState(false);
  const [text, setText] = useState('Describe your situation...');
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [isLoading, setisLoading] = useState(false);
  const categories = [
    'Finance',
    'Sexual',
    'Marital',
    'Entrepreneurs',
    'Single',
    'General',
    'Food',
    'Tech',
    'Health',
    'Beauty',
  ];

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
      <Header title="Get Advice" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 0}}
        contentContainerStyle={{paddingBottom: 60}}>
        {categories.map((cat) => {
          return (
            <TouchableOpacity
              key={Math.random().toString()}
              onPress={() => {
                navigation.navigate('AdviceCategory', {Category: cat});
              }}>
              <ImagesWelcome>
                <Image
                  source={images['advice_icons'][cat.toLowerCase()]}
                  style={{height: 40, width: 40}}
                />
                <Text style={styles.categoryHeading}>{cat}</Text>
                <FontAwesome5Icon
                  name="chevron-right"
                  style={styles.rightArrow}
                />
              </ImagesWelcome>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const ImagesWelcome = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: 15,
  backgroundColor: '#FFF',
  marginTop: 2,
  marginBottom: 2,
  borderRadius: 4,
  padding: 20,
  flex: 1,
  borderColor: '#F4F5F6',
  shadowColor: '#F4F5F6',
  shadowOpacity: '1',
  shadowRadius: 2,
  elevation: '2',
});

const styles = StyleSheet.create({
  categoryHeading: {
    fontSize: 20,
    fontFamily: 'FuturaPT-Book',
    flex: 1,
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: 30,
  },
  rightArrow: {
    fontSize: 24,
    color: 'purple',
  },
});
export default GetAdvice2;
