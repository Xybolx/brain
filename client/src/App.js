import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as io from 'socket.io-client';
import UserContext from './components/userContext';
import SocketContext from './components/socketContext';
import IsValidEmailContext from './components/isValidEmailContext';
import IsValidPasswordContext from './components/isValidPasswordContext';
import TopNav from './components/navbar';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';
import Chat from './components/chat';
import LogOut from './components/logOut';
import { Container, Col, Row } from 'reactstrap';
import './App.css';

const socket = io();

socket.on('connect', () => {
  let id = socket.io.engine.id;
  console.log('A user connected on: ' + id);
});

socket.on('disconnect', () => {
  let id = socket.io.engine.id;
  console.log('A user disconnected from: ' + id);
});

const App = () => {

  // State
  const [user, setUser] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  // Memo
  const value = useMemo(() =>
    ({ user, setUser }),
    [user, setUser]);
  const isValidEmailValue = useMemo(() =>
    ({ isValidEmail, setIsValidEmail }),
    [isValidEmail, setIsValidEmail]);
  const isValidPasswordValue = useMemo(() =>
    ({ isValidPassword, setIsValidPassword }),
    [isValidPassword, setIsValidPassword]);

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
                  <Route exact path="/chat" render={() => (
                    value.user !== null && value.user !== "" ? (
                      <Chat />
                    ) : (
                        <Redirect to="/logout" />
                      )
                  )} />
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
