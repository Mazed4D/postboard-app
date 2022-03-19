import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Card from '../Components/Post/Card';

type HomeProps = {
	navigation: { navigate: Function };
};

export const Home: React.FC<HomeProps> = ({ navigation }) => {
	return (
		<ScrollView>
			<Card />
			<Card />
			<Card />
			<Card />
		</ScrollView>
	);
};

const styles = StyleSheet.create({});

export default Home;
