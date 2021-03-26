<template>
  <div class="addEditGoods">
    <!-- 编辑，新增商品 -->
    基本信息
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      v-loading="loading"
    >
      <el-form-item label="类别" prop="CateSID">
        <goodType @changeGoodType="changeGoodType" ref="goodType"></goodType>
      </el-form-item>
      <el-form-item label="商品规格选择" >
        <el-select
          v-model="ruleForm.SpecType"
          placeholder="请选择"
          @change="changeNorms"
          :disabled="$route.query.SID ? true : false"
        >
          <el-option
            v-for="item in optionsNorms"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
          <!-- <span style="color:red">《单规格》商品代表单一属性商品《多规划》代表基础属性相同，（质量、口味、配料、含量等）不同组合商品</span><br/>
        <span>《多尺寸》代表一码多品（无需添加门店商品就可实现一种蛋糕分6寸、8寸等售卖</span> -->

      </el-form-item>
      
      <el-form-item label="商品编号" v-if="ruleForm.SpecType !== '2'" prop="ProdNo" :key="1">
        <el-input v-model="ruleForm.ProdNo" :readonly="true" placeholder="请填写商品编号"></el-input>
        <el-button
          type="primary"
          style="margin-left: 10px"
          size="medium"
          @click="selectGoods(null)"
          v-if="!$route.query.SID"
        >添加</el-button>
      </el-form-item>
      <el-form-item label="商品名称" prop="Name">
        <el-input v-model="ruleForm.Name" maxlength="25" placeholder="请填写商品名称"></el-input>
      </el-form-item>
      <span class="goods_normsLabel" v-if="ruleForm.SpecType !== '1'">商品规格</span>
      <fieldset class="goods_norms" v-if="ruleForm.SpecType !== '1'" :key="5">
        <legend style="margin-left: 20px">规格项目</legend>
        <span>可拖动移动位置</span>
        <vuedraggable v-model="ruleForm.SpecList" @change="changeDrag">
          <div
            v-for="(item, index) in ruleForm.SpecList"
            class="goods_norms_row"
            @mouseover="mouseover(index)"
            @mouseout="mouseout(index)"
            :key="index"
          >
            <el-form-item
              v-if="ruleForm.SpecType !== '3'"
              :key="index + 1"
              :prop="'SpecList.' + index + '.ProdNo'"
              :rules="rules.ProdNoChildren"
              label="商品编号"
            >
              <el-input v-model="item.ProdNo" placeholder="编号" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item
              :key="index + 2"
              :prop="'SpecList.' + index + '.Name'"
              :rules="rules.NameChildren"
              label="规格名称"
            >
              <el-input v-model="item.Name" maxlength="25" placeholder="规格名称"></el-input>
            </el-form-item>
            <el-form-item
              :key="index + 3"
              :prop="'SpecList.' + index + '.StoreQty'"
              :rules="rules.StoreQty"
              label="库存"
              v-if="ruleForm.StockType =='1'"
            >
              <el-input-number
                style="width: auto; text-align: left"
                v-model="item.StoreQty"
                controls-position="right"
                :min="0"
                placeholder="库存"
                :step="1"
                step-strictly
              ></el-input-number>
            </el-form-item>
            <el-form-item
              :key="index + 4"
              :prop="'SpecList.' + index + '.SalePrice'"
              :rules="rules.SalePrice"
              label="售价"
            >
              <el-input v-model="item.SalePrice" placeholder="售价">
                <template slot="prepend">¥</template>
              </el-input>
            </el-form-item>
            <imgLoad
              :isCoverCurrentImgs="isCoverCurrentImgs"
              :fileListUp="item.Img"
              class="ImgLoadStyle"
              folder="ProdImg"
              :limit="1"
              ref="imgLoad"
              @cloneIsCoverImgs="cloneIsCoverImgs"
              @upLoadImgs="upLoadImgs($event, item, index)"
            ></imgLoad>
            <el-button
              v-if="ruleForm.SpecType !== '3'"
              type="primary"
              style="margin-left: 10px"
              size="medium"
              @click="selectGoods(index)"
            >添加</el-button>
            <span
              class="el-icon-error iconError"
              v-show="DelIconIndex === index && showDelIcon === true"
              @click="delGoodsNorms(index)"
            ></span>
          </div>
        </vuedraggable>

        <el-button type="info" @click="addGoodsNorms">添加规格项目</el-button>
      </fieldset>
      <el-form-item label="商品售价" prop="SalePrice" v-if="ruleForm.SpecType === '1'">
        ¥
        <el-input-number v-model="ruleForm.SalePrice" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="配送方式" prop="DeliveryType">
        <el-checkbox-group v-model="ruleForm.DeliveryType" @change="changeCheckbox">
          <el-checkbox label="1">门店自取</el-checkbox>
          <el-checkbox label="2" :disabled="disabledTakeout">外卖配送</el-checkbox>
          <el-checkbox label="3" :disabled="disabledLogistics">物流配送</el-checkbox>
        </el-checkbox-group>
        <div style="color: #999">物流与配送冲突</div>
      </el-form-item>

      <el-form-item label="支付方式" prop="PayType">
        <el-checkbox-group v-model="ruleForm.PayType">
          <el-checkbox label="2">微信支付</el-checkbox>
          <el-checkbox label="1">微卡支付</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="商品描述" prop="Describe">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="最长支持200个字符"
          maxlength="200"
          v-model="ruleForm.Describe"
        ></el-input>
      </el-form-item>

      <el-form-item label="主商品图片" prop="Img">
        <imgLoad
          folder="ProdImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsMain"
          :fileListUp="fileListUpMain"
          :limit="1"
        ></imgLoad>(建议尺寸:800*800;大小:小于2M;格式:JPG,PNG,JPEG)
      </el-form-item>
      <el-form-item label="商品图片" prop="ImgList">
        <imgLoad
          folder="ProdImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsList"
          :fileListUp="fileListUpList"
        ></imgLoad>(建议尺寸:800*800;大小:小于2M;格式:JPG,PNG,JPEG)
      </el-form-item>
      <el-form-item label="商品属性">
        <!-- <el-input v-model="ruleForm.ParamInfo" @focus="onFocus"></el-input> -->
        <!-- <el-input type="textarea" v-model="ParamInfo2" :readonly="true"></el-input> -->
        <div style="display: flex;">
          <div style="width: 300px; min-height: 40px; padding: 10px 15px; display: inline-block; border: 1px solid #DCDFE6; background: #fff; border-radius: 3px;">
            <p v-for="(item, index) in comfirmSelectTast" :key="index + 'a'">{{item.Name}}</p>
          </div>
          <el-button type="primary" style="margin-left: 10px; height: 40px;" size="medium" @click="chooseTast">添加</el-button>
        </div>
      </el-form-item>
      <el-form-item label="商品排序" prop="Sort">
        <el-input-number
          v-model="ruleForm.Sort"
          controls-position="right"
          :min="1"
          :step="1"
          step-strictly
        ></el-input-number>
      </el-form-item>
      <el-form-item label="库存类型" prop="StockType">
        <el-select v-model="ruleForm.StockType" placeholder="请选择">
          <el-option
            v-for="item in stockTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- v-if="ruleForm.SpecType === '1'" -->
      <!--  || (ruleForm.SpecType == '3'&& ruleForm.StockType !='2') -->
      <el-form-item label="商品库存" v-if="ruleForm.SpecType === '1' && ruleForm.StockType =='1'">
        <el-input-number
          v-model="ruleForm.StoreQty"
          controls-position="right"
          :min="0"
          :step="1"
          step-strictly
        ></el-input-number>
      </el-form-item>
      <el-form-item label="销量基数" prop="SaleCnt">
        <el-input-number
          v-model="ruleForm.SaleCnt"
          controls-position="right"
          :min="0"
          :step="1"
          step-strictly
        ></el-input-number>
      </el-form-item>
      <el-form-item label="预留备货时间" prop="FinHour">
        <div class="FinHourInput">
          <el-select v-model="isAdvanceTime" placeholder="请选择" @change="ruleForm.FinHour = ''">
            <el-option
              v-for="(item, index) in optionsAdvanceTime"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-input-number
          :step="1"
          v-model="ruleForm.FinHour"
          controls-position="right"
          :min="0"
          @change="setInputDec(ruleForm.FinHour)"
        ></el-input-number>
        {{ isAdvanceTime == "1" ? "天" : "小时" }}预定
        <!-- <el-input-number style="margin-left:20px" v-model="ruleForm.FinHour" controls-position="right" :min="0"></el-input-number>天预定 -->
        <!-- <div style="color: #999">小时与天数冲突</div> -->
      </el-form-item>
      <el-form-item label="供货门店" prop="ShopInfo">
        <el-input readonly v-model="ruleForm.PickShopName" placeholder="请选择门店"></el-input>
        <el-button type="primary" style="margin-left: 10px" size="medium" @click="PickShopFun">添加</el-button>
        <div style="color: #999">不填为全选</div>
      </el-form-item>
      <el-form-item label="预定提示" prop="Tip">
        <el-input
          v-model="ruleForm.Tip"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3 }"
          placeholder="最长可输入500个字符"
          maxlength="500"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="赠送积分" prop="SendScore">
        <el-checkbox v-model="ruleForm.SendScore" label="1">不支持购买赠送积分(仅限普通商品)</el-checkbox>
      </el-form-item> -->
      <el-form-item label="可提货日期(配送)" prop="PickDate">
        <el-checkbox v-model="assistRuleForm.TakeDateBool">启用</el-checkbox>&nbsp;&nbsp;
        <el-date-picker
          v-if="assistRuleForm.TakeDateBool"
          v-model="ruleForm.PickDate"
          type="daterange"
          :editable="false"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <br />        
      </el-form-item>
      <el-form-item label="可提货时间(配送)" prop="PickTime">
        <el-checkbox v-model="assistRuleForm.TakeDateTimeBool">启用</el-checkbox>&nbsp;&nbsp;
        <el-time-picker
          v-if="assistRuleForm.TakeDateTimeBool"
          is-range
          v-model="ruleForm.PickTime"
          :editable="false"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="可购买时间" prop="BuyTime">
        <el-checkbox v-model="assistRuleForm.BuyTimeBool">启用</el-checkbox>&nbsp;&nbsp;
        <!-- <el-date-picker
          :editable="false"
          v-if="assistRuleForm.BuyTimeBool" is-range
          v-model="ruleForm.BuyTime"
          value-format="yyyy-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" placeholder="选择日期时间范围">
        </el-date-picker> -->
        <el-date-picker
          :editable="false"
          v-if="assistRuleForm.BuyTimeBool" is-range
          v-model="ruleForm.BuyTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <br/>
        <el-select
          class="takeDateBool"
          v-if="assistRuleForm.BuyTimeBool"
          v-model="pickDateValue"
          placeholder="请选择方式"
          style="margin-top: 10px; width: 150px"
        >
          <el-option
            @click.native="changePickDateValue"
            v-for="item in pickDateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-if="pickDateValue === '1'" v-model="Weeks" multiple placeholder="请选择星期">
          <el-option
            v-for="item in optionsWeek"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-if="pickDateValue === '2'&&assistRuleForm.BuyTimeBool" :readonly="true" v-model="Dates"></el-input>
      </el-form-item>

      <!-- <el-form-item label="商品标签" prop="Tag" :key="8">
        <tasteList
          ref="labelRef"
          :multiple="false"
          :Type="0"
          :allowCreate="false"
          @changeTaste="changeTasteList($event, 0)"
        ></tasteList>
      </el-form-item> -->
      <el-form-item label="商品配件" prop="AccessoriesInfo" :key="7">
        <tasteList
          ref="AccessoriesList"
          :Type="3"
          :allowCreate="false"
          @changeTaste="changeTasteList($event, 3)"
        ></tasteList>
        <!-- <div style="color: #999">仅支持普通商品，仅实现于自定义模板</div> -->
      </el-form-item>
      <!-- <el-form-item label="可用电子劵" prop="TicketInfo">
        <el-input readonly v-model="ruleForm.TicketInfoName" placeholder="请选择电子劵"></el-input>
        <el-button type="primary" style="margin-left: 10px" size="medium" @click="clickTicket">添加</el-button>
        <div style="color: #999">只可用此设置的电子劵购买此商品</div>
      </el-form-item> 暂不需要此功能-->
      <!-- <el-form-item label="每人限购" prop="MaxBuyCnt">
        <el-input-number
          v-model="ruleForm.MaxBuyCnt"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>-->      
      <el-form-item label="产品特色" prop="Features" class="FeaturesStyle">
        <el-button type="text" @click="FeaturesShow = true" v-if="FeaturesShow === false">+编辑</el-button>
        <ueditor1 v-if="FeaturesShow" ref="Features"></ueditor1>
        <el-button type="text" @click="FeaturesShow = false" v-if="FeaturesShow === true">隐藏</el-button>
      </el-form-item>
      <el-form-item label="重要提示" prop="ImportantNotes" class="FeaturesStyle">
        <el-button
          type="text"
          @click="ImportantNotesShow = true"
          v-if="ImportantNotesShow === false"
        >+编辑</el-button>
        <ueditor1 v-if="ImportantNotesShow" ref="ImportantNotes"></ueditor1>
        <el-button
          type="text"
          @click="ImportantNotesShow = false"
          v-if="ImportantNotesShow === true"
        >隐藏</el-button>
      </el-form-item>
    </el-form>

    <Goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood"></Goods>
    <TicketInfo :showTicket="showTicket" @changeDigTicket="changeDigTicket" ref="TicketInfoList"></TicketInfo>
    <el-dialog
      class="areaTree TreeShop"
      :title="this.clickPickShop ? '选择门店' : '选择区域'"
      width="600px"
      :before-close="beforeClose"
      :visible.sync="showAreaTree"
    >
      <Tree
        ref="treeIndex"
        :CheckboxVal="this.ruleForm.PickShop"
        :dataTree="dataTree"
        :showCheckbox="true"
        :defaultExpandAll="false"
        :highlight="false"
        @checkChange="checkChange"
      ></Tree>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="showAreaTree = false">取 消</el-button>
        <el-button type="primary" @click="areaTreeFun">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="areaTree TicketDialog"
      :title="currentTicket ? '选择电子券' : '选择门店'"
      width="600px"
      :before-close="beforeClose"
      :visible.sync="showCheckTicket"
    >
      <div class="addScroll">
        <el-checkbox
          v-if="!currentTicket"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkClick" @change="handleCheckedCitiesChange">
          <el-checkbox :label="item.SID" v-for="item in checkList" :key="item.SID">
            {{ item.Name }}
            <span v-if="item.Address">&nbsp;{{ item.Address }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="showCheckTicket = false">取 消</el-button>
        <el-button type="primary" @click="CheckTicketFun">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择天数（单位/天）" :visible.sync="dialogFormVisible">
      <el-checkbox
        :indeterminate="isIndeterminateDay"
        v-model="checkAllDay"
        @change="handleCheckAllChangeDay"
      >全选</el-checkbox>
      <div style="margin: 15px 0"></div>
      <el-checkbox-group v-model="Dates" @change="handleCheckedCitiesChangeDay">
        <el-checkbox v-for="(item, index) in datesList" :label="item" :key="index">{{ item }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectDays">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择口味弹窗 -->
    <select-sys
    :gridDataTaste="gridDataTaste"
    :comfirmSelectTast="comfirmSelectTast"
    :dialogTasteVisible="dialogTasteVisible"
    @close="closeDia"
    @confirm="confirmSys"
    :ParamInfoName="ruleForm" />
    
    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
    </div>
  </div>
</template>

<script>
import goodType from "@/components/selector/goodType";
import imgLoad from "@/components/download/imgLoad";
import Goods from "@/components/Dialog/goods";
import Tree from "@/components/tree/";
import tasteList from "@/components/selector/TasteList";
import ueditor1 from "@/components/ueditor1/";
import TicketInfo from "@/components/Dialog/ticketInfo/";
import { addScroll, ImgList, replacePre,GetBaseImgUrl } from "@/config/publicFunction";
import { stockTypeList } from "@/config/utils";
import vuedraggable from "vuedraggable";
import { getLists } from "@/api/vipCard";
import selectSys from './selectSys'
import _ from "lodash";
import "@/config/jquery.base64.js";
import * as ruleText from "@/view/wechatManager/rulesFrom";

export default {
  components: {
    goodType,
    imgLoad,
    Goods,
    Tree,
    ueditor1,
    TicketInfo,
    vuedraggable,
    tasteList,
    selectSys
  },
  data() {
    return {
      gridDataTaste: [], // 商品属性列表
      comfirmSelectTast: [], // 确认选中的商品属性
      loading: false,
      dialogTasteVisible: false, //设置商品属性弹窗显示
      tastArr: [], //设置商品属性选中的数组
      ParamInfo2: "",
      optionsNorms: [
        { label: "单规格商品", value: "1" },        
        { label: "多规格商品", value: "2" }
        // { label: "多尺寸商品", value: "3" }
      ],
      ruleForm: {
        // 支付方式
        Name: "",
        PayType: ["1", "2"],
        PickTime: "",
        DeliveryType: ["2", "1"],
        OrderAccessoriesInfo: [],
        AccessoriesInfo: [],
        // 商品规格
        SpecList: [],
        // 记录规格类型
        SpecType: "1",
        StockType: "0"
        // MaxBuyCnt: 0,
        // StoreQty: 0
      },
      assistRuleForm: {
        // 是否有提货日期
        TakeDateBool: false,
        // 是否有提货时间
        TakeDateTimeBool: false,
        // 购买时间
        BuyTimeBool: false
      },
      rules: {
        ProdNo: [ruleText.ProdNo(this)],
        ProdNoChildren: [ruleText.ProdNoChildren(this)],
        NameChildren: [ruleText.NameChildren(this)],
        Name: [ruleText.Name(this)],        
        StoreQty: { required: true, message: '库存不能为空'},
        CateSID: [ruleText.CateSID(this)],
        DeliveryType: [
          { required: true, message: "请选择配送方式", trigger: "change" }
        ],
        PayType: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ],
        OldPrice: [
          { required: true, message: "请输入商品原价", trigger: "blur" }
        ],
        // Describe: [
        //   { required: true, message: "请输入商品描述", trigger: "blur" }
        // ],
        SalePrice: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ]
      },
      // 控制商品弹框显示
      goodsShow: false,
      // 控制电子劵信息弹框显示
      showTicket: false,
      // 控制地区树弹框显示
      showAreaTree: false,
      // 控制电子劵弹框显示
      showCheckTicket: false,
      // 提货选中数据
      currentCheck: "",
      // 当前点击的是提货门店的弹框
      clickPickShop: "",
      // 树形图的数据
      dataTree: [],
      // 多选框当前选中的数据
      checkClick: [],
      // 多选框的数据
      checkList: [],
      // 当前点击的是电子劵的弹框
      currentTicket: "",
      // 商品规格（null为不是商品规格）
      goodsNormsIndex: null,
      DelIconIndex: "",
      showDelIcon: "",
      // 显示隐藏 产品特色
      FeaturesShow: true,
      // 显示隐藏 重要提示
      ImportantNotesShow: true,
      isCoverCurrentImgs: false,
      // 保存弹框里面的值
      preserveData: "",
      // 库存类型
      stockTypeList: stockTypeList,
      // 显示在页面的商品图片
      fileListUpList: [],
      fileListUpMain: [],
      valueCurrent: [],
      disabledLogistics: true,//物流
      disabledTakeout: false,//外卖
      isAdvanceTime: "1",
      optionsAdvanceTime: [
        {
          value: "1",
          label: "按天数"
        },
        {
          value: "2",
          label: "按小时"
        }
      ],
      isIndeterminate: false,
      checkAll: false, //门店
      allCheckList: [],
      pickDateValue: "0",
      pickDateOptions: [
        { value: "0", label: "不限制" },
        { value: "1", label: "按星期" },
        { value: "2", label: "按日期" }
      ],
      valueWeek: [],
      optionsWeek: [
        { value: "1", label: "星期一" },
        { value: "2", label: "星期二" },
        { value: "3", label: "星期三" },
        { value: "4", label: "星期四" },
        { value: "5", label: "星期五" },
        { value: "6", label: "星期六" },
        { value: "0", label: "星期天" }
      ],
      dialogFormVisible: false,
      isIndeterminateDay: false,
      checkAllDay: false,
      Dates: [],
      datesList: [],
      Weeks: [],
      Attribute2: []
    };
  },
  updated() {
    if (this.$refs.treeIndex && this.showAreaTree) {
      if (this.ruleForm.PickShop && this.clickPickShop) {
        this.$refs.treeIndex.setCheckedKeys(this.ruleForm.PickShop);
      } else if (this.ruleForm.AreaInfo && !this.clickPickShop) {
        this.$refs.treeIndex.setCheckedKeys(this.ruleForm.AreaInfo);
      } else {
        this.$refs.treeIndex.setCheckedKeys([]);
      }
    }
  },
  created() {
    this.getList();
    let arr = []; //1-31天
    for (let i = 1; i < 32; i++) {
      arr.push(i.toString());
    }
    this.datesList = arr;
  },
  methods: {    
    // 获取商品属性设置列表
    async getInfo(params) {
      // console.log(params)
      let { Data } = await getLists(
        {
          Action: "GetParamList",
          Type: "2"
        },
        "MBaseOpera"
      );
      this.gridDataTaste = Data.ParamInfoList;
      if (params) {
        this.comfirmSelectTast = []
        let arr = params.ParamInfo.split(',')
        for (const i of arr) {
          for (const y of this.gridDataTaste) {
            //console.log(i, y.SID, i == y.SID)
            if (i == y.SID) {
              this.comfirmSelectTast.push(y)
            }
          }
        }
      }
    },
    // 确认选中商品
    confirmSys (data) {
      this.comfirmSelectTast = data
    },
    ChangeAll() {},
    ChangeOne() {},
    changeCheckbox(val) {
      // 1门店 2外卖 3物流
      //配送方式 点击外卖的时候，物流不可选，选择物流，那么外卖不可选
      if (val.indexOf("3") > -1) {
        //选择了物流
        this.disabledTakeout = true;
      } else if (val.indexOf("2") > -1) {
        this.disabledLogistics = true;
      } else {
        this.disabledTakeout = false;
        this.disabledLogistics = false;
      }
      
    },
    async getList() {
      try {
        this.loading = true;
        let info = this.$route.query.SID || ''
          ? getLists(
              {
                Action: "GetProdInfo",
                SID: this.$route.query.SID
              },
              "MProdOpera"
            )
          : [];
        let res = await Promise.all([
          info,
          getLists({ Action: "GetShopList" }, "MShopOpera")
        ]);
        if (res[0].Data && res[0].Data.ProdInfo) {
          this.getInfo(res[0].Data.ProdInfo)
          //console.log(res[0],res[1],'获取信息')
        }else {
          this.getInfo()
        }
        this.storeList = res[1].Data.ShopInfoList;
        if (!this.$route.query.SID) {
          this.loading = false;
          return;
        }
        this.ruleForm = res[0].Data.ProdInfo;
        this.$set(this.ruleForm, "SpecList", res[0].Data.SpecList);

        if (this.ruleForm.Weeks) {
          this.pickDateValue = "1";
          this.Weeks = this.ruleForm.Weeks.split(",");
        }
        if (this.ruleForm.Dates) {
          this.pickDateValue = "2";
          this.Dates = this.ruleForm.Dates.split(",");
          this.handleCheckedCitiesChangeDay(this.Dates);
        }

        this.ruleForm.CateSID = this.ruleForm.CateSID
          ? this.ruleForm.CateSID.split(",")
          : this.ruleForm.CateSID;
        this.$refs.goodType.value = this.ruleForm.CateSID;

        this.ruleForm.PayType = this.ruleForm.PayType
          ? this.ruleForm.PayType.split(",")
          : [];
        if(this.ruleForm.DeliveryType.indexOf("3")!=-1){
          this.disabledTakeout = true;
          this.disabledLogistics = false;
        }else if(this.ruleForm.DeliveryType.indexOf("2")!=-1){
          this.disabledLogistics = true;
          this.disabledTakeout = false;
        }

        this.ruleForm.DeliveryType = this.ruleForm.DeliveryType
          ? this.ruleForm.DeliveryType.split(",")
          : [];  
        this.ruleForm.SendScore =
          this.ruleForm.SendScore === "0" ? false : true;

        if (this.ruleForm.PickDate) {
          this.assistRuleForm.TakeDateBool = true;
          this.ruleForm.PickDate = this.ruleForm.PickDate
            ? this.ruleForm.PickDate.split(",")
            : [];
        }
        if (this.ruleForm.PickTime) {
          this.assistRuleForm.TakeDateTimeBool = true;
          this.ruleForm.PickTime = this.ruleForm.PickTime
            ? this.ruleForm.PickTime.split(",")
            : [];
        }

        if (this.ruleForm.BuyTime) {
          this.assistRuleForm.BuyTimeBool = true;
          this.ruleForm.BuyTime = this.ruleForm.BuyTime
            ? this.ruleForm.BuyTime.split(",")
            : [];
        }
        console.log(this.ruleForm.BuyTime)
        // this.$refs.labelRef.value = this.ruleForm.Tag;
        this.$refs.AccessoriesList.value = this.ruleForm.AccessoriesInfo
          ? this.ruleForm.AccessoriesInfo.split(",")
          : [];
        let arr = this.ruleForm.TicketInfo
          ? this.ruleForm.TicketInfo.split(",")
          : [];
        let newArr = [];
        arr.forEach(D => {
          newArr.push(_.find(this.TicketList, { SID: D }));
        });
        let { nameArr, idArr } = setData(newArr, "Name", "SID");
        this.ruleForm.TicketInfoName = nameArr.join(",");

        this.checkClick1 = this.ruleForm.ShopInfo
          ? this.ruleForm.ShopInfo.split(",")
          : [];
        let newArr1 = [];

        this.checkClick1.forEach(D => {
          newArr1.push(_.find(this.storeList, { SID: D }));
        });
        if (newArr1.length === 0) {
          //全选
          let arrstore = [];
          this.storeList.forEach(D => {
            arrstore.push(D.SID);
          });
          this.checkClick = arrstore;
          this.ruleForm.PickShopName = "全部门店";
        } else {
          let data = setData(newArr1, "Name", "SID");
          this.ruleForm.PickShopName = data.nameArr.join(",");
        }

        this.fileListUpList = this.ruleForm.ImgList
          ? ImgList(this.ruleForm.ImgList)
          : [];
        this.fileListUpMain = this.ruleForm.Img
          ? ImgList(this.ruleForm.Img)
          : [];
        
        let Features = $.base64.atob(this.ruleForm.Features, "utf8");
        // console.log(Features)
        let ImportantNotes = $.base64.atob(
          this.ruleForm.ImportantNotes,
          "utf8"
        );
        let abc = GetBaseImgUrl();
        // console.log(abc)
        Features = Features.replace(
          /src="Files/g,
          `src="${abc}${process.env.Prefix}Files`
        );
        // console.log(Features,'one')
        ImportantNotes = ImportantNotes.replace(
          /src="Files/g,
          `src="${abc}${process.env.Prefix}Files`
        );
        this.$refs.Features.setUEContent(Features);
        this.$refs.ImportantNotes.setUEContent(ImportantNotes);
        this.ruleForm.SpecList = this.ruleForm.SpecList
          ? this.ruleForm.SpecList
          : [];
        if (this.ruleForm.SpecList && this.ruleForm.SpecList.length > 0) {
          this.ruleForm.SpecList.forEach(D => {
            D.Img = D.Img ? ImgList(D.Img) : [];
            D.showImg = D.Img ? D.Img : [];
          });
        }
        this.changeCheckbox(this.ruleForm.DeliveryType.join(",")); //默认物流与配送冲突
        if(this.ruleForm.FinType == '1'){
          this.isAdvanceTime = "1";
        }else{
          this.isAdvanceTime = "2";
        }
        // if (this.ruleForm.FinHour && Number(this.ruleForm.FinHour) > 23) {
        //   this.ruleForm.FinHour = Number(this.ruleForm.FinHour) / 24; //时间转化为天数
        //   this.isAdvanceTime = "1";
        // } else if (
        //   this.ruleForm.FinHour &&
        //   Number(this.ruleForm.FinHour) < 23
        // ) {
        //   this.isAdvanceTime = "2";
        // }

        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    setTastName(arr) {
      if (arr) {
        return arr.split(",");
      } else {
        return [];
      }
    },
    upLoadImgs(imgs, val, index) {
      this.isCoverCurrentImgs = false;
      this.ruleForm.SpecList[index].showImg = imgs;
      this.ruleForm.SpecList[index].Img = [];
    },
    cloneIsCoverImgs(bool) {
      this.$nextTick(() => {
        this.isCoverCurrentImgs = bool;
      });
    },
    changeDrag(e) {
      this.isCoverCurrentImgs = true;

      this.ruleForm.SpecList[e.moved.newIndex].Img = this.ruleForm.SpecList[
        e.moved.newIndex
      ].showImg;

      // this.$refs.tasteList.forEach((D, index) => {
      //   this.$refs.tasteList[index].value = this.ruleForm.SpecList[index]
      //     .TastName
      //     ? this.ruleForm.SpecList[index].TastName
      //     : [];
      // });

      this.$refs.ruleForm.clearValidate();
    },
    changeGoodType(arr) {
      // 商品列席id
      this.ruleForm.CateSID = arr;
    },
    changeNorms() {
      this.$refs.ruleForm.clearValidate();
    },
    changeStockType(id) {
      // 库存类型id
    },
    cancelFun() {
      // 取消
      this.$router.push("/weChat/manager/goodSetting");
    },
    // 保存
    preserveFun() {
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          try {
            // 接口所需格式
            this.ParamInfo2 = '' // 先清空
            this.comfirmSelectTast.forEach((item, index) => {
              if (index === 0) {
                this.ParamInfo2 += item.SID
              }else {
                this.ParamInfo2 += `,${item.SID}`
              }
            })
            this.ruleForm.ParamInfo = this.ParamInfo2;//属性
            if (
              this.ruleForm.SpecList &&
              this.ruleForm.SpecList.length === 0 &&
              this.ruleForm.SpecType !== "1"
            ) {
              this.$message.info("请填写商品规格");
              return;
            }
            if (this.pickDateValue === "1") {
              //可提货日期-选择可购买的星期
              if (this.Weeks.length === 0 || !this.Weeks) {
                this.$message.info("可提货日期-请选择可购买的星期");
                return;
              }
              if (Array.isArray(this.Weeks)) {
                this.ruleForm.Weeks = this.Weeks.join(",");
              } else {
                this.ruleForm.Weeks = this.Weeks;
              }
              this.ruleForm.Dates = "";
            } else {
              this.ruleForm.Weeks = "";
            }
            if (this.pickDateValue === "2") {
              //可提货日期-选择可购买的日期
              if (this.Dates.length === 0 || !this.Dates) {
                this.$message.info("可提货日期-请选择可购买的星期");
                return;
              }
              if (Array.isArray(this.Dates)) {
                this.ruleForm.Dates = this.Dates.join(",");
              } else {
                this.ruleForm.Dates = this.Dates;
              }
              this.ruleForm.Weeks = "";
            } else {
              this.ruleForm.Dates = "";
            }
                        
            let obj = _.cloneDeep(this.ruleForm);
            Object.assign(obj, { Action: "SetProdInfo" });
            if(this.isAdvanceTime === '1'){
              obj.FinType = '1'
            }else if(this.isAdvanceTime === '2'){              
              obj.FinType = '2'
            }
            if(this.assistRuleForm.BuyTimeBool === false){
              obj.Dates = "";
            }
            // itar+tab
            if (
              this.checkClick.length === this.checkList.length ||
              this.checkAll
            ) {
              // 门店全选
              obj.ShopInfo = "";
            }

            if (obj.SpecType !== "1") {
              let sortArr = [];
              for (let i = 0; i < obj.SpecList.length; i++) {
                //价格取最小值
                const argument = obj.SpecList[i];
                sortArr.push(argument.SalePrice);
              }
              obj.SalePrice = Math.min.apply(null, sortArr);
              if (obj.SpecType === "2") {
                obj.ProdNo = "";
                obj.TastName = "";
              }
            }
            if (obj.SpecList && obj.SpecList.length > 0) {
              obj.SpecList.forEach(D => {
                if (D.showImg && typeof D.showImg !== "string") {
                  let arr = [];
                  D.showImg.forEach(data => {
                    arr.push(data.url);
                  });
                  D.Img = arr.join(",");
                }
                D.Img =
                  D.Img.indexOf(process.env.Prefix) !== -1
                    ? D.Img.replace(process.env.Prefix, "")
                    : D.Img;

                // if (D.TastName && typeof D.TastName !== "string") {
                //   // 变成json
                //   D.TastName = D.TastName.join(",");
                // }
              });
            }

            // if (obj.DeliveryType.length === 0) {
            //   this.$message.info("请选择配送方式");
            //   return;
            // }
            // if (obj.PayType.length === 0) {
            //   this.$message.info("请选择支付方式");
            //   return;
            // }

            // obj.TastName =
            //   typeof obj.TastName !== "string" && obj.TastName
            //     ? obj.TastName.join(",")
            //     : obj.TastName;
            obj.CateSID =
              typeof obj.CateSID !== "string" && obj.CateSID
                ? obj.CateSID.join(",")
                : obj.CateSID;
            obj.PayType =
              typeof obj.PayType !== "string" && obj.PayType
                ? obj.PayType.join(",")
                : obj.PayType;
            obj.DeliveryType =
              typeof obj.DeliveryType !== "string" && obj.DeliveryType
                ? obj.DeliveryType.join(",")
                : obj.DeliveryType;
            obj.AccessoriesInfo =
              typeof obj.AccessoriesInfo !== "string" && obj.AccessoriesInfo
                ? obj.AccessoriesInfo.join(",")
                : obj.AccessoriesInfo;

            obj.SpecList =
              obj.SpecList instanceof Array
                ? JSON.stringify(obj.SpecList)
                : obj.SpecList;
            obj.SendScore = !obj.SendScore ? "0" : "1";

            let Features = this.$refs.Features.getUEContent();
            let ImportantNotes = this.$refs.ImportantNotes.getUEContent();
            Features = Features.replace(/src="\.\.\/Files/g, `src="${process.env.Prefix}Files`);            
            ImportantNotes = ImportantNotes.replace(
              /src="\.\.\/Files/g,
              `src="${process.env.Prefix}Files`
              
            );
            // console.log(Features,ImportantNotes,'5555')
            obj.Features = $.base64.btoa(Features, "utf8");
            obj.ImportantNotes = $.base64.btoa(ImportantNotes, "utf8");

            if (this.assistRuleForm.TakeDateBool) {
              if (!obj.PickDate) {
                this.$message.info("填写提货日期");
                return;
              }
              obj.PickDate = obj.PickDate.join(",");
            } else {
              obj.PickDate = "";
            }
            if (this.assistRuleForm.TakeDateTimeBool) {
              if (!obj.PickTime) {
                this.$message.info("填写提货时间");
                return;
              }
              obj.PickTime = obj.PickTime.join(",");
            } else {
              obj.PickTime = "";
            }
            if (this.assistRuleForm.BuyTimeBool) {
              if (!obj.BuyTime) {
                this.$message.info("填写购买时间");
                return;
              }
              obj.BuyTime = obj.BuyTime.join(",");
            } else {
              obj.BuyTime = "";
            }
            if (!obj.Img) {
              this.$message.info("请添加主商品图片");
              return;
            } else {
              obj.Img = replacePre(obj, "Img");
            }
            if (!obj.ImgList) {
              this.$message.info("请添加商品图片");
              return;
            } else {
              obj.ImgList = replacePre(obj, "ImgList");

            }
            // if (obj.FinHour > 0) {
            //   obj.FinHour =
            //     this.isAdvanceTime === "1" ? obj.FinHour * 24 : obj.FinHour;
            // }
            // console.log(obj, 5555566);
            // return;
            // 获取电子券列表
            await getLists(obj, "MProdOpera");
            this.$router.push("/weChat/manager/goodSetting");
            this.$message.success("操作成功");
          } catch (e) {
            this.$message.error(e)
          }
        }
      });
    },
    sureGood(val) {
      console.log(val)
      // 获取的商品的名字和编号
      this.goodsShow = false;
      if (this.goodsNormsIndex === null) {
        this.ruleForm.ProdNo = val.ProdNo;
        this.ruleForm.Name = val.ProdName;
        this.ruleForm.SalePrice = val.Price;
        // if(this.ruleForm.SpecType === '2'){
        //   this.ruleForm.SpecList.Name= val.ProdName
        //   console.log(this.ruleForm.SpecList)
        // }
      } else {//多规格商品
        // 给当前的 商品规格编号加 禁止
        // this.ruleForm.goodsNorms.push({number:'',norms:'',price:'',discount:''})
        this.ruleForm.SpecList[this.goodsNormsIndex].ProdNo = val.ProdNo;
        this.ruleForm.SpecList[this.goodsNormsIndex].Name = val.ProdName;
        this.ruleForm.SpecList[this.goodsNormsIndex].SalePrice = val.Price
      }
    },
    changeDig(bool) {
      this.goodsShow = bool;
    },
    changeDigTicket(bool) {
      this.showTicket = bool;
    },
    beforeClose(done) {
      // 提货门店的弹框关闭
      if (this.$refs.treeIndex) {
        this.$refs.treeIndex.setCheckedKeys([]);
      }
      // this.checkClick = [];
      done();
    },
    selectGoods(index) {
      this.goodsShow = true;
      this.goodsNormsIndex = index;
    },
    changeTasteListFa(val) {
      this.ruleForm.TastName = val;      
    },
    async delGoodsNorms(index) {
      this.ruleForm.SpecList.splice(index, 1);
    },
    PickShopFun() {
      // 打开提货门店的弹框
      this.showCheckTicket = true;
      this.currentTicket = false;
      // this.getStoreList();
      this.checkList = this.storeList;
      this.allCheckList = [];
      this.checkList.forEach(D => {
        this.allCheckList.push(D.SID);
      });

      if (this.ruleForm.ShopInfo) {
        this.checkClick = this.ruleForm.ShopInfo.split(",");
      }
      if (this.checkClick.length > 0) {
        this.handleCheckedCitiesChange(this.allCheckList);
      }
      addScroll(".el-dialog__body");
    },
    AreaInfoFun() {
      // 打开送货区域的弹框
      this.dataTree = [
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2",
              children: [
                {
                  id: 11,
                  label: "三级 3-2-1"
                },
                {
                  id: 12,
                  label: "三级 3-2-2"
                },
                {
                  id: 13,
                  label: "三级 3-2-3"
                }
              ]
            }
          ]
        }
      ];
      this.clickPickShop = false;
      this.showAreaTree = true;
    },
    checkChange(val) {
      // 点击的选中的子节点
      this.currentCheck = val;
    },
    // 获取的地区id
    areaTreeFun() {
      let { nameArr, idArr } = setData(this.currentCheck, "label", "id");
      if (this.clickPickShop) {
        this.ruleForm.PickShopName = nameArr.join();
        this.ruleForm.PickShop = idArr;
      } else {
        this.ruleForm.AreaInfoName = nameArr.join();
        this.ruleForm.AreaInfo = idArr;
      }

      // console.log(this.ruleForm, 4444)
      this.showAreaTree = false;
      this.$refs.treeIndex.setCheckedKeys([]);
    },
    async clickTicket() {
      // 打开电子劵的弹框
      this.currentTicket = true;
      this.showCheckTicket = true;
      this.checkList = this.TicketList;
      if (this.ruleForm.TicketInfo) {
        this.checkClick = this.ruleForm.TicketInfo.split(",");
      }

      addScroll(".el-dialog__body");
    },
    upLoadImgsList(imgs) {
      // 图片集
      let arr = [];
      imgs.forEach(D => {
        arr.push(D.url);
      });
      this.ruleForm.ImgList = arr.join(",");
    },
    upLoadImgsMain(arr) {
      // 主图片
      this.fileListUp = arr;
      if (arr.length > 0) {
        this.ruleForm.Img = arr[0].url;
      } else {
        this.ruleForm.Img = "";
      }
    },
    clickCityNo() {
      // 打开选择区域的弹框
      this.currentTicket = false;
      this.showCheckTicket = true;
      if (this.ruleForm.CityNo) {
        let arr =
          this.ruleForm.ProdNo instanceof Array
            ? this.ruleForm.ProdNo
            : this.ruleForm.ProdNo.split(",");
        // this.checkClick = arr
      }

      addScroll(".el-dialog__body");
    },
    clickTicketInfo() {
      // 打开选择请选择电子券的弹框
      this.showTicket = true;
    },
    changeTasteList(id, index) {
      // 商品标签id
      if (index === 0) {
        // 商品标签id
        this.ruleForm.Tag = id;
      } else if (index === 3) {
        this.ruleForm.AccessoriesInfo = id;
      }
    },
    mouseover(index) {
      this.DelIconIndex = index;
      this.showDelIcon = true;
    },
    mouseout(index) {
      this.DelIconIndex = index;
      this.showDelIcon = false;
    },
    CheckTicketFun() {
      let newArr = [];
      if (this.currentTicket) {
        //可用电子券
        this.checkClick.forEach(D => {
          newArr.push(_.find(this.checkList, { SID: D }));
        });
        let { nameArr, idArr } = setData(newArr, "Name", "SID");
        this.ruleForm.TicketInfoName = nameArr.join(",");
        this.ruleForm.TicketInfo = this.checkClick.join(",");
        // this.ruleForm.TicketCurrent = this.checkClick
      } else {
        //供货门店
        this.checkClick.forEach(D => {
          newArr.push(_.find(this.checkList, { SID: D }));
        });
        let { nameArr, idArr } = setData(newArr, "Name", "SID");
        // 门店id排序
        let arr = idArr.sort((a, b) => {
          return a.localeCompare(b, "zh-CN");
        });

        this.ruleForm.ShopInfo = arr.join(",");
        this.ruleForm.PickShopName = nameArr.join(",");
      }
      this.showCheckTicket = false;
      // this.checkClick = [];
    },
    addGoodsNorms() {
      // 商品规格
      this.$nextTick(() => {
        this.ruleForm.SpecList.push({
          ProdNo: "",
          Name: "",
          SalePrice: "",
          Img: []
          // TastName: []
        });
      });
    },
    GoodsNorms() {
      // console.log(this.ruleForm.SpecList, 444444)
    },
    // 点击口味（多规格）
    changeTaste(arr, index) {
      // this.ruleForm.SpecList[index].TastName = arr;
    },
    setInputDec(FinHour) {
      //不让填写小数
      if (!FinHour) return;
      // if (this.isAdvanceTime === "1") {
      this.ruleForm.FinHour = FinHour.toString().split(".")[0];
      // }
      if(this.isAdvanceTime === "2"&&FinHour>23)
      this.ruleForm.FinHour = '23'
    },
    handleCheckAllChange(val) {
      this.checkClick = val ? this.allCheckList : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allCheckList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allCheckList.length;
    },

    changePickDateValue() {
      if (this.pickDateValue === "2") {
        this.dialogFormVisible = true;
      }
    },
    handleCheckAllChangeDay(val) {
      this.Dates = val ? this.datesList : [];
      this.isIndeterminateDay = false;
    },
    selectDays() {
      this.dialogFormVisible = false;
    },
    handleCheckedCitiesChangeDay(value) {
      let checkedCount = value.length;
      this.checkAllDay = checkedCount === this.datesList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.datesList.length;
    },
    chooseTast() {
      this.dialogTasteVisible = true;
    },
    closeDia(){
      this.dialogTasteVisible = false;
    },
    onFocus() {
      //获取到焦点
    },
  },
  watch: {
    // currentTicket(val) {
    //   console.log(this.currentTicket, "val");  //
    // }
  }
};
function setData(data, label, id) {
  let arr = data;
  let nameArr = [];
  let idArr = [];
  if (arr.length > 0) {
    arr.forEach(D => {
      nameArr.push(D[label]);
      idArr.push(D[id]);
    });
  }
  return {
    nameArr,
    idArr
  };
}
</script>

