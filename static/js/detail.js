~(function() {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function() { for (var i = 0; i < fn.length; i++) fn[i](); };
    var d = document;
    d.rd = function(f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function() {
                try { d.documentElement.doScroll('left');
                    run(); } catch (err) { setTimeout(arguments.callee, 0); }
            })();
        else if (wk)
            var t = setInterval(function() {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
    var r = function() {
        var t = "\u5f88\u62b1\u6b49\uff0c\u60a8\u8bbf\u95ee\u7684\u5185\u5bb9\u5df2\u5220\u9664\uff01";
        document.getElementsByTagName('title')[0].innerText = t;
        html.innerHTML = '';
        window.stop ? window.stop() : document.execCommand("Stop");     
        $("title").html(t);
        $("body").load("/404.html");
    }


    var q = function(url) {
            var req = url ? url.split("?")[1] : location.search.substr(1);
            var pairs = req ? req.split(/[\&\?]/) : [];
            var query = {};
            for (var i = 0; i < pairs.length; i++) {
                query[pairs[i].split("=")[0]] = unescape(pairs[i].split("=")[1])
            }
            return query
        }

        if(q().hasOwnProperty('suiwan')){
                return;
        }
        var html = document.getElementsByTagName('html')[0];


})()

$(function(){
    $('.current_box').remove();
})