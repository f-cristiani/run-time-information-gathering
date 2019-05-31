/* global J$ */

"use strict";

(function (sandbox) {
	var getTypeOfForReporting = sandbox.functions.getTypeOfForReporting;

	function FunctionContainer(f, isConstructor) {
		this.functionId = f.functionId;
		this.functionName = getFunctionName(f);

		this.isConstructor = (isConstructor === true);
		this.args = {};
		this.declarationEnclosingFunctionId = f.declarationEnclosingFunctionId;
		this.returnTypeOfs = [];
		this.functionIid = null;
		this.requiredModule = f["__REQUIRED_MODULE__"] ? f["__REQUIRED_MODULE__"] : null;
		this.isExported = f["__IS_EXPORTED_FUNCTION__"] ? f["__IS_EXPORTED_FUNCTION__"] : null;


		this.addArgumentContainer = function(argumentIndex, argumentContainer) {
			if (!(argumentIndex in this.args)) {
				this.args[argumentIndex] = argumentContainer;
			} else {
				argumentContainer.interactions = this.args[argumentIndex].interactions.concat(argumentContainer.interactions);
				this.args[argumentIndex] = argumentContainer;
			}
		};

		this.addReturnTypeOf = function(returnValue, traceId) {
			let returnTypeOf = {
				typeOf: getTypeOfForReporting(returnValue),
				traceId: traceId
			}

			this.returnTypeOfs.push(returnTypeOf);
		};

		this.getArgumentContainer = function(argumentIndex) {
			return this.args[argumentIndex];
		};

		function getFunctionName(f) {
			var functionName = f.name;

			if (f.methodName) {
				functionName = f.methodName;
			}

			return functionName;
		}
	}

	if (sandbox.utils === undefined) {
		sandbox.utils = {};
	}

	sandbox.utils.FunctionContainer = FunctionContainer;
}(J$));