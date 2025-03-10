import * as THREE from 'three';

export function setupSkyBox(scene: THREE.Scene) {
    const skyboxLoader = new THREE.CubeTextureLoader();
    const skybox = skyboxLoader.load([
        'textures/skybox/px.png', 'textures/skybox/nx.png',
        'textures/skybox/py.png', 'textures/skybox/ny.png',
        'textures/skybox/pz.png', 'textures/skybox/nz.png'
    ]);
    scene.background = skybox;
}
