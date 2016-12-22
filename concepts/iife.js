var outsideIIFE = 1;
(function(){
var insideIIFE = 0;
//other variable declarations of my code.
//my other code which runs immedidately.
console.log('accessing insideIIFE in IIFE',insideIIFE);
})();
