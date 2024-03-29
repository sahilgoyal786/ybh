import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
  // TouchableOpacity,
} from 'react-native';
import {background, slider1, slider2, slider3} from '../../common/images';
import styled from 'styled-components/native';
import Button from '../../components/button';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {LightPink} from '../../common/colors';
import {Purple} from '../../common/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ResponsiveImage from 'react-native-responsive-image';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import storage from '../../components/apis/storage';
import network from '../../components/apis/network';
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 0,
      // tokenCheck: false,
    };
    // this.checkToken();
  }
  // checkToken = () => {};
  data = [
    {
      image: slider1,
    },
    {
      image: slider2,
    },
    {
      image: slider3,
    },
  ];
  _renderItemWithParallax = ({item, index}) => {
    return (
      <View style={[styles.slide]}>
        <ResponsiveImage
          source={item.image}
          initHeight="300"
          initWidth="400"
          borderRadius={15}></ResponsiveImage>
        <Text
          style={{
            fontFamily: 'Futura-Medium',
            color: 'white',
            textAlign: 'center',
            width: wp(80),
          }}>
          {item.description}
        </Text>
      </View>
    );
  };
  _renderDots = (activeIndex, total, context) => {
    // console.log(total, 'total', activeIndex);
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={this.data}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            const value =
              index === activeIndex
                ? [LightPink, Purple]
                : ['rgba(255,0,0,0)', 'rgba(255,0,0,0)'];
            return (
              <LinearGradient
                key={index}
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 12,
                  marginLeft: wp(2),
                  borderWidth: 1,
                  borderColor: LightPink,
                }}
                colors={value}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.5, y: 0.1}}
                locations={[0.1, 0.9]}
              />
            );
          }}
        />
      </View>
    );
  };
  render() {
    const {navigation} = this.props;
    return (
      <BackgroundImage source={background}>
        <SafeAreaView style={{flex: 1}}>
          <Top>
            <Carousel
              autoplay
              loop
              data={this.data}
              renderItem={this._renderItemWithParallax}
              sliderWidth={wp(100)}
              itemWidth={wp(100)}
              hasParallaxImages={true}
              inactiveSlideScale={0.94}
              containerCustomStyle={styles.slider}
              onSnapToItem={(index) => this.setState({Tab: index})}
              layout={'default'}
              layoutCardOffset={10}
            />
            <Pagination
              dotsLength={this.data.length}
              activeDotIndex={this.state.Tab}
              renderDots={this._renderDots}
            />
            {/* {!this.state.tokenCheck && (
              <ActivityIndicator
                size="large"
                animating={true}
                color="#FFF"
                style={{marginTop: 120}}
              />
            )} */}
          </Top>
          {/* {this.state.tokenCheck && ( */}
          <Bottom>
            <Button
              style={{fontfamily: 'Futura-Medium'}}
              onPress={() => {
                navigation.navigate('Signup');
              }}
              name={'Sign up'}
              linear
            />
            <Button
              name={'Login'}
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
          </Bottom>
          {/* )} */}
        </SafeAreaView>
      </BackgroundImage>
    );
  }
}
const BackgroundImage = styled(ImageBackground)({
  flex: 1,
});
const Top = styled.View({
  flex: 1,
  // justifyContent: 'center',
  alignItems: 'center',
});
const Bottom = styled.View({
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const styles = StyleSheet.create({
  slider: {
    flexGrow: 0,
  },
  slide: {
    alignItems: 'center',
  },

  dotContainerStyle: {
    marginTop: -hp(1),
    width: wp(9.5),
  },

  activeDotStyle: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: LightPink,
  },
  InactiveDotStyle: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: LightPink,
  },
});

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <Welcome {...props} navigation={navigation} />;
}
