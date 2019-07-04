// 添加分类功能
$('#addCategory').on('submit', function() {
  // 获取表单数据
  var formData = $(this).serialize();
  // console.log(formData);
  $.ajax({
    type:'post',//get或post
    url:'/categories',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload()
    }
  })
  
  return false;
})

// 展示分类列表
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    // console.log(result) // 数组
    var html = template('categoryTpl', {data: result});
    $('#categoryList').html(html)
  }
})

//点击编辑按钮后让点击的这一行数据展示在左边表单中
//事件委托的形式
$('#categoryList').on('click', '.edit', function() {
  // 获取id值
  var id = $(this).attr('data-id')
  // console.log(id);
  // 发送ajax请求
  $.ajax({
    type:'get',//get或post
    url:'/categories/' + id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      // 将数据展示在左边的表单中，模板拼接
      var html = template('modifyCategoryTpl', result);
      $('#categoryForm').html(html)
    }
  })
})

//修改分类表单提交
//事件委托的形式
$('#categoryForm').on('submit', '#modifyCategory', function() {
  // 获取表单数据
  var formData = $(this).serialize()
  // console.log(formData);
  // 获取当前数据的id值
  var id = $(this).attr('data-id')
  //发送ajax请求
  $.ajax({
    type:'put',//get或post
    url:'/categories/' + id,//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      location.reload()
    }
  })
  return false;
})

// 分类数据删除功能
// 事件委托形式
$('#categoryList').on('click', '.delete', function() {
  // 获取id值
  var id = $(this).attr('data-id')
  // console.log(id);
  // 发送ajax请求
  $.ajax({
    type:'delete',//get或post
    url:'/categories/' + id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload()
    }
  })
})