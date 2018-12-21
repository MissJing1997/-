<template>
<div class="layout">
  <el-form :inline="true" :model="params" class="form">
    <el-form-item label="设备编码:">
      <el-input v-model="params.deviceCode" placeholder="请输入" maxlength="20"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-plus" @click="add('新增设备白名单')">新增</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column align="center" prop="deviceCode" label="设备编码" min-width="150"/>
    <el-table-column align="center" prop="machine_type_name" label="区域" min-width="150"/>
    <el-table-column align="center" prop="zs_sn" label="场景" min-width="150"/>
    <el-table-column align="center" label="操作" min-width="150" prop="shipping_status">
      <template slot-scope="scope">
        <el-button  type="text" size="small" icon="el-icon-sort" @click="del(scope.row.id)">移除</el-button>
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
        title="搜索设备"
        :visible.sync="innerVisible"
        append-to-body
        style="text-align:left;"
        >
        <el-form ref="companyParams" :inline="true" :model="companyParams" class="form">
          <el-form-item label="设备编码:" prop="company">
            <el-input v-model="companyParams.deviceCode" placeholder="请输入" maxlength="20"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchCompany">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableCompany" style="width: 100%" >
          <!-- <el-radio-group v-model="form.resource"> -->
          <el-table-column align="left" prop="deviceCode" label="设备编码" min-width="150" >

            <template slot-scope="scope" >
              <div @click="get(scope.row)">
                <el-radio :label='scope.row.deviceCode' v-model="resouce"></el-radio>
              </div>
               <!-- <span>{{ scope.row.store_name }}</span> -->
            </template>

          </el-table-column>
          <el-table-column align="center" prop="regionIds" label="区域" min-width="150"/>
          <el-table-column align="center" prop="place" label="场景" min-width="150"/>
          <!-- </el-radio-group> -->
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm1('companyParams')">取 消</el-button>
          <el-button type="primary" @click="companyConfirm('companyParams')">确 定</el-button>
        </div>
      </el-dialog>
      <el-form :model="storeParams" :label-position="labelPosition" label-width="170px" style="width:70%">
        <el-form-item label="设备编码: ">
          <el-input v-model="storeParams.writeAdd" auto-complete="off" maxlength="30" :disabled="true" style="width:75%;color:#606266;"/>
          <el-button  type="primary" @click="innerVisible = true">搜索</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="title ==='新增设备白名单'" type="primary" @click="newstore">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { whiteList, deviceList, whiteAdd, removeWhite } from '@/api/res'
export default {
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
      title: '新增设备白名单',
      labelPosition: 'right',
      tableData: [],
      total: 1,
      dialogFormVisible: false,
      accountdialog: false,
      innerVisible: false,
      storeListchange: [],
      tableCompany: [],
      zongSn: [],
      employee_token: '',
      companyParams: {
        deviceCode: '',
        limit: 10,
        cursor: 1
      },
      storeParams: {
        writeAdd: ''
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
        deviceCode: ''
      },
      storelists: []
    }
  },
  created () {

  },
  methods: {
    // 获取白名单列表
    getData () {
      whiteList(this.params).then(res => {
        this.tableData = res.data.records
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
    // 新建
    add (name) {
      this.title = name
      this.dialogFormVisible = true
    },
    // 上下架
    manage () {

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
        removeWhite(id).then(res => {
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
      whiteAdd(this.storeParams.whiteAdd).then(res => {
        this.getData()
      })
    },
    // 查询公司
    searchCompany () {
      deviceList(this.companyParams).then(res => {
        this.tableCompany = res.data.records
      })
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
