(function() {
	/* Simple JavaScript Inheritance
	 * By John Resig http://ejohn.org/
	 * MIT Licensed.
	 */
	// Inspired by base2 and Prototype
	(function () {
		var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;
		this.Class = function () { }; // The base Class implementation (does nothing)
		// Create a new Class that inherits from this class
		Class.extend = function (prop) {
			var _super = this.prototype;
			// Instantiate a base class (but only create the instance,
			// don't run the init constructor)
			initializing = true;
			var prototype = new this();
			initializing = false;
			// Copy the properties over onto the new prototype
			for (var name in prop) {
				if(!prop.hasOwnProperty(name)) continue;
				prototype[name] = prop[name];
				// Check if we're overwriting an existing function
				var isOverrideFunction = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]);
				if(!isOverrideFunction) continue;
				prototype[name] = (function(name, fn) {
					return function() {
						var tmp = this._super;
						this._super = _super[name]; // Add a new ._super() method that is the same method but on the super-class
						var ret = fn.apply(this, arguments); // The method only need to be bound temporarily, so we remove it when we're done executing
						this._super = tmp;
						return ret;
					};
				})(name, prop[name]);
			}
			function Class() { // The dummy class constructor
				if (!initializing && this.init) this.init.apply(this, arguments); // All construction is actually done in the init method
			}
			Class.prototype = prototype; // Populate our constructed prototype object
			Class.prototype.constructor = Class; // Enforce the constructor to be what we expect
			// And make this class extendable
			Class.extend = arguments.callee;
			Class.mixins = function () {
				for (var i = 0, iLen = arguments.length; i < iLen; i++) {
					var props = arguments[i];
					if(typeof props === 'function') props = new arguments[i];
					$.extend(prototype, props);
				}
				return Class;
			};
			return Class;
		};
	})();
	
	//Class = {};
})();