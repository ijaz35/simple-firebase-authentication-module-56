import './App.css';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const provider = new FacebookAuthProvider();

  const handlerAddToGoogle = () => {

    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error('error', error)
      })
  }
  const handlerAddToGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user)
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  const handlerAddToFacebookSignin = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user)
      })
      .catch(error => {
        console.log('error', error)
      })

  }
  const handlerAddToSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser({})
    }).catch((error) => {
      setUser({})
    });

  }

  return (

    <div className="App">

      {user.uid ? <button onClick={handlerAddToSignOut}>Sign out google</button> :
        <>
          <button onClick={handlerAddToGoogle}>Sign in google</button>
          <button onClick={handlerAddToFacebookSignin}>Sign in facebook</button>
          <button onClick={handlerAddToGithubSignIn}>Sign in github</button>
        </>

      }
      <h2>{user.displayName}</h2>
      <h3>Your Email: {user.email}</h3>
      <img src={user.photoURL} alt="userPhoto" />



    </div>
  );
}

export default App;
