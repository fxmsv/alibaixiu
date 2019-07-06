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
// 方式一
// template.defaults.imports.dateformat = dateformat
// 方式二直接在模板中
// {{$imports.dateformat($value.createAt)}}


function render(object) {
  $.ajax({
    type:'get',//get或post
    url:'/posts',//请求的地址
    data: object,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      var postHtml = template('postsListTpl', result);
      $('#postsList').html(postHtml)
      var pageHtml = template('pageTpl', result)
      $('#page').html(pageHtml)
    }
  })
}
// 文章列表展示
render()

// 分页功能
function pageChange(page) {
  render({page:page})
}

// 分类列表下拉框展示
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('categoryTpl', {data: result})
    $('#categoryList').html(html)
  }
})

// 筛选文章列表功能
$('#filterForm').on('submit', function() {
  var category = $('#categoryList').val()
  var state = $('#stateList').val()
  // console.log(category);
  // console.log(state);

  if(state == 'all' && category == 'all') {
    render()
  } else if (state == 'all' && category != 'all') {
    render('category=' + category)
  } else if (category == 'all' && state != 'all') {
    render('state=' + state)
  } else {
      // 获取表单数据
    var formData = $(this).serialize()
    // console.log(formData);
    render(formData)
  }
  return false;
})

// 根据id删除文章
$('#postsList').on('click', '.delete', function() {
  if (confirm('您确定要删除吗？')) {
    var id = $(this).attr('data-id')
    $.ajax({
      type:'delete',//get或post
      url:'/posts/' + id,//请求的地址
      success:function(result){//成功的回调函数
        location.reload()
      }
    })
  }
})
