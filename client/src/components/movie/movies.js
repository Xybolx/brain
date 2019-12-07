import React, { useState, useEffect, useContext } from "react";
import { Carousel, CarouselItem, CarouselIndicators, CarouselControl } from 'reactstrap';
import moment from 'moment';
import API from '../../utils/API';
import SocketContext from '../../context/socketContext';
import RoomContext from '../../context/roomContext';
import UserContext from '../../context/userContext';
import MovieDetail from './movieDetail';
import { Spinner } from '../../components/spinner';
import SubTitle from '../headers/subTitle';
import './movies.css';

const Movies = ({ socket, messages, items, getMovies }) => {

    // Context
    const { room, setRoom } = useContext(RoomContext);
    const { user } = useContext(UserContext);

    // State
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
    };

    const handleSetRoom = id => {
        if (room) {
            socket.emit('SEND_LEAVE_ROOM', {
                room: room,
                user: user.username
            })
            API.getMovie(id)
                .then(res => {
                    socket.emit('SEND_JOIN_ROOM', {
                        room: res.data.title,
                        user: user.username
                    })
                })
                .catch(err => console.log(err))
        } else {
            API.getMovie(id)
                .then(res => {
                    socket.emit('SEND_JOIN_ROOM', {
                        room: res.data.title,
                        user: user.username
                    })
                })
                .catch(err => console.log(err))
        }
    };

    useEffect(() => {

        const goToIndex = newIndex => {
                setActiveIndex(newIndex);
                getMovies();
        };

        socket.on('RECEIVE_MOVIE', data => {
            if (data) {
                goToIndex(0);
            }
        });
        return () => {
            socket.off('RECEIVE_MOVIE');
        };
    }, [socket, getMovies]);

    useEffect(() => {
        socket.on('RECEIVE_JOIN_ROOM', data => {
            if (data) {
                setRoom(data.room);
            }
        });
        return () => {
            socket.off('RECEIVE_JOIN_ROOM');
        };
    }, [socket, setRoom])

    useEffect(() => {
        socket.on('RECEIVE_LEAVE_ROOM', data => {
            if (data) {
                console.log(`You left the ${data.room} room!`);
            }
        });
        return () => {
            socket.off('RECEIVE_LEAVE_ROOM');
        };
    }, [socket])

    const containerStyle = {
        marginBottom: 30
    };

    return (
        <div style={containerStyle}>
            <SubTitle
                number={items.length ? items.length : ""}
                icon={<i className="fas fa-film" />}
                header="Reviewed"
            />
            {items.length ? (
                <Carousel
                    slide={false}
                    pause="hover"
                    keyboard={false}
                    interval={false}
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                >
                    <CarouselIndicators
                        items={items}
                        activeIndex={activeIndex}
                        onClickHandler={goToIndex}
                    />
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
                                    released={moment(item.released, 'DD-MMM-YYYY').format('M/D/YYYY')}
                                    director={item.director}
                                    plot={item.plot}
                                    messages={messages}
                                />
                            </CarouselItem>
                        );
                    })}
                    <CarouselControl
                        direction="prev"
                        onClickHandler={previous}
                    >
                    </CarouselControl>
                    <CarouselControl
                        direction="next"
                        onClickHandler={next}
                    >
                    </CarouselControl>
                </Carousel>
            ) : (
                    <Spinner
                        altMsg="Loading..."
                    />
                )}
        </div>
    );
}

const MoviesWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Movies {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MoviesWithSocket;