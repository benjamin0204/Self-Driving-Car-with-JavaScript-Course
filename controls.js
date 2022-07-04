class Controls {
  constructor(controllType) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.back = false;

    switch (controllType) {
      case "PLAYER":
        this.#addKeyBoardListener();
        break;
      case "AI":
        this.forward = true;
        break;
    }
  }
  #addKeyBoardListener() {
    document.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.back = true;
          break;
      }
    };
    document.onkeyup = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.back = false;
          break;
      }
    };
  }
}
