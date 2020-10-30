import React, {Component} from 'react';
//import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {bottomCurve} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
//import { ScrollView} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import Header from '../../components/header';
import ThriveArticle from '../../components/thriveArticle';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
//import { Image } from 'native-base';

const Thrive = ({route, navigation}) => {
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [blogs, setBlogs] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState();
  const [page, setPage] = React.useState(1);
  const userDetail = React.useContext(userDetailContext);
  const renderItem = ({item, index}) => (
    <ListItem
      key={index + ''}
      containerStyle={{
        padding: 0,
        marginRight: 20,
        marginLeft: 5,
        marginBottom: 20,
        backgroundColor: 'transparent',
      }}>
      <ThriveArticle
        article={item}
        compact={false}
        navigate={navigation.navigate}
      />
    </ListItem>
  );

  const LoadBlogs = () => {
    const tempBlogsArray = [];
    setLoadingMore(true);
    try {
      network.getResponse(
        EndPoints.blogs + '?page=' + page,
        'GET',
        {},
        userDetail.token,
        (response) => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].url = response.data[i].url;
            tempBlogsArray.push(response.data[i]);
          }
          if (page == 1) {
            setTotalPages(response.last_page);
          }
          setBlogs(blogs.concat(tempBlogsArray));
          setPage(page + 1);
          setLoadingMore(false);
        },
        (error) => {
          console.log('error', error);
          setLoadingMore(false);
        },
      );
    } catch (exception) {
      console.log('exception', exception);
    }
  };
  React.useEffect(() => {
    LoadBlogs();
  }, []);

  return (
    <FlatList
    bounces={false}
      onEndReached={() => {
        if (blogs.length && totalPages && page <= totalPages) {
          LoadBlogs();
        }
      }}
      onEndReachedThreshold={blogs.length ? 0.5 : 0}
      contentContainerStyle={
        (blogs.length
          ? {}
          : {
              flex: 1,
            },
        {
          minHeight: heightPercentageToDP(100) - 70,
        })
      }
      data={blogs}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      }
      ListHeaderComponent={
        <View style={{backgroundColor: 'transparent'}}>
          <Header title="Thrive" backButton="true" />
        </View>
      }
      ListFooterComponentStyle={{
        zIndex: -1,
        paddingBottom: 40,
        flex: 1,
        justifyContent: 'flex-end',
      }}
      ListFooterComponent={
        <View
          style={{
            height: 230,
            position: 'absolute',
            bottom: -130,
            zIndex: -10,
          }}>
          {loadingMore && (
            <ActivityIndicator
              color="purple"
              style={{
                marginTop: 100,
                position: 'absolute',
                alignSelf: 'center',
              }}
            />
          )}
          <Image
            source={bottomCurve}
            style={{
              width: widthPercentageToDP(100),
              height: 200,
            }}
            resizeMode="contain"
          />
        </View>
      }
    />
  );
};

export default Thrive;
