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

    <el-form-item label="状态：" >
      <el-select v-model="params.status" clearable placeholder="" style="width:100px">
        <el-option label="全部" value=""/>
        <el-option label="上架" value="available"/>
        <el-option label="下架" value="disabled"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-plus" @click="add('新增广告素材')">新建</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column align="center" prop="company" label="公司名称" min-width="150"/>
    <el-table-column align="center" prop="name" label="素材名称" min-width="150"/>
    <el-table-column align="center" prop="type" label="素材类型" min-width="150"/>
    <el-table-column align="center" prop="remark" label="备注" min-width="150"/>
    <el-table-column align="center" prop="status" label="状态" min-width="150">
     <template slot-scope="scope">
        <span>{{ scope.row.status | allstatusFilter}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="createTime" label="创建时间" min-width="150"/>
    <el-table-column align="center" label="操作" min-width="150" prop="status">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status === 'disabled'" type="text" size="small" icon="el-icon-sort" @click="manage(scope.row,'available')">上架</el-button>
        <el-button v-if="scope.row.status === 'available'" type="text" size="small" icon="el-icon-sort" @click="manage(scope.row,'disabled')">下架</el-button>
        <el-button type="text" size="small" icon="el-icon-edit" @click="editor(scope.row,'修改广告素材')">修改</el-button>
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
                <el-radio :label='scope.row.company' v-model="form.resource"></el-radio>
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
      <el-form ref="storeParams" :rules="rules" :model="storeParams" :label-position="labelPosition" label-width="170px" style="width: %">
        <el-form-item label="公司名称:" prop="machine_store_name">
          <!-- <span>{{company}}</span>
          <el-button  type="primary" @click="innerVisible = true">搜索</el-button> -->

          <el-input placeholder="请选择" v-model="storeParams.machine_store_name" :disabled="true" style="width:75%;color:#606266;"></el-input>
          <el-button  type="primary" @click="innerVisible = true">搜索</el-button>

        </el-form-item>
        <el-form-item label="素材名称:" prop="name">
          <el-input v-model="storeParams.name" auto-complete="off" maxlength="30"/>
        </el-form-item>
        <el-form-item label="素材类型" prop="type">
          <el-select v-model="storeParams.type" placeholder="素材类型" style="width:100%">
             <el-option label="图片" value="pic"/>
              <el-option label="视频" value="video"/>
          </el-select>
        </el-form-item>
        <el-form-item label="素材内容：">
          <span class="params">16:9</span><div class="box"><span>点击上传</span><input type="file" class="content"></div><span class="params">9:16</span><div class="box"><span>点击上传</span><input type="file" class="content"></div>
        </el-form-item>
        <el-form-item label="素材时间：">
          <span>{{time}}s</span>
        </el-form-item>
        <el-form-item label="素材备注：">
          <el-input v-model="storeParams.remark" auto-complete="off" maxlength="200" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('storeParams')">取 消</el-button>
        <el-button v-if="title ==='新增广告素材'" type="primary" @click="newstore('storeParams')">确 定</el-button>
        <el-button v-if="title ==='修改广告素材'" type="primary" @click="editstore('storeParams')">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { materialsList, updateStatus, advertiserList, addMaterials, removeMaterials } from '@/api/res'
import { allstatusFilter } from '@/utils/filters'
export default {
  filters: {
    allstatusFilter
  },
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
      title: '新增广告素材',
      labelPosition: 'right',
      tableData: [],
      total: 1,
      dialogFormVisible: false,
      accountdialog: false,
      innerVisible: false,
      company: '',
      companyName: '',
      time: 15,
      storeListchange: [],
      machineList: [],
      zongSn: [],
      employee_token: '',
      id: '',
      tableCompany: [

      ],
      rules: {
        type: [
          { required: true, message: '请选择素材类型', trigger: 'blur' }
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
        id: '',
        name: '',
        partnerId: '',
        playTime: this.time,
        type: '',
        screeType: '',
        url: '',
        remark: ''
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
        enddata: '',
        resource: ''
      },
      currentPage4: 4,
      params: {
        id: '',
        cursor: 1,
        limit: 10,
        status: '',
        company: ''
        // beginTime: '',
        // endTime: ''
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
      materialsList(this.params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 获取广告主列表
    getList () {
      advertiserList(this.companyParams).then(res => {
        this.tableCompany = res.data.records
      })
    },
    // 搜索筛选
    search () {
      this.getData()
    },
    // 查询公司
    searchCompany () {
      this.getList()
    },
    // 重置
    resetForm1 (formName) {
      this.$refs[formName].resetFields()
      this.tableCompany = []
      this.innerVisible = false
    },
    // 获取选择公司
    get (row) {
      this.companyName = row.company
      this.id = row.id
      console.log(row)
    },
    companyConfirm (formName) {
      this.storeParams.machine_store_name = this.companyName
      console.log(this.storeParams.machine_store_name)
      this.storeParams.partnerId = this.id

      this.$refs[formName].resetFields()
      this.innerVisible = false
      this.tableCompany = []
    },
    // 新建
    add () {
      this.storeParams = {
        machine_store_name: '',
        id: '',
        name: '',
        partnerId: '',
        playTime: this.time,
        type: '',
        screeType: '',
        url: '',
        remark: ''
      }
      this.dialogFormVisible = true
    },
    // 上下架
    manage (row, status) {
      updateStatus(row.id, status).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.getData()
      })
    },
    // 修改
    editor (row, name) {
      // debugger

      // console.log(this.storeParams.machine_store_name)
      this.storeParams = {
        machine_store_name: row.compamy,
        id: row.id,
        name: row.name,
        partnerId: row.partnerId,
        playTime: this.time,
        type: row.type,
        screeType: row.screeType,
        url: row.url,
        remark: row.remark
      }
      this.storeParams.machine_store_name = row.company

      this.dialogFormVisible = true
    },
    // 删除
    del (row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeMaterials(row.id).then(res => {
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
      var storeParams = {
        id: this.storeParams.id,
        name: this.storeParams.name,
        partnerId: this.storeParams.partnerId,
        playTime: this.storeParams.playTime,
        type: this.storeParams.type,
        screeType: 1,
        url: '1231',
        remark: this.storeParams.remark
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMaterials(storeParams).then(res => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$refs[formName].resetFields()
            this.getData()
            this.dialogFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    // 重置搜索
    reset () {
      this.params = {
        id: '',
        cursor: 1,
        limit: 10,
        status: '',
        company: '',
        beginTime: '',
        endTime: ''
      }
      this.getData()
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    // 修改确认
    editstore (formName) {
      var params = {
        id: this.storeParams.id,
        name: this.storeParams.name,
        partnerId: this.storeParams.partnerId,
        playTime: this.storeParams.playTime,
        type: this.storeParams.type,
        screeType: this.storeParams.screeType,
        url: this.storeParams.url,
        remark: this.storeParams.remark
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMaterials(params).then(res => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$refs[formName].resetFields()
            this.getData()
            this.dialogFormVisible = false
          })
        } else {
          return false
        }
      })
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
  .el-input.is-disabled .el-input__inner{
    color: #606266;
  }
}
.el-pagination{
  margin: 50px auto;
  text-align: center;
}
.params{
  float: left;
}
.box{
  width: 80px;
  height: 30px;
  float: left;
  position: relative;
  cursor: pointer;

  span{
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #eee;
    background: #F2F2F2;
    border-radius:5px;
    cursor: pointer;
  }
  .content{
    width: 100px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
}

</style>
