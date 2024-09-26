---
category: trash
layout: default
title: pixel perfection
---

# how to: pixel perfection w skaytacium

## What?

so initially this started off as a side project and i wanted to get some elbow grease into another website before i started working on my own (sorry but this was my guinea pig).  
now this guy didn't want to write HTML, and he suggested that i write a script that turns markdown into formatted HTML output.  
i'm too lazy and i KNEW i wouldn't have to reinvent the wheel.  

### cameo: github pages and jekyll

both of these things were totally secondary to what the biggest issue with this website was, perfectionism.  
neither him nor me could deal with a website that isn't 100% perfect.  
so the requirement was pretty simple:  

make a hierarichal list of posts...

it's always the SIMPLEST things in any field of webdev, system engineering, even low level custom tcp protocols (as simple as using `\r` instead of `\n`) that get to you.  

so i thought hey this is pretty simple, just make an indented unordered list, add a dash element and add a border element to each list.  

## Why?

well, perfection.

now if you've ever worked with css you know how "obvious" it is. everything is a box. boxes all the way down. kerning and it's kin don't matter in CSS, because it's ALL BOXES[^1].  
so one can basically forget pixel-perfect vertical alignment in css, it ain't happening, ever.  
since vertical alignment depends on subpixel calculations and rendering methods change depending on whether it's gecko or blink or webkit[^2] plus the user's font size and a billion other paremeters (like the DPI on the smart fridge you're hopefully not reading this article on), it's basically impossible.  
and keep in mind, what i'm talking about here (vertical alignment) is aligning an absolutely positioned box to another absolutely position box, in which one has text.  
*text is the great evil.*  

## How?

what you can exploit though, is funnily enough the engine itself.  
css borders are guaranteed to align, it's the way they're rendered (guess how... *in a box*).  
so you simply use them.  
position them smartly, sadly use some javascript to support your smart fridge and a 55" TV, and then bada bing bada boom.

pixel perfection.

## And?

i hate the fact that i made this guy's website before mine, oh well, that's what procrastination gets you.  

(this garbage was mostly written so that i could test if the website is functioning totally well, it's bullshit)

## TL;DR?

css is ass. hierarchy is hard.

---

[source code](https://github.com/NNNILabs/NNNILabs.github.io)

[^1]: [Boxes all the way down](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
[^2]: [Pixel perfection](https://www.joshwcomeau.com/css/pixel-perfection/)
