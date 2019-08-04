import React, { useState, useEffect, useContext } from "react";
import { Button, Carousel, CarouselItem, CarouselIndicators, CarouselControl, Container } from 'reactstrap';
import moment from 'moment';
import SocketContext from './context/socketContext';
import RoomContext from './context/roomContext';
import UserContext from './context/userContext';
import MovieDetail from './movieDetail';
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
            <Carousel
                pause="hover"
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
                            <Button onClick={() => handleSetRoom(item._id)} type="button" color="link" size="lg"><i className="fas fa-film" /> Rate This Title</Button>
                            <MovieDetail
                                title={item.title}
                                src={item.src}
                                director={item.director}
                                genre={item.genre}
                                released={moment(item.released).format('M/D/YYYY')}
                            />
                        </CarouselItem>
                    );
                })}
                <CarouselControl direction="prev" onClickHandler={previous}></CarouselControl>
                <CarouselControl direction="next" onClickHandler={next}></CarouselControl>
            </Carousel>
        </Container>
    );
}

const MoviesWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Movies {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MoviesWithSocket;