import React from 'react';
import Feed from '../Components/Feed/Feed';

export const Home = ({ userId }: { userId: string }) => {
	return <Feed userId={userId} />;
};

export default Home;
