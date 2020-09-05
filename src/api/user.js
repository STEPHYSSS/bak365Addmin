import axios from './axios';

/**
 * 登录
 * @param UserName  账号
 * @param PassWord  密码
 * @param AppNo  用户编号
 */

export function signIn(UserName, PassWord, AppNo) {
  const data = {
    UserName,
    PassWord,
    AppNo,
    Action: 'Login',
    ViewKay: 'ManagSign'
  }
  return axios({
    url: 'RenderManag.aspx',
    method: 'post',
    data
  })
}


export function UploadImg(file, folder) {
  let formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)
  return axios({
    url: '/Web/Upload/UploadImg.ashx',
    method: 'post',
    data: formData
  })
}

export function UploadImgBase(file, folder) {
  let formData = new FormData()
  formData.append('base64Str', file)
  formData.append('folder', folder)
  return axios({
    url: '/Web/Upload/UploadFiles.ashx',
    method: 'post',
    data: formData
  })
}
