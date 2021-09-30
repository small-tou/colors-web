## 如何在浏览器 console 控制台中播放视频？

要实现这个目标，主要涉及到这几个点：

1. 如何获取和解析视频流？
2. 如何在 console 里播放动态内容？
3. 如何在 console 里播放彩色内容？
4. 如何连接视频流和 console？

事实上最后的代码极其简单，我们就一步一步简单讲一下

### 效果

![https://assets.html-js.com/uploads/1632982367557-a9d13d93a417ab6d2d64c6f884734a53.gif]()

测试地址：https://yu-tou.github.io/colors-web/dist/camera.html

### 如何获取和解析视频流？

这里我们用电脑摄像头捕获视频流，然后获取视频流每一帧的图像数据，作为下一步的输入。

```javascript
// 捕捉电脑摄像头的视频流
const mediaStream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
});
// 创建一个 video 标签
const video = document.createElement("video");
document.body.appendChild(video);

video.onloadedmetadata = function (e) {
  video.play(); // 等摄像头数据加载完成后，开始播放
};
// video 标签播放视频流
video.srcObject = mediaStream;
```

如何获取每一帧图像的数据？创建一个 canvas 画布，可以将 video 当前的内容绘制到画布上，然后通过 canvas 的方法即可拿到图像的像素数据。

```javascript
const ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

ctx.drawImage(video, 0, 0, width, height);
const imageData = ctx.getImageData(0, 0, width, height);
const data = imageData.data;
// imageData 的结构是平铺的，需要自己去学习下
```

### 如何在 console 里播放动态内容？

视频每帧的图像内容我们已经可以拿到了，继续下一步，如果需要在 console 中完成播放视频，首先需要能够一帧一帧绘制内容，但是这个好像是不太现实的，console.log 只能输出文本。

回想远古时代，在终端里大家怎么播放视频的？没错，用字符画一帧一帧绘制，连起来不就是动态的视频了。

当然 chrome dev tool 里如果每一帧绘制后都调用 console.clear() 清空重绘，体验不是很好，闪烁会很严重，所以我们采用持续输出的方式绘制，当你停留在 console 的最后的时候，看起来也算是动态内容了。

### 如何在 console 里播放彩色内容？

console.log 支持部分 css 特性，可以为输出的字符串指定简单的样式，最基本的支持背景色、字体颜色、下划线等，甚至支持 background-image、padding 等特性，利用这些特性，甚至可以插入图片，但是这些特性在不同浏览器的 console 中或多或少有些兼容问题，不过要实现字体着色，或者输出色块（用背景色），问题不大。

我们在此使用 `colors-web` 来更方便地输出彩色内容到控制台。

这是一个非常方便的库，可以使用链式调用在控制台快速输出彩色内容，并且支持诸多特性，无需自己去了解，直接使用对应的方法即可。

如：

```javascript
import { logger, colors } from "colors-web";
logger(
  colors().red().fontsize(48).fontfamily("SignPainter").log("hello"),
  colors().white.redBg("hello").linethrough(),
  "world",
  colors().white.padding(2, 5).underline().lightgrey("芋头")
);
```

相信我不解释，大家也基本理解这些用法，非常简单和自由，而且支持 typescript。

我们这里，用 colors-web 输出色块：

```javascript
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    if (i * width + j < data.length) {
      const color = `rgb(${data[(i * width + j) * 4 + 0]},${data[(i * width + j) * 4 + 1]},${
        data[(i * width + j) * 4 + 2]
      })`;
      colors()
        .bg(color)
        .color(color)
        .fontfamily(/Chrome/.test(navigator.userAgent) ? "Courier" : "")
        .log("╳");
    }
  }
}
```

### 最终逻辑

最终我将每一帧所有的像素值都转换成一个 colors 的实例，记录到数组之后，最终统一调用 logger 即可完成一帧的渲染。

```javascript
const frameColors = [];
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    if (i * width + j < data.length) {
      const color = `rgb(${data[(i * width + j) * 4 + 0]},${data[(i * width + j) * 4 + 1]},${
        data[(i * width + j) * 4 + 2]
      })`;
      frameColors.push(
        colors()
          .bg(color)
          .color(color)
          .fontfamily(/Chrome/.test(navigator.userAgent) ? "Courier" : "")
          .log("╳")
      );
    }
  }
}
// 绘制，colors() 只是在准备数据结构，logger 才是真正的输出
logger(...frameColors);
```

大公告成啦！

相关资料：

- `colors-web` 的代码地址：https://github.com/yu-tou/colors-web
