import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import Search from '../../components/common/Search';
import Button from '../../components/common/Button';
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {kelvinToCelcius} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment-timezone';
import color from '../../components/common/Color';
import icon from '../../components/common/Icon';
import {PermissionsAndroid} from 'react-native';

const height = Dimensions.get('window').height;

const Home = ({navigation, route}) => {
  const [city, setCity] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [main, setMain] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [groupData, setGroupData] = useState(null);
  const [fiveData, setFiveData] = useState(null);
  const [error, setError] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (route.params?.updated) {
      console.log('Updated', route.params?.updated);
    }
  }, [route.params?.updated]);

  useEffect(() => {
    getCurrentLocationWeather();
  }, [latitude, longitude]);

  const getLocation = async () => {
    if (Platform.OS !== 'android') Geolocation.requestAuthorization();
    else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'we need GPS location service',
            message: 'we need location service to provide your location',
            // buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('getting location');
          Geolocation.getCurrentPosition((info) => {
            const {coords, timestamp} = info;

            setLatitude(coords.latitude);
            setLongitude(coords.longitude);
          }, geoError());
        } else {
          console.log('em');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const geoError = (error) => {
    if (error) {
      console.log('Error');
    }
  };

  const getCurrentLocationWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a31e03e7c69aaf51a115819113a8b3d7`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=a31e03e7c69aaf51a115819113a8b3d7`;
    await getData(url);
    await getForecastData(forecastUrl);
  };

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        // console.log(moment().tz('Asia/Kuala_Lumpur').format('LTS'));

        setCurrentData({
          city: `${data.name}, ${data.sys.country}`,
          temperature: kelvinToCelcius(data.main.temp),
          tempMax: kelvinToCelcius(data.main.temp_max),
          tempMin: kelvinToCelcius(data.main.temp_min),
          feels_like: kelvinToCelcius(data.main.feels_like),
          description: data.weather[0].description,
          main: data.weather[0].main,
          date: moment().format('dddd, MMM Do YYYY'),
          time: moment().tz('Asia/Kuala_Lumpur').format('LT'),
          sunrise: moment.unix(data.sys.sunrise).format('LT'),
          sunset: moment.unix(data.sys.sunset).format('LT'),
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind: data.wind.speed,
        });
        setMain(data.weather[0].main);
        setError(false);
        console.log(data);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const getForecastData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        const forecastArray = data.list;
        let forecasts = [];
        forecastArray.forEach((item) => {
          const oneData = {
            time: moment.unix(item.dt).tz('Asia/Kuala_Lumpur').format('LT'),
            temperature: kelvinToCelcius(item.main.temp_max),
            description: item.weather[0].description,
            main: item.weather[0].main,
            date: moment.unix(item.dt).format('l'),
            id: item.dt,
          };
          forecasts.push(oneData);
        });
        setForecastData(forecasts);
        setError(false);
      }
    } catch (error) {
      console.log('Error', error);
      setError(true);
    }
  };

  const onSearch = async () => {
    console.log('Search City:', city);

    if (!city) {
      setCurrentData(null);
      setError(true);
    } else {
      await getData(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a31e03e7c69aaf51a115819113a8b3d7`,
      );
      await getForecastData(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a31e03e7c69aaf51a115819113a8b3d7`,
      );
    }
  };

  const renderForecast = ({item}) => {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={styles.forecastText} allowFontScaling={false}>
          {item.time}
        </Text>
        <View style={styles.forecastImageWrapper}>
          <Image
            source={renderIcon(item.main)}
            style={styles.forecastIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.forecastText} allowFontScaling={false}>
          {item.temperature}°C
        </Text>

        <Text style={styles.forecastText} allowFontScaling={false}>
          {item.description}
        </Text>
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

  const backgroundColor = (main) => {
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

  const onDetails = () => {
    navigation.navigate('Details', {currentData, forecastData});
  };

  const hideKeyboard = () => {
    Keyboard.dismiss;
  };

  return (
    <LinearGradient
      colors={
        currentData ? backgroundColor(currentData.main) : color.linearGreen
      }
      style={styles.homeBody}>
      {show ? (
        <LinearGradient
          colors={
            currentData ? backgroundColor(currentData.main) : color.linearGreen
          }
          style={{height: height}}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            onBlur={() => setShow(false)}>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: height,
                paddingTop: 40,
                zIndex: 1,
              }}
              onPress={() => {
                alert('ded');
              }}>
              <Search
                onChangeText={(text) => {
                  setCity(text);
                }}
                onPress={() => {
                  onSearch();
                  setShow(false);
                }}
                value={city}
                weather={main}
              />
            </View>
          </TouchableWithoutFeedback>
        </LinearGradient>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingTop: 60,
            paddingHorizontal: 20,
            width: '100%',
          }}>
          <View style={{flex: 1, paddingEnd: 10}}>
            <Text
              style={{
                fontSize: 24,
                color: '#fff',
                fontWeight: 'bold',
                lineHeight: 28,
              }}>
              {currentData ? currentData.city : 'City not found'}
            </Text>
          </View>
          <Button
            title={'Search'}
            onPress={() => {
              setShow(!show);
            }}
          />
        </View>
      )}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={show ? {} : styles.container}>
          {currentData && (
            <View
              style={{
                flex: 1,
              }}>
              {/* Top */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.currentDetailsText}>
                    {currentData.main}
                  </Text>
                  <Text style={styles.currentDetailsText}>
                    {currentData.description}
                  </Text>
                  <Text style={styles.currentTempText}>
                    {currentData.temperature}°C
                  </Text>
                </View>
                <View style={styles.imageWrapper}>
                  <Image
                    source={renderIcon(currentData.main)}
                    style={styles.icon}
                  />
                </View>
              </View>

              {/* Bot */}
              <View>
                <View style={styles.buttonWrapper}>
                  <Button
                    title={'More'}
                    onPress={() => {
                      onDetails();
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginBottom: 20,
                    paddingHorizontal: 30,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 14}}>Min</Text>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {currentData.tempMin}°C
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 14}}>Feels Like</Text>
                      <Text style={{fontSize: 28, fontWeight: 'bold'}}>
                        {currentData.feels_like}°C
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 14}}>Max</Text>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {currentData.tempMax}°C
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginVertical: 10,
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 14}}>Speed</Text>
                      <Text style={{fontSize: 28, fontWeight: 'bold'}}>
                        {currentData.wind} km/h
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 14}}>Humidity</Text>
                      <Text style={{fontSize: 28, fontWeight: 'bold'}}>
                        {currentData.humidity} %
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default Home;
