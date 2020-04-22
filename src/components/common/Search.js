import React from 'react';
import {View, TextInput, StyleSheet, Button, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import color from '../../components/common/Color';
const searchIcon = require('../../../assets/icons/search-white.png');

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'rgba(10,10,10,0.2)',
    borderRadius: 50,
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    opacity: 1,
    color: '#FFF',
  },
  greenSearchButton: {
    width: 30,
    height: 30,
    backgroundColor: color.green,
    borderRadius: 50,
    elevation: 4,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
  },
  greySearchButton: {
    width: 30,
    height: 30,
    backgroundColor: color.grey,
    borderRadius: 50,
    elevation: 2,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
  },
  darkBlueSearchButton: {
    width: 30,
    height: 30,
    backgroundColor: color.darkBlue,
    borderRadius: 50,
    elevation: 2,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
  },
  yellowSearchButton: {
    width: 30,
    height: 30,
    backgroundColor: color.yellow,
    borderRadius: 50,
    elevation: 2,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
  },
  blueSearchButton: {
    width: 30,
    height: 30,
    backgroundColor: color.blue,
    borderRadius: 50,
    elevation: 2,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

const Search = ({onPress, onChangeText, value, weather}) => {
  const buttonBackgroundColor = () => {
    switch (weather) {
      case 'Clouds':
        return styles.greySearchButton;
      case 'Thunderstorm':
        return styles.darkBlueSearchButton;
      case 'Rain':
        return styles.darkBlueSearchButton;
      case 'Clear':
        return styles.yellowSearchButton;
      case 'Drizzle':
        return styles.blueSearchButton;
      default:
        return styles.greenSearchButton;
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={'rgba(255,255,255,0.7)'}
      />
      <TouchableOpacity style={buttonBackgroundColor()} onPress={onPress}>
        <View>
          <Image style={styles.icon} source={searchIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
