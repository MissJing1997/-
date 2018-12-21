// 枚举类型

function findIt (arr, val) {
  var rst = arr.find(item => item.val === val)
  if (rst) {
    return rst.name
  } else {
    return val
  }
}

const allstatus = [{
  val: 'available',
  name: '上架'
}, {
  val: 'disabled',
  name: '下架'
},
{
  val: '1',
  name: '16:9'
},
{
  val: '2',
  name: '9:16 '
}, {
  val: 'pic',
  name: '图片'
},
{
  val: 'video',
  name: '视频'
}
]

export function allstatusFilter (val) {
  return findIt(allstatus, val)
}
// 计划状态
const planstatus = [
  {
    val: 1,
    name: '待上架'
  },
  {
    val: 2,
    name: '上架中'
  }, {
    val: 3,
    name: '播放中'
  },
  {
    val: 4,
    name: '已下架'
  }, {
    val: 5,
    name: '结束'
  }, {
    val: 6,
    name: '终止'
  }, {
    val: 'self',
    name: '自营广告'
  }, {
    val: 'third',
    name: '第三方广告'
  }, {
    val: 'system',
    name: '系统广告'
  }
]

export function planstatusFilter (val) {
  return findIt(planstatus, val)
}
// 系统广告
const systemstatus = [{
  val: 1,
  name: '上架'
}, {
  val: 0,
  name: '下架'
}
]

export function systemstatusFilter (val) {
  return findIt(systemstatus, val)
}
