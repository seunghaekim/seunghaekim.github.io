---
layout: page
title: About
permalink: /about/
---

## Summary

몇 권의 책과 잡지의 제작에 디자이너와 기획자로 관여했고, 어떤 책들은 저자에 이름을 올렸다. 꾸준한 직장생활과 개인작업의 환경을 효율적으로 개선하기 위해 다양한 툴과 프로그래밍을 공부했고, 지금은 프론트엔드 개발자로서 경력을 시작하기 위한 준비중에 있다.

{% assign reverse_resume = site.resume | reverse %}

<h2 class="biography"></h2>
{% for resume in reverse_resume %}
{% if resume.categories contains "biography" %}
    {{ resume.content }}
{% endif %}
{% endfor %}

<h2 class="summary"></h2>
{% for resume in reverse_resume %}
{% if resume.categories contains "summary" %}
    {{ resume.content }}
{% endif %}
{% endfor %}

<h2 class="workhistory">Work History</h2>

{% for resume in reverse_resume %}
    {% if resume.categories contains "workhistory" %}

    <h3 class="workhistory">{{ resume.title }}, {{ resume.roll }}, {{ resume.start | date: "%Y" }} ― {% if resume.end %}{{ resume.end | date: "%Y" }}{% endif %}</h3>

    <ul>
        <li class="roll"></li>
    </ul>

    {{ resume.content }}

    {% endif %}
{% endfor %}

<h2 class="awards">Awards</h2>
{% for resume in reverse_resume %}
    {% if resume.categories contains "awards" %}

    <h3 class="awards">"{{ resume.title }}", {{ resume.award-categories}}, {{ resume.host }}, {{ resume.date | date: "%Y" }}</h3>

    {% if resume.description %}
    <p class="description">{{ resume.description }}</p>
    {% endif %}

    {% endif %}
{% endfor %}
