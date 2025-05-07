---
category: drafts
layout: default
title: My Capacitor Charger Obsession
---

# My Capacitor Charger Obsession

For anyone interested in working with electromagnetic accelerators of some kind, a pulsed source of energy is highly desirable. The humble aluminium electrolytic capacitor fulfils this role perfectly. Relatively cheap and compact, while also being available with rather dangerous specifications like 450V 1000μF. Getting these capacitors filled up with all the energy they can store from a commonly available low-voltage source like batteries, wall warts or SMPSes takes some conversion.

This is where capacitor chargers come in. They take said low voltage source, and step it up to a voltage suitable to completely charge large capacitors.

My first forays into capacitor charging come from a curious era of crude experimentation involving bug zappers. They came with various shapes and sizes of transformers, usually wired in a blocking oscillator circuit with a feedback winding and a couple of passives. Although capable of generating high voltages, up to 600Vac and upwards of a kilovolt after the (usually) three-stage voltage multiplier, they were woefully underpowered. The insectoid victims of such a weapon would tend to disagree, but not in time to escape being reduced to carbon and emanating smoke that smelt vaguely umami.

I came across material online that made use of disposable cameras, which contained a similar circuit, but a more suitable (by my judgement back then) transformers. My very first electronics book, and probably the one that got me seriously started with the hobby, 101 Gadgets for the Evil Genius, featured, as one of its projects, a 'taser' made from such a disposable camera. They were, apparently, not really a thing in India, which made me resort to weapons of bug destruction.

In order to lessen the long time a single bug zapper transformer and oscillator took to charge my 200V 1000μF capacitor bank, I tried putting two in parallel, which did indeed help.

My criteria, inspired by another capacitor charger build I found on Instructables in 2015[^], was to make the cathode of an NE-2 neon bulb glow red hot. While I did get it brighter than if it was powered from a single circuit, the cathode never heated up to that point.

The first DIY switching converter I built was made on a piece of perfboard, powered by a 555 timer, and used an IRF510N as the switching element. The inductor was salvaged from an old PCB (possibly from a television), and was selected based on the thickness of the copper wire used to wind it. I remember clearly that the top of the inductor had a marking that said '101', 100μH. It was a crude boost converter.

It worked first try. The capacitors quickly charged to 100V, after which they would refuse to charge any further and the MOSFET, which didn't get very hot at all during the charging process, suddenly became blisteringly warm. Little did I know back then, that the 100V drain-source breakdown voltage was limiting my boost converter. I had neither an oscilloscope nor the expertise to use one to analyze this circuit further. It remains one of my surprisng early victories.

I made a long series of 1 inch by 2 inch perfboard flyback capacitor chargers, very few of which actually worked as intended. My first naive attempts involved a fixed-frequency fixed-duty controller and a hand-wound transformer, the core for which was salvaged from a broken CFL bulb, truly a one-of-a-kind piece. Inspired by a design from the 4HV forum[^], I added feedback to the charger, which tamed the input spikes. I made a slightly more detailed video[^] outlining (once again, superficially) the work done up to that point.

Some of my finest work was done between late 2017 and early 2018. I was still in the perfboard era, laying circuits out on graph paper, and documenting my work in colourful pens on loose sheets of paper. It was just me, working single-mindedly on one problem I was determined to solve. Social media was not a big player in my life, and wouldn't be for a couple more years. I was constantly building, experimenting, documenting, theorizing, and looking up information. Out of that era[^] came two videos, *The Perils of Power Electronics*[^] and *Midsummer Updates*[^]. Looking back upon those videos, my mind is filled with ideas that could have fixed my problems in a simple and effective fashion. Hindsight is always 2020.

My first encounter with the LT3750 was back in 2016. I printed out the datasheet and studied it religiously. I cannot say I fully understood the inner workings of the IC back then, as can be seen in a rather embarassing early NNNI video[^][^], which serves more as an example of how little I knew about the IC than an explanation of how it works.

In exchange for one piece of the rather expensive LT3750, I wrote a brief article[^], one of many in an uncredited series, describing the IC for my former employer, Components101[^]. It was a rather convenient arrangement - I wouldn't have to pay for an IC that was extremely pricey in Indian terms, or deal with shipping or customs issues that still plague my home country. I will have to re-iterate that the articles are always edited after submission to fit the website's style, so do not take it as an authentic example of text I wrote.

