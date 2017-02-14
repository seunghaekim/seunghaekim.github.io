// $('.grid').masonry({
//     itemSelector: '.grid-item',
//     columnWidth: 320
// })
console.log();
var target_width = $('.work-portfolio').width();
var masonry_column_width = target_width/3;
var masonry_gutter = 10;
var masonry_option = {
    itemSelector: '.grid-item',
    columnWidth: masonry_column_width,
    gutter: masonry_gutter
};

grid_item_styles = {
    'width': masonry_column_width,
    'margin-bottom': masonry_gutter
};

$('.grid-item').css(grid_item_styles);

$(document).ready(function() {
});
