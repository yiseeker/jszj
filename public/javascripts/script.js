$(document).ready(function(){

});

function go(suffix)
{
    var path = getRootPath(suffix);

    window.location.href=path;
}


function getRootPath(suffix)
{
    if(suffix){
        return 'http://'+window.location.host+suffix;
    }else
    {
        return 'http://'+window.location.host;
    }

}

function submitForm(id)
{
    $('#'+id).submit();
}


function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

//获取QueryString的数组
function getQueryString(){

    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g"));

    if(result == null){

        return "";

    }

    for(var i = 0; i < result.length; i++){

        result[i] = result[i].substring(1);

    }

    return result;

}

//根据QueryString参数名称获取值
function getQueryStringByName(name){

    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));

    if(result == null || result.length < 1){

        return "";

    }
    return decodeURI(result[1]);

}

//根据QueryString参数索引获取值
function getQueryStringByIndex(index){

    if(index == null){

        return "";

    }

    var queryStringList = getQueryString();

    if (index >= queryStringList.length){

        return "";

    }

    var result = queryStringList[index];

    var startIndex = result.indexOf("=") + 1;

    result = result.substring(startIndex);

    return result;

}
