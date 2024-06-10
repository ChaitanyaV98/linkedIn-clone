
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Login from "./Login";
import { auth } from "./firebase";
import Widgets from "./Widgets";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in.
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL,
        }));
      } else {
        // User is signed out.
        dispatch(logout());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      {!user ? (<Login />) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
     <Widgets/>
        </div>
      )}
    </div>
  );
}

export default App;