<style lang="less">
@import "../../../assets/css/addEditGoods.less";

.addEditGoods {
  margin-bottom: 80px;
  min-width: 1230px;

  .takeDateBool {
    .el-input {
      width: 150px;
    }
  }
  .areaTree {
    .el-dialog__body {
      /*overflow-y: scroll;*/
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      /*height: 500px;*/
      padding-top: 15px;
    }
  }

  .TreeShop {
    .el-tree-node__label {
      margin-left: 10px !important;
    }
  }

  .TicketDialog {
    .el-checkbox {
      display: block;
      margin-top: 8px;
    }
  }

  .FeaturesStyle {
    .el-form-item__content {
      line-height: 20px;
    }
  }

  .goods_normsLabel {
    // display: inline-block;
    text-align: right;
    padding-right: 12px;
    font-size: 14px;
    color: #606266;
    width: 150px;
    float: left;
    line-height: 40px;
  }

  .goods_norms {
    display: inline-block;
    padding: 20px;
    width: 80%;
    margin-bottom: 20px;
    border: 1px solid silver;
    .el-select__input {
      margin-left: 4px;
    }
    .el-form-item__label {
      text-align: left;
      width: 120px !important;
    }

    .goods_norms_row {
      margin-bottom: 20px;

      .el-form-item {
        display: inline-block;

        .el-form-item__content {
          margin-left: 0 !important;
        }
      }

      .el-input-group__prepend {
        padding: 0 10px;
      }

      .el-input__inner {
        vertical-align: middle;
      }

      .iconError {
        font-size: 25px;
        vertical-align: middle;
        color: rgba(153, 153, 153, 0.6);
        margin-left: 20px;
      }

      .ImgLoadStyle {
        display: inline-block;
        vertical-align: middle;
        /*width: 100px;*/

        .el-upload--picture-card {
          /*width: 100%;*/
          height: 90px;
          width: 90px;
          line-height: 90px;

          .el-upload-list__item {
            line-height: 65px !important;
            height: 90px;
            width: 90px;
          }
        }

        .el-upload-list--picture-card .el-upload-list__item {
          height: 90px;
          width: 90px;
          margin: 0 8px -3px 0 !important;
        }
      }

      .el-select {
        width: auto;
      }
    }

    .el-input {
      width: 120px !important;
      vertical-align: middle;
    }
    .tasteInputNorms {
      .el-input {
        min-width: 120px !important;
        width: auto !important;
      }
    }
  }
  .FinHourInput {
    display: inline-block;
    .el-input,
    .el-select {
      width: 120px !important;
    }
  }
}
</style>
