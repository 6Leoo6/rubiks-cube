import * as THREE from 'three';
import Colors from './colors.js';

class Part {
  constructor (_colors) {
    this.colors = _colors
    
    this.top = this.colors[0]
    this.front = this.colors[1]
    this.left = this.colors[2]
  }
  
  render (_position, _rotation) {
    this.position = _position ?? new THREE.Vector3();
    this.rotation = _rotation ?? new THREE.Euler();
    
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 ).toNonIndexed();
    this.material = new THREE.MeshBasicMaterial( { vertexColors: true } );
    
    this.geometry.setAttribute( 'color', new THREE.BufferAttribute(
      new Float32Array([
        ...Colors.black,
        ...Colors.black,
        ...this.left  ?? Colors.black,
        ...this.left  ?? Colors.black,
        ...this.top   ?? Colors.black,
        ...this.top   ?? Colors.black,
        ...Colors.black,
        ...Colors.black,
        ...this.front ?? Colors.black,
        ...this.front ?? Colors.black,
        ...Colors.black,
        ...Colors.black,
      ]
    ), 3 ) );
    
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    
    this.mesh.setRotationFromEuler(this.rotation);
    this.mesh.position.copy(this.position);
    
    return this.mesh;
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
  -Right (Blue)
  -Left (Green)
  -Top (White)
  -Bottom (Yellow)
  -Front (Red)
  -Back (Orange)
*/

/*
Order of rotations (Corner piece)
  0:
    -Top
    -Front
    -Left
  1:
    -
*/

export default Part;