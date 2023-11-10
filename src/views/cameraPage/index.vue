<template>
  <div id="video">
    <iframe ref="iframe" :src="htmlSrc" frameborder="0" style="width:1440px; height:960px; border: 0;display:block" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlSrc: 'new_html.html',  //该页面在public文件夹下
    }
  },
  mounted() {
    
    // 监听消息事件，并定义一个回调函数
    // window.addEventListener('message', this.handleMessage);
  },
  // 在vue页面中定义一个methods属性来存储自定义方法
  methods: {
    
  },
  beforeDestroy() {
    // 向vue页面发送消息
    window.parent.postMessage('stop', '*');
  }

}
</script>

<style>
#video {
  background-size: cover;
  /*框自动居中 */
  position: absolute;
  width: 1440px;
  height: 960px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius5: 10px;
  overflow-x: auto;
  /* 设置横向滚动条为自动显示 */
  overflow-y: auto;
}

@media screen and (max-width: 1000px) {
  #video {
    width: 1000px;
    /* 设置宽度为100px */
    height: 800px;
  }
}

*::-webkit-scrollbar {
  /* 设置滚动条的宽度和高度，单位为像素 */
  width: 10px;
  /* 设置垂直滚动条的宽度 */
  height: 10px;
  /* 设置水平滚动条的高度 */
  /* color: blue; */
}
</style>
