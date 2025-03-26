import Colors from "./colors.js";
import Side from "./side.js";
import Piece from "./piece.js";
import {Euler, Vector3} from "three";
import * as THREE from "three";
import {rotateAroundAxis} from "./rotation.js";

const pieceColors = [
  //Green side
  [Colors.green, Colors.white, Colors.orange],
  [Colors.green, Colors.white],
  [Colors.green, Colors.orange],
  [Colors.green, Colors.orange, Colors.yellow],
  [Colors.green, Colors.yellow],
  //Red side
  [Colors.red, Colors.white, Colors.green],
  [Colors.red, Colors.white],
  [Colors.red, Colors.green],
  [Colors.red, Colors.green, Colors.yellow],
  [Colors.red, Colors.yellow],
  //Blue side
  [Colors.blue, Colors.white, Colors.red],
  [Colors.blue, Colors.white],
  [Colors.blue, Colors.red],
  [Colors.blue, Colors.red, Colors.yellow],
  [Colors.blue, Colors.yellow],
  //Orange side
  [Colors.orange, Colors.white, Colors.blue],
  [Colors.orange, Colors.white],
  [Colors.orange, Colors.blue],
  [Colors.orange, Colors.blue, Colors.yellow],
  [Colors.orange, Colors.yellow],
];

const pieceLocalPositions = [
  new Vector3(-1, 1, 1),
  new Vector3(0, 1, 1),
  new Vector3(-1, 0, 1),
  new Vector3(-1, -1, 1),
  new Vector3(0, -1, 1),
];

const piecePerpendicularAxisRotation = [
  0,
  0,
  Math.PI / 2,
  Math.PI / 2,
  Math.PI,
];

const sideLocalRotations = {
  green: new Euler(0, 0, 0),
  red: new Euler(0, Math.PI / 2, 0),
  blue: new Euler(0, Math.PI, 0),
  orange: new Euler(0, -Math.PI / 2, 0),
  white: new Euler(-Math.PI / 2, 0, 0),
  yellow: new Euler(Math.PI / 2, 0, 0),
};

class Cube {
  constructor(_engine) {
    this.engine = _engine;
    
    this.sides = {};
    
    for (const color of Object.keys(Colors)) {
      if (color !== "black") {
        let localPosition = rotateAroundAxis(
          new Vector3(0, 0, 1),
          sideLocalRotations[color],
        );
        console.log(color, localPosition, sideLocalRotations[color])
        this.sides[color] = new Side(
          this.engine,
          Colors[color],
          localPosition,
          sideLocalRotations[color],
        );
      }
    }
    
    this.sides["green"].neighbours = {
      "top": this.sides["white"],
      "bottom": this.sides["yellow"],
      "left": this.sides["orange"],
      "right": this.sides["red"],
    };
    
    this.sides["red"].neighbours = {
      "top": this.sides["white"],
      "bottom": this.sides["yellow"],
      "left": this.sides["green"],
      "right": this.sides["blue"],
    };
    
    this.sides["blue"].neighbours = {
      "top": this.sides["white"],
      "bottom": this.sides["yellow"],
      "left": this.sides["red"],
      "right": this.sides["orange"],
    };
    
    this.sides["orange"].neighbours = {
      "top": this.sides["white"],
      "bottom": this.sides["yellow"],
      "left": this.sides["blue"],
      "right": this.sides["green"],
    };
    
    this.sides["white"].neighbours = {
      "top": this.sides["blue"],
      "bottom": this.sides["green"],
      "left": this.sides["orange"],
      "right": this.sides["red"],
    };
    
    this.sides["yellow"].neighbours = {
      "top": this.sides["green"],
      "bottom": this.sides["blue"],
      "left": this.sides["red"],
      "right": this.sides["orange"],
    };
    
    let i = 0;
    for (const pieceColor of pieceColors) {
      let angleOfRotation = Math.floor(i / 5) * Math.PI / 2
      let localPosition = new Vector3(
        Math.cos(angleOfRotation) * pieceLocalPositions[i % 5].x + Math.sin(angleOfRotation) * pieceLocalPositions[i % 5].z,
        pieceLocalPositions[i % 5].y,
        Math.cos(angleOfRotation) * pieceLocalPositions[i % 5].z - Math.sin(angleOfRotation) * pieceLocalPositions[i % 5].x,
      );
      
      let localRotation = new Euler(
        piecePerpendicularAxisRotation[i % 5] * Math.sin(angleOfRotation),
        angleOfRotation,
        Math.abs(piecePerpendicularAxisRotation[i % 5] * Math.cos(angleOfRotation)),
      );
      
      let piece = new Piece(this.engine, pieceColor, localPosition, localRotation);
      console.log(i + 1, localPosition, localRotation);
      for (const color of pieceColor) {
        let colorName;
        for (let [key, colorObject] of Object.entries(Colors)) {
          if (colorObject === color) {
            colorName = key;
            break;
          }
        }

        this.sides[colorName].pieces.add(piece);
      }
      
      i++;
    }
    
    this.render(new Vector3(0, 0, 0), new Euler(0, Math.PI / 4, 0), true);
  }
  
  render(_position, _rotation, initialRender=false) {
    this.position = _position ?? new THREE.Vector3();
    this.rotation = _rotation ?? new THREE.Euler();
    
    for (const side of Object.values(this.sides)) {
      side.render(this.position, this.rotation, initialRender);
    }
    
    this.engine.renderer.render(this.engine.scene, this.engine.camera);
  }
}

export default Cube;