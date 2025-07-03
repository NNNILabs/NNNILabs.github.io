---
category: articles
layout: default
title: Composite Integrators
---

# Composite Integrators

<span id="dropcap">A</span> selection of composite integrators found in various high-resolution bench DMMs is presented in the figure below. Since all the images on this website have a constant width, some details might not be visually appealing. For this reason, the image, an SVG file, can be opened and inspected in a new tab.<br><br>

![Composite Integrators](/assets/img/Composite_Integrators/Integrators.svg)<br><br>

## Introduction

The integrator, like the name suggests, is at the heart of all integrating ADCs like the single slope, dual slope, multislope (charge balancing) and delta-sigma. The function this circuit performs is simple - it integrates the input signal continuously over time, providing means to accumulate very small changes in voltage over relatively long periods of time in the first three types of ADC, or acts like a single-pole filter in the delta-sigma case.

An operational amplifier provides the basis for constructing a nearly ideal integrator, providing low offset voltages and bias currents, while having a large open-loop gain and bandwidth. The former set of parameters are important for integration over longer time periods, while the latter set represent the 'AC' characteristics, which determine, for example, settling time.

The fundamental resolving limit for integrating ADCs in particular is a result of the 'AC' characteristics - the availability of loop gain to maintain a close-to-ideal integrator transfer function over several frequency decades directly determines the theoretical maximum resolution [^Graeme_OOP].

However, the performance of a single amplifier is inadequate for high-resolution measurement, such as that performed by 6.5, 7.5 or 8.5 digit multimeters. The limiting factor is the offset voltage, drift thereof, limited open-loop gain, bandwidth and slew rate. Amongst the vast spectrum of operational amplifiers that are available on the market, finding one that is optimized to perform well in *all* of the parameters mentioned above is impossible. When the performance of one op-amp is inadequate, several can be embedded within the same feedback loop, resulting in a 'composite' amplifier. Each op-amp in the composite configuration can now be optimized to perform well in fewer characteristics. For example, the first stage could be a chopper-stabilized amplifier for low offset voltage, while the second could be a fast amplifier with a large bandwidth and high slew rate. The open-loop gains of both amplifiers are multiplied, resulting in an overall open-loop gain that is much larger than what can be achieved with a single amplifier, usually in excess of 200dB.

## Composite Amplifiers in Integrating ADCs

All integrating ADCs have at their heart a composite configuration. The elements that make up the composite amplifier usually have predictable properties - the first stage usually consists of a precision op-amp with a low offset voltage, low bias current and a high open-loop gain, while having a relatively low or moderate bandwidth in the single-digit megahertz. The second stage is usually a poor performer when it comes to precision criteria. The offset, bias and gain specifications are laughable at best. Millivolts, microamps and double-digit dB gain are common. However, the bandwidth and slew rate leave precision amplifiers coughing in the dust - gain-bandwidth products in the upper tens or several hundreds of megahertz, and slew rates that rival the output transition times of logic gates.<br><br>

<div align = "center">

<table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; text-align: center;">
  <thead>
    <tr>
      <th rowspan="2">Parameter</th>
      <th colspan="3">Slow</th>
      <th colspan="6">Fast</th>
    </tr>
    <tr>
      <th>OP27</th>
      <th>OPA177</th>
      <th>LT1001</th>
      <th>AD711</th>
      <th>AD829</th>
      <th>OPA602</th>
      <th>AD744</th>
      <th>LM6361</th>
      <th>AD848</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>V<sub>os</sub></td>
      <td>10 μV</td>
      <td>±10 μV</td>
      <td>10 μV</td>
      <td>100 μV</td>
      <td>100 μV</td>
      <td>0.5 mV</td>
      <td>0.25 mV</td>
      <td>22 mV</td>
      <td>0.2 mV</td>
    </tr>
    <tr>
      <td>I<sub>b</sub></td>
      <td>±10 nA</td>
      <td>±0.5 nA</td>
      <td>±0.5 nA</td>
      <td>15 pA</td>
      <td>3.3 μA</td>
      <td>±1 pA</td>
      <td>30 pA</td>
      <td>5 μA</td>
      <td>6.6 μA</td>
    </tr>
    <tr>
      <td>A<sub>ol</sub></td>
      <td>126 dB</td>
      <td>135 dB</td>
      <td>120 dB</td>
      <td>112 dB</td>
      <td>100 dB</td>
      <td>100 dB</td>
      <td>112 dB</td>
      <td>70 dB</td>
      <td>86 dB</td>
    </tr>
    <tr>
      <td>GBW</td>
      <td>8 MHz</td>
      <td>0.6 MHz</td>
      <td>0.8 MHz</td>
      <td>4 MHz</td>
      <td>750 MHz</td>
      <td>6.5 MHz</td>
      <td>13 MHz</td>
      <td>35 MHz</td>
      <td>175 MHz</td>
    </tr>
    <tr>
      <td>Slew Rate</td>
      <td>2.8 V/μs</td>
      <td>0.3 V/μs</td>
      <td>0.25 V/μs</td>
      <td>20 V/μs</td>
      <td>230 V/μs</td>
      <td>35 V/μs</td>
      <td>75 V/μs</td>
      <td>200 V/μs</td>
      <td>300 V/μs</td>
    </tr>
  </tbody>
</table>


</div><br><br>


[^Graeme_OOP]: J. Graeme, *Optimizing Op Amp Performance*, McGraw-Hill, 1996.



