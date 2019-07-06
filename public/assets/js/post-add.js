// 展示分类下拉框
$.ajax({
  type: 'get', //get或post
  url: '/categories', //请求的地址
  data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) { //成功的回调函数
    var html = template('categoryTpl', {
      data: result
    });
    $('#category').html(html)
  }
})

// 图片上传和预览
$('#formBox').on('change','#feature', function () {
  // console.dir(this);
  var formData = new FormData();
  formData.append('avatar', this.files[0])

  $.ajax({
    type: 'post', //get或post
    url: '/upload', //请求的地址
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    contentType: false,
    processData: false,
    success: function (result) { //成功的回调函数
      // console.log(result)
      // 图片预览效果
      $('.thumbnail').attr('src', result[0].avatar).show()
      // 隐藏域的value值就是图片的地址
      $('#thumbnail').val(result[0].avatar)
    }
  })
})


// 创建文章表单提交
$('#postForm').on('submit', function () {
  //获取表单数据
  var formData = $(this).serialize();
  //发送ajax请求
  $.ajax({
    type: 'post', //get或post
    url: '/posts', //请求的地址
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      // console.log(result)
      // 跳转到文章列表页面
      location.href = 'posts.html'
    }
  })
  return false;
})

// 文章编辑功能
// 获取到要编辑的文章的id值
var id = getUrlParams('id')
if (id != -1) {
  // 编辑,根据id修改文章
  $.ajax({
    type: 'get', //get或post
    url: '/posts/' + id, //请求的地址
    success: function (result) { //成功的回调函数
      // console.log(result)
      // 展示分类下拉框
      $.ajax({
        type: 'get', //get或post
        url: '/categories', //请求的地址
        success: function (categories) { //成功的回调函数
          result.categories = categories
          // console.log(result);
          var html = template('modifyTpl', result)
          $('#formBox').html(html)
        }
      })
    }
  })
}

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

// 根据id修改文章
$('#formBox').on('submit', '#modifyForm', function() {
  // 获取表单数据
  var formData = $(this).serialize();
  // 获取id值
  var id = $(this).attr('data-id')
  // 发送ajax请求
  $.ajax({
    type:'put',//get或post
    url:'/posts/' + id,//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      location.href = 'posts.html'
    }
  })
  return false;
})
