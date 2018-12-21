import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const employname = 'employname'
const employdeletemark = 'employdeletemark'
const employID = 'employID'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getname () {
  return Cookies.get(employname)
}

export function setname (name) {
  return Cookies.set(employname, name, { expires: 1 })
}

export function removename () {
  return Cookies.remove(employname)
}

export function getdm () {
  return Cookies.get(employdeletemark)
}

export function setdm (deletemark) {
  return Cookies.set(employdeletemark, deletemark, { expires: 1 })
}

export function removedm () {
  return Cookies.remove(employdeletemark)
}

export function getID () {
  return Cookies.get(employID)
}

export function setID (id) {
  return Cookies.set(employID, id, { expires: 1 })
}

export function removeID () {
  return Cookies.remove(employID)
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return JSON.parse(window.localStorage.getItem(name))
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
