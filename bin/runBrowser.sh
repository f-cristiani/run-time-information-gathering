#!/bin/bash

TARGET=$1
SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
ROOT_PATH=$SCRIPT_PATH/..

JALANGI_PATH=$(npm explore jalangi2 --prefix $ROOT_PATH -- pwd 2>/dev/null)

node $JALANGI_PATH/src/js/commands/instrument.js --inlineIID --inlineSource \
	-i --inlineJalangi \
    --analysis $ROOT_PATH/utils/initialize.js \
    --analysis $ROOT_PATH/utils/sMemory/sMemory.js \
    --analysis $ROOT_PATH/utils/functions.js \
    \
    \
    --analysis $ROOT_PATH/utils/functionsExecutionStack.js \
    --analysis $ROOT_PATH/utils/sMemoryInterface.js \
    --analysis $ROOT_PATH/utils/objectSerializer.js \
    --analysis $ROOT_PATH/utils/interactionSerializer.js \
    --analysis $ROOT_PATH/utils/interactionContainerFinder.js \
    --analysis $ROOT_PATH/utils/objectTraceIdMap.js \
    --analysis $ROOT_PATH/utils/recursiveInteractionsHandler.js \
    --analysis $ROOT_PATH/utils/argumentWrapperObjectBuilder.js \
    --analysis $ROOT_PATH/utils/functionIdHandler.js \
    --analysis $ROOT_PATH/utils/argumentProxyBuilder.js \
    --analysis $ROOT_PATH/utils/interactionWithResultHandler.js \
    --analysis $ROOT_PATH/utils/wrapperObjectsHandler.js \
    --analysis $ROOT_PATH/utils/toPrimitive.js \
    --analysis $ROOT_PATH/utils/operators/relationalComparisonOperatorTypeCoercion.js \
    --analysis $ROOT_PATH/utils/operators/sumOperatorTypeCoercion.js \
    --analysis $ROOT_PATH/utils/operators/operatorsTypeCoercionAnalyzer.js \
    \
    --analysis $ROOT_PATH/utils/argumentContainer.js \
    --analysis $ROOT_PATH/utils/functionContainer.js \
    \
    \
    --analysis $ROOT_PATH/utils/interactions/interaction.js \
    --analysis $ROOT_PATH/utils/interactions/activeInteraction.js \
    --analysis $ROOT_PATH/utils/interactions/getFieldInteraction.js \
    --analysis $ROOT_PATH/utils/interactions/inputValueInteraction.js \
    --analysis $ROOT_PATH/utils/interactions/methodCallInteraction.js \
    --analysis $ROOT_PATH/utils/interactions/putFieldInteraction.js \
    --analysis $ROOT_PATH/utils/interactions/usedAsArgumentInteraction.js \
    --analysis $ROOT_PATH/utils/interactions/convertedToInteraction.js \
    \
    \
    --analysis $ROOT_PATH/analysis/analysis.js \
    --analysis $ROOT_PATH/analysis/callbacks/functionEnter.js \
    --analysis $ROOT_PATH/analysis/callbacks/functionExit.js \
    --analysis $ROOT_PATH/analysis/callbacks/declare.js \
    --analysis $ROOT_PATH/analysis/callbacks/invokeFunPre.js \
    --analysis $ROOT_PATH/analysis/callbacks/invokeFun.js \
    --analysis $ROOT_PATH/analysis/callbacks/getField.js \
    --analysis $ROOT_PATH/analysis/callbacks/putFieldPre.js \
    --analysis $ROOT_PATH/analysis/callbacks/write.js \
    --analysis $ROOT_PATH/analysis/callbacks/binaryPre.js \
    --analysis $ROOT_PATH/analysis/callbacks/unaryPre.js \
    --analysis $ROOT_PATH/analysis/callbacks/conditional.js \
    --analysis $ROOT_PATH/analysis/callbacks/literal.js \
	--outputDir output_browser \
	$TARGET