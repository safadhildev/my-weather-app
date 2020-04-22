import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  homeBody: {
    flex: 1,
    paddingVertical: 30,
  },
  weatherContainer: {
    flexGrow: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
  currentWeatherContainer: {
    paddingVertical: 10,
  },
  currentInfoWrapper: {
    alignItems: 'center',
  },
  weatherWrapper: {
    alignItems: 'center',
  },
  currentCityText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  currentDateText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  currentTimeText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  currentTempText: {
    fontSize: 56,
    color: '#FFFFFF',
  },
  currentDetailsText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  icon: {
    width: 100,
    height: 100,
    paddingVertical: 5,
  },
  notFoundText: {
    flexGrow: 1,
    width: '100%',
    marginTop: 50,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 22,
  },
  forecastContainer: {
    flexGrow: 1,
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
  },
  forecastIcon: {
    width: 40,
    height: 40,
  },
});

export default styles;
