import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import Search from '../../components/common/Search';
import Button from '../../components/common/Button';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {kelvinToCelcius} from '../../uitls';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment-timezone';
import color from '../../components/common/Color';
import icon from '../../components/common/Icon';

const cloud = require('../../../assets/weathers/cloud.png');
const drizzle = require('../../../assets/weathers/drizzle.png');
const thunder = require('../../../assets/weathers/lighting.png');
const sunny = require('../../../assets/weathers/sunny-day.png');
const mostlyCloudy = require('../../../assets/weathers/cloud.png');
const rain = require('../../../assets/weathers/rainy-day.png');

const Home = ({navigation, route}) => {
  const [city, setCity] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [main, setMain] = useState(null);
  const [fiveForecast, setFiveForecast] = useState(null);

  useEffect(() => {
    if (route.params?.updated) {
      console.log('Updated', route.params?.updated);
    }
  }, [route.params?.updated]);

  useEffect(() => {
    getCurrentLocationWeather();
    getCurrentLocationForecast();
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
          tempMax: kelvinToCelcius(data.main.temp_max),
          tempMin: kelvinToCelcius(data.main.temp_min),
          description: data.weather[0].description,
        });
        setMain(data.weather[0].main);
        console.log(currentData);
      }
    } catch (error) {
      console.log('eeror', error);
    }
  };

  const getCurrentLocationForecast = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=Seremban&appid=a31e03e7c69aaf51a115819113a8b3d7`;
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        const forecastArray = data.list.slice(0, 5);
        let fiveData = [];
        forecastArray.map((item) => {
          const oneData = {
            time: moment.unix(item.dt).tz('Asia/Kuala_Lumpur').format('LT'),
            temperature: kelvinToCelcius(item.main.temp_max),
            description: item.weather[0].description,
            main: item.weather[0].main,
          };
          fiveData.push(oneData);
        });
        setFiveForecast(fiveData);
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
          tempMax: kelvinToCelcius(data.main.temp_max),
          tempMin: kelvinToCelcius(data.main.temp_min),
          description: data.weather[0].description,
        });

        setMain(data.weather[0].main);
        getWeatherForecast();
      }
    } catch (error) {
      console.log('eeror', error);
      setCurrentData(null);
    }
  };

  const getWeatherForecast = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a31e03e7c69aaf51a115819113a8b3d7`;
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        const forecastArray = data.list.slice(0, 5);
        let fiveData = [];
        forecastArray.map((item) => {
          const oneData = {
            time: moment.unix(item.dt).tz('Asia/Kuala_Lumpur').format('LT'),
            temperature: kelvinToCelcius(item.main.temp_max),
            description: item.weather[0].description,
            main: item.weather[0].main,
          };
          fiveData.push(oneData);
        });
        setFiveForecast(fiveData);
      }
    } catch (error) {
      console.log('Error', error);
    }
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

  const backgroundColor = () => {
    switch (main) {
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

  return (
    <LinearGradient colors={backgroundColor()} style={styles.homeBody}>
      <Search
        onChangeText={(text) => {
          setCity(text);
        }}
        onPress={() => {
          onSearch();
        }}
        value={city}
        weather={main}
      />
      {/* <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Button title="Refresh" />
      </View> */}
      <View style={styles.weatherContainer}>
        {currentData ? (
          <View style={styles.currentWeatherContainer}>
            <View style={styles.currentInfoWrapper}>
              <Text style={styles.currentDateText}>{date}</Text>
              <Text style={styles.currentTimeText}>{time}</Text>
              <Text style={styles.currentCityText}>{currentData.city}</Text>
            </View>

            <View style={styles.weatherWrapper}>
              <Image source={renderIcon(main)} style={styles.icon} />
              <Text style={styles.currentTempText}>
                {currentData.temperature}°
              </Text>

              <Text style={styles.currentDetailsText}>
                {currentData.description}
              </Text>
            </View>

            <View style={styles.buttonWrapper}>
              <Button
                title="More"
                onPress={() => {
                  navigation.navigate('Details', currentData);
                }}
              />
            </View>

            <View style={styles.forecastContainer}>
              {fiveForecast &&
                fiveForecast.map((item) => {
                  console.log(fiveForecast);

                  return (
                    <View style={styles.forecastCardContainer}>
                      <Text style={styles.forecastText}>{item.time}</Text>
                      <Image
                        source={renderIcon(item.main)}
                        style={styles.forecastIcon}
                      />
                      <Text style={styles.forecastText}>
                        {item.temperature}°
                      </Text>

                      <Text style={styles.forecastText}>
                        {item.description}°
                      </Text>
                    </View>
                  );
                })}
            </View>
          </View>
        ) : (
          <View style={styles.currentWeatherContainer}>
            <Text style={styles.notFoundText}>
              Whoops! Couldn't find your city
            </Text>
          </View>
        )}

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
