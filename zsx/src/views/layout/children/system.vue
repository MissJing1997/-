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
      <el-button type="primary" icon="el-icon-plus" @click="add('新增广告信息')">新建</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column align="center" prop="adName" label="计划名称" min-width="150"/>
    <el-table-column align="center" prop="adStatus" label="状态" min-width="150">
     <template slot-scope="scope">
        <span>{{ scope.row.adStatus | systemstatusFilter}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="createTime" label="创建时间" min-width="150"/>
    <el-table-column align="center" label="操作" min-width="150" prop="status">
      <template slot-scope="scope">
       <el-button v-if="scope.row.adStatus === 0" type="text" size="small" icon="el-icon-sort" @click="manage(scope.row,1)">上架</el-button>
        <el-button v-if="scope.row.adStatus === 1" type="text" size="small" icon="el-icon-sort" @click="manage(scope.row,0)">下架</el-button>
        <el-button type="text" size="small" icon="el-icon-edit" @click="editor(scope.row,'修改广告信息')">修改</el-button>
        <el-button  type="text" size="small" icon="el-icon-sort" @click="del(scope.row.id)">删除</el-button>
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
      <el-dialog
        width="40%"
        title="搜索公司"
        :visible.sync="innerVisible"
        append-to-body
        style="text-align:left;"
        >
        <el-form ref="companyParams" :rules="rules1" :inline="true" :model="companyParams" class="form">
          <el-form-item label="公司名称:" prop="company">
            <el-input v-model="companyParams.company" placeholder="请输入" maxlength="20"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchCompany">查询</el-button>
          </el-form-item>

        </el-form>
        <el-table :data="tableCompany" style="width: 100%" >
          <!-- <el-radio-group v-model="form.resource"> -->
          <el-table-column align="left" prop="company" label="公司名称" min-width="150" >

            <template slot-scope="scope" >
              <div @click="get(scope.row)">
                <el-radio :label='scope.row.company' v-model="resouce"></el-radio>
              </div>
               <!-- <span>{{ scope.row.store_name }}</span> -->
            </template>

          </el-table-column>
          <!-- </el-radio-group> -->
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm1('companyParams')">取 消</el-button>
          <el-button type="primary" @click="companyConfirm('companyParams')">确 定</el-button>
        </div>
      </el-dialog>
      <el-form ref="storeParams" :rules="rules" :model="storeParams" :label-position="labelPosition" label-width="170px" style="width:70%">
        <el-form-item label="计划名称: " prop="planName">
          <el-input v-model="storeParams.planName" auto-complete="off" maxlength="30"/>
        </el-form-item>
        <el-form-item label="公司名称：" prop="machine_store_name">
          <el-input placeholder="请选择" v-model="storeParams.machine_store_name" :disabled="true" style="width:75%;color:#606266;"></el-input>
          <el-button  type="primary" @click="innerVisible = true">搜索</el-button>

        </el-form-item>
        <el-form-item label="素材名称：" prop="name">
          <el-select v-model="storeParams.name" placeholder="请选择" style="width:100%">
            <el-option v-for="item in machineList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="title ==='新增广告信息'" type="primary" @click="newstore">确 定</el-button>
        <el-button v-if="title ==='修改广告信息'" type="primary" @click="editstore">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { removeSystem, systemADList, advertiserList, materialsList, updateSystemStatus } from '@/api/res'
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
      title: '新增广告信息',
      labelPosition: 'right',
      tableData: [],
      total: 1,
      resouce: '',
      dialogFormVisible: false,
      accountdialog: false,
      innerVisible: false,
      companyName: '',
      storeListchange: [],
      machineList: [],
      zongSn: [],
      employee_token: '',
      tableCompany: [],
      rules: {
        planName: [
          { required: true, message: '请输入计划名称', trigger: 'blur' }
        ],
        machine_store_name: [
          { required: true, message: '请选择公司名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入素材名称', trigger: 'blur' }
        ]

      },
      rules1: {
        company: [
          { required: true, message: '请选择公司名称', trigger: 'blur' }
        ]
      },
      storeParams: {
        machine_store_name: '',
        company: '',
        planName: '',
        name: ''
      },
      companyParams: {
        id: '',
        cursor: 1,
        limit: 10,
        company: ''
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
    // 获取系统广告列表
    getData () {
      systemADList(this.params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 重置
    reset () {
      this.params = {
        current_page: 1,
        page_size: 10,
        zs_sn: '',
        shipping_status: '',
        machine_store_id: '',
        beginDate: '',
        endDate: ''
      }
    },
    // 重置表单
    resetForm1 (formName) {
      this.$refs[formName].resetFields()
      this.innerVisible = false
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    // 获取选择公司
    get (row) {
      this.companyName = row.company
      console.log(row)
    },
    companyConfirm (formName) {
      this.storeParams.machine_store_name = this.companyName
      this.getMaterials()
      this.$refs[formName].resetFields()
      this.innerVisible = false
    },
    // 获取素材列表
    getMaterials () {
      // debugger
      var params = {
        cursor: 1,
        limit: 50,
        company: this.companyName
      }
      materialsList(params).then(res => {
        this.machineList = res.data.records
      })
    },
    // 获取广告主列表
    getList () {
      advertiserList(this.companyParams).then(res => {
        this.tableCompany = res.data.records
      })
    },
    // 查询公司
    searchCompany () {
      this.getList()
    },
    // 新建
    add () {
      this.dialogFormVisible = true
    },
    // 上下架
    manage (row, status) {
      updateSystemStatus(row.id, status).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.getData()
      })
    },
    // 修改
    editor () {
      this.dialogFormVisible = true
    },
    // 删除
    del (id) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeSystem(id).then(res => {
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
  .el-input.is-disabled .el-input__inner{
    color: #606266;
  }
}
.el-pagination{
  margin: 50px auto;
  text-align: center;
}
</style>
