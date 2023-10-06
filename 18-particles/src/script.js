import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('/textures/particles/10.png')

/**
 * Cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube);

/**
 * Particles
 */

//Geometry
// const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
const particlesGeometry = new THREE.BufferGeometry(); //for customized geometry
const count = 20000;
const positions = new Float32Array(count * 3) //how many elements in the array, 3 for each vertex
const colors = new Float32Array(count * 3) //RGB has 3 coordinates
for(let i = 0; i < count * 3; i++){
    positions[i] = (Math.random() - 0.5) * 10 //* -0.5 so the value can be positive or negative and * 10 to make it bigger
    colors[i] = Math.random()
};

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//Material
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size= 0.1;
particlesMaterial.sizeAttenuation= true;
// particlesMaterial.color= new THREE.Color('#ff88cc')
particlesMaterial.transparent= true;
particlesMaterial.alphaMap= particlesTexture;
// particlesMaterial.alphaTest = 0.001 //value between 0 and 1 enabling webGL to know not to render pixel according to pixel transparency
// particlesMaterial.depthTest = false //also fixes pespective issues for pixels but bug with other objects
particlesMaterial.depthWrite= false;// so it does not write particles in our cube
particlesMaterial.blending= THREE.AdditiveBlending; // does not additionate pixels on top of each other, combine them
particlesMaterial.vertexColors= true;


//Points

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update particles
    // particles.rotation.y = elapsedTime * 0.2;
    particles.position.y = - elapsedTime * 0.02; //snow effect

    // for(let i = 0; i < count; i++){
    //     const i3 = i * 3; //x,y,z in array so 3

    //     const x = particlesGeometry.attributes.position.array[i3 + 0] // i3+0 -> access the x value
    //     particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x) //i3+1 -> access the y value
    // }

    // particlesGeometry.attributes.position.needsUpdate = true;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()