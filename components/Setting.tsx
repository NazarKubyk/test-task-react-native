import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const Setting = ({navigation}: {navigation: any}) => {
  const data = [
    { id: 1, name: 'Item 1', description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', description: 'Description of Item 2' },
    { id: 3, name: 'Item 3', description: 'Description of Item 3' },
  ];

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail', { item });
          }}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
      )} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    marginVertical: 12,
  },
});

export default Setting;