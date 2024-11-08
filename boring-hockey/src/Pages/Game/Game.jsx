
import './Game.css';
import Canvas from '../../Components/Canvas/Canvas';
import { GameProvider } from '../../context/GameContext';


function Game() {
  return (
    <GameProvider>
      <div className="canvas-root">
        <Canvas />
      </div>
    </GameProvider>
  );
}

export default Game;
