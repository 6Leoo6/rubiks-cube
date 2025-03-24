import {Euler, Vector3} from "three";
import Piece from "./piece.js";
import Colors from "./colors.js";

class Side {
  constructor(_engine, _color, _localPosition, _localRotation, _size = 3) {
    this.engine = _engine;
    this.color = _color;
    
    this.localPosition = _localPosition;
    this.localRotation = _localRotation;
    
    this.size = _size;
    
    this.neighbours = {
      "top": null,
      "bottom": null,
      "left": null,
      "right": null,
    };
    this.pieces = new Set();
    this.pieces.add(
      new Piece(
        this.engine,
        [this.color],
        this.localPosition,
        this.localRotation,
      )
    );
  }
  
  render(_position, _rotation, initialRender=false) {
    let worldPosition = _position;
    let worldRotation = _rotation;
    
    for (const piece of this.pieces) {
      if (initialRender && !piece.mesh) {
        piece.render(worldPosition, worldRotation);
      }
    }
  }
}

export default Side;