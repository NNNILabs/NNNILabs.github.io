---
layout: default
title: "NNNILabs"
---

<link rel="stylesheet" href="{{ "/assets/css/index.css" | relative_url }}">

# NNNILabs

## [YouTube](https://youtube.com/@NNNILabs) | [Twitter](https://twitter.com/NNNILabs) | [GitHub](https://github.com/NNNILabs)

<span id="dropcap"></span> 

<div id="categories">
<ul>
	{% for category in site.categories %}
		{% for item in category %}
			{% if forloop.first == true %}
				<li id={{ item }}><b>{{ item }}</b>
				<div class="border"></div>
				{% assign currentcategory = item %}
			{% else %}
				<ul class="posts">
					<div class="border"></div>
					{% for post in item %}
						{% assign last = "" %}
						{% if forloop.last == true %} {% assign last = "class=last" %} {% endif %}
						<li {{ last }}><a href="{{ post.url }}" target="_blank">{{ post.title | remove: '<p>' | remove: '</p>' }}</a><sub>{{ post.date | date: "%d.%m.%Y" }}</sub>
							{% if currentcategory == "videos" %}	
							<ul><div class="border"></div><li><a href='{{ "/scripts/" | append: post.title | append: ".txt" | relative_url }}' target="_blank">script</a></li></ul>
							{% endif %}
						</li>
					{% endfor %}
				</ul>
				</li>
			{% endif %}
		{% endfor %}
	{% endfor %}
	<li id="rr"><b>recommended resources</b>
	<ul class="posts">
		<div class="border"></div>
		{% for link in site.data.links %}
			{% assign last = "" %}
			{% if forloop.last == true %} {% assign last = "class=last" %} {% endif %}
			<li {{ last }}><a href="{{ link.href }}" target="_blank">{{ link.text }}</a></li>
		{% endfor %}
	</ul>
	</li>
</ul>
</div>

<script src="{{ "/assets/js/index.js" | relative_url }}"></script>