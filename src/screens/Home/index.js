import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {kelvinToCelcius} from '../../uitls';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment-timezone';
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
    getCurrentLocationWeather();
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

  const onNavigate = () => {
    // navigation.navigate('Details', {
    //   name,
    //   age: 25,
    // });
  };
  const onSearch = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a31e03e7c69aaf51a115819113a8b3d7`;

      const response = await fetch(url);
      console.log(response);

      if (response === 200) {
        const data = await response.json();
        console.log(data);

        setDate(moment().format('dddd MMM Do YYYY'));
        setTime(moment().tz('Asia/Kuala_Lumpur').format('LTS'));
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
    <LinearGradient colors={['#44A08D', '#093637']} style={styles.homeBody}>
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
