if ("undefined" == typeof UCAN) {
	var UCAN = {};
}

UCAN.namespace = function() {
	var a = arguments, o = null, i, j, d;
	for (i = 0; i < a.length; ++i) {
		d = a[i].split(".");
		o = UCAN;
		for (j = (d[0] == "UCAN") ? 1 : 0; j < d.length; ++j) {
			o[d[j]] = o[d[j]] || {};
			o = o[d[j]];
		}
	}
	return o;
};

UCAN.namespace("init","util");
var avatarWidth=403;
var avatarHeight=500;
var glassWidth=266;
var glassWidth=123;
var glassInitWidth=186;
var glassInitHeight=82;
var msgPleaseSelectGlass = '请先选择您需要试戴的眼镜.';

UCAN.glass = {
	init : function init() {
		UCAN.util.listenGlass();
		//$('moveUpQuick').addEvent('click',function(){UCAN.util.moveUp(8);UCAN.util.hideMoveTips();});
		//$('moveDownQuick').addEvent('click',function(){UCAN.util.moveDown(8);UCAN.util.hideMoveTips();});
		//$('moveLeftQuick').addEvent('click',function(){UCAN.util.moveLeft(8);UCAN.util.hideMoveTips();});
		//$('moveRightQuick').addEvent('click',function(){UCAN.util.moveRight(8);UCAN.util.hideMoveTips();});
		//$('zoomLargeQuick').addEvent('click',function(){UCAN.util.zoomLarge(8);UCAN.util.hideMoveTips();});
		//$('zoomSmallQuick').addEvent('click',function(){UCAN.util.zoomSmall(8);UCAN.util.hideMoveTips();});

		$('moveUp').addEvent('click',function(){UCAN.util.moveUp(1);UCAN.util.hideMoveTips();});
		$('moveDown').addEvent('click',function(){UCAN.util.moveDown(1);UCAN.util.hideMoveTips();});
		$('moveLeft').addEvent('click',function(){UCAN.util.moveLeft(1);UCAN.util.hideMoveTips();});
		$('moveRight').addEvent('click',function(){UCAN.util.moveRight(1);UCAN.util.hideMoveTips();});
		//$('zoomLarge').addEvent('click',function(){UCAN.util.zoomLarge(1);UCAN.util.hideMoveTips();});
		//$('zoomSmall').addEvent('click',function(){UCAN.util.zoomSmall(1);UCAN.util.hideMoveTips();});

		//$('resetFrame').addEvent('click',function(){UCAN.util.resetFrame();UCAN.util.hideMoveTips();});
		$('glassQuery').addEvent('click',function(){UCAN.util.queryGlass(1);});
		UCAN.util.sliderInit();
		UCAN.util.moveAvatar();
		UCAN.util.glassZoomInit();
	}
}

UCAN.util = {
	listenGlass : function listenGlass() {
		var glasses = $$('#glass-list img');
		//UCAN.util.freshNod();
		var freshGlass = function(){
			glasses = $$('#glass-list img');
			glasses.each(function(el){
				var glassId = el.get('property','rel');
				el.addEvent('click',function(){
					UCAN.util.loadingShow();
					var glassPngUrl = el.getProperty('src').replace('_thumb','').replace('jpg','png');
					//put glass to avatarFrame
					if(Browser.Engine.trident4){
						// Ie6
						if($chk($('glass'))){
							var myImages = new Asset.images([glassPngUrl], {
								onComplete: function(){
									$('glass').setProperty('src',glassPngUrl);
									$('glass').setStyle('filter','progid:dximagetransform.microsoft.alphaimageloader(src=\''+scriptUrl + glassPngUrl+'\', sizingmethod=\'scale\')');
									(function(){UCAN.util.loadingHide()}).delay(1000);
								}
							});
						}else{
							var initLeftMargin = (avatarWidth - glassInitWidth) /2;
							var initTopMargin  = (avatarHeight - glassInitHeight) / 2 - 60;
							var myGlass = new Element('span', {
								'class': 'glass',
								'border':0,
								'id':'glass',
								'src':glassPngUrl,
								'styles': {
									'border': '1px dashed transparent',
									'filter':'progid:dximagetransform.microsoft.alphaimageloader(src=\''+glassPngUrl+'\', sizingmethod=\'scale\')',
									'left':initLeftMargin+'px',
									'top':initTopMargin+'px',
									'width': glassInitWidth+'px',
									'height': glassInitHeight+'px'
								},
								'events': {
									'mouseout': function(){
										//this.removeClass('dragging');
										this.setStyle('border','1px dashed transparent');
									},
									'mouseover': function(){
										//this.addClass('dragging');
										this.setStyle('border','1px dashed #FF4500');
									}
								}
							});
							myGlass.inject($('glassFrame'), 'top');
							(function(){UCAN.util.loadingHide()}).delay(500);
							$('dragInfo').setStyle('top',initTopMargin - 42 +'px');
							$('dragInfo').setStyle('left',initLeftMargin+'px');
							$('dragInfo').setStyle('display','block');
							$('control-area').setStyle('display','block');
							$('control-area-background').setStyle('display','block');

							$('glass').setProperty('width',glassInitWidth);
							$('glass').setProperty('height',glassInitHeight);

							$('drager').setStyle('width',glassInitWidth);
							$('drager').setStyle('height',glassInitHeight);
							$('drager').setStyle('top',initTopMargin+'px');
							$('drager').setStyle('left',initLeftMargin+'px');
							$('drager').setStyle('display','block');
						}
					}else{
						if($chk($('glass'))){
							var myImages = new Asset.images([glassPngUrl], {
								onComplete: function(){
									$('glass').setProperty('src',glassPngUrl);
									(function(){UCAN.util.loadingHide()}).delay(1000);
								}
							});
						}else{
							var initLeftMargin = (avatarWidth - glassInitWidth) /2;
							var initTopMargin  = (avatarHeight - glassInitHeight) / 2 - 60;
							var myGlass = new Element('img', {
								'width': glassInitWidth,
								'class': 'glass',
								'height': glassInitHeight,
								'border':0,
								'id':'glass',
								'src':glassPngUrl,
								'styles': {
									'border': '1px dashed transparent',
									'left':initLeftMargin+'px',
									'top':initTopMargin+'px'
								},
								'events': {
									'mouseout': function(){
										//this.removeClass('dragging');
										this.setStyle('border','1px dashed transparent');
									},
									'mouseover': function(){
										//this.addClass('dragging');
										this.setStyle('border','1px dashed #FF4500');
									}
								}
							});
							myGlass.inject($('glassFrame'), 'top');
							(function(){UCAN.util.loadingHide()}).delay(500);
							$('dragInfo').setStyle('top',initTopMargin - 42 +'px');
							$('dragInfo').setStyle('left',initLeftMargin+'px');
							$('dragInfo').setStyle('display','block');
							$('control-area').setStyle('display','block');
							$('control-area-background').setStyle('display','block');

							$('glass').setProperty('width',glassInitWidth);
							$('glass').setProperty('height',glassInitHeight);

							$('drager').setStyle('width',glassInitWidth);
							$('drager').setStyle('height',glassInitHeight);
							$('drager').setStyle('top',initTopMargin+'px');
							$('drager').setStyle('left',initLeftMargin+'px');
							$('drager').setStyle('display','block');
						}
					}

					//将眼镜缩小放大的滑竿调制适当位置
					var glassSlider = $('glassSlider');
					var knob = glassSlider.getElement('.knob');
					knob.setStyle('position','relative');
					knob.setStyle('left','47px');

					UCAN.util.makeDragable();
					UCAN.util.showGlassInfo(glassId);
				})
			})
		}

		if (glasses!=null){
			freshGlass();
		}
		/*
		var avatar = $$('#avatar-list img');
		avatar.each(function(el){
			el.addEvent('click',function(){
				var myFx = new Fx.Tween($('glassAvatar'),{transition: Fx.Transitions.Cubic.easeOut});
				myFx.start('opacity',1,0);
				UCAN.util.loadingShow();
				var glassPngUrl = el.getProperty('src').replace('_thumb','');
				var myImages = new Asset.images([glassPngUrl], {
					onComplete: function(){
						(function(){$('glassAvatar').setProperty('src',glassPngUrl);UCAN.util.loadingHide();myFx.start('opacity',0,1)}).delay(1000);
					}
				});
			})
		})
		*/
	},

	sliderInit: function sliderInit(){
		var el = $('myElement'),glassAvatar = $('glassAvatar');
		var rato = avatarHeight / avatarWidth;
		var avtLeft = $('glassAvatar').get('style','left').toInt();
		var avtTop  = $('glassAvatar').get('style','top').toInt();

		var frameWd = $('glassFrame').getCoordinates().width;
		var frameHt = $('glassFrame').getCoordinates().height;

		new Slider(el, el.getElement('.knob'), {
			steps: avatarWidth,
			range: [avatarWidth/2,avatarWidth*2],
			onChange: function(value){
				glassAvatar.set('width', value);
				glassAvatar.set('height', value * rato);

				var wdvar = $('glassAvatar').getCoordinates().width;
				var htvar = $('glassAvatar').getCoordinates().height;

				var newTop   = (frameHt/2)-(htvar/2).toInt();
				var newleft  = (frameWd/2)-(wdvar/2).toInt();

				glassAvatar.setStyle('top', newTop+'px');
				glassAvatar.setStyle('left', newleft+'px');
			}
		}).set(glassAvatar.get('width').toInt());
	},

	glassZoomInit: function glassZoomInit(){
		var el = $('glassSlider');
		var glass = $('glass');
		var rato = glassInitHeight / glassInitWidth;

		var frameWd = $('glassFrame').getCoordinates().width;
		var frameHt = $('glassFrame').getCoordinates().height;

		new Slider(el, el.getElement('.knob'), {
			steps: 50,
			range: [glassInitWidth/2,avatarWidth],
			onChange: function(value){
				if($chk($('glass'))){
					if(Browser.Engine.trident4){
						var steppx = (avatarWidth - glassInitWidth)/2;

						var glassTopMargin  = $('glass').getStyle('top').toInt();
						var glassLeftMargin = $('glass').getStyle('left').toInt();
						var glassWidth  = value;
						var glassHeight = (glassWidth * rato).round();

						var gleft = (frameWd - glassWidth )/2;

						$('glass').setStyle('width',glassWidth+'px');
						$('glass').setStyle('height',glassHeight+'px');
						$('glass').setStyle('left',gleft+'px');

						$('drager').setStyle('width',glassWidth+'px');
						$('drager').setStyle('height',glassHeight+'px');
						$('drager').setStyle('left',gleft+'px');
					}else{
						// Webkit 1.0+ kernel browse
						var steppx = (avatarWidth - glassInitWidth)/2;

						var glassTopMargin  = $('glass').getStyle('top').toInt();
						var glassLeftMargin = $('glass').getStyle('left').toInt();
						var glassWidth  = value;
						var glassHeight = (glassWidth * rato).round();

						var gleft = (frameWd - glassWidth )/2;

						$('glass').setStyle('width',glassWidth+'px');
						$('glass').setStyle('height',glassHeight+'px');
						$('glass').setStyle('left',gleft+'px');

						$('drager').setStyle('width',glassWidth+'px');
						$('drager').setStyle('height',glassHeight+'px');
						$('drager').setStyle('left',gleft+'px');
					}
				}else{
					alert(msgPleaseSelectGlass);
				}
			}
		});
	},
	queryGlass: function queryGlass(){
		$('glass-container').set('html','<img src="imgs/loading.gif" width="16" height="16" border="0" title="" />')
		var req = new Request({
			method: 'post',
			data:{
				'pa':1,
				'pb':1,
				'pc':1,
				'pd':1,
				'pe':1
			},
			url: 'getGlassList.php',
			onComplete:function(response){
				$('glass-container').set('html',response);
				UCAN.util.freshNod();
			}
		}).send();
	},

	getHistory: function getHistory(){

	},

	freshNod: function freshNod(){
		//fresh DOm Nod
		glasses = $$('#glass-list img');
		glasses.each(function(el){
			var glassId = el.get('property','rel');
			el.addEvent('click',function(){
				UCAN.util.loadingShow();
				var glassPngUrl = el.getProperty('src').replace('_thumb','').replace('jpg','png');
				//put glass to avatarFrame
				if(Browser.Engine.trident4){
					if($chk($('glass'))){
						var myImages = new Asset.images([glassPngUrl], {
							onComplete: function(){
								$('glass').setProperty('src',glassPngUrl);
								$('glass').setStyle('filter','progid:dximagetransform.microsoft.alphaimageloader(src=\''+scriptUrl + glassPngUrl+'\', sizingmethod=\'scale\')');
								(function(){UCAN.util.loadingHide()}).delay(1000);
							}
						});
					}else{
						var initLeftMargin = (avatarWidth - glassInitWidth) /2;
						var initTopMargin  = (avatarHeight - glassInitHeight) / 2 - 60;
						var myGlass = new Element('span', {
							'class': 'glass',
							'border':0,
							'id':'glass',
							'src':glassPngUrl,
							'styles': {
								'border': '1px dashed transparent',
								'filter':'progid:dximagetransform.microsoft.alphaimageloader(src=\''+glassPngUrl+'\', sizingmethod=\'scale\')',
								'left':initLeftMargin+'px',
								'top':initTopMargin+'px',
								'width': glassInitWidth+'px',
								'height': glassInitHeight+'px'
							},
							'events': {
								'mouseout': function(){
									//this.removeClass('dragging');
									this.setStyle('border','1px dashed transparent');
								},
								'mouseover': function(){
									//this.addClass('dragging');
									this.setStyle('border','1px dashed #FF4500');
								}
							}
						});
						myGlass.inject($('glassFrame'), 'top');
						(function(){UCAN.util.loadingHide()}).delay(500);
						$('dragInfo').setStyle('top',initTopMargin - 42 +'px');
						$('dragInfo').setStyle('left',initLeftMargin+'px');
						$('dragInfo').setStyle('display','block');
						$('control-area').setStyle('display','block');
						$('control-area-background').setStyle('display','block');

						$('glass').setProperty('width',glassInitWidth);
						$('glass').setProperty('height',glassInitHeight);

						$('drager').setStyle('width',glassInitWidth);
						$('drager').setStyle('height',glassInitHeight);
						$('drager').setStyle('top',initTopMargin+'px');
						$('drager').setStyle('left',initLeftMargin+'px');
						$('drager').setStyle('display','block');
					}
				}else{
					if($chk($('glass'))){
						var myImages = new Asset.images([glassPngUrl], {
							onComplete: function(){
								$('glass').setProperty('src',glassPngUrl);
								(function(){UCAN.util.loadingHide()}).delay(1000);
							}
						});
					}else{
						var initLeftMargin = (avatarWidth - glassInitWidth) /2;
						var initTopMargin  = (avatarHeight - glassInitHeight) / 2 - 60;
						var myGlass = new Element('img', {
							'width': glassInitWidth,
							'class': 'glass',
							'height': glassInitHeight,
							'border':0,
							'id':'glass',
							'src':glassPngUrl,
							'styles': {
								'border': '1px dashed transparent',
								'left':initLeftMargin+'px',
								'top':initTopMargin+'px'
							},
							'events': {
								'mouseout': function(){
									//this.removeClass('dragging');
									this.setStyle('border','1px dashed transparent');
								},
								'mouseover': function(){
									//this.addClass('dragging');
									this.setStyle('border','1px dashed #FF4500');
								}
							}
						});
						myGlass.inject($('glassFrame'), 'top');
						(function(){UCAN.util.loadingHide()}).delay(500);
						$('dragInfo').setStyle('top',initTopMargin - 42 +'px');
						$('dragInfo').setStyle('left',initLeftMargin+'px');
						$('dragInfo').setStyle('display','block');
						$('control-area').setStyle('display','block');
						$('control-area-background').setStyle('display','block');

						$('glass').setProperty('width',glassInitWidth);
						$('glass').setProperty('height',glassInitHeight);

						$('drager').setStyle('width',glassInitWidth);
						$('drager').setStyle('height',glassInitHeight);
						$('drager').setStyle('top',initTopMargin+'px');
						$('drager').setStyle('left',initLeftMargin+'px');
						$('drager').setStyle('display','block');

					}
				}

				//将眼镜缩小放大的滑竿调制适当位置
				var glassSlider = $('glassSlider');
				var knob = glassSlider.getElement('.knob');
				knob.setStyle('position','relative');
				knob.setStyle('left','47px');

				UCAN.util.makeDragable();
				UCAN.util.showGlassInfo(glassId);
			})
		})
	},

	showGlassInfo: function showGlassInfo(){
		$('glass-info').setStyle('display','block');
		$('glass-info').set('html','<img src="imgs/loading.gif" width="16" height="16" border="0" title="" />')
		var req = new Request({
			method: 'post',
			data:{
				'glassId':1
			},
			url: 'getGlass.php',
			onComplete:function(response){
				$('glass-info').set('html',response);
				UCAN.util.freshNod();
			}
		}).send();
	},

	moveUp: function moveUp(n){
		if($chk($('glass'))){
			var glassTopMargin = $('glass').getStyle('margin-top').toInt();
			glassTopMargin = glassTopMargin - n;
			$('glass').setStyle('margin-top',glassTopMargin+'px');
			$('drager').setStyle('margin-top',glassTopMargin+'px');
		}else{
			alert(msgPleaseSelectGlass);
		}
	},

	moveDown: function moveDown(n){
		if($chk($('glass'))){
			var glassTopMargin = $('glass').getStyle('margin-top').toInt();
			glassTopMargin = glassTopMargin + n;
			$('glass').setStyle('margin-top',glassTopMargin+'px');
			$('drager').setStyle('margin-top',glassTopMargin+'px');
		}else{
			alert(msgPleaseSelectGlass);
		}
	},

	moveLeft: function moveLeft(n){
		if($chk($('glass'))){
			var glassLeftMargin = $('glass').getStyle('margin-left').toInt();
			glassLeftMargin = glassLeftMargin - n;
			$('glass').setStyle('margin-left',glassLeftMargin+'px');
			$('drager').setStyle('margin-left',glassLeftMargin+'px');
		}else{
			alert(msgPleaseSelectGlass);
		}
	},

	moveRight: function moveRight(n){
		if($chk($('glass'))){
			var glassLeftMargin = $('glass').getStyle('margin-left').toInt();
			glassLeftMargin = glassLeftMargin + n;
			$('glass').setStyle('margin-left',glassLeftMargin+'px');
			$('drager').setStyle('margin-left',glassLeftMargin+'px');
		}else{
			alert(msgPleaseSelectGlass);
		}
	},

	/*
	zoomLarge: function zoomLarge(n){
		if($chk($('glass'))){
			if(Browser.Engine.trident4){
				var glassTopMargin  = $('glass').getStyle('margin-top').toInt();
				var glassLeftMargin = $('glass').getStyle('margin-left').toInt();
				var glassWidth  = $('glass').getStyle('width').toInt();
				var glassHeight = $('glass').getStyle('height').toInt();

				glassTopMargin = glassTopMargin - n/2;
				glassLeftMargin = glassLeftMargin - n/2;

				var glassWidth2 = glassWidth + n*2;
				var glassHeight2 = (glassWidth2 / glassWidth * glassHeight).round();

				//console.log('放大后宽高:'+glassWidth2+'/'+glassHeight2+'');

				$('glass').setStyle('margin-top',glassTopMargin+'px');
				$('glass').setStyle('margin-left',glassLeftMargin+'px');
				$('glass').setStyle('width',glassWidth2+'px');
				$('glass').setStyle('height',glassHeight2+'px');

				$('drager').setStyle('margin-top',glassTopMargin+'px');
				$('drager').setStyle('margin-left',glassLeftMargin+'px');
				$('drager').setStyle('width',glassWidth2+'px');
				$('drager').setStyle('height',glassHeight2+'px');
			}else{
				var glassTopMargin  = $('glass').getStyle('margin-top').toInt();
				var glassLeftMargin = $('glass').getStyle('margin-left').toInt();
				var glassWidth  = $('glass').getProperty('width').toInt();
				var glassHeight = $('glass').getProperty('height').toInt();

				glassTopMargin = glassTopMargin - n/2;
				glassLeftMargin = glassLeftMargin - n/2;

				var glassWidth2 = glassWidth + n*2;
				var glassHeight2 = (glassWidth2 / glassWidth * glassHeight).round();

				//console.log('放大后宽高:'+glassWidth2+'/'+glassHeight2+'');

				$('glass').setStyle('margin-top',glassTopMargin+'px');
				$('glass').setStyle('margin-left',glassLeftMargin+'px');
				$('glass').setProperty('width',glassWidth2);
				$('glass').setProperty('height',glassHeight2);

				$('drager').setStyle('margin-top',glassTopMargin+'px');
				$('drager').setStyle('margin-left',glassLeftMargin+'px');
				$('drager').setStyle('width',glassWidth2+'px');
				$('drager').setStyle('height',glassHeight2+'px');
			}
		}else{
			alert(msgPleaseSelectGlass);
		}
	},

	zoomSmall: function zoomSmall(n){
		if($chk($('glass'))){
			if(Browser.Engine.trident4){
				var glassTopMargin  = $('glass').getStyle('margin-top').toInt();
				var glassLeftMargin = $('glass').getStyle('margin-left').toInt();
				var glassWidth  = $('glass').getStyle('width').toInt();
				var glassHeight = $('glass').getStyle('height').toInt();

				glassTopMargin = glassTopMargin + n/2;
				glassLeftMargin = glassLeftMargin + n/2;

				var sizeRad = glassWidth / glassHeight;

				glassWidth = glassWidth - n*2;
				glassHeight = glassWidth / sizeRad;

				$('glass').setStyle('margin-top',glassTopMargin+'px');
				$('glass').setStyle('margin-left',glassLeftMargin+'px');
				$('glass').setStyle('width',glassWidth+'px');
				$('glass').setStyle('height',glassHeight+'px');

				$('drager').setStyle('margin-top',glassTopMargin+'px');
				$('drager').setStyle('margin-left',glassLeftMargin+'px');
				$('drager').setStyle('width',glassWidth+'px');
				$('drager').setStyle('height',glassHeight+'px');
			}else{
				var glassTopMargin  = $('glass').getStyle('margin-top').toInt();
				var glassLeftMargin = $('glass').getStyle('margin-left').toInt();
				var glassWidth  = $('glass').getProperty('width').toInt();
				var glassHeight = $('glass').getProperty('height').toInt();

				glassTopMargin = glassTopMargin + n/2;
				glassLeftMargin = glassLeftMargin + n/2;

				var sizeRad = glassWidth / glassHeight;

				glassWidth = glassWidth - n*2;
				glassHeight = glassWidth / sizeRad;

				$('glass').setStyle('margin-top',glassTopMargin+'px');
				$('glass').setStyle('margin-left',glassLeftMargin+'px');
				$('glass').setProperty('width',glassWidth);
				$('glass').setProperty('height',glassHeight);

				$('drager').setStyle('margin-top',glassTopMargin+'px');
				$('drager').setStyle('margin-left',glassLeftMargin+'px');
				$('drager').setStyle('width',glassWidth+'px');
				$('drager').setStyle('height',glassHeight+'px');
			}
		}else{
			alert(msgPleaseSelectGlass);
		}
	},
	*/

	makeDragable: function makeDragable(){
		var myDrag = new Drag.Move('drager', {
			snap: 0,
			container: 'glassFrame',
			onSnap: function(el){
				el.addClass('dragging');
				$('dragInfo').setStyle('display','none');
			},
			onComplete: function(el){
				el.removeClass('dragging');
			},
			onDrag: function(el){
				var topvar = $('drager').getStyle('top').toInt();
				var Leftvar = $('drager').getStyle('left').toInt();
				$('glass').setStyle('left',Leftvar+'px');
				$('glass').setStyle('top',topvar+'px');
			},
			onStart: function(el){
				el.addClass('dragging');
			}
		});
	},

	moveAvatar: function moveAvatar(){
		var myDrag2 = new Drag.Move('glassAvatar', {
			snap: 0,
			//container: 'glassFrame',
			onSnap: function(el){
			},
			onComplete: function(el){
			},
			onDrag: function(el){
			},
			onStart: function(el){
			}
		});
	},

	loadingShow: function loadingShow(){
		var el = $('loading');
		//$('loading').setStyle('display','block');
		var myFx = new Fx.Tween(el,{transition: Fx.Transitions.Cubic.easeIn});
		myFx.start('opacity', 0, 1);
	},

	loadingHide: function loadingHide(){
		var el = $('loading');
		//$('loading').setStyle('display','none');
		var myFx = new Fx.Tween(el,{transition: Fx.Transitions.Cubic.easeOut});
		myFx.start('opacity', 1, 0);
	},

	resetFrame: function resetFrame(){
		$('dragInfo').setStyle('display','none');
		$('glass').destroy();
	},

	hideMoveTips: function hideMoveTips(){
		$('dragInfo').setStyle('display','none');
	}
}