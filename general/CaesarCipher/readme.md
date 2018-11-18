# Caesar's Cipher via TDD

This is a side effect of an interview I recently had (Nov 2018). You were given a set of failing tests and you had to provide the implementation to get the tests passing. 

In the allotted time, I only got about half the tests passing cause I ran out of time to handle the edge cases - namely wrapping. It annoyed me to no end that I was not able to finish in time so I tried to reconstruct the tests and took the same approach to implement it as I did during the test.

### Example
Given a string and a shift of 1:

	a -> b
	
	A -> B
	
	0 -> 1
    
	z -> a // wrap on lower case z
    
	Z -> A // wrap on upper case Z
    
	9 -> 0 // wrap on 9
    
	& -> & // ignore symbols

I approach I used was:
* loop over each character in the string
* get ASCII code of current character
* if it is a symbol, do nothing
* if it is a number or upper/lower case letter
..* apply shift
..* if necessary, apply wrapping logic

This was used to do both the encrypt and decrypt operations and both were supported by several helper methods.