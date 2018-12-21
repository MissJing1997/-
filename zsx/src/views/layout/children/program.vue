<template>
  <div class="layout">
    <el-form :inline="true" :model="params" class="form">
      <el-form-item label="计划名称:">
        <el-input v-model="params.zs_sn" placeholder="请输入" maxlength="20"/>
      </el-form-item>

      <el-form-item label="创建时间：">
        <el-col :span="11">
          <el-date-picker
            v-model="params.beginDate"
            :picker-options="pickerOptionsStart"
            type="date"
            placeholder="起始时间"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          />
        </el-col>
        <el-col :span="2" class="line" style="text-align:center">-</el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="params.endDate"
            :picker-options="pickerOptionsEnd"
            type="date"
            placeholder="结束时间"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          />
        </el-col>
      </el-form-item>

      <el-form-item label="状态：">
        <el-select v-model="params.shipping_status" clearable placeholder="全部：" style="width:100px">
          <el-option label="全部" value="0"/>
          <el-option label="上架" value="1"/>
          <el-option label="下架" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="add('新建广告计划')">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="planName" label="计划名称" min-width="150"/>
      <el-table-column align="center" prop="place" label="区域" min-width="150"/>
      <el-table-column align="center" prop="zs_sn" label="场景" min-width="150"/>
      <el-table-column align="center" prop="startTime" label="开始时间" min-width="150"/>
      <el-table-column align="center" prop="endTme" label="结束时间" min-width="150"/>

      <el-table-column align="center" prop="status" label="状态" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间" min-width="150"/>
      <el-table-column align="center" label="操作" min-width="150" prop="shipping_status">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-sort" @click="del(scope.row)">删除</el-button>
          <el-button type="text" size="small" icon="el-icon-edit" @click="manage(scope.row)">查看</el-button>
          <el-button type="text" size="small" icon="el-icon-edit" @click="check(scope.row)">终止</el-button>
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
      @current-change="handleCurrentChange"
    />
    <el-dialog :visible.sync="dialogFormVisible" :title="title" width="50%">
      <el-form
        :model="storeParams"
        :label-position="labelPosition"
        label-width="120px"
        style="width:90%"
      >
        <h3>基础信息</h3>
        <el-form-item label="计划名称:">
          <el-input v-model="storeParams.planName" auto-complete="off" maxlength="30"/>
        </el-form-item>

        <el-form-item label="开始时间：">
          <el-col :span="11">
            <el-date-picker
              v-model="storeParams.startTime"
              :picker-options="pickerOptionsBegin"
              type="date"
              placeholder="起始时间"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-col :span="11">
            <el-date-picker
              v-model="storeParams.endTime"
              :picker-options="pickerOptionsDone"
              type="date"
              placeholder="结束时间"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          v-for="(item, index) in storeParams.regionId"
          :key="index"
          label="投放地域："
        >
            <el-select v-model="item.province" placeholder="省" style="width:25%;float:left;margin-right:20px;" @change="getcity(item)">
              <el-option v-for="item in provincelist" :key="item.id" :label="item.province" :value="item.provinceCode" />
            </el-select>
            <el-select v-model="item.city" placeholder="市" style="width:25%;float:left;margin-right:20px;">
              <el-option v-for="item in item.citylist" :key="item.id" :label="item.city" :value="item.id" />
            </el-select>

            <el-select v-model="item.place" placeholder="请选择投放场景" style="width:30%;float:left;margin-right:20px;">
              <el-option v-for="item in machineList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>

          <el-button @click.prevent="removeDomain(domain)" style="float:left">删除</el-button>
        </el-form-item>

        <el-button @click="addDomain">新增地域</el-button>

        <el-form-item label="大小屏:">
          <el-checkbox-group v-model="storeParams.type">
            <el-checkbox v-for="(item,index) in sizechecklist" :key="index" :label="item.id" name="type">{{item.name}}</el-checkbox>

          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="空闲广告位数量：">
          <span>100</span>
        </el-form-item>
        <h3>素材信息</h3>
        <el-form-item label="公司名称:">
          <span>{{storeParams.partnerId}}</span>
          <el-button type="primary" @click="innerVisible = true">搜索</el-button>
        </el-form-item>
        <el-form-item label="素材名称:">
          <el-select v-model="storeParams.materialId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in scenelist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-dialog
        width="40%"
        title="搜索公司"
        :visible.sync="innerVisible"
        append-to-body
        style="text-align:left;"
      >
        <el-form :inline="true" :model="params" class="form">
          <el-form-item label="公司名称:">
            <el-input v-model="companyParams.company" placeholder="请输入" maxlength="20"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchCompany">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableCompany" style="width: 100%">
          <!-- <el-radio-group v-model="form.resource"> -->
          <el-table-column align="left" prop="store_name" label="公司名称" min-width="150">
            <template slot-scope="scope">
              <div @click="get(scope.row)">
                <el-radio :label="scope.row.company" v-model="storeParams.partnerId"></el-radio>
              </div>
              <!-- <span>{{ scope.row.store_name }}</span> -->
            </template>
          </el-table-column>
          <!-- </el-radio-group> -->
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="companyConfirm">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newstore">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogCheckVisible" title="终止设备播放广告" width="70%">
      <h3>选择下架时间</h3>
      <el-radio v-model="formInline.radio" label="1">立即下架</el-radio>
      <el-radio v-model="formInline.radio" label="2">当日24点之后下架</el-radio>
      <h3>选择下架设备</h3>
      <span>已选数量：20</span>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="设备编码">
    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
     <el-select v-model="formInline.province" placeholder="省" style="width:25%;float:left;margin-right:20px;" @change="formInlinegetcity(formInline.province)">
              <el-option v-for="item in formInlineprovincelist" :key="item.id" :label="item.province" :value="item.provinceCode" />
            </el-select>
            <el-select v-model="formInline.city" placeholder="市" style="width:25%;float:left;margin-right:20px;">
              <el-option v-for="item in formInlinecitylist" :key="item.id" :label="item.city" :value="item.id" />
            </el-select>
            <el-select v-model="formInline.place" placeholder="请选择投放场景" style="width:30%;float:left;margin-right:20px;">
              <el-option v-for="item in machineList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" >查询</el-button>
    <el-button type="primary" >选中全部</el-button>
  </el-form-item>
