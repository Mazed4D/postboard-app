import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import { Feather } from '@expo/vector-icons/';
const AddPostButton = ({ onPress }: { onPress: any }) => {
	return (
		<FloatingAction
			actions={[
				{
					text: '+',
					name: 'add',
					icon: require('../../Pictures/plus.png'),
				},
			]}
			floatingIcon={<Feather name='plus' />}
			overrideWithAction={true}
			color='#7575FF'
			onPressItem={onPress}
		/>
	);
};

export default AddPostButton;
