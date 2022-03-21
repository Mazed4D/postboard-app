import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Card from '../Components/Post/Card';

export default function Followed() {
	return (
		<ScrollView>
			<Card />
			<Card />
			<Card />
			<Card />
		</ScrollView>
	);
}

const styles = StyleSheet.create({});
