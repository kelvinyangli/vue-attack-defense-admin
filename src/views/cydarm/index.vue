<template>
    <Card shadow>
        <div style="min-height: 500px;width: 100%;">
          
            <iframe 
				id="iframeId" :src="url" frameborder="0" class="pc iframe"  scrolling="auto" >
			</iframe>
            
        </div>
    </Card>
</template>


<script>
 export default {
  components: {},
  data () {
    return {
      url: 'https://192.168.127.140' //将your_ip替换为cydarm页面ip
    }
  },
  mounted () {
  },
  methods: {
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
</style>
 
 
 
 
 