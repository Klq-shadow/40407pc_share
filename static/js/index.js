function isMobile() {
	return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
}
isMobile() && !location.host.indexOf('www') && (location.href = location.href.replace('//www', '//m'));

function keycodes(){
  // 禁止右键
  document.oncontextmenu=function(){return false};
  document.onkeydown = function(e) {
      e = window.event || e;
      var k = e.keyCode;
      //屏蔽ctrl+u，F12键
      if ((e.ctrlKey == true && k == 85) || k == 123) {
          e.keyCode = 0;
          e.returnValue = false;
          e.cancelBubble = true;
          return false;
      }
  }
}

$(function () {
    //统计浏览代码
    (function(){
	    var browse_data = {};
	    var id = $("#id").val();
	    var name = $("#type").val();
		var pdata = window.pdata || {};
	    if (typeof pdata !== 'undefined' && id && name) {
	        var classify = pdata.classify;
	        if(['game','information'].indexOf(name)>=0) {
	            if(name=='game' && classify==2) {
	                name = 'soft';
	            }
	            var i = new Image();
	             i.src = BaseUrl + "ajax/stat?type=browse&name="+name+"&id="+id;
	        }
	    }
	})();

	function countDown() {
		var pdata = window.pdata || {};
	    var id = $("#id").val();
	    var name = $("#type").val();
	    if (typeof pdata !== 'undefined' && id && name) {
	        var classify = pdata.classify;
	        if(['game','information'].indexOf(name)>=0) {
	            if(name=='game' && classify==2) {
	                name = 'soft';
	            }
	            var i = new Image();
	             i.src = BaseUrl + "/ajax/stat?type=down&name="+name+"&id="+id;
	        }
	    }
	}

	//对链接重定向
	$("a").click(function () {
		var appid = $(this).data('appid');
		var url = $(this).attr('href');
		var data = {};
		if (!appid || isNaN(appid)) return;
		$.getJSON(BaseUrl + 'downs/url?callback=?', {
			"id": appid
		}, function (r) {
			if (r && r.status == 'success') {
				data = r.data;
			}
			if (data.url) {
				if (data.report) {
					var i = new Image();
					i.src = data.report;
				}
				location.href = data.url;
			} else {
				//location.href = url;
			}
		});
		return false
	});

	//优化详情页下载链
	var links = $('.downlinks');
	if (links.length > 0) {
		var appid = links.data('appid');
		var data = {};
		var lock = false;
		var report_a = false;
		var report_i = false;
		var report_w = false;
		var pdata = window.pdata || {};
		var dlink = pdata['dlink'] || 0;
		if (dlink == 1) {
			$('.downlinks .no').show();
			$('.downlinks .android').hide();
			$('.downlinks .ios').hide();
			$('.downlinks .pc').hide();
		} else if (!lock && appid && !isNaN(appid)) {
			$.getJSON(BaseUrl + 'downs/url?callback=?', {
				"id": appid
			}, function (r) {
				if (r && r.status == 'success') {
					data = r.data;
				}
				if (!data.ios_url && !data.android_url) {
					$('.downlinks .no').show();
				} else {
					$('.downlinks .no').hide();
				}

				if (data.pc_url) {
					$('.downlinks .pc').show().click(function () {
						if (!report_w && data.pc_report) {
							var i = new Image();
							i.src = data.pc_report;
							report_w = true;

							countDown();
						}
						//location.href = data.pc_url;
						window.open(data.pc_url);
					});
				}


				if (data.ios_url) {
					$('.downlinks .ios').show().click(function () {
						if (data.report && !report_i) {
							var i = new Image();
							i.src = data.report + '&type=ios';
							report_i = true

							countDown();
						}
						//location.href = data.ios_url;
						window.open(data.ios_url);
					});
				} else {
					$('.downlinks .ios').hide();
				}
				if (data.android_url) {
					$('.downlinks .android').show().click(function () {
						if (data.report && !report_a) {
							var i = new Image();
							i.src = data.report + '&type=android';
							report_a = true

							countDown();
						}
						//location.href = data.android_url;
						// window.open(data.android_url);
						window.open(base_url + 'downloads/' + appid);
					});
				} else {
					$('.downlinks .android').hide();
				}
			});
			lock = true;
		}
	}


	// tab切换
	$('.tab_menu').find('li').on('click', function () {
		var times = $(this).index();
		$(this).addClass('current').siblings().removeClass('current');
		$(this).parents('.tab_box').find('.sub_box').eq(times).show().siblings().hide();
	})

	$('.small_tab_menu').find('li').on('click', function () {
		var times = $(this).index();
		$(this).addClass('current').siblings().removeClass('current');
		$(this).parents('.small_tab_box').find('.small_sub_box').eq(times).show().siblings().hide();
	})

	// 轮播
	var slider1L = $('#slider1').find('ul li').length,
		slider2L = $('#slider2').find('ul li').length;

	$('#slider1').find('.dot span').click(function () {
		sliderNum = $(this).index();
		$(this).addClass('current').siblings().removeClass();
		$(this).parents(".slider").find("ul li").eq(sliderNum).show().siblings().hide();
	});
	$('#slider2').find('.dot span').click(function () {
		sliderNum2 = $(this).index();
		$(this).addClass('current').siblings().removeClass();
		$(this).parents(".slider").find("ul li").eq(sliderNum2).show().siblings().hide();
	});
	var sliderNum = 0,
		sliderNum2 = 0;

	function slider1() {
		$('#slider1').find(".dot span").eq(sliderNum).addClass('current').siblings().removeClass();
		$('#slider1').find("ul li").eq(sliderNum).show().siblings().hide();
	};

	function slider2() {
		$('#slider2').find(".dot span").eq(sliderNum2).addClass('current').siblings().removeClass();
		$('#slider2').find("ul li").eq(sliderNum2).show().siblings().hide();
	};

	//自动轮播
	var zidong1 = setInterval(run1, 4000);

	function run1() {
		sliderNum++;
		if (sliderNum >= slider1L) {
			sliderNum = 0;
		};
		slider1();
	};
	$('#slider1').hover(function () {
		clearInterval(zidong1);
	}, function () {
		zidong1 = setInterval(run1, 4000);
	});

	var zidong2 = setInterval(run2, 4000);

	function run2() {
		sliderNum2++;
		if (sliderNum2 >= slider2L) {
			sliderNum2 = 0;
		};
		slider2();
	};
	$('#slider2').hover(function () {
		clearInterval(zidong2);
	}, function () {
		zidong2 = setInterval(run2, 4000);
	});



	// 双重轮播
	$('.small_tab_menu li:nth-child(11n)').after('<li style="opacity:0"></li>'); //添加一个空白div
	$('.small_tab_box .small_sub_box:nth-child(11n)').after('<div class="small_sub_box"></div>'); //添加一个空白div

	var smallPre1 = 0;
	var smallPre2 = 0;
	var smallPre3 = 0;
	var smallPre4 = 0;
	var smallMenuLength1 = Math.ceil($('#smallTab1').find('li').length / 12);
	var smallMenuLength2 = Math.ceil($('#smallTab2').find('li').length / 12);
	var smallMenuLength3 = Math.ceil($('#smallTab3').find('li').length / 12);
	var smallMenuLength4 = Math.ceil($('#smallTab4').find('li').length / 12);


	for (var i = 0; i < smallMenuLength1; i++) {
		$('#dotTab1').append('<i></i>');
	}
	for (var i = 0; i < smallMenuLength2; i++) {
		$('#dotTab2').append('<i></i>');
	}
	for (var i = 0; i < smallMenuLength3; i++) {
		$('#dotTab3').append('<i></i>');
	}
	for (var i = 0; i < smallMenuLength4; i++) {
		$('#dotTab4').append('<i></i>');
	}
	$('.dot_tab_box').find('i:first').addClass('current'); //绿点


	// 左右切换
	$('#smallTab1').find('.next').on('click', function () {
		smallPre1++;
		if (smallPre1 >= Math.ceil($(this).parents('.small_tab_menu').find('li').length / 12)) {
			smallPre1 = 0;
		}
		$(this).parents('.small_tab_menu').find('ul').css({
			'top': -196 * smallPre1
		});
		$(this).parents('.small_tab_menu').find('.dot_tab_box i').eq(smallPre1).addClass('current').siblings().removeClass('current');
	})
	$('#smallTab2').find('.next').on('click', function () {
		smallPre2++;
		if (smallPre2 >= Math.ceil($(this).parents('.small_tab_menu').find('li').length / 12)) {
			smallPre2 = 0;
		}
		$(this).parents('.small_tab_menu').find('ul').css({
			'top': -196 * smallPre2
		});
		$(this).parents('.small_tab_menu').find('.dot_tab_box i').eq(smallPre2).addClass('current').siblings().removeClass('current');
	})
	$('#smallTab3').find('.next').on('click', function () {
		smallPre3++;
		if (smallPre3 >= Math.ceil($(this).parents('.small_tab_menu').find('li').length / 12)) {
			smallPre3 = 0;
		}
		$(this).parents('.small_tab_menu').find('ul').css({
			'top': -196 * smallPre3
		});
		$(this).parents('.small_tab_menu').find('.dot_tab_box i').eq(smallPre3).addClass('current').siblings().removeClass('current');
	})
	$('#smallTab4').find('.next').on('click', function () {
		smallPre4++;
		if (smallPre4 >= Math.ceil($(this).parents('.small_tab_menu').find('li').length / 12)) {
			smallPre4 = 0;
		}
		$(this).parents('.small_tab_menu').find('ul').css({
			'top': -196 * smallPre4
		});
		$(this).parents('.small_tab_menu').find('.dot_tab_box i').eq(smallPre4).addClass('current').siblings().removeClass('current');
	})

	$('#smallTab1').find('.pre').on('click', function () {
		smallPre1--;
		if (smallPre1 < 0) {
			smallPre1 = Math.ceil($(this).parents('.small_tab_menu').find('li').length / 12) - 1;
		}
		$(this).parents('.small_tab_menu').find('ul').css({
			'top': -196 * smallPre1
		});
		$(this).parents('.small_tab_menu').find('.dot_tab_box i').eq(smallPre1).addClass('current').siblings().removeClass('current');
	})
	$('#smallTab2').find('.pre').on('click', function () {
		smallPre2--;
		if (smallPre2 < 0) {
			smallPre2 = Math.ceil($(this).parents('.small_tab_menu').find('li').length / 12) - 1;
		}
		$(this).parents('.small_tab_menu').find('ul').css({
			'top': -196 * smallPre2
		});
		$(this).parents('.small_tab_menu').find('.dot_tab_box i').eq(smallPre2).addClass('current').siblings().removeClass('current');
	})
	$('#smallTab3').find('.pre').on('click', function () {
		smallPre3--;
		if (smallPre3 < 0) {
			smallPre3 = Math.ceil($(this).parents('.small_tab_menu').find('li').length / 12) - 1;
		}
		$(this).parents('.small_tab_menu').find('ul').css({
			'top': -196 * smallPre3
		});
		$(this).parents('.small_tab_menu').find('.dot_tab_box i').eq(smallPre3).addClass('current').siblings().removeClass('current');
	})
	$('#smallTab4').find('.pre').on('click', function () {
		smallPre4--;
		if (smallPre4 < 0) {
			smallPre4 = Math.ceil($(this).parents('.small_tab_menu').find('li').length / 12) - 1;
		}
		$(this).parents('.small_tab_menu').find('ul').css({
			'top': -196 * smallPre4
		});
		$(this).parents('.small_tab_menu').find('.dot_tab_box i').eq(smallPre4).addClass('current').siblings().removeClass('current');
	})


	// 展开详情
	/* if ($('#detailReal').find('.cont').height() <= 770) {
		$('#detailReal').css('height', 'auto');
		$('#openDetail').remove();
	};
	$('#openDetail').on('click', function () {
		if ($(this).find('i').attr('class') === 'down') {
			$(this).html('收起' + '<i class="up"></i>');
			$('#detailReal').css('height', 'auto');
		} else {
			$(this).html('展开' + '<i class="down"></i>');
			$('#detailReal').css('height', 770);
		}
	}) */

	// tfBox
	$('.tfBox').find('li').hover(function () {
		$(this).find('.tBox').removeClass('hide').siblings('.fBox').addClass('hide');
		$(this).siblings().find('.tBox').addClass('hide').siblings('.fBox').removeClass('hide');
	});


	//专区图鉴切换
	$(".zq_nav .a").on('click', function () {
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$(this).parents('.zq_tu').find('.info_list').addClass('hide').eq(index).removeClass('hide');
	})

});

