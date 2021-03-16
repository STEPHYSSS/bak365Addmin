<template>
  <div class="menuBar">
    <div class="menuBarTip">
      <h4>微信菜单设置</h4>
      <span>由于微信接口延迟，菜单修改后最长可能需要30分钟才会更新。如需即时查看，可先取消关注，再重新关注。注意：一级导航最多设置三个，二级导航最多设置五个
        <!--        ，当菜单类型为小程序时，必须开通小程序，否则菜单创建无效-->
      </span>
    </div>
    <div v-loading="loading">
      <div class="menuBarLeft">
        <div class="menuBarLeftTop"></div>
        <div class="menuBarLeftCenter">
          <div class="CenterTop"></div>
          <div class="CenterBottom">
            <div :class="{CenterBottomLeft:true, borderRight:navigationList.length===0}"></div>
            <ul class="CenterBottomRight">
              <li v-for="(item,index) in navigationList" :key="index"
                  ref="navigationLi"
                  class="popoverStyle" :style="{width:`${100/navigationList.length}%`,float:'left'}">
                <el-popover
                  v-if="item.sub_button.length>0"
                  @show="showPopover"
                  placement="top"
                  :width="popoverWidth"
                  trigger="click">
                  <ul class="popoverLi">
                    <li v-for="(itemChild,i) in item.sub_button" :key="i">
                      {{itemChild.name}}
                    </li>
                  </ul>
                  <span slot="reference">{{item.name}}</span>
                </el-popover>
                <span v-else :style="{width:`${100/navigationList.length}%`}">
                      {{item.name}}
                    </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="menuBarLeftBottom"></div>
      </div>
      <div class="menuBarRight">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
          <div class="menuBarOne"
               v-for="(item,index) in ruleForm.arr" :key="index"
               v-if="ruleForm.arr.length>0"
               @mouseover="mouseoverPa(index)"
               @mouseout="currentMouse = false"
          >
            <div class="menuBarRightH1">一级导航</div>
            <div class="menuBarRightOne" style="padding: 0 35px;">
              <el-form-item class="Keyword" label="入口名称" :prop="`arr.${index}.name`" :rules="rules.name">
                <el-input v-model="item.name" maxlength="4" show-word-limit></el-input>
              </el-form-item>
              <el-form-item :prop="`arr.${index}.type`" class="changeType" :rules="rules.type"
                            v-if="!item.sub_button.length>0">
                <el-select v-model="item.type" placeholder="请选择" @change="changeType(item)">
                  <el-option
                    v-for="val in optionsList"
                    :key="val.id"
                    :label="val.name"
                    :value="val.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- :rules="rules.urlCilck" -->
              <el-form-item label="关键字" style="margin-bottom:20px" :prop="`arr.${index}.url`" 
                            v-if="!item.sub_button.length>0&&item.type === 'click'">
                <el-input v-model="item.url" maxlength="128"></el-input>
              </el-form-item>
              <!-- :rules="rules.url" -->
              <el-form-item label="链接地址" style="margin-bottom:20px" :prop="`arr.${index}.url`" 
                            v-if="!item.sub_button.length>0&&item.type === 'view'">
                <el-input v-model="item.url" :disabled="item.disabled" maxlength="1024" @input="changeView($event)"></el-input>
                <el-dropdown @command="handleCommand($event,item)">
                  <span class="el-dropdown-link">
                    修改链接地址
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <!--                    <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>-->
                    <el-dropdown-item command="customUrl" >自定义链接</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
              <span v-if="item.sub_button.length>0" class="tipTitle">使用二级导航后主链接已失效</span>
            </div>
            <div class="menuBarRightTwo">
              <h2 class="menuBarRightH2">二级导航</h2>
              <div class="menuBarRightOne" v-if="item.sub_button.length>0"
                   v-for="(itemChild,indexChild) in item.sub_button" :key="indexChild"
                   @mouseover="mouseoverChild(indexChild)"
                   @mouseout="currentMouseChild = false"
              >
                <el-form-item class="Keyword" label="入口名称" :prop="`arr.${index}.sub_button.${indexChild}.name`"
                              :rules="rules.name">
                  <el-input v-model="itemChild.name" maxlength="7" show-word-limit></el-input>
                </el-form-item>
                <el-form-item :prop="`arr.${index}.sub_button.${indexChild}.type`" class="changeType"
                              :rules="rules.type">
                  <el-select v-model="itemChild.type" placeholder="请选择">
                    <el-option
                      v-for="val in optionsList"
                      :key="val.id"
                      :label="val.name"
                      :value="val.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="关键字" style="margin-bottom:20px" :prop="`arr.${index}.sub_button.${indexChild}.url`"
                              :rules="rules.url"
                              v-if="itemChild.type === 'click'">
                  <el-input v-model="itemChild.url"></el-input>
                </el-form-item>
                <el-form-item label="链接地址" style="margin-bottom:20px"
                              :prop="`arr.${index}.sub_button.${indexChild}.url`" :rules="rules.url"
                              v-if="itemChild.type === 'view'">
                  <el-input v-model="itemChild.url" :disabled="itemChild.disabled"></el-input>

                  <el-dropdown @command="handleCommand($event,itemChild)">
                  <span class="el-dropdown-link">
                    修改链接地址
                  </span>
                    <el-dropdown-menu slot="dropdown">
