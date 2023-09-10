import * as THREE from "three";
import { createCube } from "./cube.js";
import { initControls } from "./controls.js";
import { createScore, updateScore, resetScore } from "./score.js";

let isGameOver = false;
let gameOverMesh;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// This function is async, when create score is created we add to scene
createScore(function (scoreMesh) {
  console.log(scoreMesh);
  scene.add(scoreMesh);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = createCube();
scene.add(cube);

camera.position.z = 5;

let velocity = 0;
const gravity = -0.001;
const ceiling = 4;
const floor = -3;

function animate() {
  fall();
  checkDeath();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function fall() {
  velocity += gravity;
  cube.position.y += velocity;
  if (cube.position.y <= floor) {
    cube.position.y = floor;
    velocity = 0;
  }
  if (cube.position.y >= ceiling) {
    cube.position.y = ceiling;
    velocity = 0;
  }
}

function jump() {
  velocity += 0.1;
  updateScore(2);
}

function checkDeath() {
  if (cube.position.y <= floor && !isGameOver) {
    isGameOver = true;
    console.log("You died!");

    window.addEventListener("keydown", handleInput); // Event listener, to reset game
    window.addEventListener("click", handleInput);
    isGameOver = false;
  }
}

function handleInput(event) {
  // If the input is not a spacebar press (key code 32) or a click, return
  if (event.type === "keydown" && event.keyCode !== 32) {
    return;
  }

  // Remove the event listeners
  window.removeEventListener("keydown", handleInput);
  window.removeEventListener("click", handleInput);

  resetGame();
}

function resetGame() {
  resetScore();

  cube.position.y = 0;
}

initControls({ jump });
animate();
