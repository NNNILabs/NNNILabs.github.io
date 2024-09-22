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
					<li><a href="{{ post.url }}">{{ post.title | remove: '<p>' | remove: '</p>' }}</a><sub>{{ post.date | date: "%d.%m.%Y" }}</sub>
						<!-- no clue why i can't just use "item" here -->
						{% if currentcategory == "videos" %}	
						<ul><div class="border"></div><li><a href='{{ "/scripts/" | append: post.title | append: ".txt" | relative_url }}'>script</a></li></ul>
						{% endif %}
					</li>
					{% endfor %}
				</ul>
				</li>
			{% endif %}
		{% endfor %}
	{% endfor %}
	<li id="rr"><b>recommended resources</b>
	<ul>
		<div class="border"></div>
		<li><a href="https://skaytacium.com">the guy who built this website's website</a></li>
	</ul>
	</li>
</ul>
</div>