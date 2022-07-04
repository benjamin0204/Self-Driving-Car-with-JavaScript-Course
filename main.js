const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// drawing context
const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(0), 100, 20, 50);

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;
  road.draw(ctx);
  car.draw(ctx);
  requestAnimationFrame(animate);
}
