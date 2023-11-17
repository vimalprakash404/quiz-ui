import React from "react";
import { useState , useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
function GoogleAuth(){
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState(undefined);
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log("login data : ", res.data)
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <>
         {profile ? (
                <div>
                    {/* <img src={profile.picture} alt="user image" /> */}
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={() => login()}>Sign in with Google 🚀 </button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </>
    );
}

export default GoogleAuth;