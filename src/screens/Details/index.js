import React from 'react';
import {View, Text, Button} from 'react-native';

const Details = ({route, navigation}) => {
  const {name, age} = route.params;

  console.log(name);

  return (
    <View>
      <Text>Details</Text>
      <Button
        title="Update"
        onPress={() => {
          navigation.navigate('Home', {updated: 'heheheh'});
        }}
      />
    </View>
  );
};

export default Details;
