$(document).ready(function() {
    // windowCentre(vh_center);
    $(".metadata>.pagetitle>h1>").hover(
        function(){
            var list_class = $(this).attr("class"),
                gallery_id = "#" + list_class;
            $(gallery_id).toggleClass('toHidden');
            $(".gallery-default").toggleClass('toHidden');
            // windowCentre(vh_center);
    });
});

$("#post-content").ready(function(){
    console.log("sadjklfasdf");
});

$(window).ready(function(){

    // windowCentre(vh_center);
    // console.log("asdfdsa");
});

$(window).resize(function(){
    // windowCentre(vh_center);
});
