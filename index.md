---
layout: default
title: "NNNILabs"
---

<link rel="stylesheet" href="{{ "/assets/css/index.css" | relative_url }}">

# NNNILabs

## [YouTube](https://youtube.com/@NNNILabs){:target="_blank"} | [Twitter](https://twitter.com/NNNILabs){:target="_blank"} | [GitHub](https://github.com/NNNILabs){:target="_blank"}

<span id="dropcap">A</span>fter spending 6 days straight editing what I consider my magnum opus (as of now), one of the first responses I got was: "Make a website!". Exasperation turned into inspiration, and over the coming weeks, I got [Skaytacium](https://skaytacium.com/me){:target="_blank"} to do my bidding and turn detailed instructions into _exactly_ the website I wanted - here it is! Welcome to the official NNNILabs website! I plan to use this website to mainly upload video scripts (of the more recent videos at least, for which I still have them), 'show notes', plots, data and other things that don't fit into my videos despite my best efforts.

<div id="categories">
<ul>
	{% for category in site.categories %}
		{% assign upborder = "" %}
		{% if forloop.first == true %} {% assign upborder = 'style="border-top: 2px solid"' %} {% endif %}
		{% for item in category %}
			{% if forloop.first == true %}
				<li id={{ item }}><b>{{ item }}</b>
					<div class="border" {{ upborder }}></div>
				{% assign currentcategory = item %}
			{% else %}
					<ul class="posts">
						<div class="connect"></div>
					{% for post in item %}
						{% assign last = "" %}
						{% if forloop.last == true %} {% assign last = 'class="last"' %} {% endif %}
						<li {{ last }}><a href="{{ post.url }}">{{ post.title | remove: '<p>' | remove: '</p>' }}</a><sub>{{ post.date | date: "%d.%m.%Y" }}</sub>
							<div class="border"></div>
						</li>
						{% if currentcategory == "videos" %}	
						<ul><li><div class="border"></div><a href='{{ "/scripts/" | append: post.title | append: ".txt" | relative_url }}' target="_blank">Script</a></li></ul>
						{% endif %}
					{% endfor %}
					</ul>
				</li>
			{% endif %}
		{% endfor %}
	{% endfor %}
	<li id="rr"><b>recommended</b>
		<ul class="posts">
				<div class="connect"></div>
			{% for link in site.data.links %}
				{% assign last = "" %}
				{% if forloop.last == true %} {% assign last = 'class="last"' %} {% endif %}
				<li {{ last }}><div class="border"></div><a href="{{ link.href }}" target="_blank">{{ link.text }}</a></li>
			{% endfor %}
		</ul>
	</li>
</ul>
</div>

<script src="{{ "/assets/js/index.js" | relative_url }}"></script>