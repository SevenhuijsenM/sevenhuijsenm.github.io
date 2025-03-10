import * as THREE from 'three';

export class SkyBox {
    private readonly scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.loadSkyBox();
    }

    private loadSkyBox() {
        const skyboxLoader = new THREE.CubeTextureLoader();
        const skybox = skyboxLoader.load([
            'textures/skybox/px.png', 'textures/skybox/nx.png',
            'textures/skybox/py.png', 'textures/skybox/ny.png',
            'textures/skybox/pz.png', 'textures/skybox/nz.png'
        ]);
        this.scene.background = skybox;
    }
}