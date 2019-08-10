import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as io from 'socket.io-client';
import UserContext from './context/userContext';
import UsersContext from './context/usersContext';
import SocketContext from './context/socketContext';
import IsValidEmailContext from './context/isValidEmailContext';
import IsValidPasswordContext from './context/isValidPasswordContext';
import IsValidUsernameContext from './context/isValidUsernameContext';
import RoomContext from './context/roomContext';
import TopNav from './components/navbar';
import Title from './components/title';
import Home from './pages/home';
import SignUp from './pages/signup';
import LogIn from './pages/login';
import Chat from './pages/chat';
import LogOut from './pages/logOut';
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
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);

  // Memo
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const isValidEmailValue = useMemo(() => ({ isValidEmail, setIsValidEmail }), [isValidEmail, setIsValidEmail]);
  const isValidPasswordValue = useMemo(() => ({ isValidPassword, setIsValidPassword }), [isValidPassword, setIsValidPassword]);
  const isValidUsernameValue = useMemo(() => ({ isValidUsername, setIsValidUsername }), [isValidUsername, setIsValidUsername]);
  const roomValue = useMemo(() => ({ room, setRoom }), [room, setRoom]);
  const usersValue = useMemo(() => ({ users, setUsers }), [users, setUsers]);

  return (
    <Router>
      <TopNav />
      <Container style={{ textAlign: "center" }}>
        <Title />
        <Switch>
          <SocketContext.Provider value={socket}>
            <UserContext.Provider value={userValue}>
              <IsValidEmailContext.Provider value={isValidEmailValue}>
                <IsValidPasswordContext.Provider value={isValidPasswordValue}>
                  <IsValidUsernameContext.Provider value={isValidUsernameValue}>
                    <RoomContext.Provider value={roomValue}>
                      <UsersContext.Provider value={usersValue}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/login" component={LogIn} />
                        <Route exact path="/chat" render={() => (
                          userValue.user !== null && userValue.user !== "" ? (
                            <Chat />
                          ) : (
                              <Redirect to="/logout" />
                            )
                        )} />
                        <Route exact path="/logout" component={LogOut} />
                      </UsersContext.Provider>
                    </RoomContext.Provider>
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
