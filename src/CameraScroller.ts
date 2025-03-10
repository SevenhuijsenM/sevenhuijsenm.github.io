import * as THREE from 'three';
import gsap from 'gsap';

const SCROLL_SPEED = 0.0001;
const MIN_SCROLL = 0;
const MAX_SCROLL = 1;
const CAMERA_SMOOTHING = 0.1;

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

export function setupCameraScroller(camera: THREE.Camera) {
    let scrollProgress = 0;
    const targetLookAt = LOOK_AT_PATH.getPoint(scrollProgress);

    camera.position.copy(PATH.getPoint(scrollProgress));
    camera.lookAt(targetLookAt);

    function handleScroll(event: WheelEvent) {
        scrollProgress += event.deltaY * SCROLL_SPEED;
        scrollProgress = Math.max(MIN_SCROLL, Math.min(scrollProgress, MAX_SCROLL));
    
        const position = PATH.getPoint(scrollProgress);
        const lookAtPosition = LOOK_AT_PATH.getPoint(scrollProgress);
        
        gsap.to(camera.position, { 
            x: position.x, 
            y: position.y, 
            z: position.z, 
            duration: 0.5, 
            ease: "power2.out" 
        });
        
        targetLookAt.lerp(lookAtPosition, CAMERA_SMOOTHING);
        gsap.to({}, { 
            duration: 0.5, 
            ease: "power2.out", 
            onUpdate: () => {
                camera.lookAt(targetLookAt);
            }
        });
    }

    window.addEventListener("wheel", handleScroll);
}