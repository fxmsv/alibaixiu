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

// 根据id获取文章详情
$.ajax({
  type:'get',//get或post
  url:'/posts/' + id,//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('detailTpl', result);
    $('.content .article').html(html)
  }
})

// 点赞功能实现
$('.article').on('click', '#likes', function() {
  $.ajax({
    type:'post',//get或post
    url:'/posts/fabulous/' + id,//请求的地址
    success:function(result){//成功的回调函数
      // console.log(result)
      alert('点赞成功')
      location.reload()
    }
  })
})

var review;
// 提交评论功能的实现
// 只有当网站设置中的开启评论功能选框选中并且用户是登录状态时，评论框才显示
$.ajax({
  type:'get',//get或post
  url:'/settings',//请求的地址
  success:function(result){//成功的回调函数
    review= result.review
    // console.log(result)
    if(result.comment == true && isLogin == true) {
      // console.log(result)
      var tpl = 
      `
      <form>
        <textarea></textarea>
        <input type="submit" value="提交评论">
      </form>
      `
      $('.comment').html(tpl)
    }
  }
})

// 评论表单提交功能
$('.comment').on('submit', 'form', function() {
  var content = $(this).find('textarea').val()
  var state;
  if (review) {
    state= 1
  } else {
    state= 0
  }
  $.ajax({
    type:'post',//get或post
    url:'/comments',//请求的地址
    data:{
      content,
      post: id,
      // state 的值取决于网站配置中 评论是否经过人工审核 这个选框的值，也就是review是true还是false，如果是true，state值为1，false，state值为0
      state
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      alert('评论成功')
      location.reload()
    },
    error:function(err) {
      alert('评论失败')
    }
  })
  return false
})
