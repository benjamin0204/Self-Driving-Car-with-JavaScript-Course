class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2; // 90deg

    this.rays = [];
    this.readings = [];
  }
  update(roadBorders, traffic) {
    this.#castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReading(this.rays[i], roadBorders, traffic));
    }
  }

  #getReading(ray, roadBorders, traffic) {
    let intersects = [];

    // Checking the car against the traffix
    for (let i = 0; i < traffic.length; i++) {
      const polygon = traffic[i].polygon;
      for (let j = 0; j < polygon.length; j++) {
        const intersect = getIntersection(
          ray[0],
          ray[1],
          polygon[j],
          polygon[(j + 1) % polygon.length]
        );
        if (intersect) intersects.push(intersect);
      }
    }

    // Checking the car against the road borders
    for (let i = 0; i < roadBorders.length; i++) {
      const intersect = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );
      if (intersect) intersects.push(intersect);
    }
    if (intersects.length === 0) return null;
    const offsets = intersects.map((intersect) => intersect.offset);
    const smallestOffset = Math.min(...offsets);
    return intersects.find((intersect) => intersect.offset == smallestOffset);
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
      let end = this.rays[i][1];
      if (this.readings[i]) end = this.readings[i];

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
