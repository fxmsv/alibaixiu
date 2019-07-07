// 获取随机推荐
$.ajax({
  type:'get',//get或post
  url:'/posts/random',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var tpl = 
    `
    {{each data}}
    <li>
      <a href="detail.html?id={{$value._id}}">
        <p class="title">{{$value.title}}</p>
        <p class="reading">阅读({{$value.meta.views}})</p>
        <div class="pic">
          <img src="{{$value.thumbnail}}" alt="">
        </div>
      </a>
    </li>
    {{/each}}
    `
    var html = template.render(tpl, {data: result})
    $('#randomRecommend').html(html)
  }
})

// 获取最新评论
$.ajax({
  type:'get',//get或post
  url:'/comments/lasted',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var commentsTpl = 
    `
    {{each data}}
    <li>
      <a href="javascript:;">
        <div class="avatar">
          <img src="uploads/avatar_1.jpg" alt="">
        </div>
        <div class="txt">
          <p>
            <span>鲜活</span>{{$value.createAt.split('T')[0]}}说:
          </p>
          <p>{{$value.content.substr(0,10)}}</p>
        </div>
      </a>
    </li>
    {{/each}}
    `
    var html = template.render(commentsTpl, {data: result})
    $('#lastedComments').html(html)
  }
})

// 左侧分类导航模块
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var tpl = 
    `
    {{each data}}
    <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `
    var html = template.render(tpl, {data: result})
    $('.nav').html(html)
  }
})

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

// 点击搜索按钮实现搜索功能
$('.search form').on('submit', function() {
  // 获取到用户输入的搜索关键词
  var keys = $(this).find('.keys').val()
  location.href = 'search.html?key=' + keys
  return false;
})