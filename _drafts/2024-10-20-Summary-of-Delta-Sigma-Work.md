---
category: drafts
layout: default
title: Summary of Delta Sigma Work
---

# Summary of Delta Sigma Work (December 2023 - )

My interest in delta-sigma ADCs was first awakened while investigating Agilent's Multislope IV. In November 2023, I finally came to understand how delta-sigma modulation worked, and was ready to take on the fine details of how it was implemented in Multislope IV. 

I was on a trip to Poland to visit a couple of friends when the idea to work on a delta-sigma modulator of the precision variety firmly entrenched itself in my head.

Mark was curious about how simply and cheaply a multibit modulator could be made, and the idea was to use a comparator to somehow implement (what I know know is called) time domain quantization. Instead of using purely 'binary' feedback as with multislope - that is, a high or low on the comparator output would denote the 'state' of the integrator (positive or negative), so feedback of opposite polarity could be applied - the *time* the comparator was high or low was to be measured, to derive a rough estimate of how much charge had been present in the integrator during the cycle where it was measured, and inject enough (roughly quantized) charge in the next cycle to balance it.

I did take a look at how it could possibly be implemented (using PIO on the RP2040, of course), but didn't get very far with that for a reason I cannot remember.

In the days leading up to the new year (2024), I was also in touch with John Pickering who provided me crucial material with respect to his work on delta-sigma modulators, more specifically, the usage of a PWM DAC to achieve high linearity (in his own words: "reliably achieves linearity of 40ppb"). With PWM feedback, linearity is purely dependent on how accurately an edge can be placed within the PWM period. The ultimate limiting factor is random jitter or phase noise. In most cases (as explained in the HP Journal April 1989), this comes from the controller (FPGA/MCU), and has been successfully mitigated (Jaromir, Takovsky) with the addition of a garden-variety crystal oscillator and a D-latch (e.g. `74, `273). XOs are available at very reasonable prices with a jitter of less than 0.7psrms. At that point, the ultimate limiting factor to linearity is the jitter of the analog switch. Slow clocking and higher order modulators were the secret to the Pickering ADC's performance.

I also discovered a paper written by a Logan Penrod, as part of his Master's thesis. A very interesting idea was presented - a single-loop (in other words, single op-amp) higher order integrator. Such a construction would normally be unstable and prone to oscillations, but if the Rs and Cs in the circuit are sized correctly, one can achieve a 'normal' first order (-20dB/decade) rolloff in the 'forward' direction, i.e. with the signal transfer function. The noise transfer function is, however, of a higher order.

A higher-order modulator, consisting of multiple op-amps, was, in my line of thinking, impractical. Penrod's idea was therefore an ideal solution for implementing a higher order integrator with a single, precise composite amplifier loop.

Penrod implemented his ideas in LTspice, providing a rough 'recipe' with which I was able to replicate his experiments. I used his schematic and simulation commands as the basis of my further simulations. LTspice confirmed his higher-order single-loop integrator. High open-loop gain equated to a very low noise 'floor', that is, the loop could null out any frequencies in that band, while providing a steep 80dB/decade rolloff into higher frequencies.

I was also fascinated by Andrew Holme's MASH modulator page, which has a detailed explanation and implementation of how a multistage noise shaping algorithm worked. A single MASH stage is basically a first-order delta sigma modulator, and cascading multiple allows one to generate random noise with a higher order characteristic.

As the clock in the town hall struck 00:00 on the 01.01.2024, I came to the realization that a hybrid modulator could be constructed. A single analog integrator's output could be digitized, passed through a few MASH stages, and fed back in the form of PWM to close the loop. This would theoretically achieve a fourth-order noise transfer function, meaning very low quantization noise in the frequency band of interest - my goal was < -160dB at 10Hz.

I would not get an opportunity to simulate the hybrid modulator till 10 months later, after I had gotten familiar with QSPICE. LTspice, while being a very poweful tool (using behavioural voltage sources to perform calculations was my favourite trick), does not let you easily implement a digital algorithm like MASH.

QSPICE's custom C++ DLL modules let you include code in the simulation, so it was perfect for MASH. The simulation results were disappointing - despite adding four MASH orders to the analog modulator, the resulting NTF was still mostly first order. There was a clean 20dB/decade slope, but after a certain frequency, the higher-order response from the MASH modulators shows up as a steeper slope.

This was not *entirely* unexpected, since I did read about that on the EEVBlog forums:

> An additional third method shall be proposed, which is a certain combination of the 2 methods above:
3. The input signal is continuously integrated by only one analog integrator. The integrator output is digitised by a fast high-resolution ADC. The ADC output is integrated at least by 2 additional digital integrators, and the latter digital signals are combined to a digital modulator output (third or higher order). Closing the control loop via current switches, the errors of the ADC are highpass filtered, but only with 1st order filtering. The differential linearity of the ADC is essential for obtaining low "noise" at medium frequency. The output result is extracted from the switch control by suitable digital lowpass filtering (4th order or higher).

Since most of my previous work involved perfecting the modulator, the digital filter was set aside, to be worked on after getting the former properly working. However, I have occasionally taken to reading the odd paper about optimum filtering. There seem to be two classes of optimum filters - linear and non-linear. Linear filters can be analyzed in the time and frequency domain, whereas non-linear filters are usually recursive and 'deconstruct' the working of the modulator to find a mathematically optimum bitstream decoder. Hein et. al. in 1993 seems to have discovered the first mathematically optimum algorithm to decode the output of a first order delta sigma modulator (basically, a multislope modulator), called the 'zoomer' algorithm. However, this method, while being (relatively) easy to understand, is not immune to imperfect quantization. Kavusi et. al. came up with a (once again, relatively) intuitive analysis method for the algorithm in 2005. Wang, in 2020, presented the most understandable explanation of the zoomer algorithm so far, and supplemented it with a calculated example. Improvements in terms of thermal noise suppression and tolerance to imperfect quantization were also presented in the form of a modified zoomer algorithm. Tentatively, a 10x reduction in the number of modulation cycles to achieve the same resolution is possible. A completely linear computationally efficient decoder was also published by Wang in 2023. It involves a custom, real-time computable filter kernel, with which the modulator bitstream is convolved.

The advantages of using an optimum filter is that the lower number of cycles needed to achieve a given resolution can be used to increase the time period of a single modulation cycle, thereby increasing linearity (which is propotional jitter/period).