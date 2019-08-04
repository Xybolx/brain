import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as io from 'socket.io-client';
import UserContext from './components/context/userContext';
import SocketContext from './components/context/socketContext';
import IsValidEmailContext from './components/context/isValidEmailContext';
import IsValidPasswordContext from './components/context/isValidPasswordContext';
import IsValidUsernameContext from './components/context/isValidUsernameContext';
import MovieContext from './components/context/movieContext';
import RoomContext from './components/context/roomContext';
import TopNav from './components/navbar';
import Title from './components/title';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';
import Chat from './components/chat';
import LogOut from './components/logOut';
import { Container } from 'reactstrap';
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
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [movie, setMovie] = useState({});
  const [room, setRoom] = useState(null);

  // Memo
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const isValidEmailValue = useMemo(() => ({ isValidEmail, setIsValidEmail }), [isValidEmail, setIsValidEmail]);
  const isValidPasswordValue = useMemo(() => ({ isValidPassword, setIsValidPassword }), [isValidPassword, setIsValidPassword]);
  const isValidUsernameValue = useMemo(() => ({ isValidUsername, setIsValidUsername }), [isValidUsername, setIsValidUsername]);
  const movieValue = useMemo(() => ({ movie, setMovie }), [movie, setMovie]);
  const roomValue = useMemo(() => ({ room, setRoom }), [room, setRoom]);

  return (
    <Router>
      <TopNav />
      <Container style={{ textAlign: "center" }}>
        <Title />
        <Switch>
          <SocketContext.Provider value={socket}>
            <UserContext.Provider value={value}>
              <IsValidEmailContext.Provider value={isValidEmailValue}>
                <IsValidPasswordContext.Provider value={isValidPasswordValue}>
                  <IsValidUsernameContext.Provider value={isValidUsernameValue}>
                    <MovieContext.Provider value={movieValue}>
                      <RoomContext.Provider value={roomValue}>
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
                      </RoomContext.Provider>
                    </MovieContext.Provider>
                  </IsValidUsernameContext.Provider>
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
