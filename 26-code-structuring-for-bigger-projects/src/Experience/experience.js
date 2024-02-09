import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"

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
    resize() {}

    update() {}
}

