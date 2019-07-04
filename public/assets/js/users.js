$('#userForm').on('submit', function() {
  // serialize方法自动收集表单数据，并将数据转化为 键=值 的参数格式
  // serialize 方法第一步必须保证表单都有name属性
  // console.log($(this).serialize());
  var formData = $(this).serialize()
  $.ajax({
    type:'post',//get或post
    url:'/users',//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(){//成功的回调函数
      // 刷新当前页面
      location.reload()
    },
    error: function() {
      alert('添加用户失败')
    }
  })
  // 阻止表单提交的默认行为，也就是阻止表单提交时刷新页面
  return false
})

// 上传头像
$('#avatar').on('change', function() {
  // ajax上传图片必须使用formData 
  var formData = new FormData();
  formData.append('avatar', this.files[0]);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    contentType: false, // ajax默认的contentType是‘application/x-www-form-urlencoded’，这里不是默认格式
    processData: false, // ajax默认会把数据转化为 键=值 的格式，但这里上传文件是二进制格式，不能转化为 键=值 格式
    success:function(result){//成功的回调函数
      // console.log(result)
      $('#preview').attr('src', result[0].avatar)
      $('#hiddenAvatar').val(result[0].avatar)
    }
  })
})

// 显示用户列表
$.ajax({
  type:'get',//get或post
  url:'/users',//请求的地址
  // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    // console.log(result) // 返回数组
    var html = template('userTpl', {data: result});
    $('#userslist').html(html)
  }
})

// 修改用户信息
// 给编辑按钮添加点击事件，通过事件委托的形式
$('#userslist').on('click', '.edit', function () {
  // 获取到点击的编辑的id值
  var id = $(this).attr('data-id');
  // console.log(id);
  // 根据id值获取数据
  $.ajax({
    type:'get',//get或post
    url:'/users/' + id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      var html = template('modifyTpl', result);
      $('#userForm').html(html)
    }
  })
})