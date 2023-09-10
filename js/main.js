import * as THREE from "three";
import { createCube } from "./cube.js";
import { initControls } from "./controls.js";
import { createScore, updateScore, resetScore } from "./score.js";
import { createBackground } from "./background.js";

const fov = 100;
const cubeHeight = 1;
const cameraZPosition = 5;
// Setup
function setupScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = cameraZPosition;
  //const buildings = createBackground();
  //scene.add(buildings);
  const directionalLight = new THREE.DirectionalLight(0x2e8ae1, 2.5);
  directionalLight.position.set(1, 1, 1);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  scene.add(directionalLight);
  scene.fog = new THREE.Fog(1);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return { scene, camera, renderer };
}

// Main
function main() {
  const { scene, camera, renderer } = setupScene();
  const cube = createCube();
  const playerBox = new THREE.Box3();

  scene.add(cube);

  let velocity = 0;
  const h = 2 * cameraZPosition * Math.tan((fov * Math.PI) / 180 / 2);
  const gravity = -0.001;
  const ceiling = (h - cubeHeight) / 2;
  const floor = -ceiling;
  let isGameOver = false;

  function fall() {
    velocity += gravity;
    cube.position.y += velocity;
    if (cube.position.y <= floor) {
      cube.position.y = floor;
      velocity = 0;
    } else if (cube.position.y >= ceiling) {
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
      addEventListeners();
    }
  }

  function addEventListeners() {
    window.addEventListener("keydown", handleInput);
    window.addEventListener("click", handleInput);
  }

  function removeEventListeners() {
    window.removeEventListener("keydown", handleInput);
    window.removeEventListener("click", handleInput);
  }

  function handleInput(event) {
    if (event.type === "keydown" && event.keyCode !== 32) return;
    removeEventListeners();
    resetGame();
  }

  function resetGame() {
    resetScore();
    cube.position.y = 0;
    isGameOver = false;
  }

  function animate() {
    fall();
    checkDeath();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  createScore((scoreMesh) => {
    console.log(scoreMesh);
    scene.add(scoreMesh);
  });

  initControls({ jump });
  animate();
}

main();
