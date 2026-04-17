---
layout: page
title: Blog
sub-title: Find out more
permalink: /blog/
---

<p><a href="{{ '/categories/' | relative_url }}">Browse by Categories & Tags →</a></p>

<ul class="post-list" id="post-list">
{% for post in site.posts %}
{% unless post.url contains 'archive' %}
<li class="post-list-item">
  <h3>
    <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
  </h3>
  <span class="post-meta">{{ post.date | date: "%B %d, %Y" }}</span>
  {%- if site.show_excerpts and post.excerpt -%}
  <div class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</div>
  {%- endif -%}
</li>
{% endunless %}
{% endfor %}
</ul>

<button id="load-more" class="load-more-btn">Load more</button>

<script>
(function () {
  var items = Array.from(document.querySelectorAll('.post-list-item'));
  var btn = document.getElementById('load-more');
  var batch = 10;
  var shown = 0;

  function showNext() {
    items.slice(shown, shown + batch).forEach(function (el) {
      el.style.display = '';
    });
    shown = Math.min(shown + batch, items.length);
    if (shown >= items.length) btn.style.display = 'none';
  }

  items.forEach(function (el) { el.style.display = 'none'; });
  showNext();
  btn.addEventListener('click', showNext);
})();
</script>
