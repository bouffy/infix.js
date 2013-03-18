
var _i = (function () {

  "use strict";

  var ops = ops || {},
      e = console.error,
      ASCII_UCASE_START = 65,
      ASCII_UCASE_END = 90,
      ASCII_LCASE_START = 97,
      ASCII_LCASE_END = 122;

  /* 
   * Haskell-style array concatenation e.g., 
   *    _i([1,2,3],'++',[4,5]) === [1,2,3,4,5]
   */
  ops['++'] = function (arr1, arr2) { 
    if ( Util.isArray(arr1) && Util.isArray(arr2) ) { 
      return arr1.concat(arr2);
    }

    e('Value of type Array must be provided for both operands.');
  };

  /*
   * Haskell-style cons function e.g., 
   *    _i(1,':',[2,3]) === [1,2,3]
   */
  ops[':'] = function (el, arr) {
    arr = arr || []; 
    arr.unshift(el); 
    return arr; 
  };

  /*
   * Haskell-style function composition, returns a function f(g(x))
   *
   * if there exist functions:
   *
   * function addTwo(x){ return x + 2; }
   * function multiplyByFour(x){ return x * 4; }
   *
   * e.g., _i(addTwo, '.', multiplyByFour)(2) === 10
   */
  ops['.'] = function (f, g) { return function (x) { return f(g(x)); }; };

  /*
   * Ruby-style inclusive range operator e.g,
   *  _i(1,'..',5) === [1,2,3,4,5]
   */
  ops['..'] = function (start, end) { return T.range(start, end, true); };

  /*
   * Ruby-style exclusive range operator e.g,
   *  _i(1,'...',5) === [1,2,3,4]
   */
  ops['...'] = function (start, end) { return T.range(start, end); };

  /*
   * Scala-style power operator
   */
  ops['**'] = function (base, exponent) { return Math.pow(base, exponent); };

  /*
   * Type agnostic functions via revealing module pattern
   */
  var T = (function () {

    // Range function works with both numbers and ASCII chars
    function range(start, end, inclusive) {
      var arr;

      if ( Num.validRange(start, end) ) {
        arr = Num.range(start, end, inclusive);
      } else if ( Char.validRange(start, end) ) {
        arr = Char.range(start, end, inclusive);     
      } else {
        e('A valid numeric or ASCII range must be provided');
      }

      return arr;
    }

    var Num = {

      validRange: function (start, end) {
        return typeof start === 'number' && typeof end === 'number';
      },

      range: function (start, end, inclusive) {
        var arr = [],
            i;

        if(start < end) {
          if(inclusive) { end++; }
          for(i = start; i < end; i++) arr.push(i);
        } else if(end < start) {
          if(inclusive) { start--; }
          for(i = end; i > start; i--) arr.push(i);
        } else {
          arr.push(start);
        }

        return arr;
      }
    };

    var Char = {
      validRange: function(start, end) {
        var startCode = start.charCodeAt(0),
            endCode = end.charCodeAt(0);

        return (
          typeof start === 'string' && 
          typeof end === 'string' && 
          start.length === 1 && 
          end.length === 1 &&
          (validUpperRange(startCode, endCode) || validLowerRange(startCode, endCode))
        );

        function validUpperRange(startCode, endCode) {
          return validSameCaseRange(startCode, endCode, ASCII_UCASE_START, ASCII_UCASE_END);
        }

        function validLowerRange(startCode, endCode) {
          return validSameCaseRange(startCode, endCode, ASCII_LCASE_START, ASCII_LCASE_END);
        }

        function validSameCaseRange(startCode, endCode, lbound, ubound) {
          return (
            startCode >= lbound && 
            startCode <= ubound &&
            endCode >= lbound && 
            endCode <= ubound
          );
        }
      },

      range: function(start, end, inclusive) {
        var arr = [], 
            startCode = start.charCodeAt(0), 
            endCode = end.charCodeAt(0),
            currCode;

        if(start < end) {
          if(inclusive && canIncrement()) { endCode++; }
          for(currCode = startCode; currCode < endCode; currCode++) {
            arr.push(String.fromCharCode(currCode));
          }
        } else if(end < start) {
          if(inclusive && canDecrement()) { startCode--; }
          for(currCode = endCode; currCode < startCode; currCode--) { 
            arr.push(currCode); 
          }
        } else {
          arr.push(start);
        }

        return arr;

        function canDecrement() {
          return startCode !== ASCII_LCASE_START && startCode !== ASCII_UCASE_START;
        }

        function canIncrement() {
          return endCode !== ASCII_LCASE_END && endCode !== ASCII_UCASE_END;
        }
      }
    };

    return {
      range: range
    };
  }());

  var Util = {
    isArray: function (arg) {
      return Object.prototype.toString.call( arg ) === '[object Array]';
    }
  };

  return (function () {
    var splat = function(args) { return args.splice(3, args.length - 3); };
    return function infix(arg1, op, arg2) {  
      var args = Array.prototype.slice.call(arguments);
      return ops[op].call(this, arg1, arg2, splat(args));
    };
  }());
}());