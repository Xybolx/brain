import React, { useState, useEffect, useContext } from "react";
import { Carousel, CarouselItem, CarouselIndicators, CarouselControl, Container } from 'reactstrap';
import moment from 'moment';
import SocketContext from '../context/socketContext';
import RoomContext from '../context/roomContext';
import UserContext from '../context/userContext';
import MovieDetail from './movieDetail';
import Spinner from './spinner';
import API from "../utils/API";

const Movies = props => {

    // Context
    const { setRoom } = useContext(RoomContext);
    const { user } = useContext(UserContext);

    // State
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Carousel functions
    const onExiting = () => {
        setIsAnimating(true);
    }

    const onExited = () => {
        setIsAnimating(false);
    }

    const next = () => {
        if (isAnimating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (isAnimating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = newIndex => {
        if (isAnimating) return;
        setActiveIndex(newIndex);
    }

    const handleSetRoom = id => {
        API.getMovie(id)
            .then(res => {
                props.socket.emit('SEND_JOIN_ROOM', {
                    room: res.data.title,
                    user: user.username
                })
            })
            .catch(err => console.log(err))
    }
    // Get and set state
    useEffect(() => {
        API.getMovies()
            .then(res => setItems(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        props.socket.on('RECEIVE_MOVIE', data => {
            if (data) {
                console.log('receive movie: ' + data)
                API.getMovies()
                    .then(res => setItems(res.data))
                    .catch(err => console.log(err))
            }
        });
        return () => {
            props.socket.off('RECEIVE_MOVIE');
        };
    }, [props.socket])

    useEffect(() => {
        props.socket.on('RECEIVE_JOIN_ROOM', data => {
            if (data) {
                console.log(data);
                setRoom(data.room);
            }
        });
        return () => {
            props.socket.off('RECEIVE_JOIN_ROOM');
        };
    }, [props.socket, setRoom])

    return (
        <Container style={{ marginBottom: 20 }}>
            <h4>{items.length ? items.length : ""} <i className="fas fa-film" /> Reviewed</h4>
            {items.length ? (
                <Carousel
                    pause="hover"
                    keyboard={false}
                    interval={false}
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {items.map(item => {
                        return (
                            <CarouselItem
                                onExiting={onExiting}
                                onExited={onExited}
                                key={item._id}
                            >
                                <MovieDetail
                                    title={item.title}
                                    onClick={() => handleSetRoom(item._id)}
                                    src={item.src}
                                    released={moment(item.released).format('M/D/YYYY')}
                                    director={item.director}
                                    plot={item.plot}
                                    genre={item.genre}
                                />
                            </CarouselItem>
                        );
                    })}
                    <CarouselControl  style={ props.isOpen ? { display: 'none' } : { display: 'flex' }} direction="prev" onClickHandler={previous}></CarouselControl>
                    <CarouselControl  style={ props.isOpen ? { display: 'none' } : { display: 'flex' }} direction="next" onClickHandler={next}></CarouselControl>
                </Carousel>
            ) : (
                    <Spinner
                        altMsg="Loading..."
                    />
                )}
        </Container>
    );
}

const MoviesWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Movies {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MoviesWithSocket;