</el-form>

      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="设备编码" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="区域" width="120"></el-table-column>
        <el-table-column prop="address" label="场景" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[10]"
        :page-size="10"
        :total="total"
        class="pagination"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCheckVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { planList, sizelist, advertiserList, provincelist, citylist, materialsList, planListdel } from '@/api/res'

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
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      pickerOptionsBegin: {
        disabledDate: time => {
          const endDateVal = this.form.endDate
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsDone: {
        disabledDate: time => {
          const beginDateVal = this.form.beginDate
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      title: '新建广告主',
      labelPosition: 'right',
      tableData: [],
      total: 1,
      dialogFormVisible: false,
      dialogCheckVisible: false,
      innerVisible: false,
      accountdialog: false,
      storeListchange: [],
      machineList: [],
      zongSn: [],
      employee_token: '',
      company: '',
      companyName: '',
      tableCompany: [],
      resouce: '',
      storeParams: {
        planName: '',
        startTime: '',
        endTime: '',
        type: [],
        partnerId: '',
        materialId: '',
        regionId: [
          {
            province: '',
            city: '',
            place: ''
          }
        ]
      },
      form: {
        name: '',
        state: '',
        startdate: '',
        enddata: '',
        beginDate: '',
        endDate: '',
        type: []
      },
      currentPage4: 4,
      params: {
        current_page: 1,
        page_size: 10,
        shipping_status: '',
        machine_store_id: '',
        beginDate: '',
        endDate: ''
      },
      companyParams: {
        id: '',
        cursor: 1,
        limit: 10,
        company: ''
      },
      storelists: [],
      sizechecklist: [],
      provincelist: [],
      scenelist: [],
      tableData3: [],

      multipleSelection: [],
      formInline: {
        radio: ''
      },
      formInlineprovincelist: [],
      formInlinecitylist: [],
      formInlinemachineList: []
    }
  },
  created () {
    this.getdata()
    this.getsize()
  },
  methods: {
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
    getdata () {
      planList(this.params).then(res => {
        if (res.data && res.data.records) {
          this.tableData = res.data.records
          this.total = res.data.total
        } else {
          this.tableData = []
          this.total = 0
        }
      })
    },
    getsize () {
      var params = {
        limit: 10,
        cursor: 1,
        type: 'scree_type'
      }
      sizelist(params).then(res => {
        this.sizechecklist = res.data.records
      })
    },
    getplace () {
      var params = {
        limit: 10,
        cursor: 1,
        type: 'place'
      }
      sizelist(params).then(res => {
        this.machineList = res.data.records
      })
    },
    // 获取广告主列表
    getList () {
      advertiserList(this.companyParams).then(res => {
        this.tableCompany = res.data.records
      })
    },
    getprovince () {
      provincelist('1').then(res => {
        this.provincelist = res.data
      })
    },
    // 查询公司
    searchCompany () {
      this.getList()
    },
    getcity (value) {
      citylist(value.province).then(res => {
        this.$set(value, 'citylist', res.data)
      })
    },
    // 获取选择公司
    get (row) {
      this.companyName = row.store_name
      console.log(row)
    },
    formInlinegetcity (value) {
      citylist(value).then(res => {
        this.formInlinecitylist = res.data
      })
    },
    companyConfirm () {
      this.company = this.companyName
      var params = {
        limit: 20,
        cursor: 1,
        company: this.company
      }
      materialsList(params).then(res => {
        this.scenelist = res.data.records
      })
      this.innerVisible = false
    },
    // 新建
    add () {
      this.getprovince()
      this.getplace()
      this.dialogFormVisible = true
    },
    // 上下架
    manage () {},
    // 修改
    editor () {
      this.dialogFormVisible = true
    },
    // 删除
    del (value) {
      planListdel(value.id).then(res => {
        this.getdata()
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

      console.log(this.storeParams)
    },
    removeDomain (item) {
      var index = this.storeParams.regionId.indexOf(item)
      if (index !== -1) {
        this.storeParams.regionId.splice(index, 1)
      }
    },
    addDomain () {
      this.storeParams.regionId.push({
        value: '',
        key: Date.now()
      })
    },

    // 修改确认
    editstore () {},
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {},
    // 终止
    check () {
      provincelist('1').then(res => {
        this.formInlineprovincelist = res.data
      })
      this.getplace()
      this.dialogCheckVisible = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.layout {
  padding: 20px 0 20px 20px;
  background: #fff;
}
.el-pagination {
  margin: 50px auto;
  text-align: center;
}
</style>
