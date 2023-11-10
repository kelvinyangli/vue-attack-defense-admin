<template>
  <div id="app">
    <!-- 路由嵌套 -->
    <router-view />
    <!-- 两个开关 -->
    <!-- 监听函数：camera ; 值：cameraValue 默认为true-->
    <div v-to-drag="{ adsorb: 1, positionMode: 3 }" class="camera">camera <el-switch @change="camera"
        v-model="cameraValue" active-color="#13ce66" inactive-color="#ff4949"></el-switch></div>
    <!-- 监听函数：facial ; 值：facialValue 默认为false -->
    <div v-to-drag="{ adsorb: 1, positionMode: 3 }" class="facial">facial <el-switch @change="facial" v-model="facialValue"
        active-color="#13ce66" inactive-color="#ff4949"></el-switch></div>
    <video ref="video" height="0" width="0"></video>
  </div>
</template>

<script>
import { ToDragDirective } from '@howdyjs/to-drag';
import * as faceapi from './face-api.min';

export default {
  name: 'App',
  directives: {
    'to-drag': ToDragDirective
  },
  data() {
    return {
      iframe: null, //子组件的iframe组件
      cameraValue: true, //控制camera开关
      facialValue: false, //控制facial开关

      //人脸识别
      modelPath: './models',// 模型存放路径     
      mediaStream: null,// 视频流对象
      cameraOn: false, // 摄像头状态
      //检测数据
      detections: null,
      expressions: null,
      data:null,
      timer:null,
    };
  },
  watch: {
    // 定义一个watch属性
    timer(val, oldVal) {
      // 定义一个函数，用来监听timer变量的变化
      // val是新的值，oldVal是旧的值
      console.log("timer changed from", oldVal, "to", val); // 打印出变化的信息
    },
    facialValue(val, oldVal) {
      // 定义一个函数，用来监听timer变量的变化
      // val是新的值，oldVal是旧的值
      console.log("facialValue changed from", oldVal, "to", val); // 打印出变化的信息
    }
  },
  mounted() {
    // 监听消息事件（改变开关），并定义一个回调函数
    window.addEventListener('message', this.handleMessage); 
    // 加载模型
    this.loadModels();

  },
  methods: {
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
    //关闭摄像头
    async CloseCamera() {
      console.log('关闭摄像头');
      this.$refs.video.srcObject.getTracks()[0].stop();
    },
    //开始识别
    StartRecognition() {
      this.$refs.video.addEventListener('play', this.detectFace());
      // this.loadModels();                 
    },
    //停止识别
    StopRecognition() {
      console.log(this.timer,"stop timer");
      clearInterval(this.timer);
      this.timer = null;
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
      console.log("getcamera")
      this.getCamera(); // 模型加载完毕后展示视频
    },
    // 检测人脸
    async detectFace() {
       // 在创建新的定时器之前，先判断是否存在旧的定时器
       if (this.timer) {
        // 如果存在，就先清除旧的定时器
        clearInterval(this.timer);
        this.timer = null;
      }
      // 循环执行，跟踪人脸
      this.timer = setInterval(async () => {
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
          //存入本地浏览器
          this.data = new Date();
          // 调用日期的toString()方法
          localStorage.setItem(this.data.toString(),JSON.stringify(this.expressions))
        }
        // console.log(this.detections);
      }, 1000);
      console.log(this.timer,"detectface timer")
    },

    // 定义一个处理子组件消息事件的方法
    handleMessage(event) {
      // 获取消息数据
      var data = event.data;
      // 如果消息数据是close，执行关闭操作
      if (data == 'close') {
        // 关闭
        this.cameraValue = false;
      }else if(data == 'open'){
        this.cameraValue = true;
      }else if(data == 'recognize'){
        this.facialValue = true;
      }else if(data == 'stop'){
        this.facialValue = false;
      }
    },
    camera() {
      var meta = this.$route.meta;
      //首先判断是否在摄像头界面上
      if(meta.title == 'Camera'){ 
        //获取iframe元素
        this.iframe = this.$route.matched[this.$route.matched.length - 1].instances.default.$refs.iframe;
        //然后判断当前需要关闭还是开启摄像头
        if (this.cameraValue == true) {
          //打开摄像头
          this.iframe.contentWindow.OpenCamera(); 
        }else{
          //关闭摄像头
          this.iframe.contentWindow.CloseCamera(); 
        }  
      }else{ //在wazuh界面上
        console.log(this.$route.matched[this.$route.matched.length - 1].instances.default.$refs.iframe)
        if (this.cameraValue == true){
          this.getCamera();
        }else{
          this.CloseCamera()
        }
      }
    },
    facial() {
      var meta = this.$route.meta;
      //首先判断是否在摄像头界面上
      if(meta.title == 'Camera'){ 
        //获取iframe元素
        this.iframe = this.$route.matched[this.$route.matched.length - 1].instances.default.$refs.iframe;
        //然后判断当前需要关闭还是开启摄像头
        if (this.facialValue == true) {
          //打开摄像头
          this.iframe.contentWindow.StartRecognition(); 
        }else{
          //关闭摄像头
          this.iframe.contentWindow.StopRecognition(); 
        }  
      }else{ //在wazuh界面上
        // console.log(this.$route.matched[this.$route.matched.length - 1].instances.default.$refs.iframe)
        if (this.facialValue == true){
          this.StartRecognition();
        }else{
          this.StopRecognition();
        }
      }
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

.camera {
  position: fixed;
  bottom: 185px;
  left: 0px;
  width: 130px;
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

.facial {
  position: fixed;
  bottom: 120px;
  left: 0px;
  width: 130px;
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


.text {
  text-align: center;
  margin-top: 8rem;
  font-weight: bold;
  font-size: 1.3rem;
  color: #262626;
}
</style>
 
 
 
 
 

