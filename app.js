let container = document.querySelector(".container");
let game = document.querySelector("#game");
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newbtn = document.querySelector("#new-btn");

let turnX = true;

let winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turnX = true;
  msgcontainer.classList.add("hide");
  enableBoxes();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "O";
      turnX = false;
    } else {
      box.innerText = "X";
      turnX = true;
    }
    box.disabled = true;
    checkWinnerOrDraw();
  });
});

const checkWinnerOrDraw = () => {
  if (checkWinner()) {
    disableBoxes();
  } else if (isDraw()) {
    showDraw();
    disableBoxes();
  }
};

const checkWinner = () => {
  for (let pattern of winpattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val == pos2val && pos2val == pos3val) {
        showWinner(pos1val);
        return true;
      }
    }
  }
  return false;
};

const isDraw = () => {
  for (let box of boxes) {
    if (box.innerText === "") {
      return false;
    }
  }
  return true;
};

const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
};

const showDraw = () => {
  msg.innerText = "It's a draw!";
  msgcontainer.classList.remove("hide");
};

resetbtn.addEventListener("click", resetGame);
newbtn.addEventListener("click", resetGame);
