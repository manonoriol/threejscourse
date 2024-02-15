import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'

export default class Experience
{
    constructor(canvas)
    {
        //Global access
        window.experience = this

        //Options
        this.canvas = canvas

        //Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera(this) //send the experience itself to the child Camera

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
    }

    update() {}
}