LT were the only people who have ever created an IC (two!) that was solely dedicated to charging high-energy capacitors, and also the only ones who really understood the problem and came up with a perfect topological solution.

It was only today (08.11.2024) that I discovered the `.meas` command in LTspice and the wonderful things it could do. I no longer needed to manually change component values and do multiple simulation runs to measure the charge time, I could simply set up the measure command, while stepping through various parameters, to measure the charge duration like so:

```
.meas tran pulseWidth time
+ TRIG V(done) VAL = 6 RISE = 1
+ TARG V(done) VAL = 6 FALL = 1
```

The measured time, `time`, is neatly printed in scientific format in the SPICE log, which can be opened using `CTRL + L`. Right-clicking on the table in the log allows you to plot the results against the stepped quantity.

I was able to use this to determine the optimum inductance and turns ratio for an LT3750-based flyback capacitor charger.

One idea I wanted to explore was the effect of various turns ratios on the charge time. This was primarily inspired by the rather disappointing charge time of my first LT3750 + DA2034 circuit. The problem stems from the large secondary inductance. The available peak currents are lower thanks to the large turns ratios, and the current ramp-down is also smaller, as the current slope is inversely proportional to inductance. The LT3751 datasheet has an entire paragraph explaining this.

> The transformer ratio, N, should be selected based on
the input and output voltages. Smaller N values equate
to faster charge times and larger available output power.
Note that drastically reducing N below the VOUT/VTRANS
ratio will increase the flyback voltage on the drain of the
NMOS and increase the current through the output diode.
The ratio, N, should not be drastically increased either,
due to the increased capacitance, N2 • CSEC, reflected to
the primary. A good choice is to select N equal to VOUT/
VTRANS.

The 'ideal' case of having the turns ratio equal to \\( \frac{V_{out}}{V_{trans}} \\) would result in a steady-state duty cycle of 50%. Going back to Simon Bramble's formula for duty cycle, it can be noted that as the turns ratio gets lower, the duty cycle increases drastically. With a 1:1 turns ratio and a large \\( V_{out} \\) to \\( V_{trans} \\) ratio, the duty cycle is very high.

[^]: [https://components101.com/ics/lt3750-current-mode-flyback-converter-ic](https://components101.com/ics/lt3750-current-mode-flyback-converter-ic){:target="_blank"}
[^]: My 'job' was an interesting arrangement. I was freelancing for two websites, Components101 and Circuit Digest, both outlets for CircuitLoop Technologies, LLP. My earnings averaged a couple thousand INR a month, roughly €15 to €20. Plenty for cheap locally-sourced components of dubious quality, but nowhere near enough to afford the €2 op-amps I consume on a weekly basis in DE. I count my blessings regularly.
[^]:[https://www.youtube.com/watch?v=cX-y3eF2xCA](https://www.youtube.com/watch?v=cX-y3eF2xCA){:target="_blank"}
[^]: I also seem to have come up with the concept of a 'short' video - a time-limited, superficial walkthrough.
[^]:[https://4hv.org/e107_plugins/forum/forum_viewtopic.php?id=156318](https://4hv.org/e107_plugins/forum/forum_viewtopic.php?id=156318){:target="_blank"}
[^]:[https://www.youtube.com/watch?v=ixZJm7WcIFA](https://www.youtube.com/watch?v=ixZJm7WcIFA){:target="_blank"}
[^]: I cannot talk about that era without mentioning my mother, who had recently won a small sum from a paper presentation as part of her PhD. She 'donated' to me that money, which I subsequently used to buy three IRF3205s.
[^]: [https://www.youtube.com/watch?v=I_bdtWAr1AE](https://www.youtube.com/watch?v=I_bdtWAr1AE){:target="_blank}
[^]: [https://www.youtube.com/watch?v=W309NvAzyLI](https://www.youtube.com/watch?v=W309NvAzyLI){:target="_blank"}
[^]: [https://www.youtube.com/watch?v=xOMwHEKC-7g](https://www.youtube.com/watch?v=xOMwHEKC-7g){:target="_blank"}