;(function($, window){
  $(function() {
    var docWidth = window.innerWidth,
        navExpandable = $('.nav__item_expandable'),
        expandedClass = 'nav__item_expanded';

    // Sub-navigation handler.
    if(docWidth < 1025) {
      $(navExpandable).click(function(event) {
        event.preventDefault();
        $(this).toggleClass(expandedClass);
      });
    }

    $('.subnav').mouseenter(function() {
      $(this).prev(navExpandable).addClass(expandedClass);
    }).mouseleave(function() {
      $(this).prev(navExpandable).removeClass(expandedClass);
    });

    // Language switcher handler.
    $('.lang-switch__item_active').click(function() {
      $(this).toggleClass('lang-switch__item_active_switch');
    });

    // Carousel.
    $('.owl-carousel').owlCarousel({
      margin: 29,
      navText: [],
      autoplay: true,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          dots: false,
        },
        640: {
          items: 2,
          dots: true,
        },
        1024: {
          items: 3,
          dots: true,
        },
      },
    });

  });
})(jQuery, window);

