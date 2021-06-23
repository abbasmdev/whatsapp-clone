import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import styles from "./App.module.css";

function App() {
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
