// 图片上传和预览功能
$('#slideFile').on('change', function() {
  // 图片上传
  var formData= new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType: false,
    processData: false,
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result);
      $('#preview').attr('src', result[0].avatar).show()
      $('#hiddenImg').val(result[0].avatar)
    }
  })
  return false;
})

// 添加轮播图功能
$('#slideForm').on('submit', function() {
  // console.log($(this).serialize());
  $.ajax({
    type:'post',//get或post
    url:'/slides',//请求的地址
    data: $(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      location.reload()
    }
  })
  return false;
})

// 轮播图列表展示
$.ajax({
  type:'get',//get或post
  url:'/slides',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('slideTpl', {data: result})
    $('#slideList').html(html)
  }
})

// 删除轮播图功能
$('#slideList').on('click', '.delete', function() {
  if(confirm('您确定要删除吗？')) {
    var id = $(this).attr('data-id');
    $.ajax({
      type:'delete',//get或post
      url:'/slides/' + id,//请求的地址
      success:function(result){//成功的回调函数
        location.reload()
      }
    })
  
  }
})