// 滚动条左名滚动
function hscroll2(id, flag, min, move, childlevel, time) {
	min = min || 2;
	move = move || 1;
	time = time || 300;
	childlevel = childlevel || 1;
	var parent = $("#" + id + ":not(:animated)");
	if (childlevel == 1) {
		var kids = parent.children();
	} else {
		var kids = parent.children().eq(0).children();
	}

	if (kids.length < min) return false;
	var kid = kids.eq(0);
	var kidWidth = kid.width() + parseInt(kid.css("paddingLeft")) + parseInt(kid.css("paddingRight")) + parseInt(kid.css("marginLeft")) + parseInt(kid.css("marginRight"));
	var margin = (kidWidth * move);
	if (flag == "left") {
		var s = parent.scrollLeft() + margin;
		parent.animate({
			'scrollLeft': s
		}, time);
	} else {
		var s = parent.scrollLeft() - margin;
		parent.animate({
			'scrollLeft': s
		}, time);
	}
	return false;
}

//详情页
$(function () {
	$('.qrcode').each(function () {
		var url = $(this).attr('url');
		var id = $(this).attr('id');
		makeQRCode(id, url, 114, 114);
		$(this).removeAttr('title');
	});

	//生成二维码图片
	function makeQRCode(codes, url, width, height) {
		var qrcode = new QRCode(codes, {
			width: width,
			height: height
		});
		qrcode.makeCode(url);
	}

	var baseUrl = $('#base_url').val();


	window.layer = window.layer || {
		msg: function (msg, icon) {
			alert(msg)
		}
	};




	// 首页轮播
	if (typeof Swiper !== 'undefined') {
		var h_swiper = new Swiper('.lb', {
			autoplay: true,
			loop: true,
			autoplay: {
				disableOnInteraction: false
			},
			pagination: {
				el: '.lb-swiper-pagination',
			},
		});
	}




	// 首页标签排列
	//均匀化各项平均宽度
	function avg_width($point, add_width) {
		//创建一个表示元素索引范围的数组
		var arr = range(h_index, $point.index());
		var add = Math.floor(add_width / arr.length);
		var end = add_width % arr.length;
		for (var i in arr) {
			var $item = h_$items.eq(arr[i]);
			$item.width($item.width() + add);
		}
		$point.width($point.width() + end);
		$point.css('margin-right', 0);
		h_index = $point.index() + 1;
	}
	//生成指定范围的数组
	function range(low, high, step) {
		var matrix = [];
		var inival, endval, plus;
		var walker = step || 1;
		var chars = false;
		if (!isNaN(low) && !isNaN(high)) {
			inival = low;
			endval = high
		} else if (isNaN(low) && isNaN(high)) {
			chars = true;
			inival = low.charCodeAt(0);
			endval = high.charCodeAt(0)
		} else {
			inival = (isNaN(low) ? 0 : low);
			endval = (isNaN(high) ? 0 : high)
		}
		plus = ((inival > endval) ? false : true);
		if (plus) {
			while (inival <= endval) {
				var char_code = String.fromCharCode(inival);
				matrix.push(((chars) ? char_code :
					inival));
				inival += walker
			}
		} else {
			while (inival >= endval) {
				var char_code = String.fromCharCode(inival);
				matrix.push(((chars) ? char_code : inival));
				inival -= walker
			}
		}
		return matrix;
	}
	var h_$target = null;
	var h_$items = null;
	var h_max_width = null; //box宽度
	var h_count = null; //所有单元个数统计
	var h_index = 0; //当前初始索引位置
	var h_tmp = 0;
	//自动均匀布局标签
	function labelFn(a, b) {
		h_$target = $(a);
		h_$items = $(b);
		h_max_width = h_$target.width(); //box宽度
		h_count = h_$items.size(); //所有单元个数统计
		h_index = 0; //当前初始索引位置
		h_tmp = 0;
		h_$items.each(function () {
			var $curr = $(this); //当前年item的DOM对象
			var outer_width = $curr.outerWidth(true); //区块宽度，含边框
			var border_width = outer_width - $curr.outerWidth(); //左右边框宽度
			h_tmp += outer_width; //计算每个item相加的值
			//遍历单元凑齐宽度
			if (h_tmp > h_max_width) {
				var $point = $curr.prev();
				var plus = h_max_width - (h_tmp - outer_width);
				avg_width($point, plus + border_width);
				h_tmp = outer_width;
			}
			//最后一个元素调整
			if ($curr.is(':last-child')) {

				var plus = h_max_width - h_tmp;
				avg_width($curr, plus + border_width);
			}
		});
	}
	labelFn('.main_Tag', '.main_Tag a');
});
