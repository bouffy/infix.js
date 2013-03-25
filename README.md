infix.js
========

Custom infix operators for Javascript (sorta).

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

