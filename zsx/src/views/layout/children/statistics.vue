<template>
<div class="layout">
<el-form :inline="true" :model="params" class="form">
    <el-form-item label="公司名称:">
      <el-input v-model="params.partnerName" placeholder="请输入" maxlength="20"/>
    </el-form-item>
   <el-form-item label="计划名称:">
      <el-input v-model="params.planName" placeholder="请输入" maxlength="20"/>
    </el-form-item>
    <el-form-item label="计划创建时间：">
      <el-col :span="11">
        <el-date-picker v-model="params.beginTime" :picker-options="pickerOptionsStart" type="date" placeholder="起始时间" style="width: 100%;" value-format="yyyy-MM-dd"/>
      </el-col>
      <el-col :span="2" class="line" style="text-align:center">-</el-col>
      <el-col :span="11">
        <el-date-picker v-model="params.endTime" :picker-options="pickerOptionsEnd" type="date" placeholder="结束时间" style="width: 100%;" value-format="yyyy-MM-dd"/>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="reset">重置</el-button>
    </el-form-item>

  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column align="center" prop="partnerName" label="公司名称" min-width="150"/>
    <el-table-column align="center" prop="planName" label="计划名称" min-width="150"/>
    <el-table-column align="center" prop="prePlayTimes" label="下方次数" min-width="150"/>
    <el-table-column align="center" prop="realPlayTimes" label="实际播放次数" min-width="150"/>
    <el-table-column align="center" prop="place" label="场景" min-width="150"/>
    <el-table-column align="center" prop="regionId" label="区域" min-width="150"/>
    <el-table-column align="center" prop="totalDevice" label="台数" min-width="150"/>
    <el-table-column align="center" label="操作" min-width="150" prop="shipping_status">
      <template slot-scope="scope">
        <el-button type="text" size="small" icon="el-icon-search" @click="manage(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      :current-page="currentPage4"
      :page-sizes="[10]"
      :page-size="10"
      :total="total"
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
    <el-dialog :visible.sync="dialogFormVisible" :title="title" width="50%">
      <el-table :data="planList" style="width: 100%">
        <el-table-column align="center" prop="partnerName" label="设备编码" min-width="150"/>
        <el-table-column align="center" prop="regionId" label="区域" min-width="150"/>
        <el-table-column align="center" prop="place" label="场景" min-width="150"/>
        <el-table-column align="center" prop="prePlayTimes" label="下方次数" min-width="150"/>
        <el-table-column align="center" prop="realPlayTimes" label="实际播放次数" min-width="150"/>
      </el-table>
      <el-pagination
      :current-page="currentPage4"
      :page-sizes="[10]"
      :page-size="10"
      :total="total"
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button  type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { statisticList } from '@/api/res'
export default {
  data () {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          const endDateVal = this.params.endTime
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          const beginDateVal = this.params.beginTime
          if (beginDateVal) {
            return (
              time.getTime() < new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      title: '播放详情',
      labelPosition: 'right',
      tableData: [],
      planList: [],
      total: 1,
      dialogFormVisible: false,
      accountdialog: false,
      storeListchange: [],
      machineList: [],
      zongSn: [],
      employee_token: '',
      storeParams: {
        zs_sn: '',
        machine_store_id: '',
        machine_type: '',
        machine_sn: '',
        machine_store_name: ''
      },
      form: {
        name: '',
        state: '',
        startdate: '',
        enddata: ''
      },
      currentPage4: 4,
      params: {
        cursor: 1,
        limit: 10,
        planName: '',
        beginTime: '',
        endTime: '',
        partnerName: ''
      },
      storelists: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取统计列表
    getData () {
      statisticList(this.params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    search () {
      this.getData()
    },
    // 重置
    reset () {
      this.params = {
        cursor: 1,
        limit: 10,
        planName: '',
        beginTime: '',
        endTime: '',
        partnerName: ''
      }
      this.getData()
    },
    // 新建
    add () {
      this.dialogFormVisible = true
    },
    // 上下架
    manage (row) {

    },
    // 修改
    editor () {
      this.dialogFormVisible = true
    },
    // 删除
    delete () {

    },
    // 新建确认
    newstore () {
      // if (!this.storeParams.zs_sn || !this.storeParams.machine_store_id || !this.storeParams.machine_type || !this.storeParams.machine_sn || !this.storeParams.machine_store_name) {
      //   return this.$message({
      //     type: 'error',
      //     message: '请填写完整信息'
      //   })
      // }

    },
    // 修改确认
    editstore () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.layout{
  padding: 20px 0 20px 20px;
  background: #fff;
}
.el-pagination{
  margin: 50px auto;
  text-align: center;
}
</style>
