import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  homeBody: {
    flex: 1,
    paddingTop: 30,
  },
  weatherContainer: {
    flexGrow: 1,
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
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    margin: 20,
  },
  notFoundText: {
    flexGrow: 1,
    width: '100%',
    marginTop: 50,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 22,
  },
});

export default styles;
