import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Screens/Home';
import Auth from './Screens/Auth';
import Profile from './Screens/Profile';
import Followed from './Screens/Followed';
import { Feather } from '@expo/vector-icons/';
import AddPost from './Screens/AddPost';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();

export default function App() {
	const [token, setToken] = useState<any>();
	const [reload, setReload] = useState<boolean>(false);

	useEffect(() => {
		const checkToken = async () => {
			const token = await SecureStore.getItemAsync('token');
			setToken(await token);
		};
		checkToken();
	}, [token, reload]);

	return (
		<NavigationContainer>
			{token && (
				<Tab.Navigator
					initialRouteName='Home'
					screenOptions={({ route }) => ({
						tabBarIcon: ({ color, size }) => {
							let iconName: keyof typeof Feather.glyphMap = 'home';

							switch (route.name) {
								case 'Home':
									iconName = 'home';
									break;
								case 'Auth':
									iconName = 'log-in';
									break;
								case 'Add Post':
									iconName = 'plus';
									break;
								case 'Followed':
									iconName = 'users';
									break;
								case 'Profile':
									iconName = 'user';
									break;
							}

							return <Feather name={iconName} size={size} color={color} />;
						},
						tabBarActiveTintColor: '#7575FF',
						tabBarInactiveTintColor: 'gray',
					})}
				>
					<Tab.Screen name='Home' component={Home} />
					<Tab.Screen name='Followed' component={Followed} />
					<Tab.Screen name='Add Post' component={AddPost} />
					<Tab.Screen name='Profile'>
						{() => <Profile setReload={setReload} reload={reload} />}
					</Tab.Screen>
				</Tab.Navigator>
			)}
			{!token && (
				<Tab.Navigator initialRouteName='Auth'>
					<Tab.Screen name='Auth'>
						{() => <Auth setReload={setReload} reload={reload} />}
					</Tab.Screen>
				</Tab.Navigator>
			)}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
