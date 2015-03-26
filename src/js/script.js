;(function($, window){
  $(function() {
    var docWidth = window.innerWidth,
        navExpandable = $('.nav__item_expandable'),
        expandedClass = 'nav__item_expanded';

    // Sub-navigation handler.
    if(docWidth < 1140) {
      $(navExpandable).click(function(event) {
        event.preventDefault();
        $(this).toogleClass(expandedClass);
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

  });
})(jQuery, window);

