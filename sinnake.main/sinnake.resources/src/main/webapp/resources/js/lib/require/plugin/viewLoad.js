define(["handlebars"], function (Handlebars) {
	Handlebars = Handlebars || this.Handlebars;

	return { 
		load: function (name, parentRequire, onload, config) {
			parentRequire(["hbs!" + name], function (raw) {
				onload({
					'handlebars' : Handlebars
					, 'view' : raw
				});
			});
		}
	};
});
