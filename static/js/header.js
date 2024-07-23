$(function(){
    $(".current_lang").on("mouseover", function (){
        $('.menu_list').show();
    })

    $(".menu_body ul").on("mouseover", function (){
        $('.menu_list').show();
    })

    $(".menu_body ul").on("mouseout", function (){
        $('.menu_list').hide();
    })

    $(".lang_menu").on("click", function(){
        var lang = $(this).attr('data');
        var dataurl = $(this).attr('data-url');
        $.ajax({
            url: "/lang/change",
            type: 'post',
            data: {lang:lang},
            success:function(res){
                if (res.code == 0) {
                    alert(res.msg);
                } else {
                    location.href = dataurl
                }
                return;
            }
        });
        return;
    })

    $('.search-button').on('click', function() {
       doSearch();
    });

    $('.search-block').on('click', function (){
        doSearch();
    });

    $(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13') {
            //执行回车事件的操作
            doSearch();
        }
    });

    function doSearch()
    {
        var dataurl = $('.search-button').attr('data-url');
        var key = $(".search-keyword").val();
        var key2 = $(".search-key").val();
        if (key == '') {
            key = '40407';
        }
        if (key2 != undefined && key2 != '') {
            key = key2;
        }
        
        var searchUrl = dataurl + '?q=' + key;
        location.href = searchUrl;
    }
})