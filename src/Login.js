import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Login() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message));
  };
//old version format
//   const register = () => {
//     if (!name) {
//       return alert("Please enter your full name");
//     }
//     auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
//       userAuth.user
//         .updateProfile({ displayName: name, photoURL: profilePic })
//         .then(() => {
//           dispatch(
//             login({
//               email: userAuth.user.email,
//               uid: userAuth.user.uid,
//               displayName: name,
//               photoUrl: profilePic,
//             })
//           );
//         });
//     }).catch((error)=>{alert(error)});
//   };

//new version of firebase
const register = () => {
    if (!name) {
      return alert("Please enter your full name");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: profilePic,
        }).then(() => {
          dispatch(
            login({
              email: user.email,
              uid: user.uid,
              displayName: name,
              photoUrl: profilePic,
            })
          );
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <img src="https://freelogopng.com/images/all_img/1656958733linkedin-logo-png.png" />
      <form>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Full name (required if registering)"
          type="text"
        />
        <input
          value={profilePic}
          onChange={(e) => {
            setProfilePic(e.target.value);
          }}
          placeholder="Profile pic URL (optional)"
          type="text"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          type="password"
        />
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>
      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
