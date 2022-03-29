import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';

const DeleteConfirm = ({ confirm, cancel }: { confirm: any; cancel: any }) => {
	return (
		<View style={styles.modal}>
			<Text style={{ alignSelf: 'center', marginBottom: 10 }}>
				Are you sure you want to delete this post?
			</Text>
			<View style={styles.actions}>
				<Button title='Delete' color='red' onPress={confirm} />
				<Button title='Cancel' onPress={cancel} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
});

export default DeleteConfirm;
