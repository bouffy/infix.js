infix.js
========

This library was a short-lived attempt (~3 hrs) at simulating custom infix operators in Javascript.  The syntax is kind of ugly, so despite the functional equivalence provided by this style, I'm afraid infix.js is fated to remain a lonely wallflower at the prom.  

Some of the infix operators simulated by the library include:

1. Haskell's ++ array concatenation
2. Haskell's : "cons" operator
3. Ruby's inclusive and exclusive ranges .. and ...
4. Scala's power operator \*\*
5. Function composition, like Haskell's . (right to left) 
6. Function composition, like Unix's pipe | (left to right)

*Haskell-style array concatenation*

\_i\_([1,2,3],'++',[4,5])

returns [1,2,3,4,5]

*Haskell-style cons function*

\_i\_(1,':',[2,3])

returns [1,2,3]

*Ruby-style ranges (inclusive)*

\_i\_(1,'..',7)

returns [1,2,3,4,5,6,7]

\_i\_('a','..','g')

returns ['a','b','c','d','e','f','g']

*Ruby-style ranges (exclusive)*

\_i\_(1,'...',7)

returns [1,2,3,4,5,6]

\_i\_('a','...','g')

returns ['a','b','c','d','e','f']

*Scala-style power operator*

\_i\_(3,'\*\*',3)

returns 27

*Haskell-style function composition*

Argument provided first to the right, then piped to the left

If we have:
  function addTwo(x){ return x + 2; }
  function timesTen(x){ return x * 10; }

\_i\_(addTwo,'.',timesTen)(5);

returns 52

*Unix-style function composition*

Argument provided first to the left, then piped to the right

If we have:
  function addTwo(x){ return x + 2; }
  function timesTen(x){ return x * 10; }

\_i\_(addTwo,'|',timesTen)(5);

returns 70

