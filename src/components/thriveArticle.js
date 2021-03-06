import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageWithBorder from '../components/imageWithBorder';
import {image15, profile, calendar} from '../common/images';
import ResponsiveImage from 'react-native-responsive-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import GlobalStyles from '../common/styles';
let size = 60;

const ThriveArticle = ({article = {}, compact, navigate}) => {
  size = compact ? 60 : 100;
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('Thrivedetails', {article});
      }}>
      <View style={styles.wrapper}>
        {article.file && article.file.url != '' ? (
          <ImageWithBorder
            src={{uri: article.file.url}}
            height={size}
            width={size}
          />
        ) : (
          <ImageWithBorder src={image15} height={size} width={size} />
        )}
        <View style={textWrapperStyles(size)}>
          <Text
            style={compact ? styles.title : styles.title_large}
            numberOfLines={2}>
            {article.title}
          </Text>
          {compact == false && (
            <View style={{alignSelf: 'flex-start'}}>
              <Category>{article.category}</Category>
            </View>
          )}
          <Text
            style={compact ? styles.text_content : styles.text_content_large}
            numberOfLines={compact ? 4 : 4}>
            {article.content.replace(/(<([^>]+)>)/gi, '')}
          </Text>
          {!compact ? (
            <View style={{justifyContent: 'flex-start'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'gray',
                    marginTop: 5,
                  }}>
                  <FontAwesome5Icon name="calendar-alt" />{' '}
                  {article.created_at_formatted}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const textWrapperStyles = function (size) {
  return {
    ...GlobalStyles.secondaryBackgroundColor,
    ...GlobalStyles.primaryBorderColor,
    ...GlobalStyles.secondaryTextColor,
    fontSize: 12,
    borderRadius: 5,
    marginLeft: (size - 60) / 2 + 20,
    marginTop: -(size - 60 + 70),
    zIndex: -10,
    paddingLeft: (size - 60) / 2 + 60,
    paddingTop: 7,
    paddingRight: 15,
    paddingBottom: 10,
    fontFamily: 'FuturaPT-Medium',
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  };
};
const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    color: '#9A6FC0',
    fontSize: 11,
  },
  title: {
    ...GlobalStyles.primaryTextColor,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'FuturaPT-Medium',
  },
  title_large: {
    ...GlobalStyles.primaryTextColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'FuturaPT-Medium',
  },
  text_content: {
    ...GlobalStyles.secondaryTextColor,
    fontSize: 12,
  },
  text_content_large: {
    ...GlobalStyles.secondaryTextColor,
    fontSize: 14,
  },
  wrapper: {
    marginTop: 0,
    marginLeft: 10,
    paddingTop: 10,
  },
});

const Category = styled(Text)({
  padding: 4,
  paddingLeft: 14,
  paddingRight: 14,
  backgroundColor: '#FBEA76',
  fontSize: 12,
  marginTop: 5,
  marginBottom: 5,
  borderRadius: 8,
  textTransform: 'capitalize',
  color: 'grey',
});

export default ThriveArticle;
