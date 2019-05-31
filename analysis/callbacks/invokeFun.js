/* global J$ */

"use strict";

(function (sandbox) {
	function InvokeFunAnalysis() {
		this.callbackName = "invokeFun";

		this.runTimeInfo = sandbox.runTimeInfo;
		this.functionsExecutionStack = sandbox.utils.functionsExecutionStack;
		this.interactionWithResultHandler = sandbox.utils.interactionWithResultHandler;
		this.wrapperObjectsHandler = sandbox.utils.wrapperObjectsHandler;

		var dis = this;

		this.callback = function(
			iid,
			f,
			base,
			args,
			result
		) {

			if (f !== undefined) {
				var functionContainer = getFunctionContainer(f);

				if (functionContainer) {
					if (f.lastInteraction) {
						var interaction = f.lastInteraction;
						interaction.setReturnTypeOf(result);

						result = changeResultToWrapperObjectIfItIsALiteral(result);

						dis.interactionWithResultHandler.processInteractionWithResult(
							interaction,
							dis.functionsExecutionStack.getCurrentExecutingFunction(),
							// Let variable 'f' be the function that executed the invokeFun() callback.
							// invokeFun() callback is executed after functionExit(),
							// so the current executing function is the function that executed function 'f'.
							result,
							base
						);
					}

					let lastStopped = dis.functionsExecutionStack.getLastStopped();
					functionContainer.addReturnTypeOf(result, lastStopped ? lastStopped.traceId : null);
				}

				if (f.name === "require") {
					let requiredModule = result;
					let nameOfRequiredModule = args[0];

					if (typeof requiredModule === "function") {
						requiredModule["__IS_EXPORTED_FUNCTION__"] = true;
						requiredModule["__REQUIRED_MODULE__"] = nameOfRequiredModule;
					} else if (typeof requiredModule === "object") {
						Object.getOwnPropertyNames(requiredModule).forEach(key => {
							let value = requiredModule[key];

							if (typeof value === "function") {
								value["__REQUIRED_MODULE__"] = nameOfRequiredModule;
							}
						});
					}
				}
			}

			return {
				result: result
			};
		};

		function changeResultToWrapperObjectIfItIsALiteral(result) {
			return dis.wrapperObjectsHandler.convertToWrapperObject(result);
		}

		function getFunctionContainer(f) {
			return dis.runTimeInfo[f.functionId];
		}
	}

	sandbox.analysis = new InvokeFunAnalysis();

}(J$));