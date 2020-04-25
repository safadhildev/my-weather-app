import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../components/common/Color';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  detailsBody: {
    flex: 1,
  },
  backgroundWrapper: {
    height: height + 200,
    width,
    position: 'absolute',
    zIndex: -1,
  },
  currentWeatherContainer: {
    margin: 20,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(255,255,255,0.3)',
  },
  cityText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '100',
  },
  timeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
  },
  mainTemp: {
    fontSize: 56,
    color: '#fff',
    fontWeight: 'bold',
  },
  maxTemp: {
    fontSize: 14,
    color: '#fff',
  },
  minTemp: {
    fontSize: 14,
    color: '#fff',
  },
});

export default styles;
