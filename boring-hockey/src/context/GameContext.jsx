/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, setState] = useState({
        score: 0,
    });

    return (
        <GameContext.Provider value={{ state, setState }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;