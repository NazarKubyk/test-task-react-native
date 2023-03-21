import { Text, View, FlatList, TouchableOpacity } from 'react-native';

export function Chat({ route, navigation }: {route: any, navigation: any}) {
  const { id, name, description } = route.params.item;

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Chat with user {name} (ID: {id}) {description}</Text>
    </TouchableOpacity>
  );
}