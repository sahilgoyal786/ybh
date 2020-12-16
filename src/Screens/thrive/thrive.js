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
import {TextInput} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
//import { Image } from 'native-base';

const Thrive = ({route, navigation}) => {
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [blogs, setBlogs] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
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
    let params = {page, keyword};
    // console.log(page, totalPages);
    if (totalPages > -1 && page > totalPages) {
      return;
    } else {
      params['page'] = page + 1;
      setPage(page + 1);
    }
    if (selectedCategory !== 0 && categories[selectedCategory - 1]) {
      // console.log(
      //   selectedCategory - 1,
      //   categories[selectedCategory - 1].category,
      // );
      params['category'] = categories[selectedCategory - 1].category;
    }
    // console.log(params);
    try {
      network.getResponse(
        EndPoints.blogs,
        'POST',
        params,
        userDetail.token,
        (response) => {
          // console.log('(response.categories)', response);
          if (response.categories && response.blogs.current_page == 1) {
            setCategories(response.categories);
          }
          if (response.category) {
            // console.log('category', response.category);
          }
          response = response.blogs;
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].url = response.data[i].url;
            tempBlogsArray.push(response.data[i]);
          }
          if (response.current_page == 1) {
            setTotalPages(response.last_page);
            setBlogs(tempBlogsArray);
          } else {
            setBlogs(blogs.concat(tempBlogsArray));
          }
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
  React.useEffect(() => {
    // console.log(page, 'page-useEffect');
    if (page == 0) {
      setTotalPages(-1);
      setBlogs([]);
      LoadBlogs();
    }
  }, [page]);

  React.useEffect(() => {
    // console.log(selectedCategory, 'selectedCategory-useEffect');
  }, [selectedCategory]);

  const renderCategories = () => {
    if (categories.length) {
      let categoriesTemp = [{category: 'All'}].concat(categories);
      return (
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: 'row',
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: 'white',
            marginBottom: 5,
          }}>
          {categoriesTemp.map((item, index) => {
            // console.log(index);
            return (
              <Category
                key={index.toString()}
                style={
                  index == selectedCategory
                    ? {
                        color: 'white',
                      }
                    : {
                        backgroundColor: '#FFFFFFFF',
                      }
                }
                onPress={() => {
                  setSelectedCategory(index);
                  setPage(0);
                }}>
                {item.category}
              </Category>
            );
          })}
        </ScrollView>
      );
    } else {
      return <></>;
    }
  };

  const performSearch = () => {
    setPage(0);
  };

  return (
    <FlatList
      // keyboardShouldPersistTaps="handled"
      keyExtractor={() => Math.random().toString()}
      bounces={false}
      onEndReached={() => {
        // console.log(blogs.length, totalPages, page < totalPages);
        if (blogs.length && totalPages && page < totalPages) {
          console.log(page, totalPages);
          setLoadingMore(true);
          LoadBlogs();
        }
      }}
      onEndReachedThreshold={0.5}
      contentContainerStyle={
        (blogs.length
          ? {}
          : {
              flex: 1,
            },
        Platform.OS == 'ios'
          ? {
              minHeight: heightPercentageToDP(100) - 80,
            }
          : {
              minHeight: heightPercentageToDP(100) - 35,
            })
      }
      data={blogs}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        loadingMore ? (
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#A073C4" />
          </View>
        ) : (
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Nothing to show.</Text>
          </View>
        )
      }
      ListHeaderComponent={
        <View style={{backgroundColor: 'white'}}>
          <Header title="Thrive" backButton="true" />
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15,
              borderWidth: 1,
              borderColor: '#F4F5F6',
              shadowColor: '#F4F5F6',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 2,
              marginBottom: 20,
            }}>
            <TextInput
              style={{
                height: 60,
                fontSize: 18,
                flexGrow: 1,
                paddingLeft: 15,
              }}
              onChangeText={(text) => setKeyword(text)}
              onSubmitEditing={() => performSearch()}
            />
            <FontAwesome5Icon
              name={loadingMore ? 'spinner' : 'search'}
              style={{
                width: 40,
                fontSize: 17,
                textAlign: 'center',
                lineHeight: 60,
                color: 'grey',
                fontWeight: '300',
              }}
              onPress={() => performSearch()}
            />
          </View>
          {renderCategories()}
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
            bottom: -120,
            zIndex: -10,
          }}>
          <Image
            source={bottomCurve}
            style={{
              width: widthPercentageToDP(100),
              height: 200,
            }}
            resizeMode="contain"
          />
          {blogs.length > 0 && loadingMore && (
            <ActivityIndicator
              color="#A073C4"
              style={{
                top: 70,
                position: 'absolute',
                alignSelf: 'center',
              }}
            />
          )}
        </View>
      }
    />
  );
};

const Category = styled(Text)({
  padding: 10,
  backgroundColor: '#F9BC16',
  marginRight: 20,
  marginBottom: 10,
  borderRadius: 8,
  textTransform: 'capitalize',
  color: 'grey',
});

export default Thrive;
