import React from 'react';
import './styles/Navbar.css'

class Signin extends React.Component{

    // onSignIn = (googleUser) => {
    //     var profile = googleUser.getBasicProfile();
    //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //     console.log('Name: ' + profile.getName());
    //     console.log('Image URL: ' + profile.getImageUrl());
    //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // }

    componentDidMount() {
        window.gapi.signin2.render(
          "google-button",
          {
            //width: 200,
            //height: 50,
            onsuccess: this.onSuccess,
          },
        );
    }
    
    signOut = () => {
        sessionStorage.setItem('myUserEntity',"null");
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          console.log('User signed out.');
          this.props.setIsLoggedIn('false');
        });
        

    }
    
    onSuccess = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        // console.log("Name: " + profile.getName());
        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

        this.props.setIsLoggedIn('true');

        var myUserEntity = {};
        myUserEntity.Id = profile.getId();
        myUserEntity.Name = profile.getName();
        sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
    }

    render() {
        return (
        <div>
            {/*<div class="g-signin2" data-onsuccess="onSignIn" ></div>*/}
            <div id="google-button"></div>
            <button onClick={this.signOut}>Sign out</button>
        </div>
        );
    }

}
  
    export default Signin;
  