import React, { useEffect } from "react";
import { firebaseAuth, firebaseDb } from "./firebase/firebase";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import styles from "./App.module.css";

function App() {
  const history = useHistory();
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        history.replace("/auth");
      }
      firebaseDb.collection("users").doc(user.uid).set(
        {
          email: user.email,
          photoURL: user.photoURL,
        },
        { merge: true }
      );
      history.replace("/");
    });
    return () => {
      firebaseAuth.onAuthStateChanged(null);
    };
  }, [history]);

  return (
    <div className={styles.app}>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
