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
  //   const mediaStream = await navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: true,
  //   });
  var video = document.createElement("video");
  video.src = "music.mp3";
  document.body.appendChild(video);
  const audioContext = new AudioContext();
  var fen = audioContext.createAnalyser();
  var src = audioContext.createMediaElementSource(video);
  const row = 13;
  const col = 40;
  const matrix = new TMatrix(row, col);
  //   fen.fftSize = 100;
  function snapshot() {
    var Data = new Uint8Array(fen.frequencyBinCount);
    const bufferLength = (fen.frequencyBinCount * 2) / 3; // 只取前三分之二，极高频去掉
    fen.getByteFrequencyData(Data);
    let count = 0;
    for (var i = 0; i < bufferLength; i += Math.floor(bufferLength / col)) {
      const barHeight = Data[i];
      const str = Array(Math.floor(barHeight / 20))
        .fill("▩")
        .join("")
        .padStart(row, "□");
      const rgb = [Math.floor(count * 5), Math.floor(255 - count * 5), 255];
      matrix.setCol(
        count,
        str.split("").map((code, index) => {
          const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
          return (
            colors()
              .color(code == "▩" ? color : `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${index / 35})`)
              .padding(2, 2)
              .fontsize(12)
              //   .bg("#eee")
              .fontfamily(/Chrome/.test(navigator.userAgent) ? "" : "")
              .log("▣")
          );
        })
      );
      count++;
    }
    render(matrix);
  }
  src.connect(fen);
  fen.connect(audioContext.destination);
  video.play();

  setInterval(() => {
    snapshot();
  }, 100);
  //   video.srcObject = mediaStream;
};

// run();
