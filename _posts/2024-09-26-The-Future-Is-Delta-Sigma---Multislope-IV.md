---
category: videos
layout: default
title: The Future is Delta Sigma - Multislope IV
---

# The Future Is Delta Sigma - Multislope IV

<iframe src="https://www.youtube.com/embed/CrzEJI-8Miw?si=wUpASTnZilBcXD9q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<span id="dropcap">A</span>fter reading footnote 61 in The Art of Electronics (3rd ed.), my curiosity about the converter topology described, was thoroughly aroused. I ended up spending a lot of time between November 2022 and August 2024 researching Multislope IV and the delta-sigma topology in general, from the point of view of integrating ADCs (think dual slope or multislope). This video is the result of nearly two years' worth of research and trying to understand delta-sigma in the context of Multislope IV, and also understanding how it was adapted to fit the needs of a bench multimeter.

## Addenda

1. Turns out that variable period PWM already has a formal mathematical description and name, described (along with a PWM example!) [in this article](https://www.embeddedrelated.com/showarticle/1620.php){:target="_blank"}[^1] by Jason Sachs. One also comes across Farey sequences and Stern-Brocot trees (in my case, in the context of optimum decoding algorithms for first-order integrating encoders; in other words, multislope and first-order delta-sigma ADCs), whose Wikipedia pages present familiar-looking plots and figures.

2. The plot from [20:11](https://youtu.be/CrzEJI-8Miw?t=1211){:target="_blank"}[^2] can also be found in a paper titled 'Better Accuracy in Temperature Calibration and Measurement through a New Type of Analog-to-Digital Converter' by Paul Bramley and John Pickering, which is publicly available [here](https://isotech.co.uk/wp-content/uploads/2020/09/microKcallabmagazine.pdf){:target="_blank"}[^3].

3. I used QSPICE, LTspice's spiritual successor ('[QSPICE is what I would have written 25 years ago when I wrote LTspice had I known then what I know now](https://www.linkedin.com/posts/mike-engelhardt-a788a822_qspice-revolutionizes-power-analog-device-activity-7089610116697620480-9Ey4/){:target="_blank"}')[^4] to model a multibit modulator, with interesting results. Since the simulation is ideal, without added dither, the integrator falls into a pattern with a rational (in the true mathematical sense) input voltage, relative to the full input range. In the case of a multislope, the patterns don't matter to a large extent, since the output voltage is simply propotional to the difference between the number of times the positive and negative references were turned on. A delta-sigma ADC, however, relies on noise shaping in the frequency domain. Performing an FFT, spikes in the frequency response are evident, and correlate to the frequency of the repeating patterns. Upon adding random dither to the feedback signal (a simple matter of `feedback = feedback + (rand() % 2)`), a nice noise-shaped frequency response with a 20dB/decade slope magically appears.

4. It might be tempting to assume, with a mulitbit modulator, that adding more bits to the loop keeps decreasing noise. This is true, but only up to a certain point. Once the quantizer and feedback resolution become high enough, the feedback basically becomes a perfect replica of the input signal, leaving no 'coarseness' for the loop to work it's magic upon. The result is a flat spectrum with no noise shaping - the modulator loop becomes useless, and the quantizer could just be used as a regular ADC. Delta-sigma needs this 'coarseness' to work. Of course, modulator frequency could be reduced to get back some coarseness. LTspice supports this theory, compared are a 6-bit and 16-bit modulator.

5. A multibit modulator could be viewed as an inverting op-amp amplifier with an ADC/DAC combination connected between the op-amp output and the feedback resistor, as described in figure 2 from this interestingly-written [ADI Minitutorial](https://www.analog.com/media/en/training-seminars/tutorials/ctsd-precision-adc-mini-tutorial.pdf){:target="_blank"}[^5]. Adding a capacitor to turn the amplifier into an integrator does not change output behaviour - in order to maintain loop balance, the output of the op-amp still needs to be the input voltage times the ratio of the input and feedback resistor.

\\[ V_{out} = V_{in} \cdot \frac{R_{feedback}}{R_{input}} \\]

[^1]: https://www.embeddedrelated.com/showarticle/1620.php
[^2]: https://youtu.be/CrzEJI-8Miw?t=1211
[^3]: https://isotech.co.uk/wp-content/uploads/2020/09/microKcallabmagazine.pdf
[^4]: https://www.linkedin.com/posts/mike-engelhardt-a788a822_qspice-revolutionizes-power-analog-device-activity-7089610116697620480-9Ey4/
[^5]: https://www.analog.com/media/en/training-seminars/tutorials/ctsd-precision-adc-mini-tutorial.pdf
