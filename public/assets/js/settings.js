// 网站图标上传和预览
$('#logoFile').on('change', function() {
  var formData = new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType: false,
    processData: false,
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      $('#preview').attr('src', result[0].avatar)
      $('#hiddenLogo').val(result[0].avatar)
    }
  })
})

// 网站设置功能
$('#settingForm').on('submit', function () {
  // console.log($(this).serialize());
  $.ajax({
    type:'post',//get或post
    url:'/settings',//请求的地址
    data: $(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      alert('网站设置成功')
      // location.reload()
    }
  })
  return false;
})

// 网站设置数据展示
$.ajax({
  type:'get',//get或post
  url:'/settings',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    if (result) {
      // logo展示
      $('#preview').prop('src', result.logo)
      // 将logo地址保存在隐藏域中
      $('#hiddenLogo').val(result.logo)
      // 站点名称显示
      $('input[name="title"]').val(result.title)
      // 评论选中或不选中显示
      $('input[name="comment"]').prop('checked', result.comment)
      $('input[name="review"]').prop('checked', result.review)
    }
  }
})