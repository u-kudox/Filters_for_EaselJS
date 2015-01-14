/*
DropShadowFilter for EaselJS
GitHub : https://github.com/u-kudox/Filters_for_EaselJS
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
	* Applies a DropShadowFilter to DisplayObjects of EaselJS. This filter has inherited the Filter class of EaselJS and has used BlurFilter of EaselJS at the blurring process.
	* @class DropShadowFilter
	* @extends Filter
	* @constructor
	* @param [distance=4] {Number} The offset distance for the shadow. The default value is 4.
	* @param [angle=45] {Number} The angle of the shadow. Valid values are 0 to 360 degrees. The default value is 45.
	* @param [color=0x000000] {uint} The color of the shadow. The default value is 0x000000. Valid values are in the hexadecimal format 0xRRGGBB.
	* @param [alpha=1] {Number} The alpha transparency value for the shadow color. Valid values are 0 to 1. The default value is 1.
	* @param [blurX=0] {Number} The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
	* @param [blurY=0] {Number} The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
	* @param [strength=1] {uint} The strength of the shadow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
	* @param [quality=1] {Number} The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
	* @param [inner=false] {Boolean} Specifies whether or not the shadow is an inner shadow. The default value is false, expressing outer shadow.
	* @param [knockout=false] {Boolean} Specifies whether or not the object has a knockout effect. The default value is false, expressing no knockout effect.
	* @param [hideObject=false] {Boolean} Specifies whether or not the object is hidden. If the value is true, the object is hidden and only the shadow is visible. The default value is false, expressing the object is visible.
	* @example
	* <pre><code>_text = new createjs.Text("DropShadowFilter", "bold 64px Arial", "#CC0000");
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
_dropShadowFilter = new createjs.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject);
_text.filters = [_dropShadowFilter];
var bounds = _text.getBounds();
_text.cache(bounds.x, bounds.y, bounds.width, bounds.height);
_stage.addChild(_text);</code></pre>
	**/
	function DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) {
		this._distance = (distance !== undefined) ? distance : 4;
		this._angle = (angle !== undefined) ? (angle % 360 + 360) % 360 : 45;
		this._setOffset(this._distance, this._angle);
		if (!isNaN(color)) {
			this.color = color;
		} else {
			this._red = this._green = this._blue = 0;
		}
		/**
		* private property
		**/
		this._blurFilter = new createjs.BlurFilter(blurX, blurY, quality);

		/**
		* The alpha transparency value for the shadow color. Valid values are 0 to 1. The default value is 1.
		* @property alpha
		* @type Number
		* @default 1
		**/
		this.alpha = (alpha !== undefined) ? alpha : 1;

		/**
		* The strength of the shadow. The default value is 1. Valid values are 0 to 255. But as for this value, a low value is more preferable.
		* @property strength
		* @type uint
		* @default 1
		**/
		this.strength = (strength !== undefined) ? strength >> 0 : 1;

		/**
		* Specifies whether or not the shadow is an inner shadow. The default value is false, expressing outer shadow.
		* @property inner
		* @type Boolean
		* @default false
		**/
		this.inner = !!inner;

		/**
		* Specifies whether or not the object has a knockout effect. The default value is false, expressing no knockout effect.
		* @property knockout
		* @type Boolean
		* @default false
		**/
		this.knockout = !!knockout;

		/**
		* Specifies whether or not the object is hidden. If the value is true, the object is hidden and only the shadow is visible. The default value is false, expressing the object is visible.
		* @property hideObject
		* @type Boolean
		* @default false
		**/
		this.hideObject = !!hideObject;
	}

	var p = createjs.extend(DropShadowFilter, createjs.Filter);

	Object.defineProperties(p, {
		/**
		* The angle of the shadow. Valid values are 0 to 360 degrees. The default value is 45.
		* @property angle
		* @type Number
		* @default 45
		**/
		"angle" : {
			get : function() {
				return this._angle;
			},
			set : function(value) {
				this._angle = value = (value % 360 + 360) % 360;
				this._setOffset(this._distance, value);
				return value;
			},
			enumerable : true
		},

		/**
		* The offset distance for the shadow. The default value is 4.
		* @property distance
		* @type Number
		* @default 4
		**/
		"distance" : {
			get : function() {
				return this._distance;
			},
			set : function(value) {
				this._distance = value;
				this._setOffset(value, this._angle);
				return value;
			},
			enumerable : true
		},

		/**
		* The color of the shadow. The default value is 0x000000. Valid values are in the hexadecimal format 0xRRGGBB.
		* @property color
		* @type uint
		* @default 0x000000
		**/
		"color" : {
			get : function() {
				return this._red << 16 | this._green << 8 | this._blue;
			},
			set : function(value) {
				this._red = value >> 16 & 0xFF;
				this._green = value >> 8 & 0xFF;
				this._blue = value & 0xFF;
				return this.color;
			},
			enumerable : true
		},

		/**
		* The amount of horizontal blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
		* @property blurX
		* @type Number
		* @default 0
		**/
		"blurX" : {
			get : function() {
				return this._blurFilter.blurX;
			},
			set : function(value) {
				this._blurFilter.blurX = value;
				return value;
			},
			enumerable : true
		},

		/**
		* The amount of vertical blur. The default value is 0. This value is passed to BlurFilter of EaselJS.
		* @property blurY
		* @type Number
		* @default 0
		**/
		"blurY" : {
			get : function() {
				return this._blurFilter.blurY;
			},
			set : function(value) {
				this._blurFilter.blurY = value;
				return value;
			},
			enumerable : true
		},

		/**
		* The number of blur iterations. The default value is 1. This value is passed to BlurFilter of EaselJS.
		* @property quality
		* @type Number
		* @default 1
		**/
		"quality" : {
			get : function() {
				return this._blurFilter.quality;
			},
			set : function(value) {
				this._blurFilter.quality = value;
				return value;
			},
			enumerable : true
		}
	});

	/**
	* Returns a rectangle with values indicating the margins required to draw the filter or null.
	* For example, a filter that will extend the drawing area 4 pixels to the left, and 7 pixels to the right
	* (but no pixels up or down) would return a rectangle with (x=-4, y=0, width=11, height=0).
	* @method getBounds
	* @return {Rectangle} a rectangle object indicating the margins required to draw the filter or null if the filter does not effect bounds.
	**/
	p.getBounds = function(rect) {
		if (this.inner) {
			return rect;
		} else {
			var bounds = this._blurFilter.getBounds(rect);
			var ox = this._offsetX;
			var oy = this._offsetY;
			if (ox !== 0) {
				if (ox < 0) {
					bounds.x += ox;
					bounds.width += -ox;
				} else {
					bounds.width += ox;
				}
			}
			if (oy !== 0) {
				if (oy < 0) {
					bounds.y += oy;
					bounds.height += -oy;
				} else {
					bounds.height += oy;
				}
			}
			return bounds;
		}
	};

	/**
	* Applies the DropShadowFilter to the specified context.
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
		if ((this.alpha <= 0 || this.strength <= 0) && (!this.knockout && !this.hideObject)) {
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
			if (this.hideObject) {
				if (inner) gco = "source-in";
				else gco = "copy";
			} else {
				if (inner) gco = "source-atop";
				else gco = "destination-over";
			}
		}
		targetCtx.save();
		targetCtx.setTransform(1, 0, 0, 1, 0, 0);
		targetCtx.globalAlpha = ga;
		targetCtx.globalCompositeOperation = gco;
		targetCtx.drawImage(dCvs, targetX + this._offsetX, targetY + this._offsetY);
		targetCtx.restore();
		return true;
	};

	/**
	* Returns a clone of this DropShadowFilter instance.
	* @method clone
	* @return {DropShadowFilter} A clone of this DropShadowFilter instance.
	**/
	p.clone = function() {
		var f = this._blurFilter;
		return new createjs.DropShadowFilter(this._distance, this._angle, this.color, this.alpha, f.blurX, f.blurY, this.strength, f.quality, this.inner, this.knockout, this.hideObject);
	};

	/**
	* Returns a string representation of this filter.
	* @method toString
	* @return {String} A string representation of this filter.
	**/
	p.toString = function() {
		return "[DropShadowFilter]";
	};

	/**
	* private method
	**/
	p._setOffset = function(distance, angle) {
		var r = angle * createjs.Matrix2D.DEG_TO_RAD;
		this._offsetX = Math.cos(r) * distance;
		this._offsetY = Math.sin(r) * distance;
	};

	createjs.DropShadowFilter = createjs.promote(DropShadowFilter, "Filter");
}(window));