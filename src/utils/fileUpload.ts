import {Dialog } from 'vant'
var ws = null;
var reader = null;  //读取操作对象
var step = 1024 * 1024 * 2;  //每次读取文件大小 ,字节数
var cuLoaded = 0; //当前已经读取总数
var file = null; //当前读取的文件对象
var enableRead = true;//标识是否可以读取文件
var total = 0;        //记录当前文件总字节数
var startTime = null; //标识开始上传时间
var blockCount = 0
var linear = 0

const reset = (() => {
  ws = null;
  reader = null;  //读取操作对象
  step = 1024 * 1024 * 2;  //每次读取文件大小 ,字节数
  cuLoaded = 0; //当前已经读取总数
  file = null; //当前读取的文件对象
  enableRead = true;//标识是否可以读取文件
  total = 0;        //记录当前文件总字节数
  startTime = null; //标识开始上传时间
  linear = 0
})

const readBlob = (() => {
  //指定开始位置和结束位置读取文件
  let blob = file.slice(cuLoaded, cuLoaded + step);
  reader.readAsArrayBuffer(blob);
})

const stop = (() => {
  //中止读取操作
  console.info('中止，cuLoaded：' + cuLoaded);
  enableRead = false;
  reader.abort();
})

const loadSuccess = ((loaded) => {
  //将分段数据上传到服务器
  let blob = reader.result;
  //使用WebSocket 服务器发送数据
  // if (cuLoaded == 0) //发送文件名
  //     ws.send(file.name);
  ws.send(blob);
  //如果没有读完，继续
  cuLoaded += loaded;
  if (cuLoaded < total) {
    readBlob();
  } else {
    console.log('总共上传：' + cuLoaded + ',总共用时：' + (new Date().getTime() - startTime.getTime()) / 1000);
    ws.send('finish');
  }
  //显示结果进度
  // percent = (cuLoaded / total) * 100;
  // this.linear = percent
  // console.log(percent)
})

const bindReader = (() => {
  cuLoaded = 0;
  startTime = new Date();
  enableRead = true;
  reader = new FileReader();
  //读取一段成功
  reader.onload = function (e) {
    console.info('读取总数：' + e.loaded);
    if (enableRead == false)
      return false;
    //根据当前缓冲区来控制客户端读取速度
    if (ws.bufferedAmount > step * 10) {
      setTimeout(function () {
        //继续读取
        console.log('--------------》进入等待');
        loadSuccess(e.loaded);
      }, 3);
    } else {
      //继续读取
      loadSuccess(e.loaded);
    }
  }
  //开始读取
  readBlob();
})

const subFile = (fileType, wsurl, getMsg) => {
  reset()
  file = fileType;
  total = file.size;
  blockCount = Math.ceil(total / step)
  ws = new WebSocket(wsurl);
  ws.onopen = function () {
    console.log('connected成功');
    console.info("文件大小：" + file.size);
    bindReader();
  }
  ws.onmessage = function (e) {
    var data = e.data;
    var ret = ''
    console.info(data);
    if (isNaN(data) == false) {
      //console.log('当前上传成功：' + data);
    } else {
      ret = data.split('|')[0]
      if (ret == '1') {
        linear += (100 / blockCount)
      } else if (ret == '0') {
        linear = 100
        stop();
      }
    }
    getMsg({ ret, linear, url: data.split('|')[1] })
  }
  ws.onerror = function (e) {
    Dialog({
      message: '未知错误',
    })
    //中止客户端读取
    stop();
    console.info(e);
    console.log('传输中发生异常');

  }

}

export default subFile