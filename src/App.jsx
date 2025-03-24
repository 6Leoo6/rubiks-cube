import './App.css'
import * as THREE from 'three';
import Cube from "./cube.js";


let animationHandlers = []

function App() {
  const clock = new THREE.Clock(true);
  
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 10
  camera.position.x = 3;
  camera.position.y = -3;
  
  const light = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
  light.position.set(1, 1, 1);
  scene.add(light);
  
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setAnimationLoop(() => animationFrameCallback(clock, renderer, scene, camera) );
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  const engine = {
    clock: clock,
    scene: scene,
    camera: camera,
    light: light,
    renderer: renderer,
  };
  
  let cube = new Cube(engine);
}

function animationFrameCallback(clock, renderer, scene, camera) {
  let deltaTime = clock.getDelta()
  
  for (const animationHandler of animationHandlers) {
    animationHandler(deltaTime);
  }
  
  renderer.render( scene, camera );
}


export default App;
