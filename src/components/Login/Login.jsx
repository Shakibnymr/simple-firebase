import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.init';
import { useState } from "react";
const Login = () => {
const [user,setUser] = useState('')
    const auth = getAuth(app);
    console.log(app);
const provider =new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()
const handleGoogleSignIn = () => {
   signInWithPopup(auth,provider)
   .then(result => {
    const loggedInUser = result.user
    console.log(loggedInUser);
    setUser(loggedInUser)
   })
   .catch(error => {
    console.log('error',error.message)
   })
}

const  handleSignOut= () => {
signOut(auth)
.then(result => {
    setUser(null)
})
.catch(error => {
    console.log(error)
})
}

const handleGithubLogIn = () => {
signInWithPopup(auth,githubProvider)
.then(result => {
    const loggedUser = result.user
    console.log(loggedUser)
    setUser(loggedUser)
})
.catch(error => {
    console.log(error)
})
}
    return (
        <div>
         {/* user? logout:sign in */}


   {   user?      <button onClick={handleSignOut}>Sign Out</button>
   :
            <div>
                <button onClick={handleGoogleSignIn}>Google Login</button>
                <button onClick={handleGithubLogIn}>Github Login</button>
            </div>
            }

{
    user && <div>
    <h1>User: {user.displayName}</h1>
    <h2>Email: {user.email}</h2>
    <img src={user.photoURL} alt="" />
    </div>
}

        </div>
    );
};

export default Login;