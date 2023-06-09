jQuery(function ($) {
  "use strict";
  $("li.dropdown")
    .find(".fa-angle-down")
    .each(function () {
      $(this).on("click", function () {
        if ($(window).width() < 768) {
          $(this).parent().next().slideToggle();
        }
        return false;
      });
    });
  if ($("#video-container").length) {
    $("#video-container").fitVids();
  }
  new WOW().init();
  $(window).load(function () {
    $(".main-slider").addClass("animate-in");
    $(".preloader").remove();
    if ($(".masonery_area").length) {
      $(".masonery_area").masonry();
    }
    var $portfolio_selectors = $(".portfolio-filter >li>a");
    if ($portfolio_selectors.length) {
      var $portfolio = $(".portfolio-items");
      $portfolio.isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows"
      });
      $portfolio_selectors.on("click", function () {
        $portfolio_selectors.removeClass("active");
        $(this).addClass("active");
        var selector = $(this).attr("data-filter");
        $portfolio.isotope({ filter: selector });
        return false;
      });
    }
  });
  $(".timer").each(count);
  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data("countToOptions") || {});
    $this.countTo(options);
  }
  $(".fa-search").on("click", function () {
    $(".field-toggle").fadeToggle(200);
  });
  var form = $("#main-contact-form");
  form.submit(function (event) {
    event.preventDefault();
    var form_status = $('<div class="form_status"></div>');
    $.ajax({
      url: $(this).attr("action"),
      beforeSend: function () {
        form.prepend(
          form_status
            .html(
              '<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>'
            )
            .fadeIn()
        );
      }
    }).done(function (data) {
      form_status
        .html(
          '<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>'
        )
        .delay(3000)
        .fadeOut();
    });
  });
  $.each($("div.progress-bar"), function () {
    $(this).css("width", $(this).attr("data-transition") + "%");
  });
  if ($("#gmap").length) {
    var map;
    map = new GMaps({
      el: "#gmap",
      lat: 43.04446,
      lng: -76.130791,
      scrollwheel: false,
      zoom: 16,
      zoomControl: false,
      panControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      overviewMapControl: false,
      clickable: false
    });
    map.addMarker({
      lat: 43.04446,
      lng: -76.130791,
      animation: google.maps.Animation.DROP,
      verticalAlign: "bottom",
      horizontalAlign: "center",
      backgroundColor: "#3e8bff"
    });
  }
});

function selectOnchang(obj){
 var value = obj.options[obj.selectedIndex].value;
 alert(value);
}

function postnl(obj){
 alert("测试button action");
}

 $(function(){
    $('#nl2flsubmit').click(function(){
      let flcheckboxlist = []
　　　　$("input[name='flcheckbox']:checked").each(function(){
         flcheckboxlist.push($(this).attr("data-labelauty"))
　　　　});
      let flpracheckboxlist = []
　　　　$("input[name='flpracheckbox']:checked").each(function(){
         // alert($(this).attr("data-labelauty"))
         flpracheckboxlist.push($(this).attr("data-labelauty"))
　　　　});
     $.ajax({
     'url':'/postnl/',  //访问的url地址
     'dateType':'json',  //想要获得的返回数据类型
     type:'post',
     data:{
       ChatGptAPIname:$('#ChatGptAPIname').val(),
       nlmessage:$('#nlmessage').val(),
       ChatGptversion:$('#ChatGptversion').val(),
       flcheckbox:JSON.stringify(flcheckboxlist),
       flpracheckbox:JSON.stringify(flpracheckboxlist),
       csrfmiddlewaretoken:$('[name=csrfmiddlewaretoken]').val(),
     }
     }).success(function(res){  //执行成功的回调函数（含有返回的数据（date））
       console.log(res)
       var res_Str = JSON.parse(res);
       console.log(res_Str,typeof res_Str);
       $('#flmessage').val(res_Str['flmessage'])
       $('#flpramessage').val(res_Str['flpramessage'])
     })
    })
 })