import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, Button, ScrollView, Image, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Buttons } from './components/Buttons';
import { TodoList } from './components/TodoList';
import { Chat } from './components/Chat';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { fetchData } from './utils/fetch';
import { TextInput } from 'react-native-gesture-handler';

const queryClient = new QueryClient();


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Feed() {
  const [email, setEmail] = useState('');
  const isValid = email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{borderRadius: 20, borderWidth: 1, borderColor: '#000', padding: 10, flexDirection: 'row', paddingLeft: 10, paddingRight: 50}}>
        <Image source={require('./assets/icons8-mail-50.png')} style={{width: 50, height: 50, marginRight: 10}}/>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={{color: isValid ? 'black' : 'red', fontSize: 22}}
        />
      </View>
    </View>
  );
};

function Notifications({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};

const Item = ({item}: {item: any}) => {
  const {url, title, body} = item;

  return (
    <View style={{ borderWidth: 1, borderColor: '#000', height: 120, width: '100%', flexDirection: 'row', borderRadius: 30, marginBottom: 10, overflow: 'hidden' }}>
      <Image source={{uri: url}} style={{width: 120, height: '100%'}}/>
      <View style={{padding: 20, width: '80%'}}>
        <Text style={{ fontWeight: '600' }}>{title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text>{body}</Text>
        <TouchableOpacity style={{backgroundColor: 'green', padding: 10, borderRadius: 10, paddingHorizontal: 20}}>
          <Text style={{color: 'white'}}>Join</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

function HomeScreen({ navigation }: { navigation: any }) {
  const [posts, setPosts] = useState<any[]>([]);

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then(
        (res) => res.json(),
      ).then(posts => posts.slice(0, 10)),
  });

  const { data: dataPhotos } = useQuery({
    queryKey: ['photos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/photos').then(
        (res) => res.json(),
      ).then(photos => photos.slice(0, 10)),
  });

  useEffect(() => {
    if (data && dataPhotos) {
      setPosts(data.map((post: any, index: number) => {
        return {
          ...post,
          url: dataPhotos[index].url,
        }
      }));
    }
  }, [data, dataPhotos]);

  const [query, setQuery] = useState('');

  const visibleItems = posts.filter((post) => post.title.includes(query))

  console.log(posts);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
      <Button title='fetch data'></Button>
      <TextInput 
        style={{borderRadius: 10, borderWidth: 1, borderColor: '#000', marginTop: 50, height: 40, padding: 10}}
        value={query}
        onChangeText={setQuery}
      />
      <ScrollView style={{marginTop: 50}}>
        <FlatList
          data={visibleItems}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.id} />
      </ScrollView>
    </View>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" options={{ drawerLabel: 'notif' }} component={Notifications} />
      <Drawer.Screen name="Buttons" component={Buttons} />
      <Drawer.Screen name="TodoList" component={TodoList} />
    </Drawer.Navigator>
  );
};

function DetailsScreen({ route }: { route: any }) {
  return (
    <Stack.Navigator initialRouteName='InnerDetails'>
      <Stack.Screen
        name="InnerDetails"
        component={InnerDetailsScreen}
        initialParams={route.params}
      />
      <Stack.Screen name="Chat" component={Chat} initialParams={route.params} />
    </Stack.Navigator>
  );
};

function InnerDetailsScreen({ route, navigation }: { route: any, navigation: any }) {
  const { id, name } = route.params.item;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
      <Text>Details for {name} (ID: {id})</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Draw" component={MyDrawer} />
        </Tab.Navigator>
      </NavigationContainer >
    </QueryClientProvider>
  );
};

export default App;
