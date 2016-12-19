
$(document).ready(function($){
    var $container = $('.masonry-container');
    setTimeout(function(){
        // initialize
        $container.masonry({
          columnWidth: '.grid-item',
          itemSelector: '.grid-item'
        });
    }, 100);
});
