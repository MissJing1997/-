<template>
  <el-container>
    <!-- <el-header>
      <div class="logo">
      </div>

      <div class="right">
        <span>
          <i>{{username}}</i>
        </span>
        <span>
        </span>
        <span>

        </span>
        <span @click="logout" class="logoutbtn">
        </span>
      </div>
    </el-header> -->
    <!-- <el-header>

    </el-header> -->
    <el-container>
      <el-aside style="width:auto;">

        <el-menu
          router
          :unique-opened="true"
          :default-active="activeIndex"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- <el-menu-item :key='item.id' :index="item.url" v-for='item in menuData'>
              <i class="iconfont" :class="item.iconUrl"></i>
              <span slot="title">{{item.name}}</span>
          </el-menu-item> -->
          <el-menu-item index="home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>广告主管理</span>
            </template>
            <el-menu-item index="advertiser">广告主管理页面</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>广告素材管理</span>
            </template>
            <el-menu-item index="material">广告素材管理页面</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>广告计划管理</span>
            </template>
            <el-menu-item index="program">广告计划管理页面</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>广告统计管理</span>
            </template>
            <el-menu-item index="statistics">广告统计管理页面</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>闲时广告</span>
            </template>
            <el-menu-item index="thirdparty">第三方广告计划</el-menu-item>
            <el-menu-item index="system">系统广告计划</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>白名单</span>
            </template>
            <el-menu-item index="whitelist">白名单管理</el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main style='{margin-top:"60px"}'>
        <el-menu class="menu" style="height:56px;margin-bottom:20px;line-height:56px;">
          <el-radio-group v-model="isCollapse" style="">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-col :span="12">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                {{username}}<i class="el-icon-arrow-down el-icon--right" style="color:#333;"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-menu>
        <router-view class="lay"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuData: [],
      username: '张璇',
      show: true,
      timer: '',
      realList: [],
      title: '',
      activeIndex: '',
      isCollapse: false,
      nav: [
        {
          router: [
            { name: '首页', path: 'home' }
          ]
        },
        {
          router: [
            { name: '广告主管理页面', path: 'advertiser' }
          ]
        },
        {
          router: [
            { name: '广告素材管理页面', path: 'material' }
          ]
        },
        {
          router: [
            { name: '广告统计管理', path: 'statistics' }
          ]
        }, {
          router: [
            { name: '广告计划管理', path: 'program' }
          ]
        },
        {
          router: [
            { name: '第三方广告计划', path: 'thirdparty' }
          ]
        },

        {
          router: [
            { name: '系统广告计划', path: 'system' }
          ]
        },
        {
          router: [
            { name: '白名单管理', path: 'whitelist' }
          ]
        }
      ]
    }
  },
  computed: {
    // activeIndex () {
    //   var path = this.$route.path.split('/')[2]
    //   return path
    //   // console.log(path)
    // }
  },
  watch: {
    $route (to) {
      const path = to.path.split('/')[2]
      this.activeIndex = path
      console.log(path)
      this.nav.forEach(item => {
        item.router.forEach(ele => {
          if (ele.path === path) {
            this.title = ele.name
          }
        })
      })
    }
  },
  created () {
    const path = this.$route.path.split('/')[2]
    this.activeIndex = path
    console.log(path)
    this.nav.forEach(item => {
      item.router.forEach(ele => {
        if (ele.path === path) {
          this.title = ele.name
        }
      })
    })
  },
  methods: {
    logout () {
      // 清除本地的token
      // localStorage.removeItem('mytoken')
      // logout().then(res=> {
      //   clearInterval(this.timer)
      //   this.$router.push({name: 'login'})
      // })
    },
    getRoutePath () {
      this.realList = this.$route.meta.routeList
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.realList = to.meta.routeList
      })
    }

  },
  mounted () {
    // 调用菜单接口获取数据
    // getMenu().then(res => {
    //   console.log(res)
    //   // if (res.meta.status === 200) {
    //     this.menuData = res
    //   // }
    // })
    // getInfo().then(res=> {
    //   this.username= res.username
    // })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu-item.is-active {
    background-color: #545c64 !important;
  }
  .el-menu-item.is-active i{
    color: #fff;
  }
  .el-radio-group{
    // position:absolute;
    // top: 10px;
    // left: 40px;
    line-height: 0;
  }
  .logo {
    width: 200px;
    text-align: center;
    line-height: 60px;
    height: 55px;
    padding-top: 5px;
    float: left;
  }
  .logo img{
    width: 90px;
  }
  .el-breadcrumb{
    // position:absolute;
    // top: -30px;
    // left: 170px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .el-radio-group{
    // position:absolute;
    // top: -45px;
    // left: 20px;
    float: left;
    margin-top: 8px;
    margin-left: 20px;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: left;
    display: block;
  }
  .el-container{
    height: 100%;
    background: #fff;
    position: relative;
  }
  .el-main {
    background-color: #F0F2F8;;
    color: #333;
    text-align: left;
    position: relative;
    padding: 0px;

  }
  .lay{
    margin: 20px 0 0 20px;
  }
  .menu{
    background: #fff;
  }
  .el-col{
    width: 100px;
    // position:absolute;
    // // right: 20px;
    // // top: -30px;
    float: right;
    text-align: center;
    cursor: pointer;
  }
  .el-header {
    background-color: #fff;
    line-height: 60px;
    padding: 0;
  }
  .el-menu {
    border: none;
  }
  .el-submenu{
    border-top: 1px solid rgba(255,255,255,0.2);
  }
  .el-menu i {
    color:rgba(255,255,255,0.6)
  }
  .el-submenu__title i {
    color: rgba(255,255,255,0.6);
  }
  .right{
    position: absolute;
    right: 0;
    top: 0 ;
  }
  .right span {
    margin-right: 30px;
    cursor: pointer;
  }
  .right span img{
    vertical-align: middle;
    height: 32px;
  }
  .right i {
    font-style: normal;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
