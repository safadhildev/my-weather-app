import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  homeBody: {
    flex: 1,
    paddingTop: 30,
  },
  weatherContainer: {
    flexGrow: 1,
    paddingTop: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  headerText: {
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 25,
    color: '#FFFFFF',
  },
  currentWeatherContainer: {
    margin: 20,
    alignItems: 'center',
  },
  currentCityText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  currentDateText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  currentTimeText: {
    fontSize: 36,
    color: '#FFFFFF',
  },
  currentTempText: {
    fontSize: 100,
    color: '#FFFFFF',
  },
  currentDetailsText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default styles;
