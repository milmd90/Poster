$( document ).ready(function() {
    var $body = $('body');

    var shift = false;
    $body.on('keydown keyup',function(e){
        var stepSize = 5;
        if (e.type==="keydown") {
            if (shift) {
                if (e.which===38) {
                    Camera.z *= .95;
                } else if (e.which===40) {
                    Camera.z *= 1.05;
                }
            } else {
                if (e.which===39) {
                    Camera.x += stepSize;
                } else if (e.which===37) {
                    Camera.x -= stepSize;
                } else if (e.which===40) {
                    Camera.y += stepSize;
                } else if (e.which===38) {
                    Camera.y -= stepSize;
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
    // UpdateRender();
    ContRender();
});
