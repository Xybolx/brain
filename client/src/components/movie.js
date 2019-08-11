import React, { useState } from "react";
import { Container, Input, InputGroup, InputGroupAddon, Form, FormGroup, Button } from 'reactstrap';
import moment from 'moment';
import SocketContext from '../context/socketContext';
import SearchDetail from './searchDetail';
import Spinner from './spinner';
import API from '../utils/API';

const Movie = ({ socket, toggle }) => {

    // State
    const [result, setResult] = useState({});
    const [search, setSearch] = useState('');

    // Handle input change(search)
    const handleChange = ev => {
        setSearch(ev.target.value);
    };

    // Save a movie to the database
    const saveMovie = () => {
        API.saveMovie({
            title: result.Title,
            src: result.Poster,
            director: result.Director,
            genre: result.Genre,
            released: result.Released,
            plot: result.Plot
        })
            .then(() => {
                socket.emit('SEND_MOVIE', {
                    title: result.Title,
                    src: result.Poster,
                    director: result.Director,
                    genre: result.Genre,
                    released: result.Released,
                    plot: result.Plot
                })
            })
            .catch(err => console.log(err))
        toggle();
        setSearch('');
        setResult({});
    };

    // When form is submitted search the OMDB API for the value of `search`
    const handleFormSubmit = ev => {
        ev.preventDefault();
        if (search) {
            API.searchMovie(search)
                .then(res => setResult(res.data))
                .catch(err => console.log(err))
        }
    };

    return (
        <Container>
            <h4><i className="fas fa-search" /> Search</h4>
            <div style={{ marginTop: 20, marginBottom: 60 }}>
                {result.Title ? (
                    <SearchDetail
                        title={result.Title}
                        onClick={saveMovie}
                        src={result.Poster}
                        released={moment(result.Released).format('M/D/YYYY')}
                        director={result.Director}
                        plot={result.Plot}
                        genre={result.Genre}
                    />
                ) : (
                        <Spinner
                            altMsg="No Result..."
                        />
                    )}
                <div style={{ marginTop: 20 }}>
                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <InputGroup>
                                <Input
                                    type="text"
                                    placeholder="Search"
                                    value={search}
                                    name="search"
                                    onChange={handleChange}
                                />
                                <InputGroupAddon
                                    addonType="append"
                                >
                                    <Button
                                        type="submit"
                                        color="dark"
                                    >
                                        <i className="fas fa-search" />
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

const MovieWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Movie {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MovieWithSocket;

