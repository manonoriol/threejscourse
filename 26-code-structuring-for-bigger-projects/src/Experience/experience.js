import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer.js'

let instance = null

export default class Experience
{
    constructor(canvas)
{
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        //Global access
        window.experience = this

        //Options
        this.canvas = canvas

        //Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera() 
        this.renderer = new Renderer()

        //Sizes resize event
        this.sizes.on('resize', () => { // .on is like en event listener + we have to use an arrow function to keep the context of this
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update() //when a tick occurs, we update the experience
        } 
        )
    }
    // methods
    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update() //first we move the camera
        this.renderer.update() //then we do the render
    }
}

