function transliterate(word) {
  const letters = { 
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
    н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'shch', ы: 'y',
    э: 'e', ю: 'yu', я: 'ya', й: 'i', ъ: '', ь: '', А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'E', Ж: 'Zh', 
    З: 'Z', И: 'I', Й: 'Y', К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F', 
    Х: 'H', Ц: 'C', Ч: 'Ch', Ш: 'Sh', Щ: 'Shch', Ы: 'Y', Э: 'E', Ю: 'Yu', Я: 'Ya', Ь: '', Ъ: '' 
  };

  return word.split('').map(char => letters[char] || char).join('');
}

function areCyrillic(text) {
  const cyrillicPattern = /^[а-яёА-ЯЁ ]+$/;
  
  return cyrillicPattern.test(text);
}

function generateUsername(name, surname) {
  let transliteratedName = areCyrillic(name) ? transliterate(name[0]) : name[0];
  let transliteratedSurname = areCyrillic(surname) ? transliterate(surname) : surname;

  const username = `${transliteratedName}.${transliteratedSurname}`.toLocaleLowerCase().replace(' ', '');

  return transliteratedName ? username : '';
}

function generatePassword(length){
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '.@!#';

  let password = 
    lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)] +
    upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    symbols[Math.floor(Math.random() * symbols.length)];
  const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + symbols;
  for (let i = 4; i < length; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  return password;
}

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

  let path = window.location.pathname;
  let links = $('nav#mainNav ul li a');
  
  links.each(function() {
    if (path.includes($(this).attr('href'))) {
      $(this).parent().addClass('active');
    }
  });

  $("#togglePassword").click(function() {
    let passwordInput = $("#password");
    let passwordInputType = passwordInput.attr("type");

    if (passwordInputType === "password") {
      passwordInput.attr("type", "text");
      $(this).find('.fa').removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      passwordInput.attr("type", "password");
      $(this).find('.fa').removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });

  $("#generateLoginPassBtn").click(function(){
    let surname = $("#surname").val();
    let name = $("#name").val();

    let username = generateUsername(name, surname);
    let password = generatePassword(6);

    $("#username").val(username);
    $("#password").val(password);
  });

  $("#generatePassBtn").click(function(){
    let password = generatePassword(6);

    $("#password").val(password);
  });

  $('#changePassModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let user = button.data('whatever') ;
    let modal = $(this);
    modal.find('#changePassForm').data('user', user);
  })

  $('#changePassModal').on('hidden.bs.modal', function (event) {
    $("#changePassForm").find("#successAlert").hide();
    $("#changePassForm").find("#errorAlert").hide();
    let modal = $(this);
    modal.find('#changePassForm').data('user', '');
    $("#changePassForm").get(0).reset();
  })

  $("#changePassForm").submit((e) => {
    e.preventDefault();
    let userId = $(e.target).data('user');
    const formData = new FormData($(e.target).get(0));
    fetch('/admin/users/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: parseInt(userId, 10),
        password: formData.get('password')
      })
    })
    .then(response => ({ok: response.ok, data: response.json()}))
    .then(data => {
      if (data.ok) {
        $("#changePassForm").find("#successAlert").show();
        $("#changePassForm").find("#successAlert").text(data.data.message);
        $(e.target).get(0).reset();
      }else{
        $("#changePassForm").find("#errorAlert").show();
        $("#changePassForm").find("#errorAlert").text(data.data.message);
      }
    })
    .catch(error => console.error('Ошибка: ', error));
  });

  $('#changePassBtn').click(function() {
    $('#changePassForm').submit();
  });
  
  $('#subcategoryCheckbox').change(function() {
    if (this.checked) {
      $('#parent').prop('disabled', false);
    } else {
      $('#parent').prop('disabled', true).val($('#parent option:first').val());
    }
  });

  $('input#photo').on('change', (event) => {
    const preview = document.getElementById('bannerPreview');
    const file = document.getElementById('photo').files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
      preview.src = reader.result;
      $(preview).parent().show();
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "/images/no-photo.png"; 
    }
  })
});

(function($) {
  "use strict";
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  });
  window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
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