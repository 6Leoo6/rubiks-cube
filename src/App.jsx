import './App.css'
import {Vector3, Euler} from 'three';
import * as THREE from 'three';
import Piece from './piece.js'
import Colors from "./colors.js";

let animationHandlers = []

function App() {
  const clock = new THREE.Clock(true);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5
  camera.position.x = 0;
  
  const light = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
  light.position.set(1, 1, 1);
  scene.add(light);
  
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setAnimationLoop(() => animationFrameCallback(clock, renderer, scene, camera) );
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  let part = new Piece([Colors.white, Colors.green, Colors.orange]);
  
  scene.add(part.render(
    new Vector3(0, 0, 0),
    new Euler(0, 0, 0),
  ));
  
  renderer.render( scene, camera );
}

function animationFrameCallback(clock, renderer, scene, camera) {
  let deltaTime = clock.getDelta()
  
  for (const animationHandler of animationHandlers) {
    animationHandler(deltaTime);
  }
  
  renderer.render( scene, camera );
}


export default App
