// 首页和详情页共享热门推荐
$.ajax({
  type:'get',//get或post
  url:'/posts/recommend',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var tpl = 
    `
    {{each data}}
    <li>
      <a href="detail.html?id={{$value._id}}">
        <img src="{{$value.thumbnail}}" alt="">
        <span>{{$value.title}}</span>
      </a>
    </li>
    {{/each}}
    `
    var html = template.render(tpl, {data: result})
    $('.hots ul').html(html)
  }
})

