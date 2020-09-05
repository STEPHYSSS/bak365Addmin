<template>
  <div class="applySet">
    <el-form ref="form" :model="form" label-width="180px">
<!--      <el-form-item label="卡前缀">-->
<!--        <el-input v-model="form.name"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="卡类型">-->
<!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="优惠类型">-->
<!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
<!--        <span style="margin:0 10px 0 20px;">类型</span>-->
<!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否积分">-->
<!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="卡类别">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="微卡申请填写信息">
        <el-select v-model="form.xin" placeholder="请选择活动区域" multiple>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="读卡方式">-->
<!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="分佣方案">-->
<!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="卡可使用门店">-->
<!--        <el-input v-model="form.cord"></el-input>-->
<!--        <el-button type="primary" style="margin-left:10px" size="medium" @click="shopDialog">...</el-button>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="绑定门店">-->
<!--        <el-input v-model="form.cord"></el-input>-->
<!--        <el-button type="primary" style="margin-left:10px" size="medium" @click="bindShop">...</el-button>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="绑卡类别">-->
<!--        <el-input v-model="form.cord"></el-input>-->
<!--        <el-button type="primary" style="margin-left:10px" size="medium" @click="bindType">...</el-button>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="绑卡条件">-->
<!--        <el-checkbox-group v-model="form.checkList">-->
<!--          <el-checkbox label="复选框 A"></el-checkbox>-->
<!--          <el-checkbox label="复选框 B"></el-checkbox>-->
<!--          <el-checkbox label="复选框 C"></el-checkbox>-->
<!--          <el-checkbox label="禁用" disabled></el-checkbox>-->
<!--          <el-checkbox label="选中且禁用" disabled></el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="服务条款">-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>

<!--    <el-dialog-->
<!--      title="选择提货门店"-->
<!--      width="700px"-->
<!--      :visible.sync="shopVisible"-->
<!--      :before-close="handleClose">-->
<!--      <div class="shopTree">-->
<!--        <el-header>可选门店</el-header>-->
<!--        <tree ref="tree" :showCheckbox="true" :highlight="false" @checkChange="checkChange"></tree>-->
<!--      </div>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--          <el-button @click="shopVisible = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="shopChange">确 定</el-button>-->
<!--        </span>-->
<!--    </el-dialog>-->

<!--    <el-dialog-->
<!--      title="选择卡类别"-->
<!--      width="700px"-->
<!--      class="cardTypeStyle"-->
<!--      :visible.sync="cardTypeVisible"-->
<!--      :before-close="handleClose">-->
<!--      <div class="cardTypeVisible">-->
<!--        <el-checkbox-group v-model="form.checkCardType">-->
<!--          <el-checkbox :label="i.id" v-for="i in checkList" :key="i.id">{{i.name}}</el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </div>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--          <el-button @click="cardTypeVisible = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="cardTypeChange">确 定</el-button>-->
<!--        </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import tree from '@/components/tree'
import {addScroll} from '@/config/publicFunction'

export default {
  // name: "applySet",
  components: {tree},
  data() {
    return {
      form: {checkList: [], userShop: [], bindShop: [], checkCardType: []},
      shopVisible: false,
      userShop: [],
      // 打开的是绑定门店的弹框
      isBindShop: null,
      // 多选框的数据
      checkList: [{name: '上海', id: '1'}, {name: '北京', id: '2'}, {name: '广州', id: '3'}, {name: '深圳', id: '4'}],
      cardTypeVisible: false
    }
  },
  updated() {
    if (this.$refs.tree && this.shopVisible) {
      if (!this.isBindShop) {
        this.$refs.tree.setCheckedKeys(this.form.userShop)
      } else if (this.isBindShop) {
        this.$refs.tree.setCheckedKeys(this.form.bindShop)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    }
  },
  created() {
  },
  methods: {
    handleClose(done) {
      if (this.$refs.tree) {
        this.userShop = []
        this.$refs.tree.setCheckedKeys([])
      }
      done()
    },
    shopDialog() {
      this.shopVisible = true
      this.isBindShop = false
    },
    shopChange() {
      // 确定选择的门店
      this.shopVisible = false
      if (this.isBindShop) {
        this.form.bindShop = this.userShop
      } else {
        this.form.userShop = this.userShop
      }

      this.userShop = []
      this.$refs.tree.setCheckedKeys([])
    },
    checkChange(arr) {
      let {nameArr, idArr} = setData(arr, 'label', 'id')
      this.userShop = idArr
    },
    bindShop() {
      this.shopVisible = true
      this.isBindShop = true
    },
    bindType() {
      // 打开绑卡类型
      this.cardTypeVisible = true
      addScroll('.cardTypeVisible')
    },
    cardTypeChange() {

    }
  }
}

function setData(data, label, id) {
  let arr = data
  let nameArr = []
  let idArr = []
  if (arr.length > 0) {
    arr.forEach((D) => {
      nameArr.push(D[label])
      idArr.push(D[id])
    })
  }
  return {
    nameArr, idArr
  }
}
</script>

<style lang="less">
  .applySet {
    .el-input, .el-select {
      width: 300px;
    }

    .el-dialog__footer {
      text-align: center;
    }

    .shopTree {
      width: 400px;
      height: 400px;
      border: 1px solid #eee;
      overflow-y: scroll;
      transform: translateX(30%);
    }

    .cardTypeStyle {
      .el-dialog__body {
        margin-left: 20px;
      }

      .el-checkbox {
        display: block;
        margin-bottom: 15px;
      }
    }

  }
</style>
