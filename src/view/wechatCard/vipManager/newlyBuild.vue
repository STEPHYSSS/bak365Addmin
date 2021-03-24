<template>
  <div class="newlyBuildStyle" v-loading="loadingBody"
       element-loading-text="拼命加载中">
    <el-row :gutter="5">
      <el-col :span="5" class="newlyBuildL">
        <div class="newlyBuildLeft">
          <div class="phoneTop">
            <div class="phoneTopBack"
                 :style="{'background':(cover===6?currentBackColor:ruleForm.BgImg?`url(${ruleForm.BgImg}) no-repeat  center`:currentBackColor)}">
              <el-row class="phoneTopHead">
                <el-col :span="6">
                  <div class="phoneTopImg">
                    <img v-if="ruleForm.LogoImg" :src="setImg(ruleForm.LogoImg)" alt="">
                    <img v-else src="../../../assets/img/cardlogo.jpg" alt="">
                  </div>
                </el-col>
                <el-col :span="14" class="phoneTopName">
                  <span>{{ruleForm.Name?ruleForm.Name:'烘焙365'}}</span>
                  <!--                会员卡标题 默认为空-->
                  <div>{{ruleForm.VipTitle}}</div>
                </el-col>
                <el-col :span="2">
                  <span class="phoneTopCode"></span>
                </el-col>
              </el-row>

              <div style="margin-top:25px">0268 8888 8888
                <span class="Tips"></span>
              </div>
            </div>
          </div>
          <div style="text-align: center;margin-top:10px">
            <!--            <div v-if="ruleForm.base_info.custom_field">-->
            <!--              <span>优惠券</span>-->
            <!--              <el-button type="text" style="margin-left:20px">查看</el-button>-->
            <!--            </div>-->
            <a style="display:inline-block" :href="phoneCenterBtnUrl" target="_blank">
              <el-button class="phoneCenterBtn" plain>
                {{ruleForm.CenterTitle?ruleForm.CenterTitle:'快速买单'}}
              </el-button>
            </a>
            <div class="phoneCenterTips">
              {{ruleForm.CenterSubTitle?ruleForm.CenterSubTitle:'请填写提示语'}}
            </div>
          </div>
          <ul class="phoneBottom phoneBottomEntry">
            <li>适用门店<span class="ic"></span></li>
            <li>公众号<span class="ic"></span></li>
          </ul>
          <ul class="phoneBottom">
            <li v-for="(item,index) in ruleForm.CustomText"
                :class="{bottomBorder:(index===0&&ruleForm.CustomText.length===2)||((index===1||index===0)&&ruleForm.CustomText.length===3)}">
              <span>{{item.name?item.name:'自定义入口(选填)'}}</span>
              <div class="ic"></div>
              <span class="phoneBottomRight">{{item.language?item.language:'引导语'}}</span>
            </li>
            <li v-if="ruleForm.CustomText.length===0">
              自定义入口(选填)
              <div class="ic"></div>
              <span class="phoneBottomRight">引导语</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="19" class="newlyBuildR">
        <div class="newlyBuildRight">
          <div style="padding-bottom:20px;border-bottom: 1px solid #e6e9eb;">基本信息</div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
            <el-form-item label="商户Logo" prop="logo">
              <imgLoad :limit="1" accept="image/jpg,image/png" :fileListUp="TemplateFileListImg" :sizeMax="1"
                       :isM="true" @upLoadImgs="upLoadImg"  folder="CardImg"></imgLoad>
              <div class="tipNews">建议尺寸:300*300;大小:小于1M;格式:JPG,PNG</div>
            </el-form-item>
            <el-form-item label="商户名称" prop="Name">
              <el-input v-model="ruleForm.Name" maxlength="24"
                        :readonly="$route.query.id?true:false"></el-input>
              <div class="tipNews">商户名称只可设置一次，请谨慎填写</div>
            </el-form-item>
            <el-form-item label="卡券封面" prop="cover">
              <el-radio-group v-model="cover" @change="changeCover">
                <el-radio :label="3">图片</el-radio>
                <el-radio :label="6">颜色</el-radio>
              </el-radio-group>
              <div v-if="cover === 3">
                <span>请参照 <a
                  href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=cardticket/card_cover_tmpl&type=info&lang=zh_CN"
                  target="_blank">图片规范</a>上传
                </span><br>
                (尺寸:1000*600以下;大小:小于1M;格式:JPG,PNG,JPEG)
                <imgLoad :limit="1" accept="image/jpg,image/png,image/JPEG" :fileListUp="fileListUp" :sizeMax="1"
                         :isM="true" @upLoadImgs="upLoadImgCover" folder="CardImg"></imgLoad>
              </div>
              <div class="pickerC" v-if="cover === 6">
                <div class="pickerColor" @click="showColors=!showColors">
                  <div class="pickerColorChange" :style="{'background':currentBackColor}"></div>
                  <span class="el-icon-caret-bottom iconBottom"></span>
                </div>
                <ul class="pickerColorClick" v-if="showColors">
                  <li v-for="item in pickerColors" :style="{'background':item.color}"
                      @click="clickCurrentColor(item)"></li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="会员卡标题" prop="VipTitle">
              <el-input v-model="ruleForm.VipTitle" maxlength="18" show-word-limit></el-input>
              <br>
              <div class="tipNews">建议会员卡标题包含商户名或服务内容，如腾讯会员黄钻尊享卡</div>
            </el-form-item>
            <el-form-item label="使用提醒" prop="Notice">
              <el-input v-model="ruleForm.Notice" maxlength="32" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="Quantity">
              <el-input-number v-model="ruleForm.Quantity" controls-position="right" :min="1"
                               :max="100000000"></el-input-number>
              <div class="tipNews">卡券库存的数量，不支持填写0，上限为100000000</div>
            </el-form-item>

            <!--            <el-form-item label="会员信息类目" prop="base_info.custom_field" class="vipInfoCategory">-->
            <!--              <el-checkbox v-model="ruleForm.base_info.custom_field">优惠券(用户点击跳转至商城"我的电子券")</el-checkbox>-->
            <!--            </el-form-item>-->
            <el-form-item label="发放条件" prop="GrantCondition" class="vipInfoCategory">
              <el-checkbox v-model="ruleForm.GrantCondition">用户关注自动发放</el-checkbox>
            </el-form-item>
            <el-form-item label="门店" prop="AllShop" class="vipInfoCategory">
              <el-checkbox v-model="ruleForm.AllShop">适用所有门店</el-checkbox>
            </el-form-item>
            <el-form-item label="展示码类型" prop="CodeType">
              <el-select v-model="ruleForm.CodeType" placeholder="请选择">
                <el-option
                  v-for="item in code_types"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有效期">
              <el-radio-group v-model="validData" @change="changeValidData" :disabled="$route.query.id?true:false">
                <el-radio :label="0">固定日期</el-radio>
                <el-radio :label="1">固定时长(只可填写一次)</el-radio>
                <el-radio :label="2">永久有效</el-radio>
              </el-radio-group>

              <div v-if="validData === 0">
                时间:&nbsp;&nbsp;&nbsp;
                <el-date-picker
                  :disabled="$route.query.id?true:false"
                  v-model="validDataFIX"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  :editable="false"
                  :clearable="false"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <div v-if="validData === 1">
                有效时长:&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="ruleForm.DateInfo.fixed_term" controls-position="right"
                                 :disabled="$route.query.id?true:false"
                                 :min="0"></el-input-number>&nbsp;&nbsp;天
                <div class="tipNews">领取后当天有效填写0</div>
                领&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;取:&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="ruleForm.DateInfo.fixed_begin_term" controls-position="right"
                                 :min="0"
                                 :disabled="$route.query.id?true:false"
                                 style="margin-top:10px;"></el-input-number>&nbsp;&nbsp;天后生效
              </div>
              <div class="tipNews">只可选择一次。</div>
            </el-form-item>

            <div style="padding-bottom:20px;margin-bottom: 20px;border-bottom: 1px solid #e6e9eb;">会员卡详情</div>

            <el-form-item label="使用说明" prop="Description">
              <el-input
                class="newlyDescription"
                type="textarea"
                :rows="5"
                resize="false"
                placeholder="请输入使用说明"
                v-model="ruleForm.Description">
              </el-input>
            </el-form-item>
            <el-form-item label="特权说明" prop="Prerogative">
              <el-input
                type="textarea"
                :rows="5"
                resize="false"
                placeholder="请输入特权说明"
                v-model="ruleForm.Prerogative">
              </el-input>
            </el-form-item>

            <div style="padding-bottom:20px;margin-bottom: 20px;border-bottom: 1px solid #e6e9eb;">居中按钮</div>

            <el-form-item label="按钮标题" prop="CenterTitle">
              <el-input
                placeholder="请输入按钮标题"
                maxlength="12"
                show-word-limit
                v-model="ruleForm.CenterTitle">
              </el-input>
            </el-form-item>
            <el-form-item label="指向链接" prop="CenterUrl">
              <el-input
                placeholder="请输入指向链接"
                maxlength="128"
                show-word-limit
                v-model="ruleForm.CenterUrl">
              </el-input>
            </el-form-item>
            <el-form-item label="下方提示语" prop="CenterSubTitle">
              <el-input
                placeholder="请输入下方提示语"
                maxlength="20"
                show-word-limit
                v-model="ruleForm.CenterSubTitle">
              </el-input>
            </el-form-item>

            <div style="padding-bottom:20px;margin-bottom: 20px;border-bottom: 1px solid #e6e9eb;">商户介绍(选填)</div>
            <el-form-item label="电话" prop="ServicePhone">
              <el-input
                placeholder="请输入电话"
                maxlength="24"
                style="padding-right:0"
                v-model="ruleForm.ServicePhone">
              </el-input>
              <div class="tipNews">手机或固话电话</div>
            </el-form-item>
            <el-form-item label="商户服务" prop="BusinessService">
              <el-checkbox-group v-model="BusinessServiceS">
                <el-checkbox label="BIZ_SERVICE_DELIVER">外卖服务</el-checkbox>
                <el-checkbox label="BIZ_SERVICE_FREE_PARK">停车位</el-checkbox>
                <el-checkbox label="BIZ_SERVICE_WITH_PET">可带宠物</el-checkbox>
                <el-checkbox label="BIZ_SERVICE_FREE_WIFI">免费wifi</el-checkbox>
              </el-checkbox-group>
              <div class="tipNews">创建会员卡完毕以后如若修改此服务，则必须选择一项，否则拉取上一次设置的信息</div>
            </el-form-item>

            <div v-if="ruleForm.CustomText.length===0"
                 style="padding-bottom:10px;margin-bottom: 20px;border-bottom: 1px solid #e6e9eb;"></div>
            <div v-for="(item,index) in ruleForm.CustomText" v-if="ruleForm.CustomText.length>0">
              <div style="width:600px" @mouseover="mouseover(index)" @mouseout="mouseout(index)">
                入口{{index+1}}
                <span v-if="index===2" style="color:#606266;font-size: 12px;">(此入口仅在会员卡激活后显示)</span>
                <i v-show="currentDelIcon === index&&showDelIcon" class="el-icon-delete"
                   style="margin-left:20px;color:#409eff;cursor: pointer" @click="delEntry(index)"></i>
                <div style="padding-bottom:10px;margin-bottom: 20px;border-bottom: 1px solid #e6e9eb;"></div>
                <el-form-item label="入口名称" :prop="`CustomText.${index}.name`" :rules="rules.name">
                  <el-input
                    :key="index"
                    placeholder="请输入入口名称"
                    maxlength="10"
                    show-word-limit
                    v-model="item.name">
                  </el-input>
                </el-form-item>
                <el-form-item label="引导语(选填)" :prop="`CustomText.${index}.language`">
                  <el-input
                    :key="index"
                    placeholder="请输入引导语"
                    maxlength="6"
                    show-word-limit
                    v-model="item.language">
                  </el-input>
                </el-form-item>
                <el-form-item label="网页链接" :prop="`CustomText.${index}.url`" :rules="rules.url">
                  <el-input
                    :key="index"
                    placeholder="请输入网页链接"
                    maxlength="128"
                    show-word-limit
                    v-model="item.url">
                  </el-input>
                </el-form-item>
              </div>
            </div>

            <el-button @click="addEntrance">添加自定义入口</el-button>
            <div style="color:#606266;font-size: 12px;margin-top:15px">可配置网页链接,用户可查看详情跳转至不同的网页。</div>
          </el-form>

        </div>
      </el-col>
    </el-row>

    <div style="text-align: center;margin:25px">
      <el-button @click="submitExamine" type="primary" :loading="loading">提交审核</el-button>
    </div>
  </div>
</template>

<script>
import imgLoad from '@/components/download/imgLoad'
import {rulesSymbol,replacePre} from '@/config/publicFunction'
import {getLists} from '@/api/vipCard'
import {pickerColorList, code_type_list} from '@/config/utils'
import _ from 'lodash'

export default {
  name: "newlyBuild",
  components: {imgLoad},
  data() {
    return {
      // 按钮新窗口打开地址
      phoneCenterBtnUrl: '/wechatCard/vip/newlyBuild',
      currentDelIcon: '',
      showDelIcon: '',
      loadingBody: false,
      loading: false,
      ruleForm: {
        // logo图片
        LogoImg: '',
        // 商户名称
        Name: '',
        // 会员卡背景图
        BgImg: '',
        // 卡券色
        BgColor: 'Color010',
        // 日期信息
        // DateInfo:  {
        //   type: "DATE_TYPE_FIX_TIME_RANGE",
        //   // 传过来的和传过去的都是秒
        //   begin_timestamp: Math.round(new Date().getTime()/1000),
        //   end_timestamp: Math.round((new Date().getTime()+ 3600 * 24 * 1000) /1000)
        // },
        DateInfo: {
          type: "DATE_TYPE_PERMANENT"
        },
        // 是否选择所有门店
        AllShop: false,
        // 发放条件
        GrantCondition: false,
        CodeType: '',
        BusinessService: '',
        // 自定义入口数组
        // CustomText: [{name: '名字', language: '引导语', url: '网页链接'}, {name: '名字1', language: '引导语1', url: '网页链接1'}],
        CustomText: [],
      },
      BusinessServiceS: [],
      // 有效期
      date_infos: [
        {
          type: "DATE_TYPE_FIX_TIME_RANGE",
          begin_timestamp: '',
          end_timestamp: ''
        },
        {
          type: "DATE_TYPE_FIX_TERM",
          fixed_term: '',
          fixed_begin_term: ''
        },
        {
          type: "DATE_TYPE_PERMANENT"
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        }
      },
      // 有效期固定日期
      validDataFIX: [],
      // 有效期默认值
      validData: 2,
      // 当前的背图片
      currentBackColor: '#63b359',
      // 显示下面的图片组
      showColors: false,
      // 选择的背景图片数组
      pickerColors: pickerColorList,
      // Code展示类型数组
      code_types: code_type_list,
      // 选择的卡券封面，3是图片
      cover: 6,
      rules: {
        'Name': [
          {
            required: true, trigger: 'blur', validator: (rules, value, callback) => {
              rulesSymbol(value, 24, callback, '请填写商户名称', '商户名称不能为空并且长度不超过12个汉字或24个英文字母')
            }
          }
        ],
        'VipTitle': [
          {
            required: true, trigger: 'blur', validator: (rules, value, callback) => {
              rulesSymbol(value, 18, callback, '请填写会员卡标题', '会员卡名称不能为空并且长度不超过9个汉字或18个英文字母')
            }
          }
        ],
        'Notice': [
          {
            required: true, trigger: 'blur', validator: (rules, value, callback) => {
              rulesSymbol(value, 32, callback, '请填写使用提醒', '提醒不能为空并且长度不超过16个汉字或32个英文字母')
            }
          }
        ],
        'Description': [
          {
            required: true, trigger: 'blur', validator: (rules, value, callback) => {
              rulesSymbol(value, 2084, callback, '请填写使用说明', '提醒不能为空并且长度不超过1024个汉字或2084个英文字母')
            }
          }
        ],
        'CenterTitle': [
          {
            required: false, trigger: 'blur', validator: (rules, value, callback) => {
              if (this.ruleForm.CenterUrl && !value) {
                callback(new Error('请填写按钮标题'))
              }
              rulesSymbol(value, 12, callback, '请填写按钮标题', '提醒不能为空并且长度不超过6个汉字或12个英文字母', true)
            }
          }
        ],
        'CenterUrl': [
          {
            required: false, trigger: 'blur', validator: (rules, value, callback) => {
              if (this.ruleForm.CenterTitle && !value) {
                callback(new Error('请填写指向链接'))
              }
              rulesSymbol(value, 128, callback, '请填写指向链接', '提醒不能为空并且长度不超过64个汉字或128个英文字母', true)
            }
          }
        ],
        'CenterSubTitle': [
          {
            required: false, trigger: 'blur', validator: (rules, value, callback) => {
              rulesSymbol(value, 20, callback, '请填写下方提示语', '提醒不能为空并且长度不超过10个汉字或20个英文字母', true)
            }
          }
        ],
        Prerogative: [
          {
            required: true, trigger: 'blur', validator: (rules, value, callback) => {
              rulesSymbol(value, 2084, callback, '请填写特权说明', '提醒不能为空并且长度不超过1024个汉字或2084个英文字母')
            }
          }
        ],
        'CodeType': [{required: true, trigger: 'change', message: '请选择展示码类型'}],
        'Quantity': [{required: true, trigger: 'blur', message: '请填写库存数量'}],
        name: [{
          required: true, trigger: 'blur', message: '请填写', validator: (rules, value, callback) => {
            rulesSymbol(value, 10, callback, '请填写', '自定义入口名称不能为空并且长度不超过5个汉字或10个英文字母')
          }
        }],
        url: [{
          required: true, trigger: 'blur', message: '请填写', validator: (rules, value, callback) => {
            rulesSymbol(value, 128, callback, '请填写', '自定义入口网页链接不能为空并且长度不超过128个英文字母')
          }
        }]
      },
      fileListUp: [],
      TemplateFileListImg: []
    }
  },
  async created() {
    // this.httpUrl = 'http:' + process.env.BASE_URL  //图片上传记得转化
    // ruleFormArr.LogoImg = ruleFormArr.LogoImg.replace(this.httpUrl, '')

    this.infoId = this.$route.query.id
    if (this.infoId) {
      // 编辑
      await this.getInfo()
    }
  },

  methods: {
    setImg(img){
      return process.env.Prefix + img
    },
    async getInfo() {
      this.loadingBody = true
      try {
        let data = await getLists({SID: this.infoId, Action: 'GetTemplate'}, 'WeChatCardOpera')
        // console.log(data, 3333)
        this.ruleForm = data.Data.Template
        this.loadingBody = false
        if (this.ruleForm.BgImg) {
          // 有背景图片
          this.cover = 3
          // this.ruleForm.BgImg = this.httpUrl + this.ruleForm.BgImg
          this.fileListUp = [{url: process.env.Prefix + this.ruleForm.BgImg}]
        } else if (this.ruleForm.BgColor) {
          // 有背景颜色
          let colorId = _.find(this.pickerColors, {colorID: this.ruleForm.BgColor})
          this.currentBackColor = colorId.color
        }
        if (this.ruleForm.LogoImg) {
          // this.ruleForm.LogoImg = this.httpUrl + this.ruleForm.LogoImg
          this.TemplateFileListImg = [{url: process.env.Prefix + this.ruleForm.LogoImg}]
        }
        this.ruleForm.AllShop = 1 ? true : false    //所有门店
        this.ruleForm.GrantCondition = 1 ? true : false     //所有门店
        if (this.ruleForm.DateInfo) {
          // 有效期
          let index = _.findIndex(this.date_infos, {type: this.ruleForm.DateInfo.type})
          this.validData = index
          if (index === 0) {
            // 固定日期
            this.validDataFIX = [this.ruleForm.DateInfo.begin_timestamp, this.ruleForm.DateInfo.end_timestamp]
            // console.log(this.validDataFIX, 555)
          }
        }
        if (this.ruleForm.BusinessService) {
          // 商户服务 传过来和传过去都是字符串
          this.BusinessServiceS = this.ruleForm.BusinessService.split(',')
        }
      } catch (e) {
        this.loadingBody = false
        this.$message.error(e);
      }
    },
    upLoadImg(arr) {
      this.TemplateFileListImg = arr
      if (arr.length > 0) {
        this.ruleForm.LogoImg = arr[0].url
      } else {
        this.ruleForm.LogoImg = ''
      }
    },
    upLoadImgCover(arr) {
      // console.log(arr, '封面')
      this.fileListUp = arr
      if (arr.length > 0) {
        this.ruleForm.BgImg = arr[0].url
      } else {
        this.ruleForm.BgImg = ''
      }
    },
    clickCurrentColor(val) {
      this.currentBackColor = val.color
      this.ruleForm.BgColor = val.colorID
      this.showColors = false
    },
    changeCover(val) {
      // 当切换至背景颜色时，清空img数据
    },
    changeValidData(val) {
      this.ruleForm.DateInfo = this.date_infos[val]
    },
    mouseover(index) {
      this.currentDelIcon = index
      this.showDelIcon = true
    },
    mouseout() {
      this.showDelIcon = false
    },
    delEntry(i) {
      this.ruleForm.CustomText.splice(i, 1)
    },
    addEntrance() {
      // 添加自定义入口
      if (this.ruleForm.CustomText.length < 3) {
        this.ruleForm.CustomText.push({name: '', language: '', url: ''})
      } else {
        this.$message.info('最多只能添加三个自定义入口')
      }
    },
    submitExamine() {
      let date_info = this.ruleForm.DateInfo
      if ((this.validData === 0 && !this.validDataFIX) ||
        (this.validData === 1 && (date_info.fixed_term === undefined || date_info.fixed_begin_term === undefined))) {
        this.$message.info('请填写有效期')
      }
      if (date_info.hasOwnProperty('begin_timestamp')) {
        this.ruleForm.DateInfo.begin_timestamp = this.validDataFIX[0]
        this.ruleForm.DateInfo.end_timestamp = this.validDataFIX[1]
      }

      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          return false
        } else {
          let ruleFormArr = _.clone(this.ruleForm)

          // ruleFormArr.LogoImg = ruleFormArr.LogoImg.replace(this.httpUrl, '')
          // ruleFormArr.BgImg = ruleFormArr.BgImg.replace(this.httpUrl, '')
          ruleFormArr.AllShop = ruleFormArr.AllShop === true ? 1 : 0     //所有门店
          ruleFormArr.GrantCondition = ruleFormArr.GrantCondition === true ? 1 : 0     //所有门店

          if (this.cover === 3) {
            ruleFormArr.BgColor = ruleFormArr.BgImg ? '' : ruleFormArr.BgColor
          } else {
            ruleFormArr.BgImg = ruleFormArr.BgColor ? '' : ruleFormArr.BgImg
          }

          if (typeof this.BusinessServiceS !== 'string') {
            ruleFormArr.BusinessService = this.BusinessServiceS.join(',')  //数组变为字符串
          }
          if (!ruleFormArr.LogoImg) {
            this.$message.info('请上传商户Logo')
            return false
          }

          Object.assign(ruleFormArr, {Action: 'SetTemplate'})
          Object.assign(ruleFormArr, {SID: this.infoId})
          // let ruleFormArrs = {
          //   Action: "SetTemplate",
          //   AllShop: 1,
          //   BgColor: "Color100",
          //   BgImg: "",
          //   BusinessService: "BIZ_SERVICE_FREE_PARK",
          //   CodeType: "CODE_TYPE_QRCODE",
          //   CustomText: [{name: '名字222', language: '引导语2222', url: '网页链接2222'}, {
          //     name: '名字3',
          //     language: '引导语3',
          //     url: '网页链接3'
          //   }, {name: '名字4', language: '引导语4', url: '网页链接42'}],
          //   DateInfo: {
          //     type: "DATE_TYPE_FIX_TIME_RANGE",
          //     // 传过来的和传过去的都是秒
          //     begin_timestamp: 1564848000,
          //     end_timestamp: 1565020799
          //   },
          //   Description: "当时士大夫辅导书fd",
          //   GrantCondition: 1,
          //   LogoImg: "http://192.168.0.100:8001/Files/Images/WeCharImg/190717110257346163100.png",
          //   Notice: "热热热",
          //   Prerogative: "浮动固定个的",
          //   Quantity: 55,
          //   Name: "test2222",
          //   // TemplateNo: "1",
          //   ViewKay: "WeChatCardOpera",
          //   VipTitle: "test3标题",
          //   // WeChatNo: "pO0IawI2NSmHMgC0aRQXb-WLrJMM",
          //   ServicePhone: '15855556666',
          //   CenterTitle: '快速按钮',
          //   CenterSubTitle: '快速按钮提示语',
          //   CenterUrl: "URLHUJHJHJ"
          // }
          ruleFormArr.DateInfo = JSON.stringify(ruleFormArr.DateInfo);
          ruleFormArr.CustomText = JSON.stringify(ruleFormArr.CustomText);

          ruleFormArr.LogoImg = replacePre(ruleFormArr, 'LogoImg')
          ruleFormArr.BgImg = replacePre(ruleFormArr, 'BgImg')

          this.loading = true
          try {
            await getLists(ruleFormArr, 'WeChatCardOpera')
            this.$message.success('提交成功，等待审核')
            this.$router.push('/wechatCard/vip/list')
            this.loading = false
          } catch (e) {
            this.loading = false
            this.$message.error(e)
          }
        }
      })
    }
  }
}

</script>

<style lang="less">
  @import '../../../assets/css/newBuildCoupons';

  .el-date-editor .el-range-separator {
    width: 8%;
  }

  .newlyBuildStyle {
    background: #f2f2f2;
    min-width: 1300px;
    overflow-x: hidden;

    .newlyBuildL {
      position: fixed;
    }

    .newlyBuildLeft {
      width: 100%;
      height: 630px;
      border: 1px solid #e7e7eb;
      display: inline-block;
      background: #f6f6f8;

      /*backface-visibility: hidden;*/
      /*transition: all 0.1s;*/

      .phoneTop {
        padding: 80px 26px 10px;
        width: 100%;
        background: #fff url('../../../assets/img/topbar28a82e.png') no-repeat 0 8px;
        background-size: 100% auto;
      }

      .phoneTopBack {
        position: relative;
        padding: 20px;
        border-radius: 10px;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        background-size: cover !important;

        .phoneTopHead {
          display: flex;

          .phoneTopName {
            word-wrap: break-word;
          }

          .phoneTopCode {
            display: inline-block;
            width: 36px;
            height: 36px;
            background: url('../../../assets/img/member_card_control_z331295.png') 0 -147px no-repeat;
          }
        }

        .Tips {
          display: inline-block;
          width: 18px;
          height: 18px;
          float: right;
          background: url('../../../assets/img/member_card_control_z331295.png') 0 -187px no-repeat;
        }
      }

      .phoneBottom {
        margin-top: 20px;
      }
    }

    .newlyBuildRight {
      .demo-ruleForm {
        margin: 20px 0;
      }

      .vipInfoCategory {
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #606266;
        }
      }
    }
  }
</style>
