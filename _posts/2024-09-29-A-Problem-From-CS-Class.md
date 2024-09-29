---
category: articles
layout: default
title: A Problem from CS Class
---

# A Problem from CS Class

<span id="dropcap">I</span>t's not every day that a problem, especially what could be considered a 'pure math' or 'pure theory' one, fascinates me. In fact, it's been at least a good five years since I was in such a situation. The last I remember was in class 10 (late 2017) - I came up with the concept of co-primes independently, and believed that they should be called *'relative primes'* instead, since that made a lot more sense to me.

So when the following problem was written down on the whiteboard towards the end of the Informatik (roughly translated, computer science) lecture, I was immediately interested.

\\[ \frac{14}{9} = 1.85_{x} \\]

In plain English - In what number system (with base \\(x\\)) is decimal \\(\frac{14}{9}\\) equal to 1.85? For example, binary 1111 is hexadecimal F and decimal 15.

In class 1 (when I was 6), we learned about place and face value - and that has remained fresh in memory, luckily. Little did I know as a six-year-old, that I would one day *actually* get to use that knowledge to solve a problem that fascinated me.

What a base \\(x\\) number system essentially means is the following:

\\[ ab.cd = a \cdot x^{1} + b \cdot x^{0} + c \cdot x^{-1} + d \cdot x^{-2} \\]

That is, a number like \\(ab.cd\\) is essentially the sum of the digits multiplied by the respective power of the base. The powers are positive integers that start at zero and go up by one to to the left for the digits before the decimal point, and start at -1 and go down by one to the right after the decimal point.

This knowledge lets us rewrite the problem statement as follows:

\\[ \frac{14}{9} = 1 \cdot x^{0} + 8 \cdot x^{-1} + 5 \cdot x^{-2} \\]

It should now be a simple matter of solving for x step-by-step. But first:

\\[ 14 = 9 \cdot (1 \cdot x^{0} + 8 \cdot x^{-1} + 5 \cdot x^{-2}) \\]

\\[ \implies 14 = 9 \cdot x^{0} + 72 \cdot x^{-1} + 45 \cdot x^{-2} \\]

\\[ \implies 14 \cdot x^{2}= 9 \cdot x^{2} + 72 \cdot x^{1} + 45 \\]

\\[ \implies -5x^{2} + 72x + 45 = 0 \\]

The result is a nice quadratic equation that can be solved easily using various means, my favourite of which is the 'abc' method. I remember learning it multiple times under different names over the years, but the *actual* concept never really stuck inside my head, I keep having to come up with it again and again, on the spot. The only name I do remember is once again from class 10: completing the square[^1].

Basically, \\(a\\) is the coefficient of \\(x^{2}\\), \\(b\\) is the coefficient of \\(x\\), and \\(c\\) is the constant term; signs are of course taken into consideration, and missing coefficients are just \\(0\\).

Using the coefficients, we have to find a pair of numbers that add up to \\(b\\) and multiply to give \\(a \cdot c\\). In this case, \\(-3\\) and \\(75\\) fit the bill - they add up to \\(72\\), which is \\(b\\), and multiply to give \\(-225\\), which is \\(a \cdot c\\). Perfect.

With that information, the quadratic can be rewritten and simplifed as follows:

\\[ -5x^{2} + 75x - 3x + 45 = 0 \\]

\\[ \implies -5x(x-15) - 3(x-15) = 0 \\]

\\[ \implies (-5x-3)(x-15) = 0 \\]

Being quadratic, the equation delivers two solutions:

\\[ \mathbb{L} = \left\\{\ \frac{-3}{5}, 15 \right\\}\ \\]

It should be trivial to check both cases (and yes, *do* check both cases, however unlikely one of the cases might be, problems like these always throw curveballs!) by substituting the base(s) and see which one correctly delivers decimal \\(\frac{14}{9}\\). Here, 15 is the right answer.

\\[ 1 \cdot 15^{0} + 8 \cdot 15^{-1} + 5 \cdot 15^{-2} = \frac{14}{9} \\]

I was incredibly surprised that I managed to find the right answer in a relatively straightforward fashion. Although it was way past 11:00 PM, I was excited enough to type out a polite E-Mail to the professor, telling him about my solution and excitement in having found it out. Unfortunately, thanks to IT issues with the Uni's E-Mail servers, I was not able to share my excitement. I will have to wait an entire week to be able to present my solution in class! 

[^1]: https://en.wikipedia.org/wiki/Completing_the_square


