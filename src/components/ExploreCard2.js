import React from 'react';
import {View, Text, Image} from 'react-native';

const ExploreCard2 = () => {
  return (
    <View
      style={{
        backgroundColor: '#bbb',
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 20,
        marginVertical: 10,
      }}>
      <View>
        <View>
          <Image
            source={require('../../assets/tantrum.png')}
            style={{width: 175, height: 150}}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#f4f4f4',
          width: 260,
          minHeight: 150,
          borderTopLeftRadius: 32,
          borderBottomLeftRadius: 32,
          paddingLeft: 20,
          paddingRight: 20,
          paddingVertical: 20,
          alignSelf: 'flex-end',
        }}>
        <Text>Title</Text>
        <Text>Title</Text>
        <Text>Title</Text>
        <Text>Title</Text>
      </View>
    </View>
  );
};

export default ExploreCard2;




<TouchableOpacity style={{
        backgroundColor: '#bbb',
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 20,
        marginVertical: 10,
      }}>

	
</TouchableOpacity>
























