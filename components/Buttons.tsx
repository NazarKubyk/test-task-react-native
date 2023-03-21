import { StyleSheet, Text, Button, Pressable, View } from 'react-native';

export const Buttons = ({ navigation, route }: { navigation: any, route: any }) => {
  const changeScreen = () => {
    navigation.navigate('TodoList')
  }

  return (
    <View>
      <Pressable style={styles.button} onPress={changeScreen}>
        <Text>Another Button</Text>
      </Pressable>
      <Text>{route.params}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  }})