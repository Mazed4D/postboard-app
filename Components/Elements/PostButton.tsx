import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons/';

type buttonProps = {
	title: string;
	onPress: Function;
	maxWidth?: string;
	iconName?: keyof typeof Feather.glyphMap;
};

const PostButton = ({
	title,
	onPress,
	maxWidth = '100%',
	iconName,
}: buttonProps) => {
	return (
		<Pressable style={[styles.button, { maxWidth: maxWidth }]}>
			{iconName && <Feather name={iconName} size={20} color={'#7575FF'} />}
			{!iconName && <Text style={styles.text}>{title}</Text>}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		// backgroundColor: '#7575FF',
		// borderColor: 'rgba(168,168,255, 0.5)',
		// borderWidth: 2,
		// borderRadius: 5,
	},
	text: {
		color: '#f8f8ff',
	},
});

export default PostButton;
