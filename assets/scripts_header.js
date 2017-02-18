var vh_center = ".--vh-center";

function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
};

function tangoMetre(tango, direction) {
    var result = $(tango).css(direction);
    result = result.split("px");

    return Number(result[0]);
};

function windowCentre(tango) {
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var tangoWidth = tangoMetre(vh_center, "width");
    var tangoHeight = tangoMetre(vh_center, "height")
    var position = {
        "top": function() {
            this.top = winHeight/2-tangoHeight/2;

            return Math.round(this.top);
        },
        "left": function() {
            this.left = winWidth/2-tangoWidth/2;

            return Math.round(this.left);
        },
        "z-index": -10,
        "position": "fixed"
    };

    $(tango).css(position);
};

function build_gallery(ar, tango) {
    var key_list = Object.keys(ar),
        key_length = key_list.length;

    var default_image = {
        "key": key_list[randomRange(0, key_length - 1)]
    };
    default_image.img = function(){
        var features_array = ar[default_image.key]["features"];
        var features_length = features_array.length - 1;
        var feature = features_array[randomRange(0, features_length)];
        var feature_date = ar[default_image.key]["date"];
        var feature_url = [
            site_base_url,
            "features",
            feature_date,
            feature
        ];
        return feature_url.join("/");
    };

    $("<img />", {
        "class": "gallery-item gallery-default",
        "src": default_image.img(),
    }).appendTo('.gallery');

    for (var i = 0; i < key_length; i++) {
        var img_key = key_list[i],
            img_id = "#" + img_key,
            rand = randomRange(0, ar[img_key]["features"].length - 1),
            img_rand_url = ar[img_key]["features"][rand],

            img_url = [site_base_url, "features", ar[img_key]["date"], img_rand_url],

            img_url = img_url.join("/");

            $("<img />", {
                "id": img_key,
                "class": "gallery-item toHidden",
                "src": img_url,
            }).appendTo(tango);
    };


};
