import React, {useState} from 'react';
import {Text, View, Image, ActivityIndicator, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  bottomCurve,
  stick2,
  compatibility_meter_bg,
  left_pin,
  right_pin,
} from '../../common/images';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import RNSpeedometer from '../../components/speedometer/compatibility';
import Button from '../../components/button';
import {Dialog} from 'react-native-simple-dialogs';
import {Textarea, Toast} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {ActionTypes} from '../../redux/ActionTypes';
import GlobalStyles, {GlobalImages} from '../../common/styles';
const CompatibilityTestResult = ({route, navigation}) => {
  const [score, setScore] = useState(50);
  const [other_user, setOtherUser] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);

  const test_id =
    typeof route.params.test_id !== 'undefined' ? route.params.test_id : null;
  console.log({test_id});

  React.useEffect(() => {
    setIsLoading(true);
    network.getResponse(
      EndPoints.compatibilityTestResult,
      'POST',
      {test_id},
      userDetail.token,
      (response) => {
        setIsLoading(false);
        console.log(response);
        if (response.score) {
          setScore(parseFloat(response.score));
          setOtherUser(response.other_user);
          setCategory(response.category);
        }
      },
      (response) => {
        setIsLoading(false);
        console.log(response);
      },
    );
  }, []);

  return (
    <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
      <Image
        source={GlobalImages.footer}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Compatibility Score" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 60}}>
        <View>
          <RNSpeedometer
            needleImage={stick2}
            value={score == null ? 50 : score}
            size={600}
            background={compatibility_meter_bg}
          />
          <View style={{alignItems: 'center'}}>
            {isLoading ? (
              <ActivityIndicator size="large" color="purple" />
            ) : (
              <>
                <Text
                  style={{
                    ...GlobalStyles.secondaryTextColor,
                    fontSize: 24,
                    marginTop: 20,
                  }}>
                  Compatibility Score
                </Text>

                <Text
                  style={{
                    ...GlobalStyles.customTextColor,
                    fontSize: 35,
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>
                  {score}%
                </Text>
                <Text
                  style={{
                    ...GlobalStyles.secondaryTextColor,
                    textTransform: 'capitalize',
                    marginTop: 10,
                    fontSize: 18,
                  }}>
                  For: {category && category.replace('_', ' ')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      ...GlobalStyles.secondaryTextColor,
                      padding: 10,
                      fontSize: 20,
                      flex: 1,
                      textAlign: 'center',
                      textTransform: 'capitalize',
                    }}>
                    You
                  </Text>
                  <Text
                    style={{
                      ...GlobalStyles.secondaryTextColor,
                      padding: 10,
                      paddingHorizontal: 0,
                      fontSize: 20,
                      flex: 1,
                      textAlign: 'center',
                      textTransform: 'capitalize',
                    }}>
                    {' '}
                    &{' '}
                  </Text>
                  <Text
                    style={{
                      ...GlobalStyles.secondaryTextColor,
                      padding: 10,
                      fontSize: 20,
                      flex: 1,
                      textAlign: 'center',
                      textTransform: 'capitalize',
                    }}>
                    {other_user && other_user}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const SecView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomWidth: 0.7,
  borderBottomColor: 'rgba(0,0,0,.1)',
  margin: 10,
  marginBottom: 10,
  paddingBottom: 15,
});

export default CompatibilityTestResult;
