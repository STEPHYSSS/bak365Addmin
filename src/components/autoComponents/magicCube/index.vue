<template>
  <div class="magicCube">
    <div style="background-color: rgb(249, 249, 249)">
      <div
        v-if="currentObj.imgList.length===0"
        class="rc-design-react-preview rc-design-component-default-preview"
      >
        <div class="rc-design-component-default-preview__text">点击编辑魔方</div>
      </div>
      <div class="cap-cube-wrap" v-else>
        <!-- 一行一个 -->
        <div v-if="currentObj.changeMode === '1'">
          <ul>
            <li v-for="(item,index) in listBox" :key="index">
              <img :src="item.img | SetImage" class="cap-cube__table-image--active-invisible"  />
            </li>
          </ul>
        </div>
        <!-- 一行二个 -->
        <div v-if="currentObj.changeMode === '2'">
          <ul style="width:100%">
            <li v-for="(item,index) in listBox" :key="index" style="width:50%;float:left">
              <img :src="item.img | SetImage" class="cap-cube__table-image--active-invisible"  />
            </li>
          </ul>
        </div>
        <!-- 一行三个 -->
        <div v-if="currentObj.changeMode === '3'">
          <ul style="width:100%">
            <li v-for="(item,index) in listBox" :key="index" style="width:33%;float:left">
              <img :src="item.img | SetImage" class="cap-cube__table-image--active-invisible"  />
            </li>
          </ul>
        </div>
        <!-- 一行四个 -->
        <div v-if="currentObj.changeMode === '4'">
          <ul style="width:100%">
            <li v-for="(item,index) in listBox" :key="index" style="width:25%;float:left">
              <img :src="item.img | SetImage" class="cap-cube__table-image--active-invisible"  />
            </li>
          </ul>
        </div>
        <!-- 两左两右 -->
        <div v-if="currentObj.changeMode === '5'" class="modeDiv5">
          <ul style="">
            <li v-for="(item,index) in listBox" :key="index" >
              <img :src="item.img | SetImage" class="cap-cube__table-image--active-invisible"  />
            </li>
          </ul>
        </div>
        <!-- 一左两右 -->
        <div v-if="currentObj.changeMode === '6'" class="modeDiv6">
         <ul style="width:100%">
           <li v-for="(item,index) in listBox" :key="index" class="right">
             <img :src="item.img | SetImage" class="cap-cube__table-image--active-invisible"  />
           </li>
         </ul>
        </div>
        <!-- 一上两下 -->
        <div v-if="currentObj.changeMode === '7'" class="modeDiv7">
          <ul style="width:100%">
            <li v-for="(item,index) in listBox" :key="index" class="bottom">
              <img :src="item.img | SetImage" class="cap-cube__table-image--active-invisible"  />
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="cap-cube-wrap" >
        <div class="cap-cube" :style="{'margin': -(currentObj.imgGap/2).toFixed(2)+'px','height': bigBoxH === 'auto'?'100%': '100%','width':bigBoxW+'px','display':bigBoxH != 'auto'?'flex':'','flex-wrap':bigBoxH != 'auto'? 'wrap':''}"
        >
          <div v-for="(item,index) in listBox" :key="index" :style="{'left': item.Dleft+'px','top': item.Dtop+'px','height': item.Dheight === 'auto' ? '100%' : item.Dheight + 'px','width': item.Dwidth+'px',
              'margin': (currentObj.imgGap/2).toFixed(2)+'px'}"
            @click="clickLink(item.url)" :class="{'posRight':item.right==0}"
          >
          <img :src="item.img | SetImage" class="cap-cube__table-image--active-invisible"  />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Mixins from "../public";
export default {
  mixins: [Mixins],
  props: {
    propsObj: {
      type: Object,
      default() {
        return {
          //1:1行2个;   2:
          changeMode: 1,
          densityMode: 4,
          // 图片数组
          imgList: [
            // {
            //   //离左边有几个盒子;离上面几个盒子；width几个盒子；height几个盒子
            //   pageX: 0,
            //   pageY: 0,
            //   pWidth: 2,
            //   pHeight: 2,
            //   url: "",
            //   img:
            //     "https://img.yzcdn.cn/upload_files/2014/12/05/043cc31769494d3d570543b893c9bce9.png!large.webp"
            // }
          ],
          // 图片间隙
          imgGap: 3,
          // 页面间距
          pageGap: 11
        };
      }
    }
  },
  data() {
    return {
      // currentObj: {
      //   changeMode: this.propsObj.changeMode,
      //   densityMode: this.propsObj.densityMode,
      //   imgList: this.propsObj.imgList,
      //   imgGap: this.propsObj.imgGap,
      //   pageGap: this.propsObj.pageGap
      // },
      listBox: [],
      bigBoxM: 0,
      bigBoxH: 0,
      bigBoxW: 0,
    };
  },
  mounted() {
    this.changeBox();
  },
  methods: {
    clickLink() {
      // 点击跳转
    },
    changeStyle() {
      // bus.$on("magicCubeFun", obj => {
      //   this.currentObj = obj;
      //   this.changeBox();
      // });
    },
    SetImage(val) {
      if (val && this.propsObj.imgList && this.propsObj.imgList.length > 0) {
        // return 'http://192.168.0.105:8001/' + val;
        return process.env.BASE_URL + val;
      } else {
        return val;
      }
    },
    changeBox() {
				this.listBox = this.currentObj.imgList;
        console.log(this.currentObj,'imgList')
				if (this.listBox.length === 0) {
					return;
				}
				//手机端记得把320删除
			let clientWidth = 320 || document.body.clientWidth;
      let m = Number(this.currentObj.changeMode);
      this.currentObj.pageGap = Number(this.currentObj.pageGap);
				if (m !== 8) {
					let arr = [];
					switch (m) {
					           case 1:
					            arr = [
					              { pageX: 0, pageY: 0, pWidth: 4, pHeight: 1.72}
					            ];
					            break;
					          case 2:
					            arr = [
					              { pageX: 0, pageY: 0, pWidth: 2, pHeight: 2 },
					              { pageX: 2, pageY: 0, pWidth: 2, pHeight: 2 }
					            ];
					            break;
					          case 3:
					            arr = [
					              { pageX: 0, pageY: 0, pWidth: 1.32, pHeight: 1.33 },
					              { pageX: 1.33, pageY: 0, pWidth: 1.32, pHeight: 1.33 },
					              { pageX: 2.66, pageY: 0, pWidth: 1.33, pHeight: 1.33 }
					            ];
					            break;
					          case 4:
					            arr = [
					              { pageX: 0, pageY: 0, pWidth: 1, pHeight: 1 },
					              { pageX: 1, pageY: 0, pWidth: 1, pHeight: 1 },
					              { pageX: 2, pageY: 0, pWidth: 1, pHeight: 1 },
					              { pageX: 3, pageY: 0, pWidth: 1, pHeight: 1 }
					            ];
					            break;
					          case 5:
					            arr = [
					              { pageX: 0, pageY: 0, pWidth: 2, pHeight: 2 },
					              { pageX: 2, pageY: 0, pWidth: 2, pHeight: 2 },
					              { pageX: 0, pageY: 2, pWidth: 2, pHeight: 2 },
					              { pageX: 2, pageY: 2, pWidth: 2, pHeight: 2 }
					            ];
					            break;
					          case 6:
					            arr = [
					              { pageX: 0, pageY: 0, pWidth: 2, pHeight: 4 },
					              { pageX: 2, pageY: 0, pWidth: 2, pHeight: 2 },
					              { pageX: 2, pageY: 2, pWidth: 2, pHeight: 2 ,right:0}
					            ];
					            break;
					          case 7:
					            arr = [
					              { pageX: 0, pageY: 0, pWidth: 4, pHeight: 4 },
					              { pageX: 0, pageY: 2, pWidth: 2, pHeight: 2 },
					              { pageX: 2, pageY: 2, pWidth: 2, pHeight: 2 }
					            ];
					            break;
					          case 8:
					            arr = [
					              { pageX: 0, pageY: 0, pWidth: 2, pHeight: 4 },
					              { pageX: 2, pageY: 0, pWidth: 2, pHeight: 2 },
					              { pageX: 2, pageY: 2, pWidth: 1, pHeight: 2 },
					              { pageX: 3, pageY: 2, pWidth: 1, pHeight: 2 }
					            ];
					            break;
					        }
					this.listBox.forEach((D, index) => {
						
						if (arr[index]) {
							Object.assign(arr[index],D)
						}
					});
					this.listBox = arr;
				}
				

				let imgGap = Math.ceil(this.currentObj.imgGap / 2);
				//每个盒子的平均宽度;
				let averageW = Math.ceil(
					(
						clientWidth +
						(this.currentObj.imgGap -
							this.currentObj.pageGap * 2)
					).toFixed(2) / Number(this.currentObj.densityMode)
				);


				let newList = JSON.parse(JSON.stringify(this.listBox));

				//求最多的height盒子的个数
				let mostH = newList.reduce((D, D2) => {
					let a =
						parseFloat(D).toString() == "NaN" ?
						Number(D.pHeight) + Number(D.pageY) :
						D;
					let b = Number(D2.pHeight) + Number(D2.pageY);
					return a > b ? a : b;
				});
				let mostW = newList.reduce((D, D2) => {
					let a =
						parseFloat(D).toString() == "NaN" ?
						Number(D.pWidth) + Number(D.pageX) :
						D;
					let b = Number(D2.pWidth) + Number(D2.pageX);
					return a > b ? a : b;
				});
				// this.bigBoxH = (mostH * averageW).toFixed();
				this.bigBoxH = m === 1 ? 'auto' : (mostH * averageW).toFixed();
				this.bigBoxW = (mostW * averageW).toFixed();
				
				newList.forEach((D, index) => {
					let Dheight = Number(D.pHeight) * averageW  - this.currentObj.imgGap;
					if(m===1) Dheight = 'auto'
					
					this.listBox[index].Dwidth = Number(D.pWidth) * averageW - this.currentObj.imgGap;
					// this.listBox[index].Dheight = Number(D.pHeight) * averageW - this.currentObj.imgGap;
					this.listBox[index].Dheight = Dheight
					this.listBox[index].Dleft = Number(D.pageX) * averageW + this.currentObj.pageGap;
					this.listBox[index].Dtop = Number(D.pageY) * averageW;
				});

			},
    reportErrorsFun() {
      if (this.currentObj.imgList.length === 0) {
        return "请选择魔方图片";
      } 
      // else {
      //   if (
      //     this.currentObj.changeMode === "1" &&
      //     this.currentObj.imgList.length < 1
      //   ) {
      //     return "请选择魔方图片";
      //   }
      //   if (
      //     this.currentObj.changeMode === "2" &&
      //     this.currentObj.imgList.length < 2
      //   ) {
      //     return "请选择魔方图片";
      //   }
      //   if (
      //     (this.currentObj.changeMode === "2" ||
      //       this.currentObj.changeMode === "5" ||
      //       this.currentObj.changeMode === "6") &&
      //     this.currentObj.imgList.length < 3
      //   ) {
      //     return "请选择魔方图片";
      //   }
      //   if (
      //     (this.currentObj.changeMode === "3" ||
      //       this.currentObj.changeMode === "4" ||
      //       this.currentObj.changeMode === "7") &&
      //     this.currentObj.imgList.length < 4
      //   ) {
      //     return "请选择魔方图片";
      //   }
      // }
    }
  },
  updated() {
    // this.listBox = this.currentObj.imgList
  },
  watch: {
    "propsObj.changeMode"(val) {
      console.log(val,'changeMode')
      this.changeBox();
    }    
  }
};
</script>

<style lang="less" scoped>
.magicCube{
  .rc-design-component-default-preview__text {
  line-height: 136px;
  font-size: 14px;
}
.rc-design-react-preview {
  position: relative;
  overflow: hidden;
}
.rc-design-component-default-preview {
  height: 136px;
  background-color: #ebf8fd;
  text-align: center;
  color: #88c4dc;
}

.cap-cube-wrap {
		/* user-select: none; */
		width: 100%;
		height: 100%;
		/* overflow: hidden; */
	}

	.cap-cube {
		box-sizing: border-box;
		position: relative;
		/* display: flex; */
	}

	.cap-cube__item {
		/* box-sizing: border-box;
		position: absolute;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		overflow: hidden; */
	}

	.cap-cube__table-image--active-invisible {
		/* position: absolute;
		left: 0;
		top: 0; */
		height: 100%;
    // height: auto;
		flex-wrap:wrap;
		width: 100%;
		/* height: 100%; */
		/* opacity: 0; */
	}
	.posRight{
		position: absolute;
		right: 0;
		bottom: 0;
	}
  .modeDiv6{
    height: 324px;
  }
  .modeDiv6 ul>:first-child{
    max-height: 324px;
    min-height: 180px;
    width: 160px;
    // background: #88c4dc;
    overflow: hidden;
    float: left;
    .cap-cube__table-image--active-invisible{
      height: 100%;
    }
  }
  // .right{
  //   float: left;
  //   width: 160px;
  // }
  .modeDiv6 ul>:nth-child(2),.modeDiv6 ul>:nth-child(3){
    width: 160px;
    float: left;
    // height: 160px;
  }
  .modeDiv7 ul>:first-child{
    max-height: 320px;
    width: 320px;
    overflow: hidden;

  }
  .bottom{
    float: left;
    width: 160px;
  }
  .modeDiv5 ul>:first-child{
    width: 160px;
    float: left;
  }
  .modeDiv5 ul>:nth-child(2){
    width: 160px;
    float: left;
  }
  .modeDiv5 ul>:nth-child(3){
    width: 160px;
    clear: both;
    float: left;
  }
  .modeDiv5 ul>:nth-child(4){
    width: 160px;
    float: left;
  }
}

</style>
