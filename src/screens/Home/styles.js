import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  homeBody: {flexGrow: 1, paddingTop: 40},
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  currentWeatherContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  currentInfoWrapper: {
    alignItems: 'center',
  },
  weatherWrapper: {
    alignItems: 'center',
  },
  currentCityText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  currentDateText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  currentTimeText: {
    fontSize: 36,
    color: '#FFFFFF',
  },
  currentTempText: {
    fontSize: 56,
    color: '#FFFFFF',
  },
  currentDetailsText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  imageWrapper: {
    width: 100,
    height: 100,
  },
  icon: {
    width: '100%',
    height: '100%',
    marginVertical: 10,
  },
  notFoundText: {
    width: '100%',
    color: '#FFF',
    textAlign: 'center',
    fontSize: 36,
  },
  forecastContainer: {
    paddingVertical: 20,
  },
  forecastWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  forecastCardContainer: {
    alignItems: 'center',
    width: 50,
  },
  forecastText: {
    color: '#fff',
    fontSize: 12,
    width: 70,
    textAlign: 'center',
    paddingBottom: 10,
  },
  forecastImageWrapper: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  forecastIcon: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
