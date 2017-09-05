$( document ).ready(function() {
    var $body = $('body');

    var shift = false;
    $body.on('keydown keyup',function(e){
        if (e.type==="keydown") {
            if (shift) {
                if (e.which===38) {
                    Camera.z -= .01;
                } else if (e.which===40) {
                    Camera.z += .01;
                }
            } else {
                if (e.which===39) {
                    Camera.x -= 1;
                } else if (e.which===37) {
                    Camera.x += 1;
                } else if (e.which===40) {
                    Camera.y -= 1;
                } else if (e.which===38) {
                    Camera.y += 1;
                }
            }
            UpdateRender();
        }
    });

    $body.on('keydown',function(e){
        if (e.which === 16) {
            shift = true;
        }
    });
    $body.on('keyup',function(e){
        if (e.which === 16) {
            shift = false;
        }
    });

    Init();
    MakePoster();
    UpdateRender();
});
