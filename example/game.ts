import { logger, colors } from "../src/index.js";
import TMatrix from "./text-matrix";

//
var me = 19;
const matrix = new TMatrix(15, 50);
var Enemy = function () {
  this.x = 0;
  this.speed = 1;
  this.y = 0;
};
var Tank = function () {
  this.x = 0;
  this.direction = "right";
  //   this.speed = 1;
  this.y = 0;
};
var score = 0;
var tank = new Tank();
window.onkeydown = function (e) {
  if (e.keyCode == 37) {
    tank.x -= 1;
    tank.direction = "left";
    if (tank.x < 0) tank.x = 0;
  } else if (e.keyCode == 39) {
    tank.x += 1;
    tank.direction = "right";
    if (tank.x > matrix.cols) tank.x = matrix.cols;
  }
};
var count = 0;
var die = function () {
  clearInterval(timer1);
  clearInterval(timer2);
  clearInterval(timer3);
  setTimeout(function () {
    console.log("游戏结束，您的得分：" + score);
  }, 100);
};
var stars = [];
var appearP = 0.5;
var timer1, timer2, timer3;
var begin = function () {
  timer1 = setInterval(function () {
    var createCount = Math.floor(Math.random() * 5 * appearP);
    for (var i = 0; i < createCount; i++) {
      var star = new Enemy();
      star.x = Math.floor(Math.random() * 40);
      star.y = 0;
      star.speed = Math.random() * appearP; //Math.floor(Math.random()*3+1)
      stars.push(star);
    }
  }, 1000);
  timer2 = setInterval(function () {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        matrix.set(
          i,
          j,
          colors()
            .color("rgba(255,0,0,0.1)")
            .padding(3, 2)
            .fontsize(12)
            .fontfamily(/Chrome/.test(navigator.userAgent) ? "Courier" : "")
            .log("+")
        );
      }
    }

    for (let i = 0; i < stars.length; i++) {
      // stars.forEach(function (star, i) {
      const star = stars[i];
      star.y += star.speed;
      if (star.y >= 31) {
        stars.splice(i, 1);
        score++;
      }
      matrix.set(
        Math.floor(star.y),
        Math.floor(star.x),
        colors()
          //   .bg("url(https://assets.html-js.com/uploads/1628411367348-b84630a378d76748308920737c479c10.png)")
          //   .padding(3, 2)
          .fontsize(12)
          .bgSize("100%")
          .log("💣")
      );
      if (star.x == tank.x && Math.floor(star.y) == tank.y) {
        die();
        return;
      }
    }
    matrix.set(
      matrix.rows - 1,
      tank.x,
      colors()
        // .bg(
        //   tank.direction == "left"
        //     ? "url(https://assets.html-js.com/uploads/1628411583208-6967c244281ce17ec2381fdbd29cbf6b.png)"
        //     : "url(https://assets.html-js.com/uploads/1628411636511-baa9d42eab310384df5d59a5507d58e3.png)"
        // )
        // .padding(3, 2)
        // .bgSize("100%")
        .fontsize(12)
        .log(tank.direction == "left" ? "👨‍💻‍" : "👨‍💻‍")
    );
    count++;
    if (count > 20) {
      console.clear();
      count = 0;
    }
    const arr = matrix.toColorObjects();
    logger(colors().color("#ff6700").padding(200, 0).log(" "));
    arr.push(colors().color("#333").log("您的得分："), colors().color("#ff6700").log(score.toString()));
    logger(...arr);
    // console.log(strs());
  }, 200);
  timer3 = setInterval(function () {
    appearP *= 1.05;
  }, 3000);
};
console.log("点击网页上的开始游戏开始");
const w: any = window;

const start = function () {
  appearP = 1.1;
  const starts = [];
  score = 0;
  me = 19;
  count = 0;
  logger(
    colors().color("#ff6700").log("请先用鼠标点击一下弹个车网页页面，游戏需要捕捉网页上的键盘事件（你应该懂吧）！")
  );
  console.log("使用键盘左右键移动最下方的码农，躲开所有的汽车，汽车数量和速度会一直增加，看看谁坚持的最久吧！");
  begin();
  var countdown = 3;
  //   const cd = function () {
  //     if (countdown-- <= 1) {
  //       begin();
  //     } else {
  //       console.log(countdown);
  //       setTimeout(cd, 1000);
  //     }
  //   };
  //   setTimeout(cd, 1000);
  return "倒计时！";
};

const btn = document.createElement("button");
btn.innerHTML = "点击开始游戏";
document.body.append(btn);
btn.onclick = function () {
  start();
};
