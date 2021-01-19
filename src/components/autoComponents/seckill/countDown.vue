<template>
    <div class="countDown"><!--倒计时-->
        <!-- <span class="character">距结束</span> -->
        <span class="character">{{title}}</span>
        <span>
        <i v-if="ds > 0">{{ds}}天</i>
        <i>{{hs}}小时</i>
        <i>{{ms}}分</i>
        <i>{{ss}}秒</i>
      </span>
    </div>
</template>

<script>
    export default {
        name: "countDown",
        data() {
            return {
                timeName: null,//定时器名称
                /*====倒计时时间====*/
                ds: 0,
                hs: 0,
                ms: 0,
                ss: 0,
                lDur: null,// 考试剩余时长 （秒数）
                nowTime: null,
                starTime:null,
                deadline:null,
                title:""//显示秒杀开始还是结束
            }
        },
        props: {
            examInfo:Object,
            nowTime3:Number
        },
        created() {
            // console.log(this.examInfo,this.nowTime3)
            // 统一单位 ，时间戳的单位是毫秒  除以1000变成秒
            this.nowTime = new Date(this.nowTime3).getTime()/1000;//转化为时间戳
            this.starTime = new Date(this.examInfo.StartDate).getTime()/1000;
            if (this.examInfo.EndDate){
                this.deadline = new Date(this.examInfo.EndDate).getTime()/1000;
            }
            this.duration = (this.deadline-this.starTime)
            // this.duration = this.examInfo.duration*60;//时长  时长单位为分钟乘以60变成秒
        },
        mounted(){
            // 创建倒计时
            clearInterval(this.timeName);
            let duration = this.duration;
            let nowTime = this.nowTime;
            let starTime = this.starTime;           
                    
            let that = this;
            if(starTime - nowTime >= 0 ){
                this.title = "距开始"
                this.lDur = parseInt(nowTime-starTime);
            } else {
                this.title = "距结束"
                // 先将时间渲染到页面
                // 统一单位 为秒(倒计时时长为：时长-（当前时间-开始时间）)
                this.lDur = parseInt(duration - (nowTime-starTime));                   
            }
            that.ds = ('' + Math.floor(that.lDur / 3600 / 24))
            that.hs = ('0' + Math.floor(that.lDur / 3600 % 24)).slice(-2);
            that.ms = ('0' + Math.floor(that.lDur / 60 % 60)).slice(-2);
            that.ss = ('0' + Math.floor(that.lDur % 60 % 60)).slice(-2);

            // 开启定时器
            that.timeName = setInterval(function () {
                that.ds = ('' + Math.floor(that.lDur / 3600 / 24))
                that.hs = ('0' + Math.floor(that.lDur / 3600 % 24)).slice(-2);
                that.ms = ('0' + Math.floor(that.lDur / 60 % 60)).slice(-2);
                that.ss = ('0' + Math.floor(that.lDur % 60 % 60)).slice(-2);

                that.nowTime++;
                that.lDur--;
            }, 1000)
            
        },
        methods: {
            clearTime() { // 清除定时器
                clearInterval(this.timeName);
            },
            removeSession(path) { // 清除session后跳转页面
                sessionStorage.removeItem('lDur');
                // this.$router.replace({path: path}); // 清除session后跳转页面
            }
        },
        watch: {
          lDur: function (val) { // 监听lDur小于0 时 提交试卷清除定时器
            if ((this.deadline && this.nowTime > this.deadline) || val < 0 ) {
                this.title="已结束"
                this.ds=0
                this.hs=0
                this.ms=0
                this.ss=0
              // 调用父组件 结束考试
            //   this.$emit('autoSubmit');
            }
          }
        },
    }
</script>

<style scoped>
   
</style>
