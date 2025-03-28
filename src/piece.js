import * as THREE from 'three';
import Colors from './colors.js';
import {Euler} from "three";
import {rotateAroundAxis} from "./rotation.js";

class Piece {
  constructor (_engine, _colors, _localPosition, _localRotation) {
    this.engine = _engine;
    this.colors = _colors
    
    this.localPosition = _localPosition;
    this.localRotation = _localRotation;

    this.front = this.colors[0];
    this.top = this.colors[1];
    this.left = this.colors[2];
  }
  
  render (_cubePosition, _cubeRotation) {
    let position;
    let rotation = new THREE.Euler();
    
    if(_cubeRotation) {
      let rotationQ = new THREE.Quaternion();
      let cubeRotationQ = new THREE.Quaternion().setFromEuler(_cubeRotation);
      let localRotationQ = new THREE.Quaternion().setFromEuler(this.localRotation);
      
      rotationQ.multiplyQuaternions(cubeRotationQ, localRotationQ);
      rotation.setFromQuaternion(rotationQ);
      
      position = rotateAroundAxis(this.localPosition, rotation);
      console.log(this.localPosition, position, this.localRotation);
      
      position.x += _cubePosition.x;
      position.y += _cubePosition.y;
      position.z += _cubePosition.z;
    } else {
      rotation = this.localRotation.clone();
      
      position = this.localPosition.clone();
      
      position.x += _cubePosition.x;
      position.y += _cubePosition.y;
      position.z += _cubePosition.z;
    }
    
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 ).toNonIndexed();
    this.material = new THREE.MeshBasicMaterial( { vertexColors: true } );
    
    this.geometry.setAttribute( 'color', new THREE.BufferAttribute(
      new Float32Array(
        [
          ...Colors.white,
          ...Colors.black,
          ...this.left  ?? Colors.black,
          ...this.left  ?? Colors.black,
          ...this.top   ?? Colors.black,
          ...this.top   ?? Colors.black,
          ...Colors.white,
          ...Colors.black,
          ...this.front ?? Colors.black,
          ...this.front ?? Colors.black,
          ...Colors.white,
          ...Colors.black,
        ]
      ),
      3,
    ));
    
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    
    this.mesh.position.copy(position);
    this.mesh.setRotationFromEuler(rotation);
    
    this.engine.scene.add(this.mesh);
  }
  
  rotatingAnimation (deltaTime, {x = 0, y = 0, z = 0}) {
    if(x) {
      this.mesh.rotation.x += x * deltaTime
    }
    if(y) {
      this.mesh.rotation.y += y * deltaTime
    }
    if(z) {
      this.mesh.rotation.z += z * deltaTime
    }
  }
}

/*
Order of faces on a cube
  -Right (Red)
  -Left (Orange)
  -Top (White)
  -Bottom (Yellow)
  -Front (Green)
  -Back (Blue)
*/

/*
Order of rotations (Corner piece)
  -Front
  -Top
  -Left
*/

export default Piece;