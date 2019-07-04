// 展示分类下拉框
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    var html = template('categoryTpl', {data: result});
    $('#category').html(html)
  }
})

// 图片上传和预览
$('#feature').on('change', function () {
  // console.dir(this);
  var formData = new FormData();
  formData.append('avatar', this.files[0])

  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    contentType: false,
    processData: false,
    success:function(result){//成功的回调函数
      // console.log(result)
      // 图片预览效果
      $('.thumbnail').attr('src', result[0].avatar).show()
      // 隐藏域的value值就是图片的地址
      $('#thumbnail').val(result[0].avatar)
    }
  })
})

// 创建文章表单提交
$('#postForm').on('submit', function() {
  //获取表单数据
  var formData = $(this).serialize();
  //发送ajax请求
  $.ajax({
    type:'post',//get或post
    url:'/posts',//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      // 跳转到文章列表页面
      location.href = 'posts.html'
    }
  })
  return false;
})
