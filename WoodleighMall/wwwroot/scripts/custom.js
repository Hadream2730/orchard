$(function () {

    // Add a click event listener to elements with the 'btn-copy' class
    $(".btn-copy").on("click", function() {
        // Find the '.btn-copy__text' element within the clicked button
        var textToCopy = $(this).find(".btn-copy__text").text();

        // Create a temporary input element to hold the text
        var tempInput = $("<input>");
        $("body").append(tempInput);
        tempInput.val(textToCopy).select();

        try {
            // Copy the selected text to the clipboard
            document.execCommand("copy");
            // Provide user feedback (e.g., change button text)
            alert("Voucher is copied!");
        } catch (err) {
            console.error("Unable to copy text: ", err);
        }

        // Remove the temporary input element
        tempInput.remove();
    });

    

  // Menu Toggle
  $('.mobile-menu-toggle').on('click', function () {
    $(this).toggleClass('is--active');
    $('.main-navigation').toggleClass('main-navigation--active');
  });


  // Page Carousel
  if ($('.page-banner__carousel').length) {
    $('.page-banner__carousel').owlCarousel({
      loop: true,
      margin: 0,
      dots: false,
      nav: true,
      navText: ["<i class='icon-block icon-block--arrow-left'></i>", "<i class='icon-block icon-block--arrow-right'></i>"],
      singleItem: true,
      items: 1,
      autoplay: false,
      autoHeight: true,
      autoPlayTimeout: 2000
    });
  }


  // Home Banner Overlay Visibility
  if (window.matchMedia("(max-width: 639px)").matches) {
    if($('.home-banner').length) {
      $(".home-banner .page-banner__slide").each(function(){
        var $this = $(this);

        if($this.find('.page-banner__heading').text() !== '') {
          $this.find('.page-banner__overlay').removeClass('d-none');
        }

      });
    }
  }


  // Popup
  $(".popup-trigger").on('click', function () {
    var $target, $this;
    $this = $(this);
    $target = $this.data('target');
    $('.site-popup').fadeOut();
    $($target).fadeIn();
    $('.fs-overlay').fadeIn();

    if ($this.hasClass('card-popup-trigger')) {
      var $card, $cardImage, $cardHeading, $cardDescription;
      $card = $this.closest('.card');
      $cardImage = $card.find('.card__img').attr('src');
      $cardHeading = $card.find('.card__heading').text();
      $cardDescription = $card.find('.card__description').html();
      $($target).find('.site-popup__img img').attr('src', $cardImage);
      $($target).find('.site-popup__heading').text($cardHeading);
      $($target).find('.site-popup__description').html($cardDescription);


    }
  });

  $(".site-popup__close, .fs-overlay").on('click', closePopup);

  $(document).on('keydown', function(event) {
    if (event.key == "Escape") {
      closePopup();
    }
});


  // Tab Navigation
  $('.tab-navigation').each(function () {
    var $this = $(this);

    $this.find('.tab-head__item').on('click', function () {
      $this.find('.tab-head__item').removeClass('active');
      $(this).addClass('active');
      $this.find('.tab-pane').removeClass('d-block').addClass('d-none');
      $this.find($(this).data('label')).addClass('d-block').removeClass('d-none');

      formSelect();


      if ($(".stores-tab")) {
        $(".store-card").show();
        $(".store-alphabet-filters li").removeClass("bg-primary text-white");
      }


    });


  });


  // Cookie Policy
  const cookiePolicy = getCookie('Cookie Policy Status');

  if(cookiePolicy !== 'Accepted') {
    $(".cookie-policy-main").show();
  }
  
  $(".cookie-policy__btn").on('click', function(){
    $(this).closest('.cookie-policy').fadeOut();
    
    if(!$(this).hasClass('cookie-policy__settings')) {
      setCookie("Cookie Policy Status", "Accepted", 60)
      
    }

  });

  $(".cookie-policy__settings").on('click', function(){
    $(".cookie-policy-settings").fadeIn();
  });


  $(".search-btn").on("click", function () {
    search();
  });


  // Functions
  bodyScroll();
  formSelect();
  accordion();


});



// On Scroll
$(window).on("scroll", function () {
  bodyScroll();
});

$(window).on("load", function () {
    
  // Code to Scroll to other Pages
  if (window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      var url = window.location.href;
      var target = url.substring(url.indexOf('#'));
      $('html,body').animate({
          scrollTop: $(target).offset().top - 50
      }, 1000);

      window.location.replace("#");
      if (typeof window.history.replaceState == 'function') {
          history.replaceState({}, '', window.location.href.slice(0, -1));
      }
  }
});


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function closePopup() {
  $('.fs-overlay, .site-popup').fadeOut();
}


function search() {
  var query = $(".search-input").val();
  window.location = "search.html?terms=" + query;
  
}


function accordion() {

      $('.site-accordion__heading').on("click", function () {
          var $trigger = $(this);
          var $parent = $trigger.closest('.site-accordion__item');

          if (!$trigger.hasClass('active')) {
              $('.site-accordion__heading, .site-accordion__item').removeClass("active");

              $trigger.closest(".site-accordion").find(".site-accordion__content").stop(0, 0).slideUp();
              $trigger.addClass("active").next().stop(0, 0).slideDown();
              $parent.addClass('active');
          } else {
              $trigger.removeClass("active").next().stop(0, 0).slideUp();
              $parent.removeClass('active');
          }

          return false;
      });

  }

function formSelect() {

  if ($('.form-select').length) {
    $('.form-select').each(function () {
      var $this = $(this);
      $parent = $this.parent();

      $this.select2({
        minimumResultsForSearch: -1,
        dropdownParent: $parent
      });

      $this.on('select2:select', function (e) {
        $this.addClass('border-primary').prev().removeClass('text-muted').addClass('text-primary');
      });

    });

  }

}

function bodyScroll() {

  var scrollTop = $(window).scrollTop();

  if (scrollTop >= 30) {
    $(".site-header").addClass("site-header--sticky py-md-2").removeClass('py-md-4');
  } else {
    $(".site-header").removeClass("site-header--sticky py-md-2").addClass('py-md-4');
  }

}

