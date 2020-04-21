import React from 'react';
import {View, TextInput, StyleSheet, Button, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 10,
    elevation: 4,
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
  },
  searchButton: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(0,150,136,1)',
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

const Input = ({onPress, onChangeText, value}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onPress}>
        <View>
          <Image
            style={styles.icon}
            source={require('../../assets/icons/baseline_search_white_18dp.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Input;
