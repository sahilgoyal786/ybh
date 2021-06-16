import React from 'react';
import {bottomCurve} from '../../common/images';
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

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        age: [18, 60],
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
  render() {
    const filters = [
      {
        type: 'range_slider',
        name: 'age',
        heading: 'Now tell us who you one looking for',
        fromLabel: 'label = value + " Years"',
        toLabel: 'label = value + " Years"',
        fromValue: 18,
        toValue: 60,
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
        heading: 'Education level of the person?',
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
        heading: 'Should the person to same religion?',
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
        heading: 'Religiosity should the person be practicing?',
        values: ["Don't Care", 'Yes', 'Moderately'],
      },
      {
        type: 'text',
        name: 'family',
        heading: 'Family are you okay with your partner having?',
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
                        backgroundColor: '#7b43a5',
                        borderColor: '#7b43a5',
                        color: '#fff',
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
                  flex: 1,
                  justifyContent: 'flex-start',
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                {this.mapLabel(item, 0)}
              </Text>
              <Text style={{fontSize: 18, fontWeight: '700'}}>
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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          source={bottomCurve}
          style={{
            width: widthPercentageToDP(100),
            height: 200,
            position: 'absolute',
            bottom: -100,
          }}
          resizeMode="contain"></Image>
        <Header title="Filter" backButton="true" showRightDrawer={false} />
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
  fontSize: 16,
  color: '#484848',
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 7,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 5,
  marginBottom: 8,
  marginRight: 8,
});
const BottomLineWrap = styled(View)({
  flex: 1,
  borderBottomWidth: 1,
  borderColor: '#ddd',
  paddingBottom: 15,
  marginBottom: 15,
});
const Heading = styled(Text)({
  fontSize: 20,
  marginBottom: 25,
  alignItems: 'center',
  color: '#484848',
  fontWeight: 700,
});
export default Filter;
