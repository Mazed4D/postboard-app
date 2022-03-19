import { createContext } from 'react';

const AuthCtx = createContext({
	isLoggedIn: false,
	userId: '',
	userName: '',
});

export default AuthCtx;
