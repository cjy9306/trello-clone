import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useDispatch } from 'react-redux';
import { socialLogin } from '../modules/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'trello-clone-6fd14.firebaseapp.com',
	databaseURL: 'https://trello-clone-6fd14.firebaseio.com',
	projectId: 'trello-clone-6fd14',
	storageBucket: 'trello-clone-6fd14.appspot.com',
	messagingSenderId: '802554919291',
	appId: '1:802554919291:web:24b49de8c29130405ca5de',
	measurementId: 'G-HPRZS90M01',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const FireBaseLogin = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const onGoogleLogin = async (socialData) => {
		const data = {
			username: socialData.user.uid,
			password: null,
			name: socialData.user.displayName,
			birthDay: null,
			gender: null,
			email: socialData.user.email,
			phone: null,
			emailVerification: null,
			socialLoginProvider: 'google.com',
		};

		const result = await dispatch(socialLogin({ data }));

		if (result && result.success) {
			const token = result.data.data.token;
			const memberId = result.data.data.member_id;
			sessionStorage.setItem('token', token);
			sessionStorage.setItem('memberId', memberId);
			sessionStorage.setItem('username', data.username);

			history.push('/member/' + data.username + '/boards');
		}
	};

	const uiConfig = {
		signInFlow: 'redirect',
		signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
		callbacks: {
			signInSuccessWithAuthResult: (socialData) => {
				onGoogleLogin(socialData);
			},
		},
	};

	return (
		<div>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</div>
	);
};

export default React.memo(FireBaseLogin);
