import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

const googleIcon = <FontAwesomeIcon icon={faGoogle} />
const githubIcon = <FontAwesomeIcon icon={faGithub} />

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setLoggedInUser(signedInUser);
                storeAuthToken();
                

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(true)
        .then(function (idToken) {
            sessionStorage.setItem('token', idToken);
            history.replace(from);
        }).catch(function (error) {
           
        });
    }

    return (
        <div className="loginControler">
            <h1>This is Login</h1>
            <button className="googleLoginButton" onClick={handleGoogleSignIn}>{googleIcon} Google Sign In</button>
            <br/>
            <button className="githubLoginButton" onClick={handleGoogleSignIn}>{githubIcon} Github Sign In</button>
        </div>
    );
};

export default Login;