<template>
<div class="layout">

  <el-form :inline="true" :model="params" class="form">
    <el-form-item label="公司名称:">
      <el-input v-model="params.company" placeholder="请输入" maxlength="20"/>
    </el-form-item>

    <el-form-item label="创建时间：">
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
    <el-form-item>
      <el-button type="primary" icon="el-icon-plus" @click="add('新建广告主')">新建</el-button>
    </el-form-item>

  </el-form>
  <el-table :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="company" label="公司名称" min-width="150"/>
      <el-table-column align="center" prop="name" label="联系人" min-width="150"/>
      <el-table-column align="center" prop="contact" label="联系电话" min-width="150"/>
      <el-table-column align="center" prop="address" label="地址" min-width="150"/>
      <el-table-column align="center" prop="createTime" label="创建时间" min-width="150"/>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="editor(scope.row,'修改广告主')">修改</el-button>
          <!-- <el-button v-if="scope.row.shipping_status === 1" type="text" size="small" icon="el-icon-sort">已发货</el-button> -->
          <el-button  type="text" size="small" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
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

    <el-dialog ref="storeParams" :visible.sync="dialogFormVisible" :title="title" width="50%">
      <el-form ref="storeParams" :rules="rules" :model="storeParams" :label-position="labelPosition" label-width="170px" style="width:70%">
        <el-form-item label="公司名称:" prop="company">
          <el-input v-model="storeParams.company"  maxlength="30"/>
        </el-form-item>
        <el-form-item label="联系人:" prop="name">
         <el-input v-model="storeParams.name"  maxlength="30"/>
        </el-form-item>
        <el-form-item label="联系电话：" prop="contact">
          <el-input v-model="storeParams.contact"  maxlength="11"/>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="storeParams.address"  maxlength="100"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('storeParams')">取 消</el-button>
        <el-button v-if="title ==='新建广告主'" type="primary" @click="newstore('storeParams')">确 定</el-button>
        <el-button v-if="title ==='修改广告主'" type="primary" @click="editstore('storeParams')">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { addAdvertiser, advertiserList, removeAdvertiser } from '@/api/res'
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
      title: '新建广告主',
      labelPosition: 'right',
      tableData: [],
      total: 1,
      dialogFormVisible: false,
      accountdialog: false,
      storeListchange: [],
      machineList: [],
      zongSn: [],
      employee_token: '',
      storeParams: {
        id: '',
        address: '',
        contact: '',
        name: '',
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
        id: '',
        cursor: 1,
        limit: 10,
        name: '',
        company: '',
        beginTime: '',
        endTime: ''

      },
      rules: {
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 11, max: 11, validator: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: '手机号格式不对', trigger: 'blur' }
        ]

      },
      storelists: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 广告主列表
    getData () {
      advertiserList(this.params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 查询
    search () {
      advertiserList(this.params).then(res => {
        this.tableData = res.data.records
      })
    },

    // 重置
    reset () {
      this.params = {
        id: '',
        cursor: 1,
        limit: 10,
        name: '',
        company: '',
        beginTime: '',
        endTime: ''
      }
      this.getData()
    },
    // 新建
    add (name) {
      this.title = name
      this.dialogFormVisible = true
    },
    // 修改
    editor (row, name) {
      this.title = name
      this.storeParams = {
        id: row.id,
        address: row.address,
        contact: row.contact,
        name: row.name,
        company: row.company
      }
      this.dialogFormVisible = true
    },
    // 删除
    del (row) {
      // alert(66)
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: row.id,
          name: row.name,
          company: row.company
        }
        removeAdvertiser(params).then(res => {
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
    newstore (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addAdvertiser(this.storeParams).then(res => {
            this.$message({
              type: 'success',
              message: '新建成功!'
            })
            this.$refs[formName].resetFields()
            this.dialogFormVisible = false
            this.getData()
          })
        } else {
          return false
        }
      })

      // if (!this.storeParams.zs_sn || !this.storeParams.machine_store_id || !this.storeParams.machine_type || !this.storeParams.machine_sn || !this.storeParams.machine_store_name) {
      //   return this.$message({
      //     type: 'error',
      //     message: '请填写完整信息'
      //   })
      // }
    },
    // 修改确认
    editstore (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addAdvertiser(this.storeParams).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.$refs[formName].resetFields()
            this.dialogFormVisible = false
            this.getData()
          })
        } else {
          return false
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.params.cursor = val
      this.getData()
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
