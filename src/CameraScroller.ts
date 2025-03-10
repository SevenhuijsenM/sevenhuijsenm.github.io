import * as THREE from 'three';
import gsap from 'gsap';

const SCROLL_SPEED = 0.0001;
const MIN_SCROLL = 0;
const MAX_SCROLL = 1;
const CAMERA_SMOOTHING = 0.01;

const PATH_POINTS = [
    {position: new THREE.Vector3(140, 10, 80), progress: 0},
    {position: new THREE.Vector3(140, 15, 130), progress: 0.1},
    {position: new THREE.Vector3(70, 15, 130), progress: 0.2},
    {position: new THREE.Vector3(70, 10, 80), progress: 0.3},
    {position: new THREE.Vector3(70, 5, 60), progress: 0.4},
    {position: new THREE.Vector3(50, 5, 50), progress: 0.5},
    {position: new THREE.Vector3(50, 5, 30), progress: 0.6},
    {position: new THREE.Vector3(50, 5, 30), progress: 1}
];

const LOOK_AT_POINTS = [
    {position: new THREE.Vector3(100, 10, 200), progress: 0},
    {position: new THREE.Vector3(0, 30, 100), progress: 0.7},
    {position: new THREE.Vector3(0, 10, -100), progress: 0.15},
    {position: new THREE.Vector3(-100, 10, -100), progress: 0.4},
    {position: new THREE.Vector3(-100, 10, -100), progress: 0.5},
    {position: new THREE.Vector3(-100, 10, -100), progress: 1}
];

const PATH = new THREE.CatmullRomCurve3(PATH_POINTS.map(p => p.position));
const LOOK_AT_PATH = new THREE.CatmullRomCurve3(LOOK_AT_POINTS.map(p => p.position));

export class CameraScroller {
    private readonly camera: THREE.Camera;
    private scrollProgress: number;
    private readonly targetLookAt: THREE.Vector3;

    constructor(camera: THREE.Camera) {
        this.camera = camera;
        this.scrollProgress = 0;
        this.targetLookAt = LOOK_AT_PATH.getPoint(this.scrollProgress);

        this.camera.position.copy(PATH.getPoint(this.scrollProgress));
        this.camera.lookAt(this.targetLookAt);

        window.addEventListener("wheel", (event) => this.handleScroll(event));
    }

    private handleScroll(event: WheelEvent) {
        this.scrollProgress += event.deltaY * SCROLL_SPEED;
        this.scrollProgress = Math.max(MIN_SCROLL, Math.min(this.scrollProgress, MAX_SCROLL));
    
        const position = PATH.getPoint(this.scrollProgress);
        const lookAtPosition = LOOK_AT_PATH.getPoint(this.scrollProgress);
        gsap.to(this.camera.position, { 
            x: position.x, 
            y: position.y, 
            z: position.z, 
            duration: 0.5, 
            ease: "power2.out" 
        });
        
        this.targetLookAt.lerp(lookAtPosition, 0.1);
        gsap.to({}, { 
            duration: 0.5, 
            ease: "power2.out", 
            onUpdate: () => {
                this.camera.lookAt(this.targetLookAt);
            }
        });
    }
}
