<script>
export default {
  computed: {
    currentObj() {     
      if(this.propsObj.whiteHeight){
        this.propsObj.whiteHeight = Number(this.propsObj.whiteHeight)
      }
      if(this.propsObj.pageGap){
        this.propsObj.pageGap = Number(this.propsObj.pageGap)
      }
      if(this.propsObj.imgGap){
        this.propsObj.imgGap = Number(this.propsObj.imgGap)
      }
      // 语音
      if(this.propsObj.loopPlay){
        this.propsObj.loopPlay = this.propsObj.loopPlay === "False" ?false:this.propsObj.loopPlay
        this.propsObj.loopPlay = this.propsObj.loopPlay === "True" ?true:this.propsObj.loopPlay
      }
      // console.log(this.propsObj)
      return this.propsObj;
    }
  },
  created(){
    // console.log("这是父传子数据"+this.currentObj)
  }
};
</script>