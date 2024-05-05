"use strict";
jQuery(function ($) {
    $(".js-header-header__hamburger").on("click", function () {
        $(".js-header-header__hamburger,.header").toggleClass("is-active");
        $(".js-drawer").fadeToggle();
        $("body").toggleClass("active");
    });
    $(".js-drawer a[href]").on("click", function () {
        $(".js-header-header__hamburger").trigger("click");
    });

    //768px以上でドロワーを非表示にする
    $(window).on('resize', function() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        $(".js-header-header__hamburger").removeClass("is-active");
        $(".js-drawer").fadeOut();
      }
    });

      //ハンバーガーメニューを開いている時のスクロールを禁止する(背景固定)
    var state = false;
    var pos;
    $(".js-header-header__hamburger").on("click", function () {
        if (state == false) {
        pos = $(window).scrollTop();
        $("body").addClass("js-fixed").css({
            top: -pos,
        });
        state = true;
        } else {
        $("body").removeClass("js-fixed").css({
            top: 0,
        });
          window.scrollTo(0, pos);
          state = false;
        }
      });
    
      //fvスライダー
      const swiper = new Swiper(".js-fv__swiper", {
        loop: true,
        effect: "fade",
        speed: 3000,
        allowTouchMove: false,
        autoplay: {
          delay: 3000,
        },
      });
    
      //campaignスライダー
      var topCampaign_swiper = new Swiper(".js-campaign-swiper", {
        loop: true,
        speed: 30000000,
        slidesPerView: "auto",
        spaceBetween: 24,
        autoplay: {
          delay: 30000000, 
          disableOnInteraction: false,
        },
        breakpoints: {
          768: {
            slidesPerView: "auto",
            spaceBetween: 40,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    
      //色壁が出て写真が出てくるアニメーション,
      var box = $(".information__image,.voice-card__image,.price__image"),
        speed = 700;
    
      box.each(function () {
        $(this).append('<div class="color"></div>');
        var color = $(this).find($(".color")),
          image = $(this).find("img");
        var counter = 0;
    
        image.css("opacity", "0");
        color.css("width", "0%");
        //inviewを使って背景色が画面に現れたら処理をする
        color.on("inview", function () {
          if (counter == 0) {
            $(this)
              .delay(200)
              .animate({ width: "100%" }, speed, function () {
                image.css("opacity", "1");
                $(this).css({ left: "0", right: "auto" });
                $(this).animate({ width: "0%" }, speed);
              });
            counter = 1;
          }
        });
      });

    //ページトップへ戻るボタン
  const pageTop = $("#js-pagetop");
  pageTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });
  pageTop.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });
  // フッター手前でストップ
  $("#js-pagetop").hide();
  $(window).on("scroll", function () {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    var footHeight = $(".layout-footer").innerHeight();
    if (scrollHeight - scrollPosition <= footHeight) {
// ページトップボタンがフッター手前に来たらpositionとfixedからabsoluteに変更
      $("#js-pagetop").css({
        position: "absolute",
        bottom: footHeight + 18,
      });
    } else {
      $("#js-pagetop").css({
        position: "fixed",
        bottom: "20px",
      });
    }
  });

  //下層アコーディオンメニュー
  $(".accordion__answer").css("display", "block");
  $(".accordion__answer").addClass("is-open");
  $(".js-accordion-title").on("click", function() {
    $(this).next().slideToggle(300);
    $(this).toggleClass("is-open",300);
  });

  //ブログ詳細ぺージのアコーディオン 
  //親要素のクリックイベント
$('.asideblog-list__year').click(function() {
	$(this).next('ul').slideToggle();
});
//子要素のクリックイベント
$('.menu-subtitle').click(function() {
	$(this).children('ul').slideToggle();
});
$('.asideblog-list__month').click(function() {
	$(this).children('ul').slideToggle();
}); 
//最初の年数の矢印を開いた状態にする
$(".asideblog-lists__list:first-of-type .asideblog-list__year").addClass("open");
//年代をクリックしたら中身が出たり隠れたりする
$('.js-asideblog-list__year,.js-asideblog-list__month').on('click',function (){
  $(this).toggleClass('open');
});

//下層ページpage-informationタブ切り替え
$('.js-tab').on('click',function(){
  $('.js-tab,.js-panel').removeClass('active');
  $(this).addClass('active');
  const index = $('.js-tab').index(this);
  $('.js-panel').eq(index).addClass('active');
});

//Aboutページのモーダルウィンドウ
const open = $(".js-modal-open");
const close = $(".modal");
const modal = $(".js-modal");

// 開くボタンをクリックしたらモーダルを表示する
open.on("click", function () {
    const target = $(this).attr("data-target"); // 属性名を修正
    const targetModal = $("#" + target);
    targetModal.addClass("is-open");
    $("html, body").css("overflow", "hidden"); // スクロールを禁止する
});

// 閉じるボタンをクリックしたらモーダルを閉じる
close.on("click", function () {
    modal.removeClass("is-open");
    $("html, body").css("overflow", "initial"); // スクロールを有効にする
});



//別ページからアクティブなタブへのリンク
var hash = location.hash;
hash = (hash.match(/^#tab\d+$/) || [])[0];

//リンクにハッシュが入っていればtabnameに格納
if($(hash).length){
  var tabname = hash.slice(1) ;
} else {
  var tabname = "tab1";
}

//コンテンツ非表示&タブを非アクティブ
$('.tab__content-item ').removeClass("active");
$('.tab__menu li').removeClass('active');

//何番目のタブかを格納
var tabno = $('.tab__menu li#' + tabname).index();

//コンテンツ表示
$('.tab__content-item').eq(tabno).addClass('active');

//タブのアクティブ化
$('.tab__menu li').eq(tabno).addClass('active');
$('ul.tab__menu li').eq(tabno).addClass('active');
});