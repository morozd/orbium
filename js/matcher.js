(function(orbium) {
	orbium.Matcher = function() {
		var indicators = null;
		var t = null;
		var refillSeconds = null;

		this.construct = function(count, xnr, ynr) {
			indicators = [];
			t = 0;
			refillSeconds = 30;

			orbium.Tile.prototype.construct.call(this, "matcher0", null, null, count, xnr, ynr);
		};

		this.destruct = function() {
			for (var i=0; i<indicators.length; i++) {
				indicators[i].destruct();
			}

			orbium.Tile.prototype.destruct.call(this);
		};

		this.invalidate = function() {
			orbium.Tile.prototype.invalidate.call(this);

			for (var i=0; i<indicators.length; i++) {
				indicators[i].invalidate();
			}
		};

		this.randColor = function() {
			return orbium.Util.generateRandomIndex(3);
		};

		this.fill = function() {
			var col1 = 0;
			var col2 = 0;
			var col3 = 0;
			var col4 = 0;

			// Randomize until non identical colors
			while (col1 == col2 == col3 == col4) {
				col1 = this.randColor();
				col2 = this.randColor();
				col3 = this.randColor();
				col4 = this.randColor();
			}

			var xpos1 = Math.round(this.xpos+orbium.Tile.size/2-orbium.Marble.size/2);
			var ypos1 = Math.round(this.ypos+orbium.Tile.size*0.046);
			var indicator1 = new orbium.Indicator();
			indicator1.construct(xpos1, ypos1, col1);
			orbium.Util.addArrayElement(indicators, indicator1);

			var xpos2 = Math.round(this.xpos+orbium.Tile.size*0.636);
			var ypos2 = Math.round(this.ypos+orbium.Tile.size*0.345);
			var indicator2 = new orbium.Indicator();
			indicator2.construct(xpos2, ypos2, col2);
			orbium.Util.addArrayElement(indicators, indicator2);

			var xpos3 = Math.round(this.xpos+orbium.Tile.size/2-orbium.Marble.size/2);
			var offset = orbium.Tile.size*0.642;
			if (orbium.Tile.size == 144) { offset = orbium.Tile.size*0.645 } // Fix for rounding bug?
			var ypos3 = Math.round(this.ypos+offset);
			var indicator3 = new orbium.Indicator();
			indicator3.construct(xpos3, ypos3, col3);
			orbium.Util.addArrayElement(indicators, indicator3);

			var xpos4 = Math.round(this.xpos+orbium.Tile.size*0.054);
			var ypos4 = Math.round(this.ypos+orbium.Tile.size*0.345);
			var indicator4 = new orbium.Indicator();
			indicator4.construct(xpos4, ypos4, col4);
			orbium.Util.addArrayElement(indicators, indicator4);

			this.invalidate();
		};

		this.active = function() {
			if (indicators.length > 0) {
				return true;
			}

			return false;
		};

		this.matches = function(check) {
			for (var i=0; i<check.length; i++) {
				if (check[i] != indicators[i].color) {
					return false;
				}
			}

			t = 0;
			indicators.length = 0;
			this.invalidate();

			return true;
		};

		this.update = function(dt) {
			t += dt;

			if (t > refillSeconds && indicators.length == 0) {
				this.fill();
			}
		};

		this.draw2 = function() {
			orbium.Tile.prototype.draw2.call(this);

			for (var i=0; i<indicators.length; i++) {
				indicators[i].draw1();
			}
		};
	}; orbium.Matcher.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));