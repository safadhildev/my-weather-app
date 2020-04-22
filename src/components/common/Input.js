import React from 'react';
import {View, TextInput, StyleSheet, Button, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const searchIcon = require('../../../assets/icons/magnifying-glass.png');

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
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
  searchButton: {
    width: 30,
    height: 30,
    backgroundColor: '#E3E9ED',
    borderRadius: 50,
    elevation: 4,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

const Input = ({onPress, onChangeText, value, weather}) => {
  const buttonBackgroundColor = () => {
    switch (weather) {
      case 'sunny':
        return style.yellowSearchButton;
      case 'rain':
        return style.blueSearchButton;
      case 'cloud':
        return style.greySearchButton;
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
      <TouchableOpacity style={styles.searchButton} onPress={onPress}>
        <View>
          <Image style={styles.icon} source={searchIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Input;
