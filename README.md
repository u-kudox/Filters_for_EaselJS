# Filters for EaselJS

Filters for EaselJS adds AS3 like Filters to EaselJS.


## Included Filters
* GlowFilter


## Resources
* Read the documentation at the [Filters for EaselJS API Documentation](http://kudox.jp/reference/filters_for_easeljs/)
* The information of GlowFilter and samples at the [kudox.jp](http://kudox.jp/java-script/createjs-easeljs-glowfilter)


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


## Contact and bug reports
* [kudox.jp](http://kudox.jp/contact)
* [Twitter](http://twitter.com/u_kudox)


## License
public domain
