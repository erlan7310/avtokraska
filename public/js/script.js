$('.myslider').slick({
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  vertical: true,
  // autoplay: true,
  verticalSwiping: true,
  customPaging: function (slider, i) {
    var thumb = $(slider.$slides[i]).data();
    return '0' + (i + 1);
  },
  responsive: [{
    breakpoint: 700,
    settings: {
      dots: true,
      vertical: false,
      verticalSwiping: false,
      arrows: false,
      customPaging: function (slider, i) {
        var thumb = $(slider.$slides[i]).data();
        return '<button></button>';
      },
    }
  }]
});

$(".manufactures_slider").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  prevArrow: '<button id="prev" type="button" class="slider_btn slider_btn_prev"><img src="/images/icons/left_arrow.svg" alt=""></button>',
  nextArrow: '<button id="next" type="button" class="slider_btn slider_btn_next"><img src="/images/icons/right_arrow.svg" alt=""></button>',
  speed: 500,
  responsive: [{
    breakpoint: 500,
    settings: {
      arrows: true,
      dots: false,
      slidesToShow: 2,
    }
  }]
});

$(document).ready(function () {

  $('#open_menu').click(function () {
    $('.mobile_header_body').toggleClass('active');
  });
  $('#btn_open_catalog').click(function () {
    $('.mobile_header_body').toggleClass('active');
  });

  $('.search_input').on('input', function () {
    if ($(this).val() === '') {
      $(this).removeClass('active');
      $('.search_hint').removeClass('active');
    } else {
      $(this).addClass('active');
      $('.search_hint').addClass('active');
    }
  });
  $('.mobile_search_input').on('input', function () {
    if ($(this).val() === '') {
      $(this).removeClass('active');
      $('.mobile_search_hint').removeClass('active');
    } else {
      $(this).addClass('active');
      $('.mobile_search_hint').addClass('active');
    }
  });
  $('#open_links').on('click', function (event) {
    event.stopPropagation();
    $('.hiden_links').toggleClass('active');
  });
  $(document).on('click', function () {
    $('.hiden_links').removeClass('active');
  });
  $('.accordion-header').click(function () {
    $(this).next('.accordion-content').slideToggle();
    $(this).toggleClass('show');
    $(this).parent().siblings().find('.accordion-content').slideUp();
  });

  $('.sub-accordion-header').click(function () {
    $(this).next('.sub-accordion-content').slideToggle();
    $(this).toggleClass('show');
    $(this).parent().siblings().find('.sub-accordion-content').slideUp();
  });
  $('#close_pp').click(function () {
    $('.pp_block').removeClass('show');
  });

  let path = window.location.pathname;
  let links = $('ul.footer_menu_list.main_links li a');
  let mainLinks = $('ul.head_links_list li a');
  let mobileLinks = $('div.mobile_fixed_menu a');
  
  links.each(function () {
    if (path === $(this).attr('href')) {
      $(this).addClass('active');
    }
  });
  mainLinks.each(function () {
    if (path === $(this).attr('href')) {
      $(this).addClass('active');
    }
  });
  mobileLinks.each(function () {
    if (path === $(this).attr('href')) {
      $(this).addClass('active');
    }
  });
});
