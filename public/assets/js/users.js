$('#userForm').on('submit', function () {
  // serialize方法自动收集表单数据，并将数据转化为 键=值 的参数格式
  // serialize 方法第一步必须保证表单都有name属性
  // console.log($(this).serialize());
  var formData = $(this).serialize()
  $.ajax({
    type: 'post', //get或post
    url: '/users', //请求的地址
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function () { //成功的回调函数
      // 刷新当前页面
      location.reload()
    },
    error: function () {
      alert('添加用户失败')
    }
  })
  // 阻止表单提交的默认行为，也就是阻止表单提交时刷新页面
  return false
})

// 上传头像
$('#formBox').on('change', '#avatar', function () {
  // ajax上传图片必须使用formData 
  var formData = new FormData();
  formData.append('avatar', this.files[0]);
  $.ajax({
    type: 'post', //get或post
    url: '/upload', //请求的地址
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    contentType: false, // ajax默认的contentType是‘application/x-www-form-urlencoded’，这里不是默认格式
    processData: false, // ajax默认会把数据转化为 键=值 的格式，但这里上传文件是二进制格式，不能转化为 键=值 格式
    success: function (result) { //成功的回调函数
      // console.log(result)
      // 图片预览
      $('#preview').attr('src', result[0].avatar)
      // 图片隐藏域的value值就是上传图片的地址
      $('#hiddenAvatar').val(result[0].avatar)
    }
  })
})

// 显示用户列表
$.ajax({
  type: 'get', //get或post
  url: '/users', //请求的地址
  // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) { //成功的回调函数
    // console.log(result) // 返回数组
    var html = template('userTpl', {
      data: result
    });
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
    type: 'get', //get或post
    url: '/users/' + id, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result)
      var html = template('modifyTpl', result);
      $('#formBox').html(html)
    }
  })
})

// 给修改按钮添加表单提交事件，要通过事件委托的形式，因为这个表单是由ajax请求创建的，不是一直存在的
$('#formBox').on('submit', '#modifyForm', function () {
  // 获取表单数据
  var formData = $(this).serialize()
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'put', //get或post
    url: '/users/' + id, //请求的地址
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      location.reload()
    }
  })
  return false;
})

// 删除用户
$('#userslist').on('click', '.delete', function () {
  var id = $(this).attr('data-id')
  // console.log(id);
  $.ajax({
    type: 'delete', //get或post
    url: '/users/' + id, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      location.reload();
    }
  })
})

// 全选全不选
$('#selectAll').on('change', function () {
  // console.log($(this).prop('checked'));
  var flag = $(this).prop('checked');
  $('#userslist').find('.select').prop('checked', flag);
  // 批量删除按钮显示和隐藏
  if (flag) {
    $('#deleteMany').show()
  } else {
    $('#deleteMany').hide()
  }
})

//tbody里面的checkbox全部选中时，让全选按钮选中
//tbody里面的checkbox也是由ajax请求动态创建的，所以要用事件委托
$('#userslist').on('change', '.select', function () {
  // 如果tbody里面checkbox的个数 和 tbody里面checkbox被选中的个数相等
  if ($('#userslist').find('.select').length == $('#userslist').find('.select').filter(':checked').length) {
    $('#selectAll').prop('checked', true)
  } else {
    $('#selectAll').prop('checked', false)
  }
  // 批量删除按钮显示和隐藏
  if ($('#userslist').find('.select').filter(':checked').length >= 2) {
    $('#deleteMany').show()
  } else {
    $('#deleteMany').hide()
  }
})

// 给批量删除按钮注册点击事件
$('#deleteMany').on('click', function () {
  if (confirm('您确定要删除吗？')) {
    // 获取到选中的checkbox的id值
    var selectInp = $('#userslist').find('.select').filter(':checked');
    var arr = []
    selectInp.each(function (index, element) {
      // console.log($(element).attr('data-id'));
      arr.push($(element).attr('data-id'))
    })
    $.ajax({
      type: 'delete', //get或post
      url: '/users/' + arr.join('-'), //请求的地址
      data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType: 'json',
      success: function (result) { //成功的回调函数
        location.reload()
      }
    })

  }
})