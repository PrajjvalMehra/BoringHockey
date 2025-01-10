/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { connect, io } from 'socket.io-client';
import Ball from '../engine/Ball'


const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, setState] = useState({
        score: 0,
    });

    const [balls, setBalls] = useState([
        new Ball(230, 50, 30, 'red'),
        new Ball(230, 650, 30, 'blue'),
        new Ball(230, 350, 20, 'green')
    ]);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const socketInstance = io('http://localhost:3001');
        setSocket(socketInstance);

        // listen for events emitted by the server

        socketInstance.on('connect', () => {
            console.log('Connected to server');
        });

        socketInstance.on('message', (data) => {
            console.log(`Received message: ${data}`);
        });

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };
    }, []);

    return (
        <GameContext.Provider value={{ state, setState, socket, balls, setBalls }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;