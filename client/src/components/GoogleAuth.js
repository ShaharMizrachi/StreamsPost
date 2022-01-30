import React from 'react';
import {connect} from 'react-redux'
import {signIn,signOut} from '../actions';


class GoogleAuth extends React.Component {
  
    //const auth=window.gapi.auth2.getAuthInstance(); whyyyyyy?
  // ask about this.auth Niv gay
  componentDidMount() {
      window.gapi.load('client:auth2', () => { // the list of librarues sepereted by colon (:)
      window.gapi.client 
        .init({ //initializing  the library and not actually take the user through the process
          clientId:
            '754067606792-jhkdo62gqdrs6f8rrbei2icajr1nle2n.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
            //we didnt declere her eabout auth from where is it?
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get()); //update our auth state in redux store
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
//And because this is a callback function, I'm going to set it up as a arrow functions, that its context is bound to my component.
  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
     // console.log(this.props.signIn(this.auth.currentUser.get()))
        this.props.signIn(this.auth.currentUser.get().getId()); 
    }
    else this.props.signOut();
    // that what we were passing in our connect from our store 
  };


  onSignInClick=()=>{
    this.auth.signIn();
  };

  onSignOutClick= ()=>{
    this.auth.signOut();
  };



  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}


const mapStateToProps =(state)=>{
  return {isSignedIn: state.auth.isSignedIn};


}


export default connect(mapStateToProps,{signIn,signOut}) (GoogleAuth);
