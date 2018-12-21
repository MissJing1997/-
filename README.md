# 
## 启动

使用 npm / yarn

```bash
$ npm install
$ npm start         # 访问 http://localhost:8000
$ npm run mock		# 启动mock服务
$ npm run build		# 打包
```


## 用户鉴权机制


  用户进入 => 用户信息 => 选择公司/项目 => 获取权限
  
    1. 获取用户信息出错，跳转至500页面
    2. 公司或者项目列表为空，跳转至无权限页面
    3. 权限获取失败 跳转至500页面
  
## 路由配置规则

  routers/modules/{sysName}/{moduleName}/{projectName}
  
### 目录划分
  
  ````
  - routers
    -- modules
        -- account 账号相关页面 登录注册
        -- settings.js 账号管理系统
        -- company 公司管理系统
            -- attend 考勤
            -- staffManage 组织中心
            .
            .
            .
            待补充
    -- pages
  ````
  
### 文件书写和路由配置
  
#### 原则
    
    * 需要配置的菜单，不能包含params 参数。
    * 子页面涉及到的params参数必须包含父页面设置的params值
    * 路由配置原则上不出现两个单词拼接的单个路由
    * 路由嵌套规则和page保持一致
    * 列表页 文件名称 为index 或则List
    * 详情页 文件名称 为{moduleName}Detail.js 或者 Detail/index.js;
    * 页面涉及到的组件写在同级的components 目录下面
    
  
#### 举例：

```ecmascript 6
 export default function(app, dynamicWrapper) {
   return {
     '/company/module/menu1': {
       name: '配置菜单页面',
       component: dynamicWrapper(app, () => import('src/pages/Module/Menu1'), [
         'project/attendList', // 
       ]),
     },
     '/company/module/menu1/:menuId': {
        belong: '/company/module/menu1',
        name: '配置菜单页面',
        component: dynamicWrapper(app, () => import('src/pages/Module/Menu1Detail'), [
          'project/attendList', // 
        ]),
      },
      '/company/module/menu1/:menuId/person': {
      belong: '/company/module/menu1/:menuId',
      name: '配置菜单页面',
      component: dynamicWrapper(app, () => import('src/pages/Module/Menu1/Detail/Person'), [
        'project/attendList', // 
      ]),
    },
     '/company/module/menu1/:menuId/person/:personId': {
      belong: '/company/module/menu1/:menuId/person',
      name: '配置菜单页面',
      component: dynamicWrapper(app, () => import('src/pages/Module/Menu1/Detail/PersonDetail'), [
        'project/attendList', // 
      ]),
    },
   };
 }
```
  
