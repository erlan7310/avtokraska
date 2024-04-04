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
    if ($(this).val() === '' || $(this).val().length < 2) {
      $(this).removeClass('active');
      $('.search_hint').removeClass('active');
    } else {
      let searchText = $(this).val();
      fetch(`/search-products?search=${searchText}`)
        .then(response => response.json())
        .then(products => {
          let list = $('.search_hint_list');
          list.empty();
          if(products.length === 0){
            list.append('<li>Результаты не найдены</li>')
          }else{
            products.forEach(product => {
              list.append(`<li><a href="/catalog?productId=${product.id}">${product.name} <img class="link_arrow_right" src="/images/icons/ph_arrow-right.svg"
              alt=""></a></li>`);
            });
          }
          $(this).addClass('active');
          $('.search_hint').addClass('active');
        })
        .catch(error => console.error('Ошибка при получении информации о продукте:', error));
    }
  });
  $('.mobile_search_input').on('input', function () {
    if ($(this).val() === '' || $(this).val().length < 2) {
      $(this).removeClass('active');
      $('.mobile_search_hint').removeClass('active');
    } else {
      let searchText = $(this).val();
      fetch(`/search-products?search=${searchText}`)
        .then(response => response.json())
        .then(products => {
          let list = $('.mobile_search_hint_list');
          list.empty();
          if(products.length === 0){
            list.append('<li><span>Результат не найден</span></li>')
          }else{
            products.forEach(product => {
              list.append(`<li><a href="/catalog?productId=${product.id}">${product.name} <img class="link_arrow_right" src="/images/icons/ph_arrow-right.svg"
              alt=""></a></li>`);
            });
          }
          $(this).addClass('active');
          $('.mobile_search_hint').addClass('active');
        })
        .catch(error => console.error('Ошибка при получении информации о продукте:', error));
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
    $(this).parent().siblings().find('.accordion-header').removeClass('show');
  });

  $('.sub-accordion-header').click(function () {
    $(this).next('.sub-accordion-content').slideToggle();
    $(this).toggleClass('show');
    $(this).parent().siblings().find('.sub-accordion-content').slideUp();
    $(this).parent().siblings().find('.sub-accordion-header').removeClass('show');
  });
  $('#close_pp').click(function () {
    closeProductModal();
  });
  $(window).click(function(event) {
    if ($(event.target).hasClass('pp_block')) {
      closeProductModal();
    }
  });

  let path = window.location.pathname;
  let links = $('ul.footer_menu_list.main_links li a');
  let mainLinks = $('ul.head_links_list li a');
  let mobileLinks = $('div.mobile_fixed_menu a');
  let mobileMenu = $('div.mobile_menu_items a');
  
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
  mobileMenu.each(function () {
    if (path === $(this).attr('href')) {
      $(this).addClass('active');
    }
  });
});

const closeProductModal = () => {
  var modal = $('.pp_block');
      
  modal.find('#photo').attr('src', '/images/no-photo.png');
  modal.find('#name').text('Название товара');
  modal.find('#description').text('Описание');
  modal.find('#manufacturer').text('Производитель');
  modal.find('#color').text('Цвет');
  modal.find('#volume').text(`Объём л.`);
  modal.find('#vendorCode').text('Артикул');
  modal.find('#categories').text('Категория');
  modal.find('#categories').text('Категория');
  modal.find('#facebook-link').attr('href', '#');
  modal.find('#telegram-link').attr('href', '#');
  modal.find('#whatsapp-link').attr('href', '#');
  $('.pp_block').removeClass('show');
}

const openProductModal = (linkElement) => {
  var rootUrl = window.location.origin;
  const productId = typeof linkElement === 'string' ? linkElement : linkElement.getAttribute('data-id');
  $('.pp_block').addClass('show');
  fetch(`/catalog/${productId}`)
    .then(response => response.json())
    .then(product => {
      var modal = $('.pp_block');
      
      modal.find('#photo').attr('src', product.photo);
      modal.find('#name').text(product.name);
      modal.find('#description').text(product.description);
      modal.find('#manufacturer').text(product.manufacturer);
      if(product.color){
        modal.find('#color').text(product.color);
        modal.find('#color').parent().show();
      }else{
        modal.find('#color').text('Цвет')
        modal.find('#color').parent().hide()
      }
      if(product.volume){
        modal.find('#volume').text(`${product.volume} л.`);
        modal.find('#volume').parent().show();
      }else{
        modal.find('#volume').text('Объём')
        modal.find('#volume').parent().hide()
      }
      modal.find('#vendorCode').text(product.vendorCode);
      modal.find('#categories').text(product.categories.map(c => c.name).join(', '));
      modal.find('#facebook-link').attr('href', `https://www.facebook.com/sharer/sharer.php?u=${rootUrl + `/catalog?productId=${product.id}`}`);
      modal.find('#telegram-link').attr('href', `https://t.me/share/url?url=${rootUrl + `/catalog?productId=${product.id}`}`)
      modal.find('#whatsapp-link').attr('href', `https://wa.me/?text=${rootUrl + `/catalog?productId=${product.id}`}`);

      $('.pp_block').addClass('show');
    })
    .catch(error => console.error('Ошибка при получении информации о продукте:', error));
}

