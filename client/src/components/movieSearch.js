import React, { useState } from "react";
import moment from 'moment';
import API from '../utils/API';
import SocketContext from '../context/socketContext';
import useInput from './useInput';
import SearchDetail from './searchDetail';
import SearchForm from './searchForm';
import SubTitle from './subTitle';
import Spinner from './spinner';

const MovieSearch = ({ socket, toggle }) => {

    // State
    const [result, setResult] = useState({});
    const [values, handleChange, handleClearInputs] = useInput();

    // De-structure values
    const { search } = values;

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
        handleClearInputs();
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
        <>
            <SubTitle
                header="Search"
                icon={<i className="fas fa-search" />}
            />
            <div style={{ marginTop: 20, marginBottom: 60 }}>
                {result.Title ? (
                    <SearchDetail
                        title={result.Title}
                        onClick={saveMovie}
                        src={result.Poster}
                        released={moment(result.Released).format('M/D/YYYY')}
                        director={result.Director}
                        plot={result.Plot}
                    />
                ) : (
                        <Spinner
                            altMsg="No Result..."
                        />
                    )}
                <div style={{ marginTop: 20 }}>
                    <SearchForm
                        handleFormSubmit={handleFormSubmit}
                        inputType="search"
                        placeholder="Search for a movie"
                        value={search || ""}
                        name="search"
                        handleChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
}

const MovieSearchWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <MovieSearch {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MovieSearchWithSocket;

