import { HeardUrl } from '@/config/index'

export function DownUrlFun(imgSrc) {
  let url = imgSrc
  let src = null
  if (url.substr(0, 7).toLowerCase() === "http://" || url.substr(0, 8).toLowerCase() === "https://") {
    src = url;
  } else {
    src = HeardUrl + imgSrc
  }
  let canvas = document.createElement('canvas');
  let img = document.createElement('img');
  img.onload = function (e) {
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    let url = canvas.toDataURL("image/png")
    let a = document.createElement("a"); // 生成一个a元素
    let event = new MouseEvent("click"); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event);
  }
  img.setAttribute("crossOrigin", 'Anonymous');
  img.src = src;
}

export function DownUrlFunCode(Name) {
  let img = document
    .getElementById("qrcode")
    .getElementsByTagName("img")[0];
  // 构建画布
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext("2d").drawImage(img, 0, 0);
  // 构造url
  var url = canvas.toDataURL("image/png");
  document.getElementById("downloadImg").setAttribute("href", url);
  document
    .getElementById("downloadImg")
    .setAttribute("download", Name + "二维码.jpg");
  document.getElementById("downloadImg").click();
}

/**
 * 给固定长度，当长度大于400 加滚动条
 * @param Dom class名
 */
export function addScroll(Dom = '.scrollSet') {
  $(function () {
    $(Dom).css('height', '400px')
    let childrenHeight = $(Dom).children().height()
    if (childrenHeight > 400) {
      $(Dom).css({ 'overflow-y': 'scroll' })
    }
  })
}

/**
 *  表单错误提示
 * @param value 填写的数据
 * @param maxLength  最大长度
 * @param callback  返回
 * @param tip   提示1
 * @param tipLength  提示2
 * @param required  是否必填 true不必填
 */
export function rulesSymbol(value, maxLength, callback, tip, tipLength, required) {
  if (!value && !required) {
    callback(new Error(tip))
  } else {
    let lengthF = getByteLen(value)
    if (lengthF > maxLength) {
      callback(new Error(tipLength))
    } else {
      callback()
    }
  }
}

// 算字符长度 中文为2个字符
export function getByteLen(val) {
  let len = 0;
  if (val && val.length > 0) {
    for (let i = 0; i < val.length; i++) {
      let a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/ig) != null) {
        len += 2;
      } else {
        len += 1;
      }
    }
  }
  return len;
}

// 获取商户编号 获取 ?name='' 的值
export function GetQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r
  if (window.location.search) {
    r = window.location.search.substr(1).match(reg);
  } else {
    let a = window.location.href
    let b = a.substr(a.indexOf(name), a.length - 1)
    r = b.match(reg)
  }
  if (r != null) return unescape(r[2]);
  return null;
}

export function ImgList(list) {
  // 判断是否是数组，然后换成 [{url:图片地址}]
  let arr = list instanceof Array ? list : list.split(',')
  let imgs = []
  let ti = arr
  for (let i = 0; i < ti.length; i++) {
    let item = ti[i]
    imgs.push({ url: process.env.Prefix + item })
  }
  return imgs
}

export function replacePre(obj, str) {
  // 去除 ../ 前缀
  // let reg = process.env.Prefix;
  return obj[str].indexOf(process.env.Prefix) !== -1 ? obj[str].replace(new RegExp(/(..\/)+Files\//,'g'),'Files\/') : obj[str]
}

export function addPre(val) { // 加 ../ 前缀
  if (val) {
    return process.env.VUE_APP_PREFIX + val
  } else {
    return ''
  }
}

export function getTimeMy(time, bool) {
  let z = '- -'
  let date
  if (time) {
    date = new Date(time)
  } else {
    date = new Date()
  }
  if (!isNaN(date) && date !== 0) {

    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    if (bool) {
      z = y + '-' + m + '-' + d
    } else {
      z = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
  return z
}
