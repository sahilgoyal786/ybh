import React, {Component, useContext} from 'react';
import {
  headerView,
  menu,
  vtngpage4,
  vtngbtn,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
//import { Image } from 'native-base';
import {DraggableGrid} from 'react-native-draggable-grid';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Button from '../../components/button';
import Header from '../../components/header';
import {Toast} from 'native-base';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// interface VotingPageProps {

// }

// interface VotingPageState {
//   data: { key: string, name: string }[];
// }
class VotingPage extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);

    this.state = {
      userDetail: null,
      data: [
        {name: image1, key: '0', hideView: true},
        {
          name: '',
          key: '19',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },
        {
          name: '',
          key: '18',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },
        {
          name: '',
          key: '17',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },

        {name: image2, key: '1', hideView: true},
        {name: image3, key: '2', hideView: true},
        {
          name: '',
          key: '16',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },
        {
          name: '',
          key: '15',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },

        {
          name: '',
          key: '14',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },
        {name: image4, key: '3', hideView: true},
        {name: image5, key: '4', hideView: true},
        {
          name: '',
          key: '13',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },

        {
          name: '',
          key: '12',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },
        {
          name: '',
          key: '11',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },
        {name: image6, key: '5', hideView: true},
        {name: image7, key: '6', hideView: true},

        {
          name: '',
          key: '10',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },
        {
          name: '',
          key: '9',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },
        {
          name: '',
          key: '8',
          disabledDrag: true,
          disabledReSorted: true,
          hideView: false,
        },
        {name: image8, key: '7', hideView: true},
      ],
    };
  }
  componentDidMount() {
    this.setState({userDetail: this.context});
  }

  render_item(item, votingImagesURLS) {
    return item.hideView === false ? (
      <View
        key={Math.random}
        style={{
          height: widthPercentageToDP(25) - 5,
          width: widthPercentageToDP(25) - 5,
          justifyContent: 'center',
          backgroundColor: 'transparent',
          alignItems: 'center',
        }}
      />
    ) : (
      <Image
        key={Math.random}
        source={{uri: votingImagesURLS[item.key]}}
        style={{
          height: widthPercentageToDP(25) - 5,
          width: widthPercentageToDP(25) - 5,
          justifyContent: 'center',
          resizeMode: 'contain',
          alignItems: 'center',
        }}
      />
    );
  }
  render() {
    const {navigation} = this.props;
    const {votingImagesURLS} = this.props.route.params;
    return (
      <View>
        <Header title="Voting Page" backButton="true" />
        <View
          style={{
            marginTop: 10,
            height: heightPercentageToDP(100) - 330,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <DraggableGrid
            numColumns={4}
            renderItem={(item) => {
              return this.render_item(item, votingImagesURLS);
            }}
            onDragStart={this.onDragStart}
            data={this.state.data}
            onDragRelease={(data) => {
              this.setState({data}); // need reset the props data sort after drag release
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            paddingLeft: 40,
            position: 'relative',
            marginLeft: -widthPercentageToDP(8),
            marginTop: -heightPercentageToDP(2),
          }}
          onPress={() => {
            let order = this.state.data;
            let paths = [];
            let scores = [];
            let index = 0;
            order.forEach((photo) => {
              if (votingImagesURLS[photo.key]) {
                paths.push(votingImagesURLS[photo.key]);
                scores.push(votingImagesURLS.length - index);
                index++;
              }
            });
            // console.log(votes);
            network.getResponse(
              EndPoints.castVote,
              'POST',
              {paths, scores},
              this.state.userDetail.token,
              (response) => {
                // console.log(response);
                Toast.show({text: response.message, duration: 5000});
                this.props.navigation.navigate('Home');
              },
              (error) => {
                // console.log('error', error.response);
              },
            );
          }}>
          <ImagesView
            source={vtngbtn}
            initHeight="135"
            initWidth="140"
            borderRadius={5}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 100,
    backgroundColor: 'blue',
  },
  wrapper: {
    paddingTop: 100,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  item: {
    // width: 100,
    // height: 100,
    // borderRadius: 8,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderTopEndRadius: 60,
    // borderBottomEndRadius: 100,
  },
  item_text: {
    fontSize: 40,
    color: '#FFFFFF',
  },
});

const ImagesView = styled(ResponsiveImage)({
  // marginLeft: 5,
  borderRadius: 0,
});

export default VotingPage;
