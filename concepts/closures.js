var globalVar = 'global';

function parentFunction() {
    var _privateVar = 'private';
    function getPrivateVar() {
    	return _privateVar;
    }
    return getPrivateVar;
}
var getPrivateVar = parentFunction();
var x = getPrivateVar();