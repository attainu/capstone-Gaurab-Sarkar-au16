import React, {useEffect} from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

// importing general components
import NavBar from "./components/general/NavBar";

//landing component
import Background from "./components/landing/Background";

// user components 
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";
import "antd/dist/antd.css"

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(()=>{
    store.dispatch(setCurrentUser)
  }, [])
  
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Background} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
