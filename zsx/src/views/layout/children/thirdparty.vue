<template>
<div class="layout">
  <el-form :inline="true" :model="params" class="form">
    <el-form-item label="广告名称:">
      <el-input v-model="params.adName" placeholder="请输入" maxlength="20"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-plus" @click="add('新增第三方广告')">新增</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="sort">设置广告优先级</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" width="50" label="顺序"></el-table-column>
    <el-table-column align="center" prop="adName" label="广告名称" min-width="150"/>
    <el-table-column align="center" prop="adStatus" label="状态" min-width="150">
     <template slot-scope="scope">
        <span>{{ scope.row.adStatus | systemstatusFilter}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="createTime" label="创建时间" min-width="150"/>
    <el-table-column align="center" label="操作" min-width="150">
      <template slot-scope="scope">
        <el-button v-if="scope.row.adStatus === 0" type="text" size="small" icon="el-icon-sort" @click="manage(scope.row,1)">上架</el-button>
        <el-button v-if="scope.row.adStatus === 1" type="text" size="small" icon="el-icon-sort" @click="manage(scope.row,0)">下架</el-button>
        <el-button type="text" size="small" icon="el-icon-edit" @click="editor(scope.row,'修改第三方广告')">修改</el-button>
        <el-button  type="text" size="small" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
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
      <el-form :model="storeParams" :label-position="labelPosition" label-width="170px" style="width:70%">
        <el-form-item label="广告名称:">
          <el-input v-model="storeParams.adName" auto-complete="off" maxlength="30"/>
        </el-form-item>
       <el-form-item label="是否播放视频：">
          <el-radio-group v-model="storeParams.videoAvailable">
            <el-radio label='1'>是</el-radio>
            <el-radio label='0'>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="title ==='新增第三方广告'" type="primary" @click="newstore">确 定</el-button>
        <el-button v-if="title ==='修改第三方广告'" type="primary" @click="editstore">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogThirdVisible" title="设置广告优先级" width="70%">
      <el-table :data="thirdList" style="width: 100%">
        <el-table-column type="index" width="50" label="顺序"></el-table-column>
        <el-table-column align="center" prop="adName" label="广告名称" min-width="150"/>
        <el-table-column align="center" prop="adStatus" label="状态" min-width="150">
        <template slot-scope="scope">
            <span>{{ scope.row.adStatus | systemstatusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" min-width="150"/>
        <el-table-column align="center" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.$index===0" size="small" icon="el-icon-sort" @click="moveUp(scope.$index)">上移</el-button>
            <el-button type="text" :disabled="scope.$index===(thirdList.length-1)" size="small" icon="el-icon-sort" @click="moveDown(scope.$index)">下移</el-button>
            <el-button type="text" :disabled="scope.$index===0" size="small" icon="el-icon-sort" @click="goTop(scope.$index)">置顶</el-button>
            <el-button  type="text" :disabled="scope.$index===(thirdList.length-1)" size="small" icon="el-icon-sort" @click="goBottom(scope.$index)">置尾</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogThirdVisible = false">取 消</el-button>
        <el-button  type="primary" @click="editSort">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { thirdADList, updateThirdStatus, addThird, removeThird, thirdAllList, sortThird } from '@/api/res'
import { systemstatusFilter } from '@/utils/filters'
export default {
  filters: {
    systemstatusFilter
  },
  data () {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          const endDateVal = this.params.endDate
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          const beginDateVal = this.params.beginDate
          if (beginDateVal) {
            return (
              time.getTime() < new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      title: '新增第三方广告',
      labelPosition: 'right',
      tableData: [],
      total: 1,
      dialogFormVisible: false,
      accountdialog: false,
      dialogThirdVisible: false,
      storeListchange: [],
      thirdList: [],
      zongSn: [],
      employee_token: '',
      storeParams: {
        id: '',
        adName: '',
        videoAvailable: ''
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
        adName: ''
      },
      storelists: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取大列表
    getData () {
      thirdADList(this.params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 重置
    reset () {
      this.params = {
        cursor: 1,
        limit: 10,
        adName: ''
      }
    },
    // 新建
    add (name) {
      this.title = name
      this.storeParams = {
        id: '',
        adName: '',
        videoAvailable: ''
      }
      this.dialogFormVisible = true
    },
    // 上下架
    manage (row, status) {
      updateThirdStatus(row.id, status).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.getData()
      })
    },
    // 设置优先级
    sort () {
      thirdAllList().then(res => {
        this.thirdList = res.data
      })
      this.dialogThirdVisible = true
    },
    // 上移
    moveUp (index) {
      var that = this
      // console.log('上移', index, row)
      console.log(that.thirdList[index])
      if (index > 0) {
        let upDate = that.thirdList[index - 1]
        that.thirdList.splice(index - 1, 1)
        that.thirdList.splice(index, 0, upDate)
      } else {
        alert('已经是第一条，不可上移')
      }
    },
    // 下移
    moveDown (index) {
      var that = this
      if ((index + 1) === that.thirdList.length) {
        alert('已经是最后一条，不可下移')
      } else {
        console.log(index)
        let downDate = that.thirdList[index + 1]
        that.thirdList.splice(index + 1, 1)
        that.thirdList.splice(index, 0, downDate)
      }
    },
    // 置顶
    goTop (index) {
      var that = this
      var returnTop = that.thirdList[index]
      that.thirdList.splice(index, 1)
      that.thirdList.unshift(returnTop)
    },
    // 置尾
    goBottom (index) {
      var that = this
      var returnBottom = that.thirdList[index]
      that.thirdList.splice(index, 1)
      that.thirdList.push(returnBottom)
    },
    // 排序确定
    editSort () {
      this.thirdList.forEach((ele, index) => {
        ele.adPriority = index + 1
      })
      var adInfo = JSON.stringify(this.thirdList)
      sortThird(adInfo).then(res => {
        this.$message({
          type: 'success',
          message: '设置成功!'
        })
        this.getData()
      })
      this.dialogThirdVisible = false
      console.log(this.thirdList)
    },
    // 修改
    editor (row, name) {
      this.title = name
      this.storeParams = {
        id: row.id,
        adName: row.adName,
        videoAvailable: row.videoAvailable.toString()
      }
      this.dialogFormVisible = true
    },
    // 删除
    del (id) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeThird(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新建确认
    newstore () {
      addThird(this.storeParams).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.getData()
        this.dialogFormVisible = false
      })
      // if (!this.storeParams.zs_sn || !this.storeParams.machine_store_id || !this.storeParams.machine_type || !this.storeParams.machine_sn || !this.storeParams.machine_store_name) {
      //   return this.$message({
      //     type: 'error',
      //     message: '请填写完整信息'
      //   })
      // }
    },
    // 修改确认
    editstore () {
      addThird(this.storeParams).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.getData()
        this.dialogFormVisible = false
      })
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
