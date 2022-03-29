import React from 'react';
import Feed from '../Components/Feed/Feed';

const Followed = ({ userId }: { userId: string }) => {
	return <Feed userId={userId} isFollowed={true} />;
};

export default Followed;
