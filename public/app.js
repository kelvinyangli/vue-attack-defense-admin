//模型存放路径
const MODEL_PATH = './models';
let canvas_all=null;

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
    
    //循环执行，跟踪人脸
    setInterval(async () => {
        //得到模型识别结果
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks(true).withFaceExpressions().withAgeAndGender();
        
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
    }, 100);
}

video.addEventListener('play', detectFace);
loadModels();

