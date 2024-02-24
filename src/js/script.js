
jQuery(function ($) { 
    $(".js-hamburger").on("click", function () {
        $(".js-hamburger").toggleClass("is-active");
        $(".js-drawer").fadeToggle();
    });

$(".js-drawer a[href]").on("click", function () {
    $(".js-hamburger").trigger("click");
});
  //ハンバーガーメニューを開いている時のスクロールを禁止する(背景固定)
let state = false;
let pos;
$(".js-hamburger").on("click", function () {
    if (state == false) {
    pos = $(window).scrollTop();
    $("body").addClass("js-fixed").css({ top: -pos });
    state = true;
    } else {
    $("body").removeClass("js-fixed").css({ top: 0 });
    window.scrollTo(0, pos);
    state = false;
    }
}); 

//informationアニメーション
    var box = $('.information__image'),
    speed = 700;  

  //.colorboxの付いた全ての要素に対して下記の処理を行う
    box.each(function(){
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
    image = $(this).find('img');
    var counter = 0;

    image.css('opacity','0');
    color.css('width','0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function(){
    if(counter == 0){
        $(this).delay(200).animate({'width':'100%'},speed,function(){
        image.css('opacity','1');
        $(this).css({'left':'0' , 'right':'auto'});
        $(this).animate({'width':'0%'},speed);
    })
    counter = 1;
    }
    });
    });
});
