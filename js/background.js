import * as THREE from "three";
import { randFloat } from "three/src/math/MathUtils";

export function createBackground() {
  const group = new THREE.Group();
  const texture = new THREE.TextureLoader().load("assets/sliver.jpg");

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 10,
    specular: new THREE.Color("grey"),
  });
  for (let i = 0; i < 200; i++) {
    let x = randFloat(1, 6);
    const geometry = new THREE.BoxGeometry(x, randFloat(0, 5), x);

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = Math.random() * 20 - 10;
    cube.position.y = -5;
    cube.position.z = Math.random() * -20 - 1;

    group.add(cube);
  }

  return group;
}
