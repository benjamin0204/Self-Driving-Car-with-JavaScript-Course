const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// drawing context
const ctx = canvas.getContext("2d");

const car = new Car(100, 100, 20, 50);
car.draw(ctx);

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;
  car.draw(ctx);
  requestAnimationFrame(animate);
}