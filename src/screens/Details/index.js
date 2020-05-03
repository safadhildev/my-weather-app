import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, SafeAreaView} from 'react-native';
import Search from '../../components/common/Search';
import Button from '../../components/common/Button';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {kelvinToCelcius} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment-timezone';
import color from '../../components/common/Color';
import icon from '../../components/common/Icon';
import DetailsHeader from '../../components/DetailsHeader';

const Details = ({route, navigation}) => {
  const {currentData, forecastData} = route.params;

  const [forecastGroup, setForecastGroup] = useState([]);

  useEffect(() => {
    groupForcasts();
  }, []);

  const groupForcasts = () => {
    let groups = {};
    for (let i = 0; i < forecastData.length; i++) {
      const groupDate = forecastData[i].date;
      if (!groups[groupDate]) {
        groups[groupDate] = [];
      }
      groups[groupDate].push(forecastData[i]);
    }

    const newForecastArray = [];
    for (let groupDate in groups) {
      newForecastArray.push({date: groupDate, lists: groups[groupDate]});
    }
    setForecastGroup(newForecastArray);
  };

  const backgroundColor = () => {
    switch (currentData.main) {
      case 'Clouds':
        return color.linearGrey;
      case 'Thunderstorm':
        return color.linearBlueDarker;
      case 'Rain':
        return color.linearBlueDarker;
      case 'Clear':
        return color.linearYellow;
      case 'Drizzle':
        return color.linearBlue;
      default:
        return color.linearGreen;
    }
  };

  console.log('group', forecastGroup[2]);

  const renderDailyForecast = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 5,
          borderRadius: 10,
          paddingVertical: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: '#fff'}}>
            {moment(item.date).format('ddd')}, {item.date}
          </Text>
        </View>
        <FlatList
          data={item.lists}
          renderItem={(item) => renderItems(item)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  };

  const renderItems = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 5,
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 4,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.time}</Text>
          <Text>{item.main}</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={{justifyContent: 'center', paddingHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {item.temperature}°C
          </Text>
        </View>
        <View>
          <Image
            source={renderIcon(item.main)}
            style={{width: 50, height: 50, tintColor: '#212121'}}
          />
        </View>
      </View>
    );
  };

  const renderIcon = (condition) => {
    switch (condition) {
      case 'Clouds':
        return icon.clouds;
      case 'Thunderstorm':
        return icon.thunderstorm;
      case 'Rain':
        return icon.rain;
      case 'Clear':
        return icon.clear;
      case 'Drizzle':
        return icon.drizzle;
      default:
        return icon.clear;
    }
  };

  return (
    <LinearGradient colors={backgroundColor()} style={styles.detailsBody}>
      <View
        style={{
          flex: 1,
          paddingTop: 40,
        }}>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <Button
            title="Back"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <FlatList
          ListHeaderComponent={<DetailsHeader currentData={currentData} />}
          showsVerticalScrollIndicator={false}
          data={forecastGroup}
          renderItem={(item) => renderDailyForecast(item)}
          style={{
            flexGrow: 1,
            marginHorizontal: 20,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    </LinearGradient>
  );
};

export default Details;
