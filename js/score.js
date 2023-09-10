import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

let font;
let score = 0;
let scoreMesh;

export function createScore(callback) {
  const loader = new FontLoader();
  loader.load("fonts/Sukhumvit Set_Medium.json", function (loadedFont) {
    font = loadedFont;
    const geometry = new TextGeometry("Score: 0", {
      font: font,
      size: 0.5,
      height: 0.1,
    });

    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    scoreMesh = new THREE.Mesh(geometry, material);
    scoreMesh.position.set(-3, 3, 0);

    callback(scoreMesh);
  });
}

export function updateScore(delta) {
  score += delta;
  if (!scoreMesh || !font) {
    console.error("ScoreMesh or font not loaded yet.");
    return;
  }

  // Remove previous geometry
  scoreMesh.geometry.dispose();

  // Update the geometry with new score
  const newGeometry = new TextGeometry(`Score: ${score}`, {
    font: font,
    size: 0.5,
    height: 0.1,
  });
  scoreMesh.geometry = newGeometry;
  scoreMesh.material.needsUpdate = true;
}

export function resetScore() {
  score = 0;
  updateScore(0); // This will set the text back to "Score: 0"
}
