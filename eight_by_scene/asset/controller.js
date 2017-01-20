var scene = {
    by: 8,
    scene_no: 0,
    scene_duration: 40,
    drop_new_grid: function(target) {
        this.scene_no = this.scene_no + 1;
        var by = this.by,
            sceneid = 'scene' + this.scene_no;
            code_wrapper = '#def_scene .' + sceneid;
        scene.operator[sceneid] = new Object;

        var newCode_def =
            $('<p></p>').attr('class', sceneid);
        $('#def_scene').append(newCode_def);

        var newCode_call =
            $('<p></p>').attr('class', sceneid).append('showScene(' + sceneid + ', ' + scene.scene_duration + ')');
        $('#call_scene').append(newCode_call);

        var newScene =
        $('<div></div>').
            attr('id', sceneid).
            append(
                function(){
                // add Header

                $(code_wrapper).append('<span class="def">' + sceneid + ' = ' + '</span>{');

                $(this).append( '<h1>scene no.' + scene.scene_no + '</h1>' );
                $(this).append(
                    $('<div></div>')
                    .attr('class','frame')
                    .append(
                        function() {
                            for (var i = 0; i < by; i++) {
                                var rowid = 'row_' + i;
                                scene.operator[sceneid][rowid] = new Object;

                                var row = $('<div class="' + rowid + '"></div>').append(
                                    function() {
                                        // add Column
                                        var col = new Array();
                                        for (var j = 0; j < by; j++){
                                            var colid = 'col_' + j,
                                                el = '<input class="' + colid + '">';
                                                scene.operator[sceneid][rowid][colid] =  false;
                                                col[j] = $(el).attr('type','checkbox');
                                            };
                                            for (var j = 0; j < 8; j++) {
                                                $(this).html(col);
                                            };
                                        }
                                    );

                                    var code_row = $('<span class="' + rowid + '"></span>').append(
                                        function() {
                                            // add Column
                                            var col = new Array();
                                            for (var j = 0; j < by; j++){
                                                var colid = 'col_' + j,
                                                    el = '<span>0</span>';
                                                    col[j] = $(el).attr('class',colid);
                                                };
                                                for (var j = 0; j < 8; j++) {
                                                    $(this).html(col);
                                                    $(this).append(',');
                                                };
                                            }
                                    );

                                    $(code_wrapper).append(code_row)
                                    $(this).append(row);

                                }
                            }));
                        }
                    );
                    $(target).append(newScene);
                    $(code_wrapper).append('};')
                },
    operator: new Object(),
    inspector: function (target) {
        $(target).click(function(){
            var col = $(this).attr('class'),
                row = $(this).parents().attr('class'),
                id  = $(this).parents().parents().parents().attr('id'),
                code = '.code #def_scene .' + id + ' .' + row + ' .' + col,
                chk;
            if ( $(target).is(':checked') ) {
                scene.operator[id][row][col] = true;
                $(code).text('1');
                console.log(id, row, col + ' is checked');
            } else {
                scene.operator[id][row][col] = false;
                $(code).text('0');
                console.log(id, row, col + ' is unchecked');
            }
        });
    },
    code_body: 'void setup() {<br/>for(int pin = 0;pin<22;pin++){pinMode(pin,OUTPUT);}for(int pin = 14;pin<22;pin++){digitalWrite(pin,LOW);}for(int pin = 0;pin<8;pin++){digitalWrite(pin,HIGH);}}void setonoff(byte state){for(int i = 0;i<8;i++){int a = ((state>>i&0x01)==0x01? LOW:HIGH);digitalWrite(i+14,a);}}void setScene(byte scene[8]) {for(int i =0 ;i<8;i++){setonoff(scene[i]);digitalWrite(i,HIGH);delay(1);digitalWrite(i,LOW);}}void showScene(byte scene[8], int duration) {for(int i =0 ;i<duration/2.5;i++){setScene(scene);}}void loop() {'
};


$(document).ready(function(){
    scene.drop_new_grid('#storyboard');
    scene.inspector('input[type="checkbox"]');
    $('.add_new').on('click', function(){
        scene.drop_new_grid('#storyboard')
        scene.inspector('input[type="checkbox"]');
    });
    $('.code #scene_body').append(scene.code_body);
    console.log(scene.code_body);
});
