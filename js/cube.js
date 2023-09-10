//Creates player object
import * as THREE from "three";

export function createCube() {
  const texture = new THREE.TextureLoader().load("assets/sliver.jpg");

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 10,
    specular: new THREE.Color("grey"),
  });

  const geometry = new THREE.CircleGeometry(1, 32);

  const cube = new THREE.Mesh(geometry, material);

  return cube;
}
