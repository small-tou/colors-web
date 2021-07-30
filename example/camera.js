import { logger, colors } from "../src/index.js";
const log = window.console.log;
logger.source = log;
let renderCount = 0;
export const render = function (matrix) {
  renderCount++;
  if (renderCount % 20 == 0) {
    console.clear();
  }
  const chars = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const rgb = matrix[i][j];
      chars.push(colors().bg(`rgb(${rgb.r},${rgb.g},${rgb.b})`).log(" "));
    }
    chars.push("\n");
  }
  //   console.log(chars);
  logger(...chars);
};

const width = 100;
const height = 30;
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
function snapshot() {
  ctx.drawImage(video, 0, 0, width, height);
  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;
  //   console.log(data);
  var image = [];
  for (var i = 0; i < height; i++) {
    image[i] = [];
    for (var j = 0; j < width; j++) {
      if (i * width + j < data.length) {
        image[i].push({
          r: data[(i * width + j) * 4 + 0],
          g: data[(i * width + j) * 4 + 1],
          b: data[(i * width + j) * 4 + 2],
        });
      }
    }
  }
  //   console.log(image);

  render(image);
}

const run = async function () {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  video.onloadedmetadata = function (e) {
    video.play(); // 等摄像头数据加载完成后，开始播放
  };
  video.srcObject = mediaStream;
};

run();

setInterval(() => {
  snapshot();
}, 800);
