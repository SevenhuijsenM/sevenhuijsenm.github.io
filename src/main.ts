import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

// Initialize Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Debugging: Add a simple cube
const debugGeometry = new THREE.BoxGeometry(1, 1, 1);
const debugMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const debugCube = new THREE.Mesh(debugGeometry, debugMaterial);
scene.add(debugCube);
debugCube.position.set(0, 0, 0);

// Load GLTF Model
const loader = new GLTFLoader();
loader.load('Scenes/TestScene.gltf', (gltf: GLTF) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    scene.add(model);
}, undefined, (error: any) => {
    console.error('Error loading GLTF model:', error);
});

// Add Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(2, 2, 5);
controls.update();

// Resize Handling
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  debugCube.rotation.y += 0.01; // Rotate cube to ensure visibility
  renderer.render(scene, camera);
}
animate();
