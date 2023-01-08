export default class Boid {
  constructor(size_px, sense_range_px, sense_fov_px, position, speed) {

    this.size = size_px
    this.range = sense_range_px
    this.fov = sense_fov_px
    this.p = {
      x: position[0],
      y: position[1]
    }

    let dir = Math.floor(Math.random() * 360);
    this.v = {
      x: Math.cos(dir) * speed,
      y: Math.sin(dir) * speed
    }
    this.init_speed = speed

    this._a = {
      x: 0,
      y: 0
    }

    this.boundry_factor = 0.2
    this.alignment_factor = 0.1
    this.seperation_factor = 0.1
    this.cohesion_factor = 0.1


  }

  get a() {
    return this._a;
  }

  set a(value) {
    this._a = value;
  }

  draw(context) {

    context.beginPath();

    context.moveTo(this.p.x, this.p.y);

    const v_theta = Math.atan2(this.v.y, this.v.x);
    const thiccness = Math.PI / 6
    const p1_theta = v_theta - thiccness
    const p2_theta = v_theta + thiccness
    context.lineTo(
      this.p.x - (this.size * Math.cos(p1_theta)),
      this.p.y - (this.size * Math.sin(p1_theta))
    );
    context.lineTo(
      this.p.x - (this.size * Math.cos(p2_theta)),
      this.p.y - (this.size * Math.sin(p2_theta))
    );
    context.fill();

  }

  boundry_force(height, width) {

    if (this.p.x <= this.range) {
      this.a.x += this.boundry_factor
    }
    if (this.p.x >= width - this.range) {
      this.a.x -= this.boundry_factor

    }
    if (this.p.y <= this.range) {
      this.a.y += this.boundry_factor

    }
    if (this.p.y >= height - this.range) {
      this.a.y -= this.boundry_factor
    }


  }

  alignment_force(boids_in_view_arr) {

    let average_direction = {
      x: 0,
      y: 0
    }

    let count = 0

    for (let i = 0; i < boids_in_view_arr.length; i++) {

      if (
        Math.sqrt(
          Math.pow((boids_in_view_arr[i].p.x - this.p.x), 2) +
          Math.pow((boids_in_view_arr[i].p.y - this.p.y), 2)
        )
        > this.range
      ) {


        average_direction.x = average_direction.x + boids_in_view_arr[i].v.x
        average_direction.y = average_direction.y + boids_in_view_arr[i].v.y
      }

    }
    if (
      boids_in_view_arr.length > 0
    ) {

      average_direction.x = average_direction.x / boids_in_view_arr.length
      average_direction.y = average_direction.y / boids_in_view_arr.length

      this.a.x += (average_direction.x - this.v.x) * this.alignment_factor
      this.a.y += (average_direction.y - this.v.y) * this.alignment_factor
    }


  }

  separation_force(boids_in_view_arr) {

  }

  cohesion_force(boids_in_view_arr) {

  }

  update() {

    this.p.x += this.v.x
    this.p.y += this.v.y


    this.v.x += this.a.x
    this.v.y += this.a.y

    let v_theta = Math.atan2(
      this.v.y,
      this.v.x
    )
    this.v.x = this.init_speed * Math.cos(v_theta)
    this.v.y = this.init_speed * Math.sin(v_theta)


  }

}
