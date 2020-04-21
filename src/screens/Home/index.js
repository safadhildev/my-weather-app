import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Input from '../../components/common/Inputn/Input';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from 'react-native-elements';
import {kelvinToCelcius} from '../../uitls';

const Home = ({navigation, route}) => {
  const [city, setCity] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    if (route.params?.updated) {
      console.log('Updated', route.params?.updated);
    }
  }, [route.params?.updated]);

  useEffect(()=>{
      loadCurrentWeather();
  })

  const loadCuurentWeather=()=>{
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Seremban&appid=a31e03e7c69aaf51a115819113a8b3d7`;
  
        const response = await fetch(url);
        const data = await response.json();

        console.log(response);
  
        setCurrentData({
          city: `${data.name} ${data.sys.country}`,
          temperature: kelvinToCelcius(data.main.temp),
          description: data.weather[0].description,
        });
      } catch (error) {
        console.log('eeror', error);
      }
  }

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
      const data = await response.json();
      console.log(data);

      setCurrentData({
        city: `${data.name} ${data.sys.country}`,
        temperature: data.main.temp,
        description: data.weather[0].description,
      });
    } catch (error) {
      console.log('eeror', error);
    }
  };

  return (
    <View style={styles.homeBody}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.headerText}>Open Weather</Text>
        <Input
          onChangeText={(text) => {
            setCity(text);
          }}
          onPress={() => {
            onSearch();
          }}
          value={city}
        />

        {currentData ? (
          <View style={styles.currentWeatherContainer}>
            <Text style={styles.currentCity}>{currentData.city}</Text>
            <Text style={styles.currentDate}>
              Monday, Apr 20 2020, 17:12:45
            </Text>
            <Text style={styles.currentTemp}>{currentData.temperature}</Text>
            <Text style={styles.currentDetails}>{currentData.description}</Text>
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
      </ScrollView>
    </View>
  );
};

export default Home;
