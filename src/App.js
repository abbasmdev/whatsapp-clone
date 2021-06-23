import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firebaseDb } from "./firebase/firebase";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import styles from "./App.module.css";

function App() {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const history = useHistory();
  useEffect(() => {
    if ((!user && !loading) || (!loading && error)) {
      history.replace("/auth");
    }
    if (!user && loading) return;

    console.log(user);
    firebaseDb.collection("users").doc(user.uid).set(
      {
        email: user.email,
        photoURL: user.photoURL,
      },
      { merge: true }
    );
    history.replace("/");
  }, [history, user, loading, error]);

  return (
    <div className={styles.app}>
      {loading ? (
        <p>Loading</p>
      ) : (
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
      )}
    </div>
  );
}

export default App;
