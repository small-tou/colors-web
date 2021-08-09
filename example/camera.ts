import { logger, colors } from "../src/index.js";
import TMatrix from "./text-matrix";
const log = window.console.log;
logger.source = log;
let renderCount = 0;
export const render = function (matrix: TMatrix) {
  renderCount++;
  if (renderCount % 20 == 0) {
    console.clear();
  }
  //   logger();
  const arr = matrix.toColorObjects();
  arr.push(
    colors().padding(0, 1500).log(" "),
    colors().padding(0, 320).log(" "),
    colors()
      .bg("url(https://assets.html-js.com/uploads/1628406648883-a1288a5ca18b5eb23aaa2e9267102b5c.jpeg) no-repeat")
      .bgSize("100%")
      .padding(130, 100)
      .log(" ")
  );
  logger(...arr);
};

const width = 50;
const height = 20;
var video = document.createElement("video");
video.style.width = width + "px";
video.style.height = height + "px";
document.body.appendChild(video);
var canvas = document.createElement("canvas");
canvas.style.width = width + "px";
canvas.style.height = height + "px";
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;
const matrix = new TMatrix(height, width);
function snapshot() {
  if (ctx) {
    ctx.drawImage(video, 0, 0, width, height);
    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        if (i * width + j < data.length) {
          const color = `rgb(${data[(i * width + j) * 4 + 0]},${data[(i * width + j) * 4 + 1]},${
            data[(i * width + j) * 4 + 2]
          })`;
          matrix.set(
            i,
            j,
            colors()
              .bg(color)
              .color(color)
              .fontfamily(/Chrome/.test(navigator.userAgent) ? "Courier" : "")
              .log("╳")
          );
        }
      }
    }
    //   console.log(image);

    render(matrix);
  }
}

const run = async function () {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.onloadedmetadata = function (e) {
    video.play(); // 等摄像头数据加载完成后，开始播放
  };
  video.srcObject = mediaStream;
};

run();

setInterval(() => {
  snapshot();
}, 400);
