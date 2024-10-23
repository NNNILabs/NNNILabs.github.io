---
category: articles
layout: default
title: Dinner with a Hint of SPICE
---

# Dinner with a hint of SPICE

## The pre-SPICE Era

<span id="dropcap">I</span> was a strong proponent of the Falstad circuit simulator for the longest time. No downloads, simple UI, 'real-time' simulation and tweaking of component values, no need to remember cryptic commands, the ability to save the simulation as a text file (which can be re-opened on the website), effortless mixed-signal design with basic logic blocks (including custom logic), poweful analog blocks like voltage/current controlled voltage/current sources... [what's not to like](https://falstad.com/circuit/circuitjs.html){:target="_blank"}[^1]?

Even now, Falstad is my first choice to simulate a circuit idea. I don't have to think too hard about what I'm doing (which, thinking about it, might not be a very good thing after all), it is a simple matter of a few keystrokes and mouse clicks to draft a schematic, and absolutely no effort is needed to run it, the circuit is running as you draw. Numerically, the results are good enough to be on the level of a simple back-of-the-envelope calculation.

Where it starts breaking down is when you want actual useful data out of your circuit. The BJT and FET models are very simplistic, and there are exactly two op-amp models - the 741 and 324. I cannot verify how accurate these models are, since there is no way to generate a static plot I draw to compare with one from the datasheet. The reverse is also true - I cannot import an existing model. But when I first started using Falstad, I had no reason to include complex models in my simulations - I was testing topologies for a discrete bipolar linear power supply.

The Javascript (?) framework that the simulator is based on, while never having presented an issue to me as a front-end user, is sure to stir up a hot conflict among those who are more computer-inclined.

## LTspice

My first encounter with [LTspice](https://ez.analog.com/design-tools-and-calculators/ltspice/){:target="_blank"}[^2],[^3] was quite recent. In 2021, I was interested in improving charge time of a capacitor charger based on the LT3750. LT (or, well, ADI) had a pre-made LTspice simulation, which I downloaded and ran. I was also interested in the discharge characteristics of high voltage capacitors. To derive useful results, I learned how to do transient analyses of RLC circuits.

My first 'real' LTspice project was a current pulser [a la Jim Williams](https://www.analog.com/media/en/technical-documentation/application-notes/an133f.pdf){:target="_blank"}[^4], involving a fast op-amp, a GaN FET and some compensation. I learned how to do stepped analyses, step component parameters, add tables to change more than one parameter at the same time, and how to properly do bode plots[^5]. Unfortunately, [that project](https://github.com/NNNILabs/Pulsed-Laser-Driver){:target="_blank"} has spent so much time moving between the bench and the shelf that I don't think anything much will come out of it. I did get to play with GaN MOSFETs for the first time, though.

Using LTspice to solve a real life problem first happened in 2023, while working on the infamous [multislope ADC](https://hackaday.io/project/190528-multislope-adc/log/218658-did-you-hear-that-whistling-sound-too){:target="_blank"}[^6]. The residue amplifier was not properly compensated and had a tendency to ring. I was able to simulate this in LTspice to correlate exactly with the actual waveforms measured using an oscilloscope, and from there, add enough compensation capacitance to the simulated circuit to achieve a perfect step response. I was able to make the same changes to the real circuit and fix it.

Some of the most interesting LTspice simulations I did were a direct result of the Multislope IV investigation. I was able to use LTspice to do an analysis of the noise transfer function of modulators of various orders and constructed using various op-amps, and also construct a feedback loop based on the Penrod recipe[^7] to perfom FFT analyses on. The highlight was being able to create a multibit quantizer (essentially, an ADC) using only behavioral voltage sources and a sample-and-hold unit. Mysteriously enough, I was not able to get a high-pass NTF when using PWM feedback.

It took quite some effort to make a reliable quantizer, and complex digital logic in LTspice was out of the question. I had ideas for a hybrid modulator that I wanted to try, but couldn't really implement in a practical fashion.

## QSPICE

Mid-2023 brought with it the news of QSPICE, developed by LTspice's creator, Mike Engelhardt.

> I'd had a sketch of Mike as the icon for LTspice on an older computer. I didn't think too much about it at the time, but the birth of QSPICE gave me a chance to get to know the creator. I watched a [video series](https://www.youtube.com/playlist?list=PLlvfFkArIGf4GnyTnGp76ThVBw_KbYAFO){:target="_blank"}[^8] that gave me a very interesting insight into the person who created LTspice and his design philosophy. His deep knowledge of computers and how they work, and programming for a Windows system (using QSPICE is clean and painless!) really shines. Mike's willingness to help you out with problems personally is a hugely refreshing attitude, based on my experience with using software. He even goes as far as to include his E-Mail ID in the QSPICE help section.

The biggest talking point was the ability to write custom modules in C++ or Verilog (the VHDL/Verilog issue has also led to spicy discussion in the computer circle). This enabled the creation of arbitrary logic for use in the simulation. The module is compiled into a DLL that is linked to the simulation. This enables lightning-fast simulation[^9].

QSPICE on it's own was not difficult to use, but I had a hard time figuring out how to properly set up and 'clock' a C++ DLL module, and my first running integrating ADC simulation was coded by Mark.

It was only very recently that I had the sudden flash of inspiration to use QSPICE to simulate my hybrid modulator idea. So I sat down and decided to do it. I watched a few videos about [how to implement a PWM module](https://www.youtube.com/watch?v=mbZipu5a9d0){:target="_blank"}[^10], and used that as my starting point. Very soon, I got a working simulation that basically disproved my idea. It took me months of thinking to come up with and refine the idea, but only fifteen minutes to disprove using QSPICE. In other words, simulating ideas in QSPICE greatly speeds up the process of developing complex mixed-signal systems.

### QSPICE quirks

1. Inputs to a C++ module must always have a lower index in the `data[index].type` union than outputs, otherwise the module outputs 0.

[^1]: https://falstad.com/circuit/circuitjs.html
[^2]: https://ez.analog.com/design-tools-and-calculators/ltspice/
[^3]: I find it very amusing when people get brand names wrong. With LTspice, I've seen 'LTSPICE' (scream!) and 'LTSpice'. Surprisingly, 'LTspice' is correct, although LTSPICE would make sense since SPICE itself is an acronym, and following the 'CamelCase' convention, LTSpice would also fit.
[^4]: https://www.analog.com/media/en/technical-documentation/application-notes/an133f.pdf
[^5]: This is actually something I also tried in the linear power supply era, although I was not able to get useful results out of it, or just didn't know how to.
[^6]: https://hackaday.io/project/190528-multislope-adc/log/218658-did-you-hear-that-whistling-sound-too
[^7]: https://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?article=3771&context=theses
[^8]: https://www.youtube.com/playlist?list=PLlvfFkArIGf4GnyTnGp76ThVBw_KbYAFO
[^9]: Hearsay.
[^10]: https://www.youtube.com/watch?v=mbZipu5a9d0
