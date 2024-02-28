"use strict";
jQuery(function ($) {
    $(".js-hamburger").on("click", function () {
        $(".js-hamburger").toggleClass("is-active");
        $(".js-drawer").fadeToggle();
    });
    $(".js-drawer a[href]").on("click", function () {
        $(".js-hamburger").trigger("click");
    });
      //ハンバーガーメニューを開いている時のスクロールを禁止する(背景固定)
    var state = false;
    var pos;
    $(".js-hamburger").on("click", function () {
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
      const swiper = new Swiper(".fv__swiper", {
        loop: true,
        effect: "fade",
        speed: 3000,
        allowTouchMove: false,
        autoplay: {
          delay: 3000,
        },
      });
    
      //campaignスライダー
      var topCampaign_swiper = new Swiper(".js-topCampaign-slider", {
        loop: true,
        speed: 2000,
        slidesPerView: "auto",
        spaceBetween: 24,
        autoplay: {
          delay: 2000,
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
    
      //informationアニメーション,
      var box = $(".information__image,.voice-item__image,.price__image"),
        speed = 700;
    
      //.colorboxの付いた全ての要素に対して下記の処理を行う
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
        bottom: footHeight + 20,
      });
    } else {
      $("#js-pagetop").css({
        position: "fixed",
        bottom: "20px",
      });
    }
  });
});