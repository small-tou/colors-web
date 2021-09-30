import { logger, colors } from "../src/index.js";
import TMatrix from "./text-matrix";
const log = window.console.log;
logger.source = log;
let renderCount = 0;
const container = document.createElement("div");
document.body.appendChild(container);
const render = function (matrix: TMatrix) {
  renderCount++;
  if (renderCount % 50 == 0) {
    console.clear();
  }
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

const btn = document.createElement("button");
btn.innerHTML = "点击播放";
document.body.append(btn);
btn.onclick = function () {
  run();
};

const run = async function () {
  var video = document.createElement("video");
  video.src = "music.mp3";
  document.body.appendChild(video);
  const audioContext = new AudioContext();
  var fen = audioContext.createAnalyser();
  var src = audioContext.createMediaElementSource(video);
  fen.fftSize = 2048;

  const row = 13;
  const col = 32;
  const matrix = new TMatrix(row, col);
  const bufferLength = fen.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  function snapshot() {
    fen.getByteFrequencyData(dataArray);
    let count = 0;
    matrix.fillWithChar("▩");
    const step = bufferLength / col;
    for (var i = 0; i < col; i++) {
      const v = dataArray[i];
      let avg = 0;
      // 平均取样
      for (let ii = 0; ii < step; ii++) {
        avg += dataArray[i * step + ii];
      }
      avg = avg / step;
      // 比例映射
      var barHeight = Math.floor((row * avg) / 255);
      if (barHeight < 0) barHeight = 0;
      if (barHeight > row) barHeight = row;
      // 填充字符
      const str = Array(barHeight).fill("▩").join("").padStart(row, "□");
      // 计算颜色
      const rgb = [Math.floor(count * 5), Math.floor(255 - count * 5), 255];
      // 设置到矩阵
      matrix.setCol(
        count,
        str.split("").map((code, index) => {
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
          return colors()
            .color(code == "▩" ? color : `rgba(0,0,0,0.1)`)
            .padding(2, 2)
            .fontsize(12)
            .fontfamily(/Chrome/.test(navigator.userAgent) ? "" : "")
            .log("▣");
        })
      );
      count++;
    }
    // 渲染一帧
    render(matrix);
  }
  src.connect(fen);
  fen.connect(audioContext.destination);
  video.play();

  setInterval(() => {
    snapshot();
  }, 100);
};
