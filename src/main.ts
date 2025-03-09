import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

console.log("hi");
// Initialize Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Increased intensity
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
pointLight2.position.set(-5, 5, 5);
scene.add(pointLight2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(0, 10, 0);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.5;
scene.add(spotLight);

// Load GLTF Model
const loader = new GLTFLoader();
loader.load('./public/Scenes/WebsiteScene.glb', (gltf: GLTF) => { // Use relative path
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
  renderer.render(scene, camera);
}
animate();
