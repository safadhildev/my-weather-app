import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {kelvinToCelcius} from '../../uitls';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment-timezone';

const cloud = require('../../../assets/weathers/cloud.png');
const drizzle = require('../../../assets/weathers/drizzle.png');
const thunder = require('../../../assets/weathers/lighting.png');
const sunny = require('../../../assets/weathers/sunny-day.png');
const mostlyCloudy = require('../../../assets/weathers/cloud.png');
const rain = require('../../../assets/weathers/rainy-day.png');

const grey = ['#859398', '#283048'];
const green = ['#44A08D', '#093637'];
const yellow = ['#edde5d', '#f09819'];
const blueDarker = ['#1488cc', '#2b32b2'];
const blue = ['#56ccf2', '#2f80ed'];

const Home = ({navigation, route}) => {
  const [city, setCity] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    if (route.params?.updated) {
      console.log('Updated', route.params?.updated);
    }
  }, [route.params?.updated]);

  useEffect(() => {
    //getCurrentLocationWeather();
    // getCurrentLocationHourlyForecast();
  }, []);

  const getCurrentLocationWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Seremban&appid=a31e03e7c69aaf51a115819113a8b3d7`;

      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        console.log(moment().tz('Asia/Kuala_Lumpur').format('LTS'));

        setDate(moment().format('dddd MMM Do YYYY'));
        setTime(moment().tz('Asia/Kuala_Lumpur').format('LT'));
        setCurrentData({
          city: `${data.name}, ${data.sys.country}`,
          temperature: kelvinToCelcius(data.main.temp),
          description: data.weather[0].description,
        });
      }
    } catch (error) {
      console.log('eeror', error);
    }
  };

  const getCurrentLocationHourlyForecast = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=Seremban&appid=a31e03e7c69aaf51a115819113a8b3d7`;
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const forecastData = await response.json();
        console.log('forecast', forecastData.list);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  const onSearch = async () => {
    console.log(city);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a31e03e7c69aaf51a115819113a8b3d7`;

      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        console.log(response);
        setDate(moment().format('dddd MMM Do YYYY'));
        setTime(moment().tz('Asia/Kuala_Lumpur').format('LT'));
        setCurrentData({
          city: `${data.name}, ${data.sys.country}`,
          temperature: kelvinToCelcius(data.main.temp),
          description: data.weather[0].description,
        });
      }
    } catch (error) {
      console.log('eeror', error);
    }
  };

  return (
    <LinearGradient colors={blue} style={styles.homeBody}>
      <Input
        onChangeText={(text) => {
          setCity(text);
        }}
        onPress={() => {
          onSearch();
        }}
        value={city}
      />
      <View style={styles.weatherContainer}>
        {/* <Text style={styles.headerText}>Open Weather</Text> */}

        {currentData ? (
          <View style={styles.currentWeatherContainer}>
            <Text style={styles.currentDateText}>{date}</Text>
            <Text style={styles.currentTimeText}>{time}</Text>

            <Text style={styles.currentCityText}>{currentData.city}</Text>
            <Image
              source={{uri: 'http://openweathermap.org/img/w/01d.png'}}
              style={{width: 100, height: 100}}
            />
            <Text style={styles.currentTempText}>
              {currentData.temperature}°
            </Text>

            <Text style={styles.currentDetailsText}>
              {currentData.description}
            </Text>
          </View>
        ) : (
          <View style={styles.currentWeatherContainer}>
            <Text>Search a city</Text>
          </View>
        )}
        <Button
          title="Details"
          onPress={() => {
            navigation.navigate('Details', {
              name: 'Fadhil',
              age: 25,
            });
          }}
        />

        {/* <Button
            title="Details"
            onPress={() => {
              navigation.navigate('Details', {
                name: 'Fadhil',
                age: 25,
              });
            }}
          /> */}
      </View>
    </LinearGradient>
  );
};

export default Home;
