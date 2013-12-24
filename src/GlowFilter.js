/*
GlowFilter for EaselJS
Contact and Bug reports : http://kudox.jp/contact or http://twitter.com/u_kudox
License : public domain
*/

/**
* @namespace createjs
**/
this.createjs = this.createjs || {};

(function(window) {
	"use strict";

	/**
	* Applies a GlowFilter to DisplayObjects of EaselJS. This filter has inherited the Filter class of EaselJS and has used BlurFilter of EaselJS at the blurring process.
	* @class GlowFilter
	* @extends Filter
	* @constructor
	* @param [color=0xFF0000] {uint} The color of the glow. The default value is 0xFF0000. Valid values are in the hexadecimal format 0xRRGGBB.
	* @param [alpha=1] {Number} The alpha transparency value for the glow color. Valid values are 0 to 1.
	* @param [blurX=0] {Number} The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
	* @param [blurY=0] {Number} The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
	* @param [strength=1] {uint} The strength of the glow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
	* @param [quality=1] {Number} The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
	* @param [inner=false] {Boolean} Specifies whether the glow is an inner glow. The default value is false, expressing outer glow.
	* @param [knockout=false] {Boolean} Specifies whether the object has a knockout effect. The default value is false, expressing no knockout effect.
	* @example
	* <pre><code>_shape = new createjs.Shape().set({x:centerX, y:centerY});
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
_stage.addChild(_shape);</code></pre>
	**/
	function GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout) {
		if (!isNaN(color)) this.color = color;
		if (alpha !== undefined) this.alpha = alpha;
		this._blurFilter = new createjs.BlurFilter(blurX, blurY, quality);
		if (strength !== undefined) this.strength = strength;
		this.inner = !!inner;
		this.knockout = !!knockout;
	}

	var p = {
		/**
		* The color of the glow. The default value is 0xFF0000. Valid values are in the hexadecimal format 0xRRGGBB.
		* @property color
		* @type uint
		* @default 0xFF0000
		**/
		get color() {
			return this._red << 16 | this._green << 8 | this._blue;
		},
		set color(value) {
			this._red = value >> 16 & 0xFF;
			this._green = value >> 8 & 0xFF;
			this._blue = value & 0xFF;
			return this.color;
		},

		/**
		* The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
		* @property blurX
		* @type Number
		* @default 0
		**/
		get blurX() {
			return this._blurFilter.blurX;
		},
		set blurX(value) {
			return this._blurFilter.blurX = value;
		},

		/**
		* The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
		* @property blurY
		* @type Number
		* @default 0
		**/
		get blurY() {
			return this._blurFilter.blurY;
		},
		set blurY(value) {
			return this._blurFilter.blurY = value;
		},

		/**
		* The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
		* @property quality
		* @type Number
		* @default 1
		**/
		get quality() {
			return this._blurFilter.quality;
		},
		set quality(value) {
			return this._blurFilter.quality = value;
		}
	};

	var sProto = Object.create(createjs.Filter.prototype);
	for (var k in sProto) {
		p[k] = sProto[k];
	}
	GlowFilter.prototype = p;
	p.constructor = GlowFilter;

	p._red = 255;

	p._green = 0;

	p._blue = 0;

	/**
	* The alpha transparency value for the glow color. Valid values are 0 to 1.
	* @property alpha
	* @type Number
	* @default 1
	**/
	p.alpha = 1;

	/**
	* The strength of the glow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
	* @property strength
	* @type uint
	* @default 1
	**/
	p.strength = 1;

	/**
	* Specifies whether the glow is an inner glow. The default value is false, expressing outer glow.
	* @property inner
	* @type Boolean
	* @default false
	**/
	p.inner = false;

	/**
	* Specifies whether the object has a knockout effect. The default value is false, expressing no knockout effect.
	* @property knockout
	* @type Boolean
	* @default false
	**/
	p.knockout = false;

	p._blurFilter = null;

	/**
	* Returns a rectangle with values indicating the margins required to draw the filter or null.
	* For example, a filter that will extend the drawing area 4 pixels to the left, and 7 pixels to the right
	* (but no pixels up or down) would return a rectangle with (x=-4, y=0, width=11, height=0).
	* @method getBounds
	* @return {Rectangle} a rectangle object indicating the margins required to draw the filter or null if the filter does not effect bounds.
	**/
	p.getBounds = function() {
		if (this.inner) {
			return null;
		} else {
			return this._blurFilter.getBounds();
		}
	};

	/**
	* Applies the GlowFilter to the specified context.
	* @method applyFilter
	* @param ctx {CanvasRenderingContext2D} The 2D context to use as the source.
	* @param x {Number} The x position to use for the source rect.
	* @param y {Number} The y position to use for the source rect.
	* @param width {Number} The width to use for the source rect.
	* @param height {Number} The height to use for the source rect.
	* @param [targetCtx] {CanvasRenderingContext2D} The 2D context to draw the result to. Defaults to the context passed to ctx.
	* @param [targetX] {Number} The x position to draw the result to. Defaults to the value passed to x.
	* @param [targetY] {Number} The y position to draw the result to. Defaults to the value passed to y.
	* @return {Boolean} If the filter was applied successfully.
	**/
	p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
		if ((this.alpha <= 0 || this.strength <= 0) && !this.knockout) {
			return true;
		}
		targetCtx = targetCtx || ctx;
		if (targetX === undefined) targetX = x;
		if (targetY === undefined) targetY = y;
		var tImgData = targetCtx.getImageData(targetX, targetY, width, height);
		var tData = tImgData.data;
		var dCvs = document.createElement("canvas");
		dCvs.width = width;
		dCvs.height = height;
		var dCtx = dCvs.getContext("2d");
		var dImgData = dCtx.getImageData(0, 0, width, height);
		var dData = dImgData.data;
		var inner = this.inner;
		var red = this._red;
		var green = this._green;
		var blue = this._blue;
		for (var i = 0, l = dData.length; i < l; i += 4) {
			var ia = i + 3;
			var alpha = tData[ia];
			if (!inner) {
				if (alpha !== 0) {
					dData[i] = red;
					dData[i + 1] = green;
					dData[i + 2] = blue;
					dData[ia] = alpha;
				}
			} else {
				if (alpha !== 255) {
					dData[i] = red;
					dData[i + 1] = green;
					dData[i + 2] = blue;
					dData[ia] = 255 - alpha;
				}
			}
		}
		dCtx.putImageData(dImgData, 0, 0);
		var strength = this.strength;
		if (0 < strength) {
			this._blurFilter.applyFilter(dCtx, 0, 0, width, height);
			if (255 < strength) strength = 255;
			for (var j = 1; j < strength; j++) {
				dCtx.drawImage(dCvs, 0, 0);
			}
		}
		var ga = this.alpha;
		if (ga < 0) ga = 0;
		else if (1 < ga) ga = 1;
		var gco;
		if (this.knockout) {
			if (inner) gco = "source-in";
			else gco = "source-out";
		} else {
			if (inner) gco = "source-atop";
			else gco = "destination-over";
		}
		targetCtx.save();
		targetCtx.setTransform(1, 0, 0, 1, 0, 0);
		targetCtx.globalAlpha = ga;
		targetCtx.globalCompositeOperation = gco;
		targetCtx.drawImage(dCvs, targetX, targetY);
		targetCtx.restore();
		return true;
	};

	/**
	* Returns a clone of this GlowFilter instance.
	* @method clone
	* @return {GlowFilter} A clone of this GlowFilter instance.
	**/
	p.clone = function() {
		var f = this._blurFilter;
		return new createjs.GlowFilter(this.color, this.alpha, f.blurX, f.blurY, this.strength, f.quality, this.inner, this.knockout);
	};

	/**
	* Returns a string representation of this filter.
	* @method toString
	* @return {String} A string representation of this filter.
	**/
	p.toString = function() {
		return "[GlowFilter]";
	};

	createjs.GlowFilter = GlowFilter;
}(window));