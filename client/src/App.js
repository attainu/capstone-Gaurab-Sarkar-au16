import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";

// importing general components
import NavBar from "./components/general/NavBar";

//landing component
import Background from "./components/landing/Background";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Background} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
