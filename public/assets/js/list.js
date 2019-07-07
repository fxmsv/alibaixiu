// 根据分类获取文章列表
// 封装获取地址栏参数的函数
function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&')
  // console.log(paramsAry);
  for (var i = 0; i < paramsAry.length; i++) {
    var tmp = paramsAry[i].split('=')
    if (tmp[0] == name) {
      return tmp[1]
    }
  }
  return -1;
}

// 获取分类的id值
var id = getUrlParams('id')
$.ajax({
  type:'get',//get或post
  url:'/posts/category/' + id,//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('categoryTpl', {data: result})
    $('.new').append(html)
    $('.new h3').text(result[0].category.title)
  }
})

