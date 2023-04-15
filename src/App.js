import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import React, { useState } from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [btnText, setBtnText] = useState('Dark Mode')

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.color = 'white'
      document.body.style.backgroundColor = 'black';
      showAlert("Dark mode has been enabled", "success");
      setBtnText('Light Mode')
    }
    else {
      setMode('light');
      document.body.style.color = 'black'
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
      setBtnText('Dark Mode')
    }
  }
  return (
    <>
      <Router>
        <Navbar title="Text Utility" mode={mode} toggleMode={toggleMode} btnText={btnText} key={new Date()} />
        <div className="container my-3">

          <Switch>

            <Route exact path="/about">
              <About mode={mode} />
            </Route>

            <Route exact path="/">
              <TextForm showAlert={showAlert} heading="Welcome to Text Utility :-)" mode={mode} />
            </Route>

          </Switch>

          <Alert alert={alert} />
        </div>
      </Router>
    </>
  );
}

export default App;