<!--                      <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>-->
                      <el-dropdown-item command="customUrl">自定义链接</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
                <span class="el-icon-error delIcon" v-show="currentMouseChild&&indexChild===currentIndexChild"
                      @click="clickDelChild(index,indexChild)"></span>
              </div>
              <div class="AddList" @click="AddListChild(item.sub_button)"><i class="el-icon-circle-plus"></i><span
                style="margin-left:8px">添加二级导航</span></div>
            </div>

            <span class="el-icon-error delIcon" v-show="currentMouse&&index===currentIndex"
                  @click="clickDel(index)"></span>
          </div>

          <div class="AddList" @click="AddList"><i class="el-icon-circle-plus"></i><span
            style="margin-left:8px">添加一级导航</span></div>
        </el-form>
      </div>

      <div style="text-align: center;margin:20px 0;clear:both">
        <el-button type="primary" style="margin-top:20px" @click="submitForm" :loading="loadingBtn">提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import {getLists} from '@/api/vipCard'
import _ from 'lodash'
import {rulesSymbol} from '@/config/publicFunction'

export default {
  name: "menuBar",
  data() {
    return {
      loading: true,
      loadingBtn: false,
      currentMouse: false,
      currentIndex: '',
      currentMouseChild: '',
      currentIndexChild: '',
      navigationList: [
        {
          name: '商品分类',
          url: 'https://fanyi.baidu.com',
          type: 'view',
          sub_button: []
        },
        {
          name: '商品分1',
          url: '',
          type: '',
          sub_button: [
            {
              name: '商品类型1',
              url: 'https://fanyi.baidu.com',
              type: 'view',
            }
          ]
        }
      ],
      popoverWidth: 90,
      optionsList: [
        {name: '关键字', id: 'click'},
        {name: '链接地址', id: 'view'},
        // {name: '小程序', id: 'smallProgram'}
      ],

      ruleForm: {},
      rules: {
        // name: [{
        //   required: true, trigger: 'blur', validator: (rules, value, callback) => {
        //     rulesSymbol(value, 16, callback, '请填写', '请输入不超过16个英文和8个汉字',false)
        //   }
        // }],
        name: [{required: true, message: '请输入', trigger: 'blur'}],
        urlCilck: [{
          required: true, trigger: 'blur', validator: (rules, value, callback) => {
            rulesSymbol(value, 128, callback, '请填写', '请输入不超过128个英文和64个汉字',false)
          }
        }],
        url: [{
          required: true, trigger: 'blur', validator: (rules, value, callback) => {
            rulesSymbol(value, 1024, callback, '请填写链接', '请输入不超过1024个英文和512个汉字',false)
          }
        }],
        // url: [{required: true, message: '请填写链接', trigger: 'blur'}],
        type: [{required: true, message: '请选择', trigger: 'change'}],
      }
    }
  },
  async created() {
    try{
      this.loading = true
      let data = await getLists({Action:'GetMenu'},'MBaseOpera')
      // console.log(data, 1111)
      // this.navigationList = data.Data.MenuInfo.CustomText
      if(data.Data.MenuInfo!={}){
        this.navigationList = data.Data.MenuInfo.CustomText
      }else {
        this.navigationList = [];
      }
      let ti = this.navigationList
      for (let i = 0; i < ti.length; i++) {
        let D = ti[i]
        for (let j = 0; j < D.length; i++) {
          let data = D[j]
          if(data.url){
            data.disabled = true
          }else{
            data.disabled = false
          }
        }
        // D.sub_button.forEach(data=>{
        //   if(data.url){
        //     data.disabled = true
        //   }else{
        //     data.disabled = false
        //   }
        // })
        if(D.url){
          D.disabled = true
        }else{
          D.disabled = false
        }
      }
      // this.navigationList.forEach((D)=>{
      //   D.sub_button.forEach(data=>{
      //     if(data.url){
      //       data.disabled = true
      //     }else{
      //       data.disabled = false
      //     }
      //   })
      //
      //   if(D.url){
      //     D.disabled = true
      //   }else{
      //     D.disabled = false
      //   }
      // })
      this.loading = false
    }catch(e){
      this.loading = false
      this.navigationList = []
      this.$message.error(e)
      // this.$message.error(typeof e === 'string'?e:'信息获取失败')
    }
    this.ruleForm = {
      arr: this.navigationList
    }
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    changeView(){
      this.$forceUpdate() 
    },
    mouseoverPa(index) {
      this.currentMouse = true
      this.currentIndex = index
    },
    mouseoverChild(index) {
      this.currentMouseChild = true
      this.currentIndexChild = index
    },
    clickDelChild(index, indexChild) {
      this.navigationList[index].sub_button.splice(indexChild, 1)
    },
    clickDel(index) {
      this.navigationList.splice(index, 1)
    },
    showPopover() {
      this.popoverWidth = this.$refs.navigationLi[0].offsetWidth
    },
    changeType(val) {
      val.url = ''
      val.disabled = false
      this.$refs.ruleForm.clearValidate()
    },
    AddList() {
      // 新增一级菜单栏
      if (this.navigationList.length < 3) {
        this.navigationList.push({
          name: '店铺主页',
          url: '',
          type: 'view',
          sub_button: []
        })
      } else {
        this.$message.info('一级导航最多添加3条')
      }
    },
    AddListChild(val) {
      // 新增二级菜单栏
      if (val.length < 5) {
        val.push({
          name: '店铺主页',
          url: '',
          type: 'view'
        })
      } else {
        this.$message.info('二级导航最多添加5条')
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loadingBtn = true
            let obj = {}
            Object.assign(obj, {Action: 'SetMenu'})
            let newData = _.clone(this.ruleForm.arr)
            newData.forEach(D => {
              // 有二级的时候 清掉一级的url 和name
              if (D.sub_button.length>0) {
                delete D.url
                delete D.type
              }
            })

            let newArr = JSON.stringify(newData)
            Object.assign(obj, {CustomText: newArr})

            // console.log(obj, 22222)
            await getLists(obj, 'MBaseOpera')
            this.$message.success('操作成功')
            this.loadingBtn = false
          } catch (e) {
            this.loadingBtn = false
            this.$message.error(typeof e === 'string' ? e : '添加失败')
          }
        } else {
          return false;
        }
      });
    },
    handleCommand(e, val) {
      if (e === 'customUrl') {
        if (val.url && !val.disabled) {
        } else {
          val.url = ''
          val.disabled = false
        }
      } else {
        val.url = e
        val.disabled = true
      }
      // console.log(e, val, 8888)
    }
  }
}
</script>

