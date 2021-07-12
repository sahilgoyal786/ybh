import React from 'react';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {PlanBackground, PlanTop, PlanBottom} from '../../common/images';
import {Text, View, Image, ActivityIndicator, Linking} from 'react-native';
import styled from 'styled-components/native';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import {Toast} from 'native-base';
class Plans extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: null,
      subscription: false,
      paymenturl: 'https://paystack.com/pay/g6v29kr7ty',
    };
  }
  componentDidMount() {
    const user = this.context;
    if (user.length) {
      this.updateAccessToken(
        user[0].token,
        user[0].user.subscription_is_active,
      );
    }
  }
  updateAccessToken = (userToken, subscription) => {
    this.setState({token: userToken, subscription: subscription});
  };
  redirectToPayment = () => {
    const {navigation} = this.props;
    if (this.state.subscription) {
      navigation.navigate('Welcomeuser');
    } else {
      Linking.openURL(this.state.paymenturl).catch((err) =>
        console.error('Error', err),
      );
    }
  };
  checkpaymentStatus = () => {
    const user = this.context;
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.checkSubscriptions,
        'GET',
        {},
        this.state.token,
        (response) => {
          this.setState({
            subscription: response.subscription,
            isLoading: false,
          });
          if (response.subscription) {
            user[0].user.subscription_is_active = response.subscription;
            Toast.show({
              text: `You have puchased Subscription plan.`,
              type: 'success',
            });
          } else {
            Toast.show({
              text: `You don't have any Subscription plan.`,
              type: 'danger',
            });
          }
        },
        (error) => {
          this.setState({isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({isLoading: false});
      console.log('exception', exception);
    }
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, height: '100%'}}>
        {this.state.isLoading && (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00000080',
              zIndex: 9999,
            }}
          />
        )}
        <Image
          source={PlanBackground}
          style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
          resizeMode="contain"></Image>
        <BoxView>
          <TopImage source={PlanTop} resizeMode="contain"></TopImage>
          <ViewBox>
            <Heading>GET YBH Match Making</Heading>
            <PremiumTag>Premium</PremiumTag>
            <PriceBoxWrap>
              <OfferTag>$40 OFF</OfferTag>
              <DiscountPrice>$4.99</DiscountPrice>
              <MainPrice>
                $2.99 <MainPriceSmall>/month</MainPriceSmall>
              </MainPrice>
            </PriceBoxWrap>
            {this.state.subscription && (
              <Button
                onPress={() => navigation.navigate('PhotoVerification')}
                style={{width: '100%', marginTop: 25}}
                name={'Continue'}
                linear
              />
            )}
            {!this.state.subscription && (
              <Button
                onPress={() => this.redirectToPayment()}
                style={{width: '100%', marginTop: 25}}
                name={'Buy Now!'}
                linear
              />
            )}
            <Text
              style={{marginTop: 5, padding: 5}}
              onPress={() => navigation.navigate('Welcomeuser')}>
              Go Back
            </Text>
            <ReloadBtn onPress={() => this.checkpaymentStatus()}>
              Refresh Payment Status
            </ReloadBtn>
          </ViewBox>
          <BottomImage source={PlanBottom} resizeMode="contain"></BottomImage>
        </BoxView>
      </View>
    );
  }
}
const ReloadBtn = styled(Text)({
  padding: 0,
  paddingLeft: 25,
  paddingRight: 25,
  borderRadius: 20,
  marginTop: 10,
  height: 40,
  lineHeight: 40,
  backgroundColor: '#7b43a5',
  color: '#fff',
  fontSize: 16,
});
const TopImage = styled(Image)({
  width: '100%',
  height: 189,
});
const BottomImage = styled(Image)({
  width: '100%',
  height: 50,
  marginTop: -1,
});
const BoxView = styled(View)({
  marginLeft: 25,
  marginRight: 25,
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
const ViewBox = styled(View)({
  backgroundColor: 'white',
  paddingLeft: 15,
  paddingRight: 15,
  margin: 0,
  alignItems: 'center',
  width: '100%',
});
const Heading = styled(Text)({
  fontSize: 20,
  marginBottom: 10,
  alignItems: 'center',
  color: '#7b43a5',
  fontWeight: 700,
});
const PremiumTag = styled(Text)({
  color: '#fff',
  backgroundColor: '#f9bc16',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 6,
  paddingBottom: 6,
  borderTopRightRadius: 15,
  borderBottomRightRadius: 15,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 25,
  textTransform: 'uppercase',
});
const PriceBoxWrap = styled(View)({
  padding: 15,
  position: 'relative',
  border: '1px solid #7b43a5',
  width: '100%',
  marginTop: 30,
  alignItems: 'center',
  borderRadius: 10,
});
const OfferTag = styled(Text)({
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 5,
  paddingBottom: 5,
  color: '#fff',
  backgroundColor: '#7b43a5',
  fontWeight: 700,
  position: 'absolute',
  top: -15,
  borderRadius: 15,
});
const DiscountPrice = styled(Text)({
  marginTop: 10,
  fontSize: 25,
  color: '#484848',
});
const MainPrice = styled(Text)({
  fontSize: 30,
  color: '#f9bc16',
  fontWeight: 700,
});
const MainPriceSmall = styled(Text)({
  fontSize: 16,
  color: '#484848',
  fontWeight: 500,
});

export default Plans;
