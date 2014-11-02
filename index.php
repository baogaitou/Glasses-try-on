<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title></title>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<meta name="author" content="liuyang@gmail.com">
		<meta name="keywords" content="">
		<meta name="description" content="">
		<link rel="stylesheet" type="text/css" href="ucan.css" />
		<script type="text/javascript" src="mootools.js"></script>
		<script type="text/javascript" src="glass.js"></script>
		<script type="text/javascript">
		<!--
			var scriptUrl = 'http://192.168.0.1/glass/';
			window.addEvent('domready', function() {
				UCAN.glass.init();
			})
		//-->
		</script>
		<!--[if lt IE 7]>
		<script language="JavaScript">
			function pngFix()
			{
				var arVersion = navigator.appVersion.split("MSIE")
				var version = parseFloat(arVersion[1])
				if ((version >= 5.5) && (document.body.filters))
				{
					for(var j=0; j<document.images.length; j++)
					{
						var img = document.images[j]
						var imgName = img.src.toUpperCase()
						if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
						{
							var imgID = (img.id) ? "id='" + img.id + "' " : ""
							var imgClass = (img.className) ? "class='" + img.className + "' " : ""
							var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
							var imgStyle = "display:inline-block;" + img.style.cssText
							if (img.align == "left") imgStyle = "float:left;" + imgStyle
							if (img.align == "right") imgStyle = "float:right;" + imgStyle
							if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
							var strNewHTML = "<span " + imgID + imgClass + imgTitle
							+ " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
							+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
							+ "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
							img.outerHTML = strNewHTML
							j = j-1
						}
					}
				}
			}
			window.attachEvent("onload", pngFix);
		</script>
		<![endif]-->
	</head>
	<body>
		<div class="page">
			<div class="col-1">
				<!-- avatar img start -->
				<div id="glassFrame" class="glassFrame">
					<div class="drager" id="drager" style="display:none">&nbsp;</div>
					<img src="imgs/m/m_1.jpg" width="403" height="500" border="0" title="" id="glassAvatar" class="glassAvatar" style="left:0px;top:0px" />
					<img src="imgs/loading.gif" width="16" height="16" border="0" title="" class="loading" style="top:2px;left:372px"  id="loading" />
					<img src="imgs/dragit.gif" width="127" height="52" border="0" title="" class="dragInfo" style="top:82px;left:52px;display:none"  id="dragInfo" />
					<!-- control area start -->
					<div class="control-area" id="control-area" style="display:none">
						<!--
						<div>
							快速调整:&nbsp;<input type="submit" name="button3" id="moveUpQuick" value="向上" class="btn-control"/><input type="submit" name="button4" id="moveDownQuick" value="向下" class="btn-control"/><input type="submit" name="button5" id="moveLeftQuick" value="向左" class="btn-control"/><input type="submit" name="button6" id="moveRightQuick" value="向右" class="btn-control"/><input type="submit" name="button7" id="zoomLargeQuick" value="放大" class="btn-control"/><input type="submit" name="button8" id="zoomSmallQuick" value="缩小" class="btn-control"/>
						</div>
						-->
						<div>
							精确调整:&nbsp;<input type="submit" name="button9" id="moveUp" value="向上" class="btn-control"/><input type="submit" name="button10" id="moveDown" value="向下" class="btn-control"/><input type="submit" name="button11" id="moveLeft" value="向左" class="btn-control"/><input type="submit" name="button12" id="moveRight" value="向右" class="btn-control"/><!--<input type="submit" name="button13" id="zoomLarge" value="放大" class="btn-control"/><input type="submit" name="button14" id="zoomSmall" value="缩小" class="btn-control"/>-->
						</div>
					</div>
					<div class="control-area-background" id="control-area-background" style="display:none">&nbsp;</div>
					<div class="avtzoom" id="avatar-zoom" style="display:block">
						<div id="myElement" class="slider">
							<div class="knob">
							</div>
						</div>
					</div>
					<div class="glasszoom" id="glass-zoom" style="display:block">
						<div id="glassSlider" class="slider">
							<div class="knob">
							</div>
						</div>
					</div>
					<!-- control area end -->
				</div>
				<!-- avatar img end -->
				<div class="text-desc">用户<a href="">注册登录</a>后，可以上传自己的照片，体验试戴功能.</div>
				<!-- select avatar start -->
				<!--
				<div>
					<ul class="thumb" id="avatar-list">
						<li><a href="javascript:void 0"><img src="imgs/m/m_1_thumb.jpg" width="80" height="80" border="0" title="" /></a></li>
						<li><a href="javascript:void 0"><img src="imgs/m/m_2_thumb.jpg" width="80" height="80" border="0" title="" /></a></li>
						<li><a href="javascript:void 0"><img src="imgs/m/m_3_thumb.jpg" width="80" height="80" border="0" title="" /></a></li>
						<li><a href="javascript:void 0"><img src="imgs/m/m_1_thumb.jpg" width="80" height="80" border="0" title="" /></a></li>
					</ul>
					<div class="clr"></div>
				</div>
				-->
				<!-- select avatar end -->
			</div>
			<div class="col-2">
				<div class="glass-select-container">
					<!-- select area start -->
						<div class="hi-light">
							<input type="radio" name="RadioGroup1" value="全部" id="RadioGroup1_1" checked="true" /><label>全部</label><input type="radio" name="RadioGroup1" value="镜架" id="RadioGroup1_2" /><label>镜架</label><input type="radio" name="RadioGroup1" value="太阳镜" id="RadioGroup1_3" /><label>太阳镜</label><input type="radio" name="RadioGroup1" value="电脑专用镜" id="RadioGroup1_4" /><label>电脑专用镜</label><input type="radio" name="RadioGroup1" value="司机专用镜" id="RadioGroup1_5" /><label>司机专用镜</label><input type="radio" name="RadioGroup1" value="老花镜" id="RadioGroup1_6" /><label>老花镜</label>
						</div>
						<div>
							品牌<select name="brand"><option selected="selected">眼镜品牌</option><option>眼镜品牌1</option><option>眼镜品牌2</option></select>
							颜色<select size="1" name="color"><option selected="selected">眼镜颜色</option><option>红</option><option>蓝</option></select>
							框形<select size="1" name="form"><option>眼镜框形</option><option>方正</option><option>椭圆</option></select>
							圈形<select size="1" name="form2"><option>眼镜圈形</option><option>方正</option><option>椭圆</option></select>
						</div>
						<div class="hi-light">
							材料<select name="material"><option selected="selected">眼镜材质</option><option>眼镜材质1</option><option>眼镜材质2</option></select>
							性别<select class="sex" name="sex"><option selected="selected">您的性别</option><option>男</option><option>女</option></select>
							价格<input name="" type="text" class="input" size="10"/>至<input name="" type="text" class="input" size="10"/>元
						</div>
						<div>
							镜框尺寸<input name="" type="text" class="input" size="4"/>mm
							鼻梁尺寸<input name="" type="text" class="input" size="4"/>mm
							镜腿尺寸<input name="" type="text" class="input" size="4"/>mm
							FPD<input name="" type="text" class="input" size="4"/>mm
						</div>
						<div class="hi-light">
							关键字:<input type="text" class="input" name=""/><input name="" type="submit" value="查询" id="glassQuery" /><input name="" type="reset" value="重置" />
						</div>
					<!-- select area end -->
				</div>
				<div>
					<!-- recommend glass area start -->
					<div style="margin:15px 0;height:195px" id="glass-container">
						<ul class="thumb" id="glass-list">
							<li><a href="javascript:void 0"><img src="imgs/g/g_1_thumb.jpg" width="150" height="75" border="0" title="" /></a><span>劳利斯 XLL50248</span></li>
							<li><a href="javascript:void 0"><img src="imgs/g/g_2_thumb.jpg" width="150" height="75" border="0" title="" /></a><span>劳利斯 XLL50248</span></li>
							<li><a href="javascript:void 0"><img src="imgs/g/g_3_thumb.jpg" width="150" height="75" border="0" title="" /></a><span>劳利斯 XLL50248</span></li>
							<li><a href="javascript:void 0"><img src="imgs/g/g_1_thumb.jpg" width="150" height="75" border="0" title="" /></a><span>劳利斯 XLL50248</span></li>
							<li><a href="javascript:void 0"><img src="imgs/g/g_2_thumb.jpg" width="150" height="75" border="0" title="" /></a><span>劳利斯 XLL50248</span></li>
							<li><a href="javascript:void 0"><img src="imgs/g/g_3_thumb.jpg" width="150" height="75" border="0" title="" /></a><span>劳利斯 XLL50248</span></li>
						</ul>
						<div class="clr"></div>
					</div>
					<!-- recommend glass area end -->
					<div class="pager">
						共6页/59条 <a href="#">首页</a>&nbsp;<span>1</span>&nbsp;<a href="#">2</a>&nbsp;<a href="#">3</a>&nbsp;<a href="#">4</a>&nbsp;<a href="#">5</a>&nbsp;<a href="#">6</a>&nbsp;<a href="#">下一页</a>&nbsp;<a href="#">末页</a>
					</div>
					<div class="glass-info" id="glass-info" style="display:none"></div>
					<p>&nbsp;</p>
				</div>
				<div>
					<!--control button start-->
					&nbsp;
					<!--control button end -->
				</div>
			</div>
			<div class="clr"></div>
		</div>
	</body>
</html>