import {Euler, Vector3} from "three";

class Side {
  constructor(_color,  _pieces, { _size = 3 }) {
    this.color = _color;
    this.pieces = _pieces;
    this.size = _size;
    
    this.neighbours = {
      "top": null,
      "bottom": null,
      "left": null,
      "right": null,
    }
  }
}