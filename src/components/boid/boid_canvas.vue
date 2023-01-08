<template>
  <canvas id="boid_canvas" ref="boid_canvas"/>
</template>

<script>
import Boid from "./boid"

export default {
  created() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {


    this.$refs.boid_canvas.width = window.innerWidth;
    this.$refs.boid_canvas.height = window.innerHeight
    this.ctx = this.$refs.boid_canvas.getContext("2d");

    for (let i = 0; i < this.number_of_boids; i++) {
      let new_boid = new Boid(
        this.boid_size,
        this.boid_sense_range,
        this.boid_fov,
        [
          Math.floor(Math.random() * window.innerWidth),
          Math.floor(Math.random() * window.innerHeight),
        ],
        this.boid_speed,
      )
      this.boids.push(
        new_boid
      )
    }


    this.animate()
  },

  data: () => ({
    number_of_boids: 100,
    boid_size: 10,
    boid_fov: 360,
    boid_sense_range: 30,
    boid_speed:3,
    request: '',
    boids: [],
    last_scroll_y: 0
  }),
  methods: {
    handleResize(event) {
      this.$refs.boid_canvas.width = window.innerWidth;
      this.$refs.boid_canvas.height = window.innerHeight
    },
    handleScroll(event) {
      for (let i = 0; i < this.number_of_boids; i++) {
        this.boids[i].p.y = this.boids[i].p.y - (window.scrollY - this.last_scroll_y)
      }
      this.last_scroll_y = window.scrollY
    },
    animate() {
      this.draw()
      this.request = requestAnimationFrame(this.animate)

    },
    draw() {


      this.ctx.clearRect(0, 0, this.$refs.boid_canvas.width, this.$refs.boid_canvas.height);

      let hashed_tiles = {}

      for (let i = 0; i < this.number_of_boids; i++) {
        let hashed_tile_coordinate = [
          Math.floor(this.boids[i].p.x / (this.boid_sense_range * 2)),
          Math.floor(this.boids[i].p.y / (this.boid_sense_range * 2))
        ]
        let hashed_tile_content = hashed_tiles[hashed_tile_coordinate]
        hashed_tile_content = Object.is(hashed_tile_content, undefined) ? [] : hashed_tile_content;
        hashed_tile_content.push(this.boids[i])
        hashed_tiles[hashed_tile_coordinate] = hashed_tile_content


      }


      for (let i = 0; i < this.number_of_boids; i++) {
        this.boids[i].a.x = 0
        this.boids[i].a.y = 0
        this.boids[i].boundry_force(
          this.$refs.boid_canvas.height,
          this.$refs.boid_canvas.width
        )

        let potential_boids_in_view = []
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            let hashed_tile_coordinate = [
              Math.floor(this.boids[i].p.x / (this.boid_sense_range * 2)) + j,
              Math.floor(this.boids[i].p.y / (this.boid_sense_range * 2)) + k
            ]
            let tile_contents = hashed_tiles[hashed_tile_coordinate]


            if (tile_contents ) {
              potential_boids_in_view = potential_boids_in_view.concat(tile_contents)
            }
          }

        }

        this.boids[i].alignment_force(potential_boids_in_view)




        this.boids[i].update()
        this.boids[i].draw(this.ctx)
      }
      this.ctx.stroke();
    },

  },
}
</script>

<style scoped>
#boid_canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -100;

}

</style>
