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
      <el-form-item label="商品规格选择" :key="6">
        <el-select
          v-model="ruleForm.SpecType"
          placeholder="请选择"
          @change="changeNorms"
          :disabled="$route.query.SID?true:false"
        >
          <el-option
            v-for="item in optionsNorms"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="商品类型" prop="ProdType">-->
      <!--        <el-radio-group v-model="ruleForm.ProdType">-->
      <!--          <el-radio :label="3"  v-if="currentGoods">普通商品</el-radio>-->
      <!--          <el-radio :label="6"  v-if="!currentGoods">电子券</el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
      <el-form-item label="商品编号" v-if="ruleForm.SpecType!=='2'" prop="ProdNo" :key="1">
        <el-input v-model="ruleForm.ProdNo" :readonly="true" placeholder="请填写商品编号"></el-input>
        <el-button
          type="primary"
          style="margin-left:10px"
          size="medium"
          @click="selectGoods(null)"
          v-if="!$route.query.SID"
        >...</el-button>
      </el-form-item>
      <el-form-item label="商品名称" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="请填写商品名称"></el-input>
      </el-form-item>
      <!--      <el-form-item label="商品原价" prop="OldPrice">-->
      <!--        ¥-->
      <!--        <el-input-number v-model="ruleForm.OldPrice" controls-position="right" :min="1"></el-input-number>-->
      <!--      </el-form-item>-->
      <el-form-item label="商品售价" prop="SalePrice" v-if="ruleForm.SpecType==='1'">
        ¥
        <el-input-number v-model="ruleForm.SalePrice" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="配送方式" prop="DeliveryType">
        <el-checkbox-group v-model="ruleForm.DeliveryType" @change="changeCheckbox">
          <el-checkbox label="3" :disabled="disabledLogistics">物流配送</el-checkbox>
          <el-checkbox label="2" :disabled="disabledTakeout">外卖配送</el-checkbox>
          <el-checkbox label="1">门店自取</el-checkbox>
        </el-checkbox-group>
        <div style="color:#999">物流与配送冲突</div>
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
      <el-form-item label="商品口味" prop="TastName" v-if="ruleForm.SpecType==='1'" :key="2">
        <tasteList
          :Type="2"
          @changeTaste="changeTasteListFa"
          ref="tasteListFa"
          :valueCurrent="ruleForm.TastName"
        ></tasteList>
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
      <el-form-item label="商品库存" v-if="ruleForm.SpecType==='1'" :key="3">
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
      <el-form-item label="商品提前" prop="FinHour">
        <div class="FinHourInput">
          <el-select v-model="isAdvanceTime" placeholder="请选择" @change="ruleForm.FinHour = ''">
            <el-option
              v-for="(item,index) in optionsAdvanceTime"
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
          :max="23"
          @change="setInputDec(ruleForm.FinHour)"
        ></el-input-number>
        {{isAdvanceTime=='1'?'天':'小时'}}预定
        <!-- <el-input-number style="margin-left:20px" v-model="ruleForm.FinHour" controls-position="right" :min="0"></el-input-number>天预定 -->
        <div style="color:#999">小时与天数冲突</div>
      </el-form-item>
      <el-form-item label="供货门店" prop="ShopInfo">
        <el-input readonly v-model="ruleForm.PickShopName" placeholder="请选择门店"></el-input>
        <el-button type="primary" style="margin-left:10px" size="medium" @click="PickShopFun">...</el-button>
        <div style="color:#999">不填为全选</div>
      </el-form-item>
      <!--      <el-form-item label="送货区域" prop="AreaInfoName">-->
      <!--        &lt;!&ndash;        {{AreaInfo}}&ndash;&gt;-->
      <!--        <el-input readonly v-model="ruleForm.AreaInfoName" placeholder="请选择区域"></el-input>-->
      <!--        <el-button type="primary" style="margin-left:10px" size="medium" @click="AreaInfoFun">...</el-button>-->
      <!--      </el-form-item>-->
      <el-form-item label="预定提示" prop="Tip">
        <el-input
          v-model="ruleForm.Tip"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3}"
          placeholder="最长可输入500个字符"
          maxlength="500"
        ></el-input>
      </el-form-item>
      <el-form-item label="赠送积分" prop="SendScore">
        <el-checkbox v-model="ruleForm.SendScore" label="1">不支持购买赠送积分(仅限普通商品)</el-checkbox>
      </el-form-item>
      <el-form-item label="可提货日期(配送)" prop="PickDate">
        <el-checkbox v-model="assistRuleForm.TakeDateBool">启用</el-checkbox>&nbsp;&nbsp;
        <el-date-picker
          v-if="assistRuleForm.TakeDateBool"
          v-model="ruleForm.PickDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <br />
        <el-select
          class="takeDateBool"
          v-if="assistRuleForm.TakeDateBool"
          v-model="pickDateValue"
          placeholder="请选择方式"
          style="margin-top:10px;width:150px"
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
      </el-form-item>
      <el-form-item label="可提货时间(配送)" prop="PickTime">
        <el-checkbox v-model="assistRuleForm.TakeDateTimeBool">启用</el-checkbox>&nbsp;&nbsp;
        <el-time-picker
          v-if="assistRuleForm.TakeDateTimeBool"
          is-range
          v-model="ruleForm.PickTime"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
      <!--      <el-form-item label="提货时间限制" prop="DeliverTime">-->
      <!--        <el-checkbox v-model="assistRuleForm.DeliverTimeBool">启用</el-checkbox>&nbsp;&nbsp;-->
      <!--        <el-time-picker-->
      <!--          v-if="assistRuleForm.DeliverTimeBool"-->
      <!--          is-range-->
      <!--          v-model="ruleForm.DeliverTime"-->
      <!--          value-format="HH:mm:ss"-->
      <!--          range-separator="至"-->
      <!--          start-placeholder="开始时间"-->
      <!--          end-placeholder="结束时间"-->
      <!--          placeholder="选择时间范围">-->
      <!--        </el-time-picker>-->
      <!--      </el-form-item>-->
      <el-form-item label="可购买时间" prop="BuyTime">
        <el-checkbox v-model="assistRuleForm.BuyTimeBool">启用</el-checkbox>&nbsp;&nbsp;
        <el-time-picker
          v-if="assistRuleForm.BuyTimeBool"
          is-range
          v-model="ruleForm.BuyTime"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>

      <el-form-item label="商品标签" prop="Tag" :key="8">
        <tasteList
          ref="labelRef"
          :multiple="false"
          :Type="0"
          :allowCreate="false"
          @changeTaste="changeTasteList($event,0)"
        ></tasteList>

        <!--        <tasteList placeholder="请选择口味" :Type="2" ref="tasteList"-->
        <!--                   @changeTaste="changeTaste($event,index)" :valueCurrent="item.TastName"></tasteList>-->
      </el-form-item>
      <el-form-item label="商品配件" prop="AccessoriesInfo" :key="7">
        <tasteList
          ref="AccessoriesList"
          :Type="3"
          :allowCreate="false"
          @changeTaste="changeTasteList($event,3)"
        ></tasteList>
        <div style="color:#999">仅支持普通商品，仅实现于自定义模板</div>
      </el-form-item>
      <!--      <el-form-item label="配件备注" prop="AccessoriesRemark">-->
      <!--        <el-input v-model="ruleForm.AccessoriesRemark" placeholder="配件备注"></el-input>-->
      <!--        <div style="color:#999">用户选择配件时的温馨提示</div>-->
      <!--      </el-form-item>-->
      <el-form-item label="可用电子劵" prop="TicketInfo">
        <el-input readonly v-model="ruleForm.TicketInfoName" placeholder="请选择电子劵"></el-input>
        <el-button type="primary" style="margin-left:10px" size="medium" @click="clickTicket">...</el-button>
        <div style="color:#999">只可用此设置的电子劵购买此商品</div>
      </el-form-item>
      <!--      <el-form-item label="适用区域" prop="CityInfo">-->
      <!--        <el-input readonly v-model="ruleForm.CityInfo" placeholder="请选择适用区域"></el-input>-->
      <!--        <el-button type="primary" style="margin-left:10px" size="medium" @click="clickCityNo">...</el-button>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="电子券" prop="TicketInfo" v-if="ruleForm.ProdType===6">-->
      <!--        <el-input readonly v-model="ruleForm.PickShopName" placeholder="请选择电子券"></el-input>-->
      <!--        <el-button type="primary" style="margin-left:10px" size="medium" @click="clickTicketInfo">...-->
      <!--        </el-button>-->
      <!--        <br>-->
      <!--        该商品包含的电子劵信息（可设置一张或多张）-->
      <!--      </el-form-item>-->
      <el-form-item label="每人限购" prop="MaxBuyCnt">
        <el-input-number v-model="ruleForm.MaxBuyCnt" controls-position="right" :min="0"></el-input-number>
      </el-form-item>

      <span class="goods_normsLabel" v-if="ruleForm.SpecType!=='1'">商品规格</span>
      <fieldset class="goods_norms" v-if="ruleForm.SpecType!=='1'" :key="5">
        <legend style="margin-left:20px;">规格项目</legend>
        <span>可拖动移动位置</span>
        <vuedraggable v-model="ruleForm.SpecList" @change="changeDrag">
          <div
            v-for="(item,index) in ruleForm.SpecList"
            class="goods_norms_row"
            @mouseover="mouseover(index)"
            @mouseout="mouseout(index)"
            :key="index"
          >
            <el-form-item
              v-if="ruleForm.SpecType!=='3'"
              :key="index+1"
              :prop="'SpecList.'+index+'.ProdNo'"
              :rules="rules.ProdNoChildren"
              label="商品编号"
            >
              <el-input v-model="item.ProdNo" placeholder="编号" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item
              :key="index+2"
              :prop="'SpecList.'+index+'.Name'"
              :rules="rules.NameChildren"
              label="规格名称"
            >
              <el-input v-model="item.Name" placeholder="规格名称"></el-input>
            </el-form-item>
            <el-form-item
              :key="index+3"
              :prop="'SpecList.'+index+'.StoreQty'"
              :rules="rules.StoreQty"
              label="库存"
            >
              <el-input-number
                style="width:auto;text-align: left;"
                v-model="item.StoreQty"
                controls-position="right"
                :min="0"
                placeholder="库存"
                :step="1"
                step-strictly
              ></el-input-number>
            </el-form-item>
            <el-form-item
              :key="index+4"
              :prop="'SpecList.'+index+'.SalePrice'"
              :rules="rules.SalePrice"
              label="售价"
            >
              <el-input v-model="item.SalePrice" placeholder="售价">
                <template slot="prepend">¥</template>
              </el-input>
            </el-form-item>

            <el-form-item class="tasteInputNorms">
              <tasteList
                placeholder="请选择口味"
                :Type="2"
                ref="tasteList"
                @changeTaste="changeTaste($event,index)"
                :valueCurrent="item.TastName"
              ></tasteList>
            </el-form-item>

            <imgLoad
              :isCoverCurrentImgs="isCoverCurrentImgs"
              :fileListUp="item.Img"
              class="ImgLoadStyle"
              folder="ProdImg"
              :limit="1"
              ref="imgLoad"
              @cloneIsCoverImgs="cloneIsCoverImgs"
              @upLoadImgs="upLoadImgs($event,item,index)"
            ></imgLoad>
            <el-button
              v-if="ruleForm.SpecType!=='3'"
              type="primary"
              style="margin-left:10px"
              size="medium"
              @click="selectGoods(index)"
            >...</el-button>
            <span
              class="el-icon-error iconError"
              v-show="DelIconIndex === index&&showDelIcon === true"
              @click="delGoodsNorms(index)"
            ></span>
          </div>
        </vuedraggable>

        <el-button type="info" @click="addGoodsNorms">添加规格项目</el-button>
        <!--        <el-button type="info" @click="GoodsNorms">查看</el-button>-->
      </fieldset>

      <!--      </el-form-item>-->
      <!--      <el-form-item label="推荐理由" prop="Recommend">-->
      <!--        <el-input-->
      <!--          type="textarea"-->
      <!--          :rows="3"-->
      <!--          placeholder="最长支持200个字符"-->
      <!--          maxlength="200"-->
      <!--          v-model="ruleForm.Recommend">-->
      <!--        </el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="产品特色" prop="Features" class="FeaturesStyle">
        <el-button type="text" @click="FeaturesShow=true" v-if="FeaturesShow===false">+编辑</el-button>
        <ueditor1 v-if="FeaturesShow" ref="Features"></ueditor1>
        <el-button type="text" @click="FeaturesShow=false" v-if="FeaturesShow===true">隐藏</el-button>
      </el-form-item>
      <el-form-item label="重要提示" prop="ImportantNotes" class="FeaturesStyle">
        <el-button
          type="text"
          @click="ImportantNotesShow=true"
          v-if="ImportantNotesShow===false"
        >+编辑</el-button>
        <ueditor1 v-if="ImportantNotesShow" ref="ImportantNotes"></ueditor1>
        <el-button type="text" @click="ImportantNotesShow=false" v-if="ImportantNotesShow===true">隐藏</el-button>
      </el-form-item>
    </el-form>

    <Goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood"></Goods>
    <TicketInfo :showTicket="showTicket" @changeDigTicket="changeDigTicket" ref="TicketInfoList"></TicketInfo>
    <el-dialog
      class="areaTree TreeShop"
      :title="this.clickPickShop?'选择门店':'选择区域'"
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
    <!--    :before-close="beforeCloseTicket"-->
    <el-dialog
      class="areaTree TicketDialog"
      :title="currentTicket?'选择电子劵':'选择门店'"
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
            {{item.Name}}
            <span v-if="item.Address">&nbsp;{{item.Address}}</span>
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
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="Dates" @change="handleCheckedCitiesChangeDay">
        <el-checkbox v-for="(item,index) in datesList" :label="item" :key="index">{{item}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectDays">确 定</el-button>
      </div>
    </el-dialog>

    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left:20px" @click="preserveFun">保存</el-button>
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
import { addScroll, ImgList, replacePre } from "@/config/publicFunction";
import { stockTypeList } from "@/config/utils";
import vuedraggable from "vuedraggable";
import { getLists } from "@/api/vipCard";
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
    tasteList
  },
  data() {
    return {
      loading: false,
      optionsNorms: [
        { label: "单规格商品", value: "1" },
        { label: "多尺寸商品", value: "3" },
        { label: "多规格商品", value: "2" }
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
        SpecType: "2",
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
        StoreQty: [ruleText.StoreQty(this)],
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
        Describe: [
          { required: true, message: "请输入商品描述", trigger: "blur" }
        ],
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
      disabledLogistics: true,
      disabledTakeout: false,
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
      checkAll: false,
      allCheckList: [],
      pickDateValue: "0",
      pickDateOptions: [
        { value: "0", label: "不限制" },
        { value: "1", label: "按星期" },
        { value: "2", label: "按几号" }
      ],
      valueWeek: [],
      optionsWeek: [
        { value: "1", label: "星期一" },
        { value: "2", label: "星期二" },
        { value: "3", label: "星期三" },
        { value: "4", label: "星期四" },
        { value: "5", label: "星期五" },
        { value: "6", label: "星期六" },
        { value: "7", label: "星期天" }
      ],
      dialogFormVisible: false,
      isIndeterminateDay: false,
      checkAllDay: false,
      Dates: [],
      datesList: [],
      Weeks: []
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
  computed: {},
  created() {
    this.getList();
    let arr = []; //1-31天
    for (let i = 1; i < 32; i++) {
      arr.push(i.toString());
    }
    this.datesList = arr;
  },
  methods: {
    changeCheckbox(val) {
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
        // 获取电子券列表
        let info = this.$route.query.SID
          ? getLists(
              {
                Action: "GetProdInfo",
                SID: this.$route.query.SID
              },
              "MProdOpera"
            )
          : [];
        let res = await Promise.all([
          getLists({ Action: "GetTicketList" }, "MTicketOpera"),
          info,
          getLists({ Action: "GetShopList" }, "MShopOpera")
        ]);
        this.TicketList = res[0].Data.TicketList;
        this.storeList = res[2].Data.ShopInfoList;
        if (!this.$route.query.SID) {
          this.loading = false;
          return;
        }
        this.ruleForm = res[1].Data.ProdInfo;
        this.$set(this.ruleForm, "SpecList", res[1].Data.SpecList);
        
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
        this.ruleForm.TastName = this.ruleForm.TastName
          ? this.ruleForm.TastName.split(",")
          : [];

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

        this.$refs.labelRef.value = this.ruleForm.Tag;
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
        let ImportantNotes = $.base64.atob(
          this.ruleForm.ImportantNotes,
          "utf8"
        );

        Features = Features.replace(
          /src="Files/g,
          `src="${process.env.Prefix}Files`
        );
        ImportantNotes = ImportantNotes.replace(
          /src="Files/g,
          `src="${process.env.Prefix}Files`
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

            D.TastName = D.TastName ? D.TastName.split(",") : [];
          });
        }

        this.changeCheckbox(this.ruleForm.DeliveryType.join(",")); //默认物流与配送冲突

        if (this.ruleForm.FinHour && Number(this.ruleForm.FinHour) > 23) {
          this.ruleForm.FinHour = Number(this.ruleForm.FinHour) / 24; //时间转化为天数
          this.isAdvanceTime = "1";
        } else if (
          this.ruleForm.FinHour &&
          Number(this.ruleForm.FinHour) < 23
        ) {
          this.isAdvanceTime = "2";
        }

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
      // console.log(667676)
      // let arr = []
      // imgs.forEach(D => {
      //   arr.push(D.url)
      // })
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

      this.$refs.tasteList.forEach((D, index) => {
        this.$refs.tasteList[index].value = this.ruleForm.SpecList[index]
          .TastName
          ? this.ruleForm.SpecList[index].TastName
          : [];
      });

      this.$refs.ruleForm.clearValidate();
    },
    changeGoodType(arr) {
      // 商品列席id
      this.ruleForm.CateSID = arr;
    },
    changeNorms() {
      this.$refs.ruleForm.clearValidate();
      // this.$refs.ruleForm.resetFields()
      // this.$refs.goodType.value = ''
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
      // console.log(this.$refs.Features.getUEContent(), 5555)
      // console.log(this.$refs.ImportantNotes.getUEContent(), 5555)
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          try {
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
            console.log(obj, "obj");
            Object.assign(obj, { Action: "SetProdInfo" });
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

                if (D.TastName && typeof D.TastName !== "string") {
                  // 变成json
                  D.TastName = D.TastName.join(",");
                }
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

            obj.TastName =
              typeof obj.TastName !== "string" && obj.TastName
                ? obj.TastName.join(",")
                : obj.TastName;
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
            Features = Features.replace(/src="\.\.\/Files/g, `src="Files`);
            ImportantNotes = ImportantNotes.replace(
              /src="\.\.\/Files/g,
              `src="Files`
            );
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

              console.log(obj.ImgList, "提交按钮的操作");
            }
            if (obj.FinHour > 0) {
              obj.FinHour =
                this.isAdvanceTime === "1" ? obj.FinHour * 24 : obj.FinHour;
            }
            // console.log(obj, 5555566);
            // return;
            // 获取电子券列表
            await getLists(obj, "MProdOpera");
            this.$router.push("/weChat/manager/goodSetting");
            this.$message.success("操作成功");
          } catch (e) {
            console.log(e, "99");
            this.$message.error(e);
          }
        }
      });
    },
    sureGood(val) {
      // 获取的商品的名字和编号
      this.goodsShow = false;
      if (this.goodsNormsIndex === null) {
        this.ruleForm.ProdNo = val.ProdNo;
        this.ruleForm.Name = val.ProdName;
      } else {
        // 给当前的 商品规格编号加 禁止
        // this.ruleForm.goodsNorms.push({number:'',norms:'',price:'',discount:''})
        this.ruleForm.SpecList[this.goodsNormsIndex].ProdNo = val.ProdNo;
        // this.ruleForm.SpecList[this.goodsNormsIndex].Name = val.ProdName
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
        // console.log(id)
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
      // console.log(this.currentTicket, 99999);
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
          CardPrice: "",
          Img: [],
          TastName: []
        });
      });
    },
    GoodsNorms() {
      // console.log(this.ruleForm.SpecList, 444444)
    },
    // 点击口味（多规格）
    changeTaste(arr, index) {
      this.ruleForm.SpecList[index].TastName = arr;
    },
    setInputDec(FinHour) {
      //不让填写小数
      if (!FinHour) return;
      // if (this.isAdvanceTime === "1") {
      this.ruleForm.FinHour = FinHour.toString().split(".")[0];
      // }
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
    }
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
    display: inline-block;
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
