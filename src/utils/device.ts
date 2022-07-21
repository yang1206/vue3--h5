//首先判断pc端还是移动端//
export function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//判断用户移动端使用的系统平台//
export function device(){
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        return 1
    } else if (u.indexOf('iPhone') > -1) {
        //苹果手机
        return 2
    } else if (u.indexOf('Windows Phone') > -1) {
        //winphone手机
        return 3
    }
}


//判断用户是否在微信中打开//
export function isWeiXin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') != -1) {
        return true;
    } else {
        return false;
    }
}