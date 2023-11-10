<template>
  <Card shadow>
    <div style="min-height: 500px;width: 100%;">
      <iframe id="iframeId" :src="url" frameborder="0" class="pc iframe" scrolling="auto">
      </iframe>
      <video ref="video" v-to-drag="{ adsorb: 1, positionMode: 3 }" class="camera-box"></video>
      <div @click="getCamera()" v-to-drag="{ adsorb: 1, positionMode: 3 }" class="open">OPEN</div>
      <div v-to-drag="{ adsorb: 1, positionMode: 3 }" @click="CloseCamera()" class="close">CLOSE</div>
      <div @click="StartRecognition()" v-to-drag="{ adsorb: 1, positionMode: 3 }" class="recognize">RECOGNIZE</div>
      <!-- <div v-to-drag="{ adsorb: 1, positionMode: 3 }" @click="StopRecognition()" class="stop">STOP</div> -->
    </div>
  </Card>
</template>

<script>
import { ToDragDirective } from '@howdyjs/to-drag';
import * as faceapi from './face-api.min';
export default {
  directives: {
    'to-drag': ToDragDirective
  },
  components: {},
  data() {
    return {
      url: 'https://your_ip',//将your_ip替换为wazuh虚拟机IP
      // 模型存放路径
      modelPath: './models',
      // 视频流对象
      mediaStream: null,
      // 摄像头状态
      cameraOn: false,
      //检测数据
      detections: null,
      expressions: null,
    };
  },
  mounted() {
    // 加载模型
    this.loadModels();
    // 检测人脸
    this.$refs.video.addEventListener('play', this.detectFace());
  },
  methods: {
    async CloseCamera() {
      console.log('关闭摄像头');
      this.$refs.video.srcObject.getTracks()[0].stop();
    },
    // 获取视频流
    async getCamera() {
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          // 摄像头开启成功
          this.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
          this.video_stream = stream;
          this.$refs.video.srcObject = stream;
          this.$refs.video.play();
        })
        .catch(err => {
          console.log(err);
        });
    },
    StartRecognition() {
      this.$refs.video.addEventListener('play', this.detectFace());
      // this.loadModels();                 
    },
    StopRecognition() {
      console.log("停止识别");
    },
    // 加载模型
    async loadModels() {
      console.log("load");
      // 轻量级模型
      await faceapi.loadTinyFaceDetectorModel(this.modelPath); // 脸部识别
      console.log("model");
      await faceapi.loadFaceLandmarkTinyModel(this.modelPath); // 68点位
      await faceapi.loadFaceExpressionModel(this.modelPath); // 表情识别
      await faceapi.loadAgeGenderModel(this.modelPath); // 年龄识别
      this.getCamera(); // 模型加载完毕后展示视频
    },
    // 检测人脸
    async detectFace() {
      // 循环执行，跟踪人脸
      setInterval(async () => {
        // 得到模型识别结果
        this.detections = await faceapi
          .detectAllFaces(this.$refs.video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks(true)
          .withFaceExpressions()
          .withAgeAndGender();

        //打印出来detections
        // console.log(this.detections[0]);
        if (this.detections == null) {
          console.log("未检测到人脸。");
        } else {
          this.expressions = this.detections[0]["expressions"];
          console.log(JSON.stringify(this.expressions));
        }
        // console.log(this.detections);
      }, 1000);
    },
  }

}
</script>


<style lang='less'>
.iframe {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: hidden;
}

.camera-box {
  position: fixed;
  bottom: 255px;
  left: 0px;
  width: 210px;
  height: 170px;
  border-radius: 6px;
  background: linear-gradient(45deg, rgb(85, 153, 218), rgb(127, 79, 205));
  box-shadow: 0 0 30px rgb(43, 58, 73);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  user-select: none;

}

.open {
  position: fixed;
  bottom: 185px;
  left: 0px;
  width: 100px;
  height: 50px;
  border-radius: 6px;
  background: linear-gradient(45deg, rgb(85, 153, 218), rgb(127, 79, 205));
  box-shadow: 0 0 30px rgb(111, 145, 180);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  user-select: none;
}
.close {
  position: fixed;
  bottom: 115px;
  left: 0px;
  width: 100px;
  height: 50px;
  border-radius: 6px;
  background: linear-gradient(45deg, rgb(85, 153, 218), rgb(127, 79, 205));
  box-shadow: 0 0 30px rgb(43, 58, 73);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  user-select: none;
}
.recognize {
  position: fixed;
  bottom: 45px;
  left: 0px;
  width: 150px;
  height: 50px;
  border-radius: 6px;
  background: linear-gradient(45deg, rgb(85, 153, 218), rgb(127, 79, 205));
  box-shadow: 0 0 30px rgb(111, 145, 180);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  user-select: none;
}
.text {
  text-align: center;
  margin-top: 8rem;
  font-weight: bold;
  font-size: 1.3rem;
  color: #262626;
}
</style>
 
 
 
 
 

