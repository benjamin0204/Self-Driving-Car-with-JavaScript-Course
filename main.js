const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// drawing context
const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(0), 100, 20, 50, "PLAYER", 3);

const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "AI", 2)];

animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  car.update(road.borders, traffic);
  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);

  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "black");
  }
  car.draw(ctx, "green");

  ctx.restore();
  requestAnimationFrame(animate);
}
