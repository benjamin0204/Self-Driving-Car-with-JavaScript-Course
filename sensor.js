class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 10;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2; // 90deg

    this.rays = [];
  }
  update() {
    this.#castRays();
  }
  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle = this.#getRayAngle(i);
      const startPoint = this.#getStartPoint();
      const endPoint = this.#getEndPoint(rayAngle, this.rayLength);
      this.rays.push([startPoint, endPoint]);
    }
  }

  #getRayAngle(i) {
    // Adding the car angle makes the sensors point the same way as the car
    return (
      lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
      ) + this.car.angle
    );
  }

  #getStartPoint() {
    return { x: this.car.x, y: this.car.y };
  }

  #getEndPoint(rayAngle, rayLength) {
    return {
      x: this.car.x - Math.sin(rayAngle) * rayLength,
      y: this.car.y - Math.cos(rayAngle) * rayLength,
    };
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.stroke();
    }
  }
}