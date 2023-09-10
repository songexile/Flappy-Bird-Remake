import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

let score = 0;
let scoreMesh; // This will hold our 3D text mesh

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let font; // Declare the font variable at a higher scope

const loader = new FontLoader();
loader.load("fonts/Sukhumvit Set_Medium.json", function (loadedFont) {
  font = loadedFont; // Store the loaded font in our higher-scoped variable

  const geometry = new TextGeometry("Score: 0", {
    font: font,
    size: 0.5,
    height: 0.1,
  });

  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  scoreMesh = new THREE.Mesh(geometry, material);
  scoreMesh.position.set(-3, 3, 0);
  scene.add(scoreMesh);
});

function updateScore(value) {
  score += value;
  scene.remove(scoreMesh);

  const newGeometry = new TextGeometry(`Score: ${score}`, {
    font: font,
    size: 0.5,
    height: 0.1,
  });

  scoreMesh.geometry.dispose(); // Dispose of the old geometry to free up resources
  scoreMesh.geometry = newGeometry;
  scene.add(scoreMesh);
}

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

let velocity = 0; // Starting velocity
const gravity = -0.001; // Negative value because it's pulling the object downwards
const ceiling = 4; // The maximum height the cube can jump
const floor = -3; // The minimum height the cube can jump

function animate() {
  fall();
  checkDeath();
  renderer.render(scene, camera);
  requestAnimationFrame(animate); // Moved this here for a continuous loop
}

function fall() {
  // Apply gravity to velocity
  velocity += gravity;

  // Update cube position using velocity
  cube.position.y += velocity;

  // Stop the cube from falling through the "floor"
  if (cube.position.y <= floor) {
    cube.position.y = floor;
    velocity = 0; // stop the velocity when it hits the ground
  }

  if (cube.position.y >= ceiling) {
    cube.position.y = ceiling;
    velocity = 0;
  }
}

function jump() {
  velocity += 0.1; // This value can be adjusted based on how high you want the cube to jump
}

function jumpButton(event) {
  jump();
  updateScore(1);
}

function checkDeath() {
  if (cube.position.y <= floor) {
    cube.position.y = floor;
    console.log("You died!");
    updateScore(-1);
  }
}

document.addEventListener("click", jumpButton, false);
document.addEventListener("keydown", jumpButton, false);

animate(); // Start the animation loop
