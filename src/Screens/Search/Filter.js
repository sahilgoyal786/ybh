import React from 'react';
import {bottomCurve, bottomCurveDark} from '../../common/images';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../components/header';
import storage from '../../components/apis/storage';
import {RangeSlider} from '@sharcoux/slider';
import {Label} from 'native-base';
import GlobalStyles, {GlobalImages} from '../../common/styles';
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        age: [18, 90],
        gender: '',
        children: '',
        education: '',
        religion: '',
        partnerheight: [140, 200],
        build: '',
        ethnicity: '',
        smoker: '',
        religiosity: '',
        family: '',
      },
    };
  }
  componentDidMount() {
    storage.getData('filter').then((filter) => {
      filter = JSON.parse(filter);
      if (filter) {
        this.setState({filter: filter});
      }
    });
  }
  updateStateValue = (name, value) => {
    this.state.filter[name] = value;
    this.setState(this.state);
    storage.setData('filter', JSON.stringify(this.state.filter));
  };
  mapLabel = (item, index) => {
    let value = this.state.filter[item.name]
      ? this.state.filter[item.name][index]
      : index == 0
      ? item.fromValue
      : item.toValue;
    eval(index == 0 ? item.fromLabel : item.toLabel);
    return label;
  };
  resetFilter = () => {
    let oldFilter = {
      age: [18, 90],
      gender: '',
      children: '',
      education: '',
      religion: '',
      partnerheight: [140, 200],
      build: '',
      ethnicity: '',
      smoker: '',
      religiosity: '',
      family: '',
    };
    this.setState({filter: oldFilter});
    storage.setData('filter', JSON.stringify(oldFilter));
  };
  render() {
    const filters = [
      {
        type: 'range_slider',
        name: 'age',
        heading: 'Now tell us who you one looking for',
        fromLabel: 'label = value + " Years"',
        toLabel: 'label = value + " Years"',
        fromValue: 18,
        toValue: 90,
      },
      {
        type: 'text',
        name: 'gender',
        heading: 'Gender',
        values: ['Male', 'Female', "Don't Care"],
      },
      {
        type: 'text',
        name: 'children',
        heading: 'Should the person have children?',
        values: ['Yes', 'No', "Don't Care"],
      },
      {
        type: 'text',
        name: 'education',
        heading: 'Educational level of the person?',
        values: [
          'Secondary school',
          'Bachelor Degree',
          'Masters',
          'PhD',
          "Don't Matter",
        ],
      },
      {
        type: 'text',
        name: 'religion',
        heading: 'Should the person be the same religion as you?',
        values: ['Yes', 'No'],
      },
      {
        type: 'range_slider',
        name: 'partnerheight',
        heading: 'Ideal partners height?',
        fromLabel:
          "label = '>'+Math.floor(value/30.84) +\"' \"+ Math.floor(value/2.54) % 12 +  '\" - ' + value + 'cm'",
        toLabel:
          "label = '<'+Math.floor(value/30.84) + \"' \" + Math.floor(value/2.54) % 12 +  '\" - ' + value + 'cm'",
        fromValue: 140,
        toValue: 200,
      },
      {
        type: 'text',
        name: 'build',
        heading: 'Ideal build?',
        values: [
          'Slim',
          'Average',
          'Athletic',
          'Large',
          'Few Extra Kg',
          "Don't Care",
        ],
      },
      {
        type: 'text',
        name: 'ethnicity',
        heading: 'Ideal complexion?',
        values: ['Black', 'Mixed Race', 'Asian', 'White', 'Arab', "Don't Care"],
      },
      {
        type: 'text',
        name: 'smoker',
        heading: 'Are you okay with a smoker?',
        values: ['Yes', 'No', "Don't Care"],
      },
      {
        type: 'text',
        name: 'religiosity',
        heading: 'Should the person be practising their religion?',
        values: ["Don't Care", 'Yes', 'Moderately'],
      },
      {
        type: 'text',
        name: 'family',
        heading: 'What size of family should your partner have?',
        values: ['Large Family', 'Small', "Don't Care"],
      },
    ];
    const filterLists = [];
    filters.forEach((item, index) => {
      if (item.type == 'text') {
        var itemValues = [];
        item.values.forEach((innerItem, innerIndex) => {
          itemValues.push(
            <TouchableWithoutFeedback
              onPress={() => this.updateStateValue(item.name, innerItem)}
              key={innerIndex}>
              <FValue
                style={
                  this.state.filter[item.name] == innerItem
                    ? {
                        ...GlobalStyles.whiteTextColor,
                        ...GlobalStyles.primaryBackgroundColor,
                        ...GlobalStyles.borderColor,
                      }
                    : {}
                }>
                {innerItem}
              </FValue>
            </TouchableWithoutFeedback>,
          );
        });
        filterLists.push(
          <FilterWrap key={index}>
            <Heading>{item.heading}</Heading>
            <DataWrap>{itemValues}</DataWrap>
            <BottomLineWrap></BottomLineWrap>
          </FilterWrap>,
        );
      } else if (item.type == 'range_slider') {
        filterLists.push(
          <FilterWrap key={index}>
            <Heading>{item.heading}</Heading>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text
                style={{
                  ...GlobalStyles.secondaryTextColor,
                  flex: 1,
                  justifyContent: 'flex-start',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                {this.mapLabel(item, 0)}
              </Text>
              <Text
                style={{
                  ...GlobalStyles.secondaryTextColor,
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                {this.mapLabel(item, 1)}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <RangeSlider
                range={this.state.filter[item.name]}
                style={{
                  width: '100%',
                  height: 40,
                  paddingVertical: 30,
                  marginHorizontal: 20,
                }}
                minimumValue={item.fromValue}
                maximumValue={item.toValue}
                step={1}
                inboundColor="#7b43a5"
                slideOnTap={true}
                thumbStyle={{padding: 5}}
                trackHeight={2}
                onValueChange={(value) => {
                  if (
                    this.state.filter[item.name][0] != value[0] ||
                    this.state.filter[item.name][1] != value[1]
                  ) {
                    this.updateStateValue(item.name, value);
                  }
                }}
              />
            </View>
            <BottomLineWrap></BottomLineWrap>
          </FilterWrap>,
        );
      }
    });
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
        <Header title="Filter" backButton="true" showRightDrawer={false} />
        <Text
          onPress={() => this.resetFilter()}
          style={{
            ...GlobalStyles.secondaryTextColor,
            padding: 5,
            position: 'absolute',
            right: 10,
            top: 50,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Reset
        </Text>
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{padding: 20}}
          contentContainerStyle={{paddingBottom: 40}}>
          {filterLists}
        </ScrollView>
      </View>
    );
  }
}
const FilterWrap = styled(View)({
  flex: 1,
  flexDirection: 'column',
});
const DataWrap = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
});
const FValue = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  ...GlobalStyles.primaryBorderColor,
  ...GlobalStyles.secondaryBackgroundColor,
  fontSize: 16,
  borderWidth: 1,
  padding: 7,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 5,
  marginBottom: 8,
  marginRight: 8,
});
const BottomLineWrap = styled(View)({
  ...GlobalStyles.primaryBorderColor,
  flex: 1,
  borderBottomWidth: 1,
  paddingBottom: 15,
  marginBottom: 15,
});
const Heading = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 18,
  marginBottom: 23,
  alignItems: 'center',
  fontWeight: 600,
});
export default Filter;
