import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter
{
    constructor() {

        super()

        //Setup
        this.width = window.innerWidth
        this.height = window.height
        this.pixelRatio = Math.min(window.devicePixelRatio, 2) //get the pixel ratio but limit it to 2

        //Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.height
            this.pixelRatio = Math.min(window.devicePixelRatio, 2) //get the pixel ratio but limit it to 2

            this.trigger('resize')
        })
    }
}