---
category: articles
layout: default
title: Composite Integrators
---

# Composite Integrators

<span id="dropcap">A</span> selection of composite integrators found in various high-resolution bench DMMs is presented in the figure below. Since all the images on this website have a constant width, some details might not be visually appealing. For this reason, the image, an SVG file, can be opened and inspected in a new tab.<br><br>

![Composite Integrators](/assets/img/Composite_Integrators/Integrators.svg)

The integrator, like the name suggests, is at the heart of all integrating ADCs like the single slope, dual slope, multislope (charge balancing) and delta-sigma. The function this circuit performs is simple - it integrates the input signal continuously over time, providing means to accumulate very small changes in voltage over relatively long periods of time in the first three types of ADC, or acts like a single-pole filter in the delta-sigma case.

An operational amplifier provides the basis for constructing a nearly ideal integrator, providing low offset voltages and bias currents, while having a large open-loop gain and bandwidth. The former set of parameters are important for integration over longer time periods, while the latter set represent the 'AC' characteristics, which determine, for example, settling time.

The fundamental resolving limit for integrating ADCs in particular is a result of the 'AC' characteristics - the availability of loop gain to maintain a close-to-ideal integrator transfer function over several frequency decades directly determines the theoretical maximum resolution [^Graeme_OOP].

However, the performance of a single amplifier is inadequate for high-resolution measurement, such as that performed by 6.5, 7.5 or 8.5 digit multimeters. The limiting factor is the offset voltage, drift thereof, limited open-loop gain, bandwidth and slew rate. Amongst the vast spectrum of operational amplifiers that are available on the market, finding one that is optimized to perform well in *all* of the parameters mentioned above is impossible. When the performance of one op-amp is inadequate, several can be embedded within the same feedback loop, resulting in a 'composite' amplifier. Each op-amp in the composite configuration can now be optimized to perform well in fewer characteristics. For example, the first stage could be a chopper-stabilized amplifier for low offset voltage, while the second could be a fast amplifier with a large bandwidth and high slew rate. The open-loop gains of both amplifiers are multiplied, resulting in an overall open-loop gain that is much larger than what can be achieved with a single amplifier, usually in excess of 200dB.

[^Graeme_OOP]: J. Graeme, *Optimizing Op Amp Performance*, McGraw-Hill, 1996.



