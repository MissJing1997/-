import request from '@/utils/request'
import qs from 'qs'

// 创建广告主
export function addAdvertiser (params) {
  return request({
    url: '/partner/add',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 广告主列表
export function advertiserList (params) {
  return request({
    url: '/partner/list',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 广告主删除
export function removeAdvertiser (params) {
  return request({
    url: '/partner/del',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 广告素材列表
export function materialsList (params) {
  return request({
    url: '/materials/list',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 广告素材状态变更
export function updateStatus (id, status) {
  var params = {id, status}
  return request({
    url: '/materials/updateStatus',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 广告素材添加
export function addMaterials (params) {
  return request({
    url: '/materials/add',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 广告主删除
export function removeMaterials (id) {
  var params = {id}
  return request({
    url: '/materials/del',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 广告计划管理列表
export function planList (params) {
  return request({
    url: '/plan/list',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 广告计划管理列表删除
export function planListdel (id) {
  var params = {id}
  return request({
    url: '/plan/delete',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 广告统计列表
export function statisticList (params) {
  return request({
    url: '/plan/planStatistics',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 系统广告列表
export function systemADList (params) {
  return request({
    url: '/system/list',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 广告计划管理列表 ---尺寸
export function sizelist (params) {
  return request({
    url: '/dict/list',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 广告计划状态变更
export function updatePlanStatus (id, status) {
  var params = {id, status}
  return request({
    url: '/plan/updatePlanStatus',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 系统广告计划状态变更
export function updateSystemStatus (id, adStatus) {
  var params = {id, adStatus}
  return request({
    url: '/system/updateStatus',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 系统广告删除
export function removeSystem (id) {
  var params = {id}
  return request({
    url: '/system/del',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 省级列表

export function provincelist (type) {
  var params = {type}
  return request({
    url: '/region/list',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 第三方广告大列表
export function thirdADList (params) {
  return request({
    url: '/idleInfo/list',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 市级列表

export function citylist (provinceCode) {
  var params = {provinceCode}
  return request({
    url: '/region/list',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 第三方广告计划状态变更
export function updateThirdStatus (id, adStatus) {
  var params = {id, adStatus}
  return request({
    url: '/idleInfo/updateStatus',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 第三方广告添加/修改
export function addThird (params) {
  return request({
    url: '/idleInfo/add',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 系统广告删除
export function removeThird (id) {
  var params = {id}
  return request({
    url: '/idleInfo/del',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 第三方广告排序
export function sortThird (adInfo) {
  var params = {adInfo}
  return request({
    url: '/idleInfo/updatePrioritye',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 第三方广告不分页列表
export function thirdAllList () {
  return request({
    url: '/idleInfo/allList',
    method: 'post'
  })
}
// 白名单列表
export function whiteList (params) {
  return request({
    url: '/device/writeList',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 设备列表
export function deviceList (params) {
  return request({
    url: '/device/list',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 白名单添加
export function whiteAdd (writeAdd) {
  var params = {writeAdd}
  return request({
    url: '/device/writeAdd',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 白名单移除
export function removeWhite (id) {
  var params = {id}
  return request({
    url: '/device/writeDel',
    method: 'post',
    data: qs.stringify(params)
  })
}
