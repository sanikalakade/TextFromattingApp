import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null); // Track login status

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setIsLoggedIn(false); // Update state to reflect the user is logged out
    showAlert("Logged out successfully", "success");
  };

  return (
    <>
      <Router>
        <Navbar title="TextFormatting" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Switch>
            <Route exact path="/about">
              <About mode={mode} />
            </Route>
            <Route exact path="/">
              <TextForm showAlert={showAlert} heading="Try TextFormatting - word counter, character counter, remove extra spaces" mode={mode} />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} setIsLoggedIn={setIsLoggedIn} /> {/* Pass setIsLoggedIn here */}
            </Route>
            <Route exact path="/logout">
              <Logout showAlert={showAlert} handleLogout={handleLogout} /> {/* Pass handleLogout here */}
            </Route>
            <Route exact path="/register">
              <Register showAlert={showAlert} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