<style lang="less">
  .popoverLi {
    li {
      line-height: 30px;
      cursor: pointer;
      /*加省略号*/
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      &:nth-child(2n) {
        border-top: 1px solid #e5e5e5;
      }
    }
    text-align: center
  }

  .el-popover {
    min-width: 0 !important;
  }

  .menuBar {
    min-width: 1000px;
    .el-form-item__error{
      width:300px;
    }
    .menuBarTip {
      background: #fff;
      padding: 20px;

      span {
        display: inline-block;
        width: 70%;
      }

      margin-bottom: 30px;
    }

    .bg-purple {

    }

    .menuBarLeft {
      min-height: 200px;
      width: 342px;
      border-radius: 20px;
      border: 1px solid #e5e5e5;
      background: #fff;
      margin-bottom: 30px;
      float: left;

      .menuBarLeftTop {
        background: url(../../../assets/img/iphone_head.png) no-repeat center center;
        height: 70px;
      }

      .menuBarLeftCenter {
        height: 450px;
        border: 1px solid #c5c5c5;
        margin: 10px;
        position: relative;

        .CenterTop {
          background: url(../../../assets/img/titlebar.png) no-repeat;
          height: 64px;
        }

        .CenterBottom {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50px;
          border-top: 1px solid #e5e5e5;

          .CenterBottomLeft {
            width: 15%;
            height: 100%;
            float: left;
            background: url(../../../assets/img/showmenu_icon@2x.png) no-repeat center;
            background-size: 80%;
            cursor: pointer;
          }

          .borderRight {
            border-right: 1px solid #e5e5e5;
          }

          .CenterBottomRight {
            height: 100%;
            line-height: 50px;
            float: right;
            width: 85%;
            /*display: flex;*/
            /*justify-content:space-between;*/

            li {
              /*flex-grow:1;*/
              height: 100%;
              display: inline-block;
              border-left: 1px solid #e5e5e5;
              text-align: center;
              cursor: pointer;
            }

            .el-popover__reference {
              width: 100%;
              display: inline-block;
            }
          }
        }
      }

      .menuBarLeftBottom {
        height: 70px;
        text-align: center;

        &:after {
          content: '';
          display: inline-block;
          width: 60px;
          height: 60px;
          border: 1px solid #e5e5e5;
          border-radius: 50%;
        }
      }
    }

    .menuBarRight {
      border: 1px solid #e5e5e5;
      margin-left: 25px;
      float: left;
      width: 60%;
      padding: 25px;
      background: #ffffff;
      border-radius: 20px;

      .menuBarOne {
        border: 1px solid #e5e5e5;
        padding: 10px;
        margin-bottom: 20px;
        position: relative;

        .delIcon {
          position: absolute;
          font-size: 24px;
          color: rgba(0, 0, 0, 0.5);
          top: -12px;
          right: -12px;
          cursor: pointer;
        }
      }

      .el-form-item {
        display: inline-block;
        margin: 0;
      }

      .menuBarRightH1 {
        font-size: 18px;
        font-weight: bold;
      }

      .menuBarRightOne {
        background: #F8F8F8;
        margin: 10px 0 20px 0;
        padding: 0 15px;

        .el-input {
          width: 120px;
        }

        .changeType {
          .el-form-item__content {
            margin-left: 20px !important;
          }
        }

        .el-dropdown-link {
          cursor: pointer;
          color: #409EFF;
          margin-left: 20px;
        }

        .Keyword {
          margin: 19px 0;
        }

        .tipTitle {
          color: #999;
          margin-left: 20px;
        }
      }

      .menuBarRightTwo {
        margin: 10px 0 20px 20px;

        .menuBarRightH2 {
          font-size: 16px;
          font-weight: bold;
        }

        .menuBarRightOne {
          position: relative;
          /*.delIconChild{*/
          /*  position:absolute;*/
          /*}*/
        }
      }

      .AddList {
        text-align: center;
        width: 100%;
        height: 45px;
        line-height: 45px;
        border: 1px dashed #ccc;
        cursor: pointer;

        .el-icon-circle-plus {
          font-size: 16px;
          color: #409EFF;
        }
      }
    }
  }
</style>
