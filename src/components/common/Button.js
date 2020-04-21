import React from 'react';

import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 80,
    height: 30,
    borderRadius: 20,
    paddingVertical: 5,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
  },
});

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonWrapper}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
