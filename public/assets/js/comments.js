// 处理日期时间格式
function dateformat(time) {
  var date = new Date(time)
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  // var h = date.getHours();
  // var mt = date.getMinutes();
  // var s = date.getSeconds();
  // h = h < 10 ? '0'+ h : h
  // mt = mt < 10 ? '0'+ mt : mt
  // s = s < 10 ? '0'+ s : s
  return y + '/' + m + '/' + d
}

// 展示评论列表
function render(object) {
  $.ajax({
    type:'get',//get或post
    url:'/comments',//请求的地址
    data: object,
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      var html = template('commentsTpl', result);
      $('#commentsList').html(html)
      var pageHtml = template('pageTpl', result);
      $('#pageBox').html(pageHtml)
    }
  })
}
render()

// 分页功能
function changePage(page) {
  render({page: page})
}

// 点击 批准 驳回
$('#commentsList').on('click','.state', function() {
  var id = $(this).attr('data-id')
  var state = $(this).attr('data-state')
  $.ajax({
    type:'put',//get或post
    url:'/comments/' + id,//请求的地址
    data:{
      state : state == 0? 1 : 0
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload()
    }
  })
  return false;
})

// 删除评论
$('#commentsList').on('click','.delete', function() {
  if(confirm('您确定要删除吗？')) {
    var id = $(this).attr('data-id')
    $.ajax({
      type:'delete',//get或post
      url:'/comments/' + id,//请求的地址
      dataType:'json',
      success:function(result){//成功的回调函数
        // console.log(result)
        location.reload()
      }
    })
  }
})