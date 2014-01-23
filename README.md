# Filters for EaselJS

Filters for EaselJS adds AS3 like Filters to EaselJS.


## Included Filters
* GlowFilter
* DropShadowFilter


## Resources
* Read the documentation at the [Filters for EaselJS API Documentation](http://kudox.jp/reference/filters_for_easeljs/)
* Information of GlowFilter and samples at the [kudox.jp](http://kudox.jp/java-script/createjs-easeljs-glowfilter)


## Example GlowFilter
	_shape = new createjs.Shape().set({x:centerX, y:centerY});
	_shape.graphics.f("rgba(0,0,255,1)").dp(0, 0, 100, 5, 0.6, -90).ef();
	var color = 0x00FFFF;
	var alpha = 1;
	var blurX = 32;
	var blurY = 32;
	var strength = 1;
	var quality = 1;
	var inner = false;
	var knockout = false;
	_glowFilter = new createjs.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
	_shape.filters = [_glowFilter];
	_shape.cache(-100, -100, 200, 200);

## Example DropShadowFilter
	_text = new createjs.Text("DropShadowFilter", "bold 64px Arial", "#CC0000");
	_text.set({x:centerX, y:centerY, textAlign:"center", textBaseline:"middle"});
	var distance = 3;
	var angle = 90;
	var color = 0x000000;
	var alpha = 0.5;
	var blurX = 4;
	var blurY = 4;
	var strength = 1;
	var quality = 2;
	var inner = false;
	var knockout = false;
	var hideObject = false;
	_dropShadowFilter = new createjs.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, 	hideObject);
	_text.filters = [_dropShadowFilter];
	var bounds = _text.getBounds();
	_text.cache(bounds.x, bounds.y, bounds.width, bounds.height);
	_stage.addChild(_text);


## Contact and bug reports
* [kudox.jp](http://kudox.jp/contact)
* [Twitter](http://twitter.com/u_kudox)


## License
public domain
