//模型存放路径
const MODEL_PATH = './models';
let canvas_all=null;
let timer = null;
let date = null;
let expressions = null;

//获取视频流
async function getCamera() {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
        video.srcObject = mediaStream;
        mediaStreamTrack = mediaStream;
    } catch (e) {
        console.error(e)
    }
}
//加载模型
async function loadModels() {
    //轻量级模型
    await faceapi.loadTinyFaceDetectorModel(MODEL_PATH); //脸部识别
    await faceapi.loadFaceLandmarkTinyModel(MODEL_PATH); //68点位
    await faceapi.loadFaceExpressionModel(MODEL_PATH); //表情识别
    await faceapi.loadAgeGenderModel(MODEL_PATH); //年龄识别
    getCamera(); //模型加载完毕后展示视频
}

async function detectFace() {
    //使用faceapi创建一个canvas
    const canvas = faceapi.createCanvasFromMedia(video);
    canvas_all=canvas;
    const ctx = canvas.getContext('2d');
    const width = video.width; //获取视频尺寸
    const height = video.height;
    
    //用js将这个canvas回填到body里
    document.body.append(canvas);
    // faceapi.matchDimensions(canvas, { width, height });
    
    // 在创建新的定时器之前，先判断是否存在旧的定时器
    if (timer) {
        // 如果存在，就先清除旧的定时器
        clearInterval(timer);
        timer = null;
      }

    //循环执行，跟踪人脸
    timer = setInterval(async () => {
        //得到模型识别结果
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks(true).withFaceExpressions().withAgeAndGender();
        
        //打印出来detections
        // console.log(this.detections[0]);
        if (detections == null) {
            console.log("未检测到人脸。");
          } else {
            expressions = detections[0]["expressions"];
            console.log(JSON.stringify(expressions));
            //存入本地浏览器
            date = new Date();
            // 调用日期的toString()方法
            localStorage.setItem(date.toString(),JSON.stringify(expressions))
          }
        //将图像长宽与结果关联
        const resizedDetections = faceapi.resizeResults(detections, { width, height });
        //每次画新框之前去掉旧的
        ctx.clearRect(0, 0, width, height); 
        //把结果画在canvas上
        faceapi.draw.drawDetections(canvas, resizedDetections);
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        
        //年龄与性别
        resizedDetections.forEach(result => {
            const { age, gender, genderProbability } = result;
            new faceapi.draw.DrawTextField(
                [
                    `${~~age} years`,
                    `${gender} (${genderProbability.toFixed(1)})`,
                ],
                result.detection.box.bottomRight
            ).draw(canvas);
        });
    }, 1000);
    console.log(timer,"start");
}

// video.addEventListener('play', detectFace);
loadModels();

function CloseCamera() {
    //打印文档结构
    // var bodyEle = document.body;
    // console.log(bodyEle);
    // console.dir(bodyEle);
    //关闭摄像头，移除画布
        
    // 向vue页面发送消息
    window.parent.postMessage('close', '*');

    console.log('关闭摄像头');
    video.srcObject.getTracks()[0].stop();
    var canvas = document.getElementsByTagName("canvas")[0];
    // console.log(canvas.height);

    canvas.remove();
}

function myrefresh(){
    window.location.reload();
}
function OpenCamera(){
    // 向vue页面发送消息
    window.parent.postMessage('open', '*');

    getCamera();
}
function StartRecognition(){
    // 向vue页面发送消息
    window.parent.postMessage('recognize', '*');

    video.addEventListener('play', detectFace);
    loadModels();
}

function StopRecognition(){
    // 向vue页面发送消息
    window.parent.postMessage('stop', '*');

    var canvas = document.getElementsByTagName("canvas")[0];
    // console.log(canvas.height);
    canvas.remove();
    console.log(timer,"stop");
    clearInterval(timer);
    timer = null; 
    
    console.log("停止识别");
  
}


  

// //关闭摄像头

// let mediaStreamTrack = {}; // 退出时关闭摄像头
// let video_stream = ''; // 视频stream
// let recordedBlobs = []; // 视频音频 blobs
// let isRecord = false; // 视频是否正在录制
// let loading = false;

// function getCamera() {
//     // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
//     if (navigator.mediaDevices === undefined) {
//       navigator.mediaDevices = {};
//     }
//     navigator.mediaDevices
//       .getUserMedia({
//         video: true,
//       })
//         .then((stream) => {
//         // 摄像头开启成功
//         mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
//         video_stream = stream;
//         $refs.video.srcObject = stream;
//         this.$refs.video.play();
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

// // 录制或暂停
// function recordOrStop() {
//     this.loading=true;
//     if (this.isRecord) {
//       this.loading=false;
//       this.stop();
//     } else {
//       this.record();
//     }
//   }
// // 视频录制
// function record() {
//     console.log('record');
//     this.isRecord = !this.isRecord;
//     let mediaRecorder;
//     let options;
//     this.recordedBlobs = [];
//     if (typeof MediaRecorder.isTypeSupported === 'function') {
//       // 根据浏览器来设置编码参数
//       if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
//         options = {
//           MimeType: 'video/webm;codecs=h264',
//         };
//       } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
//         options = {
//           MimeType: 'video/webm;codecs=h264',
//         };
//       } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
//         options = {
//           MimeType: 'video/webm;codecs=vp8',
//         };
//       }
//       mediaRecorder = new MediaRecorder(this.video_stream, options);
//     } else {
//       // console.log('isTypeSupported is not supported, using default codecs for browser');
//       console.log('当前不支持isTypeSupported，使用浏览器的默认编解码器');
//       mediaRecorder = new MediaRecorder(this.video_stream);
//     }
//     mediaRecorder.start();
//     // 视频录制监听事件
//     mediaRecorder.ondataavailable = e => {
//       console.log(e);
//       // 录制的视频数据有效
//       if (e.data && e.data.size > 0) {
//         this.recordedBlobs.push(e.data);
//       }
//     };
//     // 停止录像后增加下载视频功能，将视频流转为mp4格式
//     mediaRecorder.onstop = () => {
//       const blob = new Blob(this.recordedBlobs, { type: 'video/mp4' });
//       this.recordedBlobs = [];
//       // 将视频链接转换完可以用于在浏览器上预览的本地视频
//       const videoUrl = window.URL.createObjectURL(blob);
//       // 设置下载链接
//       document.getElementById('downLoadLink').href = videoUrl;
//       // 设置下载mp4格式视频
//       document.getElementById('downLoadLink').download = 'media.mp4';
//       document.getElementById('downLoadLink').innerHTML = 'DownLoad video file';
//       // 生成随机数字
//       const rand = Math.floor((Math.random() * 1000000));
//       // 生成视频名
//       const name = `video${rand}.mp4`;
      
//       // setAttribute() 方法添加指定的属性，并为其赋指定的值
//       document.getElementById('downLoadLink').setAttribute('download', name);
//       document.getElementById('downLoadLink').setAttribute('name', name);
      
//       // 0.5s后自动下载视频
//       setTimeout(() => {
//         document.getElementById('downLoadLink').click();
//       }, 500);
//     };
//   }
//   // 停止录制
// function stop() {
//     this.isRecord = !this.isRecord;
//     if (!this.$refs.video.srcObject) return;
//     const stream = this.$refs.video.srcObject;
//     const tracks = stream.getTracks();
//     // 关闭摄像头和音频
//     tracks.forEach(track => {
//       track.stop();
//     });
//   }
//   // 打开摄像头
// function OpenCamera() {
//     console.log('打开摄像头');
//     this.getCamera();
//   }
//   // 关闭摄像头





