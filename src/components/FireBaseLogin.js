import React from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useDispatch } from 'react-redux';
import { socialLogin } from '../modules/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCq4JDJkcfyCRmvWsr0euz11a_3WX0V1o0",
    authDomain: "trello-clone-b10bc.firebaseapp.com",
    databaseURL: "https://trello-clone-b10bc.firebaseio.com",
    projectId: "trello-clone-b10bc",
    storageBucket: "trello-clone-b10bc.appspot.com",
    messagingSenderId: "37835664042",
    appId: "1:37835664042:web:d38040a4ef6375d9357ed3",
    measurementId: "G-F6KDP367NZ"
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
            first_name: socialData.user.displayName,
            last_name: null,
            birth_day: null,
            gender: null,
            email: socialData.user.email,
            phone: null,
            email_verification: null,
            social_login_provider: 'google.com',
        };

        const result = await dispatch(socialLogin({data}));

        if (result && result.success) {
            const token = result.data.data.token;
            const memberId = result.data.data.member_id;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('memberId', memberId);
            sessionStorage.setItem('username', data.username);

            history.push('/member/' + data.username + '/boards');
        } else {
        }
    };

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: socialData => {
                onGoogleLogin(socialData);
            }
        }
    };


    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
};

export default React.memo(FireBaseLogin);