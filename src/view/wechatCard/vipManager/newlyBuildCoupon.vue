<template>
  <div class="newlyBuildCStyle">
    <el-row :gutter="5">
      <el-col :span="5">
        <div class="newlyBuildLeft" :style="{'background-color':currentBackColor}">
          <div class="phoneTop">
            <div class="phoneTopImg">
              <!--              <img :src="ruleForm.base_info.logo_url" alt="">-->
              <img src="../../../assets/img/cardlogo.jpg" alt="">
            </div>
            <div style="line-height: 40px;color:#9f9f9f">烘焙365</div>
            <h4>优惠券标题</h4>
            <a style="display:inline-block;margin:10px 0 0 0" :href="phoneCenterBtnUrl" target="_blank">
              <el-button class="phoneCenterBtn" plain>
                立即使用
              </el-button>
            </a>
            <div class="phoneCenterTips">
              请填写提示语
            </div>
            <span class="borderDash"></span>
            <div class="coverStyle">
              <div class="coverStylefa">
                <img
                  src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1233980237,2450439314&fm=27&gp=0.jpg"
                  alt="">
                <div class="coverIntroduce">内容简介<span class="el-icon-arrow-right"></span></div>
              </div>
            </div>
            <ul class="phoneBottom phoneBottomEntry">
              <li>适用门店<span class="ic"></span></li>
              <li style="border-bottom: 1px solid #e7e7eb;">公众号<span class="ic"></span></li>
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
        </div>
      </el-col>
      <el-col :span="19" class="newlyBuildR">
        <div class="newlyBuildRight">
          <div class="titleNews">基本信息</div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="商户Logo" prop="logo">
              <imgLoad :limit="1" accept="image/jpg,image/png" :fileListUp="TemplateFileListImg" :sizeMax="1"
                       :isM="true" folder="CardImg"></imgLoad>
              <div class="tipNews">建议尺寸:300*300;大小:小于1M;格式:JPG,PNG</div>
            </el-form-item>
            <el-form-item label="商户名称" prop="Name">
              <el-input v-model="ruleForm.Name" maxlength="24"></el-input>
              <div class="tipNews">商户名称只可设置一次，请谨慎填写</div>
            </el-form-item>
            <el-form-item label="卡券颜色" prop="cover">
              <div class="pickerC">
                <div class="pickerColor" @click="showColors=!showColors">
                  <div class="pickerColorChange" :style="{'background':currentBackColor}"></div>
                  <span class="el-icon-caret-bottom iconBottom"></span>
                </div>
                <ul class="pickerColorClick" v-if="showColors">
                  <li v-for="item in pickerColors" :style="{'background':item.color}"
                      @click="clickCurrentColor(item)">
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="优惠券标题" prop="VipTitle">
              <el-input v-model="ruleForm.VipTitle" maxlength="18"></el-input>
              <br>
              <div class="tipNews">建议涵盖卡券属性、服务及金额(代金券此项填写无效)</div>
            </el-form-item>
            <el-form-item label="使用提醒" prop="Notice">
              <el-input v-model="ruleForm.Notice" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="Quantity">
              <el-input-number v-model="ruleForm.Quantity" controls-position="right" :min="1"
                               :max="100000000"></el-input-number>
              <div class="tipNews">卡券库存的数量，不支持填写0，上限为100000000</div>
            </el-form-item>
            <el-form-item label="每人限领" prop="get_limit">
              <el-input-number v-model="ruleForm.get_limit" controls-position="right" :min="1"
                               :max="50"></el-input-number>
              <div class="tipNews">每人可领券的数量限制,不填写默认为50</div>
            </el-form-item>
            <el-form-item label="限制条件" prop="GrantCondition" class="vipInfoCategory">
              <el-checkbox v-model="ruleForm.GrantCondition">用户可分享领券链接</el-checkbox>
              <div class="tipNews">请勿泄露券领取二维码和领取链接</div>
            </el-form-item>
            <el-form-item label="券类型">
              <el-radio-group v-model="cardTypeData" @change="changeValidData">
                <el-radio :label="0">代金券</el-radio>
                <el-radio :label="1">折扣券(只可在线上使用)</el-radio>
              </el-radio-group>

              <div v-if="cardTypeData===0">
                <span style="width:70px;display: inline-block">券类型：</span>
                <CouponTypeList></CouponTypeList>
                <div class="tipNews" style="margin-left:70px">此处对应服务端的券票类型设置</div>
                <span style="width:70px;display: inline-block">最低消费：</span>
                <el-input v-model="ruleForm.VipTitle" readonly style="width:100px"></el-input>&nbsp;元可用
                <div class="tipNews" style="margin-left:70px">此处对应上方券类型的最低消费金额</div>
                <span style="width:70px;display: inline-block">减免金额：</span>
                <el-input v-model="ruleForm.VipTitle" readonly style="width:100px"></el-input>&nbsp;元
                <div class="tipNews" style="margin-left:70px">此处对应上方券类型的减免金额，只保留小数点后两位</div>
              </div>
              <div v-if="cardTypeData===1">
                <span style="width:70px;display: inline-block">折扣：</span>
                <el-input-number v-model="ruleForm.discount" controls-position="right" :min="1"
                                 :max="99" readonly></el-input-number>&nbsp;&nbsp;折
                <div class="tipNews" style="margin-left:70px">请填写1-99之间的数字,表示打折额度（百分比）,填30就是七折</div>
              </div>

              <div class="tipNews">只可填写一次</div>
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
              <el-radio-group v-model="validData" @change="changeValidData">
                <el-radio :label="0">固定日期</el-radio>
                <el-radio :label="1">固定时长(只可填写一次)</el-radio>
              </el-radio-group>

              <div v-if="validData === 0">
                时间:&nbsp;&nbsp;&nbsp;
                <el-date-picker
                  :editable="false"
                  v-model="validDataFIX"
                  :picker-options="pickerOptions"
                  value-format="timestamp"
                  type="daterange"
                  :clearable="false"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <div v-if="validData === 1">
                有效时长:&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="ruleForm.DateInfo.fixed_term" controls-position="right"
                                 :min="1"></el-input-number>&nbsp;&nbsp;天
                <div class="tipNews">自领取后多少天内有效，不支持填写0</div>
                领&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;取:&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="ruleForm.DateInfo.fixed_begin_term" controls-position="right"
                                 :min="0"
                                 style="margin-top:10px;"></el-input-number>&nbsp;&nbsp;天后生效
                <div class="tipNews">自领取后多少天开始生效，领取后当天生效填写0</div>
              </div>
              <div class="tipNews">只可选择一次。</div>
            </el-form-item>
            <el-form-item label="可用时段">
              <el-radio-group v-model="time_limit_sign" @change="changeValidData">
                <el-radio :label="0">全时段</el-radio>
                <el-radio :label="1">部分时段</el-radio>
              </el-radio-group>
              <div v-if="time_limit_sign===1">
                星期：&nbsp;&nbsp;<el-select v-model="ruleForm.time_limit.type" multiple placeholder="请选择,可多选">
                <el-option
                  v-for="item in time_limit_type"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
                <div style="height:15px;"></div>
                时间：&nbsp;&nbsp;<el-time-picker
                is-range
                :editable="false"
                v-model="time_limit"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
              </div>
              <div class="tipNews">只可设置一次，且只在线上生效</div>
            </el-form-item>
            <div class="titleNews">居中按钮</div>
            <el-form-item label="按钮标题" prop="CenterTitle">
              <el-input
                placeholder="请输入按钮标题"
                maxlength="18"
                v-model="ruleForm.CenterTitle">
              </el-input>
            </el-form-item>
            <el-form-item label="指向链接" prop="CenterUrl">
              <el-input
                placeholder="请输入指向链接"
                maxlength="128"
                v-model="ruleForm.CenterUrl">
              </el-input>
            </el-form-item>
            <el-form-item label="下方提示语" prop="CenterSubTitle">
              <el-input
                placeholder="请输入下方提示语"
                maxlength="24"
                v-model="ruleForm.CenterSubTitle">
              </el-input>
            </el-form-item>
            <div class="titleNews">优惠券详情</div>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <div style="text-align: center;margin:25px">
      <el-button @click="submitExamine" type="primary">提交审核</el-button>
    </div>
  </div>
</template>

<script>
import imgLoad from '@/components/download/imgLoad'
import CouponTypeList from '@/components/selector/couponTypeList'
import {pickerColorList, code_type_list} from '@/config/utils'
import _ from 'lodash'

export default {
  components: {imgLoad, CouponTypeList},
  data() {
    return {
      loading: true,
      phoneCenterBtnUrl: '',
      // 商户Logo
      TemplateFileListImg: [],
      ruleForm: {CustomText: [], DateInfo: {}, time_limit: {type: ''}},
      rules: {},
      // 显示下面的颜色组
      showColors: false,
      // 当前的背图片
      currentBackColor: '#63b359',
      // 选择的背景图片数组
      pickerColors: pickerColorList,
      // 代金券类型
      cardTypeData: '',
      code_types: code_type_list,
      // 有效期默认值
      validData: '',
      // 有效期固定日期
      validDataFIX: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        }
      },
      // 有效期
      date_infos: [
        {
          type: "DATE_TYPE_FIX _TIME_RANGE",
          // 要转化为秒
          begin_timestamp: '',
          end_timestamp: ''
        },
        {
          type: "DATE_TYPE_FIX_TERM",
          fixed_term: '',
          fixed_begin_term: ''
        }
      ],
      // 使用时段
      time_limit_sign: 0,
      time_limit_type: [
        {name: '周一', type: 'MONDAY'},
        {name: '周二', type: 'TUESDAY'},
        {name: '周三', type: 'WEDNESDAY'},
        {name: '周四', type: 'THURSDAY'},
        {name: '周五', type: 'FRIDAY'},
        {name: '周六', type: 'SATURDAY'},
        {name: '周日', type: 'SUNDAY'},
      ],
      time_limit: ''
    }
  },
  created() {
  },
  methods: {
    submitExamine() {
      let date_info = this.ruleForm.DateInfo

      if ((this.validData === 0 && !this.validDataFIX) ||
        (this.validData === 1 && (date_info.fixed_term === undefined || date_info.fixed_begin_term === undefined))) {
        this.$message.info('请填写有效期')
      }

      let ruleFormArr = _.clone(this.ruleForm)
      if (this.time_limit_sign === 0) {
        // 全时段
        ruleFormArr.time_limit = {
          type: 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY',
          // 0点到24点
          begin_hour: '0',
          end_hour: '24'
        }
      } else {
        ruleFormArr.time_limit.begin_hour = new Date(this.time_limit[0]).getHours()
        ruleFormArr.time_limit.begin_minute = new Date(this.time_limit[0]).getMinutes()
        ruleFormArr.time_limit.end_hour = new Date(this.time_limit[1]).getHours()
        ruleFormArr.time_limit.end_minute = new Date(this.time_limit[1]).getMinutes()
        if (ruleFormArr.time_limit.type !== 'string') {
          ruleFormArr.time_limit.type = ruleFormArr.time_limit.type.split(',')
        }
      }
    },
    clickCurrentColor(val) {
      this.currentBackColor = val.color
      this.ruleForm.BgColor = val.colorID
      this.showColors = false
    },
    changeValidData(val) {
      this.ruleForm.DateInfo = this.date_infos[val]
    },
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/newBuildCoupons';

  .el-date-editor .el-range-separator {
    width: 8%
  }

  .newlyBuildCStyle {
    min-width: 1300px;
    overflow-x: hidden;

    .el-input {
      width: 300px;
    }

    .newlyBuildLeft {
      background: url('../../../assets/img/topbar28a82e.png') no-repeat 0 8px;
      min-height: 600px;
      padding: 80px 10px 10px 10px;

      .phoneTop {
        background: #fff;
        text-align: center;
        padding-top: 15px;
        position: relative;

        .phoneBottom {
          text-align: left;

          .phoneBottomRight {
            color: #9f9f9f;
          }
        }

        .phoneTopImg {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translate(-20px);
        }

        .phoneCenterTips {
          line-height: 28px;
        }

        .borderDash {
          display: block;
          border: 0.5px dashed #e0e0e0;
          width: 100%;
          margin: 30px 0 5px 0;
        }

        .coverStyle {
          padding: 10px;

          .coverStylefa {
            border: 1px solid #eee;
            width: 100%;
            height: 150px;
            position: relative;

            img {
              width: 100%;
              height: 100%;
            }

            .coverIntroduce {
              position: absolute;
              height: 30px;
              line-height: 30px;
              bottom: 0;
              background: rgba(0, 0, 0, 0.7);
              width: 100%;
              color: #fff;
              text-align: left;
              padding-left: 10px;

              span {
                position: absolute;
                right: 5px !important;
                top: 8px;
              }
            }
          }
        }
      }
    }

    .newlyBuildRight {
      .titleNews {
        padding-bottom: 20px;
        border-bottom: 1px solid #e6e9eb;
        margin-bottom: 20px
      }
    }
  }

</style>
