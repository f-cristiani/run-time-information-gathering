/* global module */
/* global require */

"use strict";

(function(exp) {
	var getTypeOf = require("./getTypeOf.js").getTypeOf;

	function WrapperObjectsHandler(
		sMemoryInterface,
		argumentWrapperObjectBuilder,
		argumentProxyBuilder
	) {
		this.argumentWrapperObjectBuilder = argumentWrapperObjectBuilder;
		this.argumentProxyBuilder = argumentProxyBuilder;

		var dis = this;

		this.objectIsWrapperObject = function(obj) {
			return (obj && (obj.TARGET_PROXY !== undefined));
		};

		this.getRealValueFromWrapperObject = function(obj) {
 			return obj.TARGET_PROXY;
		};

		this.convertToWrapperObjectIfItIsALiteral = function(originalValue) {
			let newValue;

			switch(getTypeOf(originalValue)) {
				case "string":
					newValue = dis.argumentWrapperObjectBuilder.buildFromString(originalValue);
					break;

				case "number":
					newValue = dis.argumentWrapperObjectBuilder.buildFromNumber(originalValue);
					break;
			}

			if (!newValue) {
				newValue = originalValue;
			}

			return newValue;
		};

		this.convertToProxyIfItIsAnObject = function(originalValue) {
			let newValue;

			if (getTypeOf(originalValue) == "object" && !(originalValue instanceof String) && !(originalValue instanceof Number)) {
				newValue = dis.argumentProxyBuilder.buildProxy(originalValue);
			}

			if (!newValue) {
				newValue = originalValue;
			}

			return newValue;
		};
	}

	exp.WrapperObjectsHandler = WrapperObjectsHandler;

})(module.exports);