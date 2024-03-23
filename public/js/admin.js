$(document).ready(function() {
  $('#dataTable').DataTable({
    language: {
      processing: "Подождите...",
      search: "Поиск:",
      lengthMenu: "Показать _MENU_ записей",
      info: "Записи с _START_ до _END_ из _TOTAL_ записей",
      infoEmpty: "Записи с 0 до 0 из 0 записей",
      infoFiltered: "(отфильтровано из _MAX_ записей)",
      infoPostFix: "",
      loadingRecords: "Загрузка записей...",
      zeroRecords: "Записи отсутствуют.",
      emptyTable: "В таблице отсутствуют данные",
      paginate: {
        first: "Первая",
        previous: "Предыдущая",
        next: "Следующая",
        last: "Последняя"
      },
      aria: {
        sortAscending: ": активировать для сортировки столбца по возрастанию",
        sortDescending: ": активировать для сортировки столбца по убыванию"
      }
    },
    columnDefs: [
      { className: "action-column", targets: -1, orderable: false } 
    ]
  });

  var path = window.location.pathname;
  var links = $('nav#mainNav ul li a');
  
  links.each(function() {
    if ($(this).attr('href') === path) {
      $(this).parent().addClass('active');
    }
  });
});

(function($) {
  "use strict";
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  })
  $("#sidenavToggler").click(function(e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
  });
  $(".navbar-sidenav .nav-link-collapse").click(function(e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  $('[data-toggle="tooltip"]').tooltip()
  $(document).on('click', 'a.scroll-to-top', function(event) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    event.preventDefault();
  });
})(jQuery);