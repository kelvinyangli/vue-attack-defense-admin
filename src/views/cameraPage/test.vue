<template>
    <div class="publish">
        <video ref="video"></video>
        <!-- 保证背景颜色 -->
        <iframe ref="iframe" :src="htmlSrc" frameborder="0" style="width:650px; height:700px; border: 0;display:block" />
        <!-- 按钮 -->
        <el-container id="button">
            <el-button @click="OpenCamera" type="primary">打开摄像头</el-button>
            <el-button @click="CloseCamera" type="primary">关闭摄像头</el-button>
            <!-- 视频录制或暂停 -->
            <el-button @click="recordOrStop" type="primary" :loading="loading">视频录制</el-button>
            <el-button @click="recordOrStop" type="primary">停止录制并保存视频</el-button>
            <!-- 下载按钮 -->
            <a id="downLoadLink" style="display: none;"></a>
        </el-container>
    </div>
</template>
  
<script>
import {
    detectSingleFace,
    nets,
    matchDimensions,
    resizeResults,
    draw,
    SsdMobilenetv1Options,
    Box,
} from 'face-api.js';
export default {
    name: 'CameraPage',
    data() {
        return {
            mediaStreamTrack: {}, // 退出时关闭摄像头
            video_stream: '', // 视频stream
            recordedBlobs: [], // 视频音频 blobs
            isRecord: false, // 视频是否正在录制
            loading: false,
        };
    },
    created() {
        // 指定面部检测器
        this.options = new SsdMobilenetv1Options({
            // 最小置信阈值 默认值：0.5 
            minConfidence: 0.9
        });
    },
    mounted() {
        // 进入页面 调用摄像头
        this.getCamera();
        //初始化
        this.canvas = this.$refs["canvas"] as HTMLCanvasElement;
        this.video = this.$refs["video"] as HTMLVideoElement;
        this.init();
    },
    methods: {
        //初始化模型
        async init() {
            await loadTinyFaceDetectorModel.loadFromUri('/models')
        },
        // 调用打开摄像头功能
        getCamera() {
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
        // 录制或暂停
        recordOrStop() {
            this.loading = true;
            if (this.isRecord) {
                this.loading = false;
                this.stop();
            } else {
                this.record();
            }
        },
        // 视频录制
        record() {
            console.log('record');
            this.isRecord = !this.isRecord;
            let mediaRecorder;
            let options;
            this.recordedBlobs = [];
            if (typeof MediaRecorder.isTypeSupported === 'function') {
                // 根据浏览器来设置编码参数
                if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
                    options = {
                        MimeType: 'video/webm;codecs=h264',
                    };
                } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
                    options = {
                        MimeType: 'video/webm;codecs=h264',
                    };
                } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
                    options = {
                        MimeType: 'video/webm;codecs=vp8',
                    };
                }
                mediaRecorder = new MediaRecorder(this.video_stream, options);
            } else {
                // console.log('isTypeSupported is not supported, using default codecs for browser');
                console.log('当前不支持isTypeSupported，使用浏览器的默认编解码器');
                mediaRecorder = new MediaRecorder(this.video_stream);
            }
            mediaRecorder.start();
            // 视频录制监听事件
            mediaRecorder.ondataavailable = e => {
                console.log(e);
                // 录制的视频数据有效
                if (e.data && e.data.size > 0) {
                    this.recordedBlobs.push(e.data);
                }
            };
            // 停止录像后增加下载视频功能，将视频流转为mp4格式
            mediaRecorder.onstop = () => {
                const blob = new Blob(this.recordedBlobs, { type: 'video/mp4' });
                this.recordedBlobs = [];
                // 将视频链接转换完可以用于在浏览器上预览的本地视频
                const videoUrl = window.URL.createObjectURL(blob);
                // 设置下载链接
                document.getElementById('downLoadLink').href = videoUrl;
                // 设置下载mp4格式视频
                document.getElementById('downLoadLink').download = 'media.mp4';
                document.getElementById('downLoadLink').innerHTML = 'DownLoad video file';
                // 生成随机数字
                const rand = Math.floor((Math.random() * 1000000));
                // 生成视频名
                const name = `video${rand}.mp4`;

                // setAttribute() 方法添加指定的属性，并为其赋指定的值
                document.getElementById('downLoadLink').setAttribute('download', name);
                document.getElementById('downLoadLink').setAttribute('name', name);

                // 0.5s后自动下载视频
                setTimeout(() => {
                    document.getElementById('downLoadLink').click();
                }, 500);
            };
        },
        // 停止录制
        stop() {
            this.isRecord = !this.isRecord;
            if (!this.$refs.video.srcObject) return;
            const stream = this.$refs.video.srcObject;
            const tracks = stream.getTracks();
            // 关闭摄像头和音频
            tracks.forEach(track => {
                track.stop();
            });
        },
        // 打开摄像头
        OpenCamera() {
            console.log('打开摄像头');
            this.getCamera();
        },
        // 关闭摄像头
        CloseCamera() {
            console.log('关闭摄像头');
            this.$refs.video.srcObject.getTracks()[0].stop();
        },
    },
};
</script>
  
<style lang="less" scoped>
.publish {
    background-color: #97cbd3c3;

    video {
        // box-shadow: 1px 2px 11px 2px #ffffff; /*边框 */
        background-size: cover;
        /*框自动居中 */
        position: absolute;
        width: 650px;
        height: 650px;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius5: 10px;
    }

    #button {
        // box-shadow: 1px 2px 11px 2px #ffffff; /*边框 */
        background-size: cover;
        /*框自动居中 */
        position: absolute;
        width: 100px;
        height: 50px;
        top: 90%;
        left: 33%;
        transform: translate(-50%, -50%);
        border-radius5: 10px;
    }

    div {
        position: absolute;
        left: calc(50% - 80px);
        bottom: 0;
        height: 40px;
        width: 160px;
        font-size: 14px;
        border-radius: 10px;
        line-height: 40px;
        background-color: rgb(25, 179, 179);
        text-align: center;
    }

}
</style>
  