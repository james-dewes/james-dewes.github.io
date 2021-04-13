---
layout: page
title: Blog
sub-title: Find out more
permalink: /blog/
---
<ul class="archive-list">
{% assign categories_list = site.categories %}
    {% for category in categories_list %}
      {% if category[0] != 'blog'%}
        <li><a href="#{{ category[0] | downcase | url_escape | strip | replace: ' ', '-' }}">{{ category[0] | capitalize }} ({{ category[1].size }})</a></li>
      {% endif %}
    {% endfor %}
{% assign categories_list = nil %}
</ul>

{% for category in site.categories %}
  {% if category[0] != 'blog' %}
    {% include archive-item.html %}
  {% endif %}
{% endfor %}