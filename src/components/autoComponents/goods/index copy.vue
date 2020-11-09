<template>
  <div class="cap-goods-layout">
    <ul
      class="cap-goods-layout__container card"
      :class="[currentObj.listStyle,currentObj.goodStyle]"
      :style="{'padding-left':currentObj.pageSpace +'px','padding-right':currentObj.pageSpace +'px',
          'margin-left':-(currentObj.goodSpace/2)+'px','margin-right':-(currentObj.goodSpace/2)+'px'}"
    >
      <li
        class="cap-goods-layout__wrapper cap-goods-layout__wrapper--0"
        v-for="(item,index) in currentGoodList"
        :key="index"
      >
        <a
          log-params="null"
          class="cap-goods-layout__item card"
          style="margin: 5px;"
          :class="[currentObj.listStyle,currentObj.goodStyle,currentObj.chamfer]"
          :style="{'margin':(currentObj.goodSpace/2)+'px'}"
        >
          <div class="cap-goods__photo">
            <div class="cap-goods__image-wrap" :style="{'padding-top':currentObj.imgScale+ '%'}">
              <div
                data-lazy-log="1"
                :class="['cap-goods__img--'+currentObj.contain]"
                class="cap-goods__img"
                lazy="loaded"
                :style="{'background-image':`url(${setImgPrex(item.Img)})`}"
              ></div>
            </div>
            <div v-if="currentObj.showContent.indexOf('5')>-1">
              <i
                v-if="currentObj.typeSign!=='4'"
                class="van-icon cap-goods-layout__corner-mark"
                :class="['type-'+currentObj.typeSign,currentObj.typeSign==='0'?'van-icon-new-arrival ':
                currentObj.typeSign==='1'?'van-icon-hot-sale':currentObj.typeSign==='2'?'van-icon-new':
                currentObj.typeSign==='3'?'van-icon-hot':'']"
                style="color: rgb(255, 68, 68);"
              ></i>

              <div
                v-if="currentObj.typeSign==='4'&&!currentObj.typeSignImg"
                style="display: inline-table;"
                class="cap-goods-layout__corner-mark cap-goods-layout__corner-mark--default"
              >
                <span>角标</span>
                <br />
                <span>区域</span>
              </div>
              <img
                v-if="currentObj.typeSign==='4'&&currentObj.typeSignImg"
                :src="currentObj.typeSignImg |setImgPrex"
                class="cap-goods-layout__corner-mark cap-goods-layout__corner-mark--custom"
              />
            </div>
          </div>
          <div class="cap-goods-layout__info" v-if="currentObj.textCenter&&currentObj.showContent">
            <div
              class="has-title-1 has-subtitle-1 cap-goods-layout__info-title"
              :class="[currentObj.listStyle]"
              goods-index="0"
              :style="{'text-align': currentObj.textCenter,'margin-top':'0'}"
            >
              <h3
                class="title"
                :style="{'font-weight': currentObj.fontWeight,'margin-top':'10px','height':'30px'}"
                v-if="currentObj.showContent.indexOf('1')>-1"
              >{{item.Name}}</h3>
              <!-- <p
                v-if="currentObj.showContent.indexOf('2')>-1&&item.Describe"
                class="sub-title"
              >{{item.Describe}}</p>-->
            </div>
            <div
              v-if="currentObj.showContent&&currentObj.showContent.length!==0
              &&(currentObj.showContent.indexOf('4')>-1||currentObj.showContent.indexOf('3')>-1)"
              class="cap-goods-layout__info-price has-price-1 has-btn-1"
              :class="[currentObj.listStyle,currentObj.listStyle==='big'||currentObj.listStyle==='list'?'size--big':'size--small',
              currentObj.textCenter]"
            >
              <div
                v-if="!(currentObj.textCenter==='center'&&currentObj.showContent.indexOf('3')===-1)"
                class="price-info"
                :style="{'padding-right':
                currentObj.textCenter==='center'?'0':
                currentObj.listStyle==='big'||currentObj.listStyle==='list'||currentObj.listStyle==='hybrid'?'39px'
                :currentObj.buyButton === '9'?'65px':'29px',
                 'font-weight': currentObj.fontWeight}"
              >
                <span class="sale-price" v-if="currentObj.showContent.indexOf('3')>-1">
                  <div class="cap-theme-view" style="color: rgb(255, 68, 68);">
                    <span class="price-tag">¥</span>
                    {{item.SalePrice}}
                  </div>
                </span>
              </div>
              <div
                v-if="currentObj.showContent.indexOf('4')>-1||currentObj.buyButton==='9'"
                class="cap-goods-layout__buy-btn-wrapper"
                :class="[currentObj.listStyle==='big'||currentObj.listStyle==='list'||currentObj.listStyle==='hybrid'?'big':'small',
                'type-'+currentObj.buyButton]"
              >
                <i
                  v-if="currentObj.buyButton!=='3'&& currentObj.buyButton!=='4'&& currentObj.buyButton!=='7'&& currentObj.buyButton!=='8'
                  &&currentObj.buyButton!=='9'"
                  class="van-icon"
                  :class="['cap-goods-layout__buy-btn-'+currentObj.buyButton,
                  currentObj.buyButton==='2'?'van-icon-add-o':currentObj.buyButton==='5'?'van-icon-add ':currentObj.buyButton==='6'?'van-icon-shopping-cart-o'
                  :'van-icon-cart-circle-o',
                  ]"
                  style="color: rgb(255, 68, 68);"
                ></i>

                <button
                  v-else
                  class="van-button van-button--danger van-button--small"
                  :class="['cap-goods-layout__buy-btn-'+ currentObj.buyButton]"
                  :style="{'background-color': currentObj.buyButton==='3'?'rgb(255, 68, 68)':'',
                   'border-color': currentObj.buyButton==='3'?'rgb(255, 68, 68)':''}"
                >
                  <span class="van-button__text">{{currentObj.buyButtonText}}</span>
                </button>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Mixins from "../public";
export default {
  mixins: [Mixins],
  name: "",
  props: {
    propsObj: {
      type: Object,
      default() {
        return {
          goodSource: "0",
          //small  big   three list hybrid swipe
          listStyle: "small",
          // 商品间距
          goodSpace: 9,
          // 页面边距
          pageSpace: 10,
          // 图片比例  3:2 -->66.6667  1:1 3:4-->133.333  16:9-->56.25
          imgScale: "100",
          // 商品样式 无边白底 --> card  卡片投影--> card-shadow 描边白底--> card2 无边透明底 --> simple 促销-->promotion
          goodStyle: "promotion",
          // 圆角 circle 直角rect
          chamfer: "circle",
          // 图片填充 周边留白-->contain  填充 -->cover
          contain: "contain",
          // 文本样式 normal  bold
          fontWeight: "normal",
          // left center
          textCenter: "left",
          // 显示内容 1商品名称 2商品描述 3商品价格 4购买按钮
          showContent: ["1", "2", "3", "4"],
          // 购买按钮样式 1 到 9
          buyButton: "9",
          // 购买按钮样式 === 3 或者4 时，有个按钮文字
          buyButtonText: "马上抢",
          // 商品角标 0 到 4
          typeSign: "4",
          // 商品角标 === 4时，自定义的图片
          typeSignImg: ""
        };
      }
    }
  },
  data() {
    return {
      currentGoodList: [],
      fakeData: [
        {
          Img:
            "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
          Name: "这里显示商品名称，最多显示1行",
          SalePrice: "99",
          Describe: "这里显示商品描述，最多显示1行"
        },
        {
          Img:
            "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
          Name: "这里显示商品名称，最多显示1行",
          SalePrice: "99",
          Describe: "这里显示商品描述，最多显示1行"
        },
        {
          Img:
            "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
          Name: "这里显示商品名称，最多显示1行",
          SalePrice: "99",
          Describe: "这里显示商品描述，最多显示1行"
        },
        {
          Img:
            "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
          Name: "这里显示商品名称，最多显示1行",
          SalePrice: "99",
          Describe: "这里显示商品描述，最多显示1行"
        }
      ]
      // reportErrorsFun:true
    };
  },
  components: {},
  created() {
    console.log(this.propsObj, "测试编辑获取详情propsObj");
  },
  mounted() {
    this.currentObj.showContent = this.currentObj.showContent
      ? this.currentObj.showContent
      : [];
    // if (
    //   // this.currentObj._Prod_Data &&
    //   // this.currentObj._Prod_Data.length > 0
    //   this.currentObj._Prod_Data.length > 0 &&
    //   this.currentObj.goodSource !== "1"
    // ) {
    //   this.currentGoodList = this.currentObj._Prod_Data;
    // } else {
    //   this.currentGoodList = this.fakeData;
    // }
    if (
      this.currentObj._Prod_Data &&
      this.currentObj._Prod_Data.length > 0
      // this.currentObj._Prod_Data.length > 0&&this.currentObj.goodSource!=='1'
    ) {
      this.currentGoodList = this.currentObj._Prod_Data;
    } else {
      this.currentGoodList = this.fakeData;
    }
  },
  methods: {
    setImgPrex(val) {
      if (
        val &&
        this.currentObj._Prod_Data &&
        this.currentObj._Prod_Data.length > 0
      ) {
        return process.env.BASE_URL + val; /* process.env.Prefix */
      } else {
        return "";
      }
    },
    reportErrorsFun() {
      let _dataString = "";
      if (Array.isArray(this.currentObj._data)) {
        _dataString = this.currentObj._data.join(",");
      } else {
        _dataString = this.currentObj._data;
      }
      return !_dataString ? "请选择商品" : "";
    }
  },
  watch: {
    "currentObj.showContent"() {
      this.currentObj.showContent = this.currentObj.showContent
        ? this.currentObj.showContent
        : [];
    },
    "currentObj._Prod_Data"(val) {
      if (this.currentObj.goodSource === "0" && val.length > 0) {
        this.currentGoodList = val;
      }
      // else {
      //   this.currentGoodList = this.fakeData;
      // }
      if (this.currentObj.goodSource === "1" && val.length > 0) {
        this.currentGoodList = val;
      }
    },
    "currentObj._data"() {
      if (this.currentObj._data.length === "0") {
        this.currentGoodList = this.fakeData;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/autoComponents/goods.css";
.cap-goods-layout {
  .el-form-item__content {
    line-height: 0;
  }
  .cap-goods-layout__buy-btn-wrapper {
    display: flex;
  }
  .cap-goods__image-wrap {
    border: 1px solid #eee;
  }
  .cap-goods-layout__corner-mark {
    z-index: 4;
  }
}
</style>
