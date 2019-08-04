import React, { useState } from "react";
import { Container, Input, Form, FormGroup, Label, Button, Collapse } from 'reactstrap';
import moment from 'moment';
import SocketContext from './context/socketContext';
import MovieDetail from "./movieDetail";
import API from "../utils/API";

const Movie = props => {

    // State
    const [result, setResult] = useState({});
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Handle input change(search)
    const handleChange = ev => {
        setSearch(ev.target.value);
    };

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // Save a movie to the database
    const saveMovie = () => {
        API.saveMovie({
            title: result.Title,
            src: result.Poster,
            director: result.Director,
            genre: result.Genre,
            released: result.Released
        })
            .then(() => {
                props.socket.emit('SEND_MOVIE', {
                    title: result.Title,
                    src: result.Poster,
                    director: result.Director,
                    genre: result.Genre,
                    released: result.Released
                })
            })
            .catch(err => console.log(err))
        setIsOpen(!isOpen);
        setSearch('');
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
            <Button onClick={toggle} color="link" size="md"><i className="fas fa-search" />{isOpen ? "Close" : "Search"}</Button>
            <Collapse isOpen={isOpen}>
                <Container style={{ marginTop: 30, marginBottom: 30 }}>
                    <h4>Search</h4>
                    {result.Title ? (
                        <MovieDetail
                            title={result.Title}
                            src={result.Poster}
                            director={result.Director}
                            genre={result.Genre}
                            released={moment(result.Released).format('D/M/YYYY')}
                        />
                    ) : (
                            <h5>No Results</h5>
                        )}
                    <Container>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label style={{ marginLeft: 5 }} htmlFor="search">Search</Label>
                                <Input
                                    type="text"
                                    placeholder="Search for a movie"
                                    value={search}
                                    name="search"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button type="submit" color="info" size="sm"><i className="fas fa-search" /> Search</Button>
                            <Button onClick={saveMovie} style={result.Title ? { display: 'inline' } : { display: 'none' }} type="button" color="info" size="sm">Save Movie</Button>
                        </Form>
                    </Container>
                </Container>
            </Collapse>
        </Container>
    );
}

const MovieWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Movie {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MovieWithSocket;

