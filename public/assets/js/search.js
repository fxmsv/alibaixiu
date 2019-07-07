// 搜索功能显示文章列表
var key = getUrlParams('key')
$.ajax({
  type:'get',//get或post
  url:'/posts/search/' + key,//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('searchTpl', {data: result})
    $('.new').append(html)

  }
})