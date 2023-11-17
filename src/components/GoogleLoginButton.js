import React from 'react';

const GoogleLoginButton = () => {
  // useEffect(() => {
  //   // Load the Google API client library
  //   window.gapi.load('auth2', () => {
  //     window.gapi.auth2.init({
  //       client_id: '133351201592-6hvr25k1mvnsgscirqcmfb5jkugab6fa.apps.googleusercontent.com',
  //       plugin_name :"Quiz App"
  //     })
    //   .then(() => {
    //     this.auth = window.gapi.auth2.getAuthInstance();
    //     this.setState({isSignedIn: this.auth.isSignedIn.get()})
    // })
  //   ;
  //   });
  // }, []);

  // const handleSignIn = () => {
  //   const auth2 = window.gapi.auth2.getAuthInstance();
  //   auth2.signIn().then(googleUser => {
  //     const profile = googleUser.getBasicProfile();
  //     // Handle the user profile, e.g., send it to the server
  //     console.log('Google Sign-In successful:', profile);
  //   });
  // };

  return (
    <button>Sign in with Google</button>
  );
};

export default GoogleLoginButton;
