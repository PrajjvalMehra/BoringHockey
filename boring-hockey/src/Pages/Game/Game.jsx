
import './Game.css';
import Circle from '../../Components/Circle/Circle';
import Canvas from '../../Components/Canvas/Canvas';


function Game() {
  return (
    <div className="canvas-root">
      <div className="canvas-container">
        <Canvas >
        </Canvas>
      </div>
    </div>
  );
}

export default Game;
