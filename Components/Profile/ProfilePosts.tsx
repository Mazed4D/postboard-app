import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import Card from '../Post/Card';
import { useEffect, useState } from 'react';
import apiServices from '../../api/api.service';
import { useIsFocused } from '@react-navigation/native';
import ProfileHeader from './ProfileHeader';
import Feed from '../Feed/Feed';

const ProfilePosts = ({
	userId,
	setReload,
	reload,
	notOwnProfile = false,
}: {
	userId: string;
	setReload?: any;
	reload?: any;
	notOwnProfile?: boolean;
}) => {
	return (
		<>
			<Feed
				userId={userId}
				isProfile={true}
				listHeaderComponent={
					<ProfileHeader
						setReload={setReload}
						reload={reload}
						userId={userId}
						notOwnProfile={notOwnProfile}
					/>
				}
			/>
		</>
	);
};

const styles = StyleSheet.create({});

export default ProfilePosts;
