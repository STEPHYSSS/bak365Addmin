<template>
  <div class="vipListType">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :disabled="disabled" :label="currentRoute?'优惠劵管理':'微信卡模板'" name="first">
        <el-button type="primary" style="margin-bottom:15px" @click="addNewCard">{{currentRoute?'新建优惠劵':'新建微信卡模板'}}
        </el-button>
        <el-table
          :data="tableData"
          size="medium"
          v-loading="loadingTable"
          style="width: 100%">
          <el-table-column
            v-if="!currentRoute"
            prop="VipTitle"
            label="微卡模板名">
            <template slot-scope="scoped">
              <template v-if="scoped.row.Name">{{scoped.row.Name}}</template>
              <template v-else>--</template>
            </template>
          </el-table-column>
          <el-table-column
            v-if="currentRoute"
            prop="name"
            label="优惠券名称">
          </el-table-column>
          <el-table-column
            v-if="!currentRoute"
            label="状态">
            <template slot-scope="scoped">
              <!--              0未审核，1审核-->
              {{scoped.row.Audit | isAudit}}
            </template>
          </el-table-column>
          <el-table-column
            v-if="currentRoute"
            prop="state"
            label="优惠券状态">
          </el-table-column>
          <el-table-column
            prop="GetQuantity"
            label="领取数量">
          </el-table-column>
          <el-table-column
            label="创建时间">
            <template slot-scope="scoped">
              <template v-if="scoped.row.AddTime">{{scoped.row.AddTime}}</template>
              <template v-else>--</template>
            </template>
          </el-table-column>
          <el-table-column
            label="是否启用">
            <template slot-scope="scoped">
              <el-checkbox v-model="scoped.row.Start" @change="changeEnable($event,scoped.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            width="300"
            label="操作">
            <template slot-scope="scoped">
              <el-button type="text" style="margin-right:10px" @click="inspectState(scoped.row)">
                检查{{currentRoute?'券':'卡'}}状态
              </el-button>
              <el-popover
                v-if="currentRoute"
                placement="left"
                v-model="scoped.row.visibleUrl">
                <el-input v-model="scoped.row.url" readonly placeholder="请输入内容">
                  <el-button slot="append" @click="copyUrl(scoped.row)">复制</el-button>
                </el-input>
                <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
              </el-popover>
              <el-popover
                placement="left"
                @show="showPopover(scoped.row)"
                v-model="scoped.row.visible">
                <div class="smallRoutine" v-loading="loadingImg">
                  <div class="smallRoutineTop">
                    <span>二维码</span>
                    <span class="close" @click="scoped.row.visible = false">×</span>
                  </div>
                  <div style="width:200px;height:200px;border: 1px solid #efefef;">
                    <img :src="QRCodeImg" alt="" style="width:100%;height:100%">
                  </div>
                  <a class="smallRoutineUpDown" @click="upDownUrl" :disabled="QRCodeImg?false:true">下载二维码</a>
                  <span>
                  </span>
                </div>
                <el-button type="text" slot="reference" style="margin-right:8px;">二维码</el-button>
              </el-popover>
              <el-button type="text" @click="editRow(scoped.row)">编辑</el-button>
              <el-button type="text" @click="delRow(scoped.row,scoped.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        <Pagination :page="page" @change_page="get_list" style="float: right;margin-top:30px"></Pagination>-->
        <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del>
      </el-tab-pane>
      <el-tab-pane :disabled="disabled" label="领取记录" name="second">
        <ReceivingRecords :currentRoute="currentRoute" ref="Records" @setNoClick="setNoClick"></ReceivingRecords>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="400px">
      <span v-loading="loading">{{stateVal}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {DownUrlFun} from '@/config/publicFunction'
import Del from '@/components/Dialog/del'
import Pagination from '@/components/pagination/index'
import ReceivingRecords from '@/components/pageView/receivingRecords'
import store from 'storejs'
import {getLists} from '@/api/vipCard'
import {HeardUrl} from '@/config/index'


export default {
  name: "vipList",
  components: {Del, Pagination, ReceivingRecords},
  data() {
    return {
      activeName: 'first',
      show: false,
      // 控制未加载完毕不让点击
      disabled: true,
      // 当前的index
      current_index: '',
      // 当前WeChatNo
      current_weChatNo: '',
      page: {total: 100, current_page: 1},
      // 检查状态弹框
      dialogVisible: false,
      // 返回的状态信息
      stateVal: '',
      tableData: [],
      loading: false,
      loadingTable: true,
      loadingImg: false,
      // 二维码图片
      QRCodeImg: ''
    }
  },
  async created() {
    if (!!store.get('activeName')) {
      this.activeName = store.get('activeName')
    }
    await this.getList()
  },
  computed: {
    currentRoute() {
      // "优惠劵 =>true  会员卡 => false"
      return this.$route.path === '/wechatCard/Coupon/list' || false
    }
  },
  methods: {
    async getList() {
      try {
        this.loadingTable = true
        this.disabled = true
        let data = await getLists({Action: 'GetTemplateList'},'WeChatCardOpera')
        // console.log(data.Data.TemplateList, 666666)
        this.tableData = data.Data.TemplateList
        this.tableData.forEach(D => {
          // 是否启用（0不启用，1启用）
          if (Number(D.Start) === 1) {
            D.Start = true
          } else {
            D.Start = false
          }
        })
        this.loadingTable = false
        this.disabled = false
      } catch (e) {
        this.loadingTable = false
        this.$message.error(e);
        this.disabled = false
      }
    },
    handleClick() {
      store.set('activeName', this.activeName)
    },
    async changeEnable(bool, row) {
      // 是否启用 bool = true 为启动
      let Start = bool === true ? '1' : '0'
      try {
        let data = await getLists({Action: 'SetCardStart', SID: row.SID, Start: Start},'WeChatCardOpera')
        this.$message.success(data.Message)
      } catch (e) {
        setTimeout(() => {
          row.Start = !row.Start
        }, 500)
        this.$message.error(e)
      }
    },
    async showPopover(row) {
      try {
        this.loadingImg = true
        let data = await getLists({Action: 'GetQrCode', WeChatNo: row.WeChatNo},'WeChatCardOpera')
        this.QRCodeImg = process.env.Prefix + data.Message
        this.loadingImg = false
      } catch (e) {
        this.loadingImg = false
        this.$message.error(e)
      }
    },
    upDownUrl() {
      // 下载二维码
      DownUrlFun(this.QRCodeImg)
    },
    async inspectState(row) {
      this.dialogVisible = true
      this.loading = true
      try {
        await getLists({Action: 'GetCard', WeChatNo: row.WeChatNo},'WeChatCardOpera')
        this.loading = false
        this.stateVal = '通过审核'
        this.getList()
      } catch (e) {
        this.loading = false
        this.stateVal = '待审核'
        this.$message.error(e)
      }
    },
    copyUrl(val) {
      // 链接复制
      if (val.url) {
        let index = $('.el-popover').length - 1
        let input = $($('.el-popover')[index]).find('input')
        // // 复制输入框的地址
        input.select()
        document.execCommand("Copy")
        this.$Message.info('复制成功')
      } else {
        this.$Message.info('复制失败')
      }
      val.visibleUrl = false
    },
    editRow(row) {
      // 编辑
      this.$router.push({path: '/wechatCard/vip/newlyBuild', query: {id: row.SID}})
    },
    delRow(row, index) {
      // 删除
      this.show = true
      this.current_index = index
      this.current_weChatNo = row.WeChatNo
    },
    delFunction(bool) {
      this.show = bool
    },
    async confirmEnd() {
      try {
        await getLists({Action: 'RemoveCard', WeChatNo: this.current_weChatNo},'WeChatCardOpera')
        this.show = false
        this.$message.success('删除成功')
        this.tableData.splice(this.current_index, 1)
      } catch (e) {
        this.show = false
        this.$message.error(e)
      }
    },
    get_list(page) {
    },
    addNewCard() {
      // 新建会员卡
      if (!this.currentRoute) {
        this.$router.push('/wechatCard/vip/newlyBuild')
      } else {
        this.$router.push('/wechatCard/Coupon/newlyBuild')
      }
    },
    setNoClick(bool){
      this.disabled = bool
    }
  },
  filters: {
    isAudit(val) {
      switch (Number(val)) {
        case 1:
          return '通过审核'
        case 0:
          return '待审核'
      }
    }
  },
  watch: {
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/index.less';

  .vipListType {
    .el-tabs__item.is-active {
      background: #fff !important;
    }
  }
</style>
