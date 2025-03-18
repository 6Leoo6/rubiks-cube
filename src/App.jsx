import './App.css'
import {Vector3, Euler} from 'three';
import * as THREE from 'three';
import Part from './part.js'
import Colors from "./colors.js";

let animationHandlers = []

function App() {
  const clock = new THREE.Clock(true);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5
  camera.position.y = 0;
  
  const light = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
  light.position.set(1, 1, 1);
  scene.add(light);
  
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setAnimationLoop(() => animationFrameCallback(clock, renderer, scene, camera) );
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  let part = new Part(
    [Colors.white, Colors.blue, Colors.red],
    new Euler(0, 0, 0),
    new Vector3(0, 0, 0),
  );
      
  animationHandlers.push((deltaTime) => part.rotatingAnimation(deltaTime, {x: 0.5, y: 0.5}));
  
  scene.add(part.render());
  
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
