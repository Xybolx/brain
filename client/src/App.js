import React, { useState, useMemo, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SocketContext from './components/socketContext';
import UserContext from './components/userContext';
import IsValidEmailContext from './components/isValidEmailContext';
import IsValidPasswordContext from './components/isValidPasswordContext';
import * as io from 'socket.io-client';
import TopNav from './components/navbar';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';
import Chat from './components/chat';
import LogOut from './components/logOut';
import { Container } from 'reactstrap';
import './App.css';

const socket = io("http://localhost:3001/");

const App = () => {

  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [isValidEmail, setIsValidEmail] = useState(false);

  const isValidEmailValue = useMemo(() => ({ isValidEmail, setIsValidEmail }), [isValidEmail, setIsValidEmail]);

  const [isValidPassword, setIsValidPassword] = useState(false);

  const isValidPasswordValue = useMemo(() => ({ isValidPassword, setIsValidPassword }), [isValidPassword, setIsValidPassword]);

  return (
    <Router>
      <TopNav />
      <Container style={{ textAlign: "center" }}>
        <Switch>
          <SocketContext.Provider value={socket}>
            <UserContext.Provider value={value}>
              <IsValidEmailContext.Provider value={isValidEmailValue}>
                <IsValidPasswordContext.Provider value={isValidPasswordValue}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/login" component={LogIn} />
                  <Route exact path="/chat" component={Chat} />
                  <Route exact path="/logout" component={LogOut} />
                </IsValidPasswordContext.Provider>
              </IsValidEmailContext.Provider>
            </UserContext.Provider>
          </SocketContext.Provider>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
