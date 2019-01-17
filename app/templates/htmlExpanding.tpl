{% set width = <%width%> %} 
{% set height = <%height%> %}

{% set banner = "<%fileName%>" %}
{% block bannerClass %}{% endblock %}

{% from "./links.html" import link, closeLink, enabler %}

{% extends "layout-expanding.html" %}


{% block mainContentCollapsed %}

  {% include './main-content-collapsed.html' %}
  <!--enter page specific content here-->

{% endblock %}

{% block isiCollapsed %}
  {% include './isi.html' %}
{% endblock %}

{% block mainContentExpanded %}

  {% include './main-content-expanded.html' %}
  <!--enter page specific content here-->

{% endblock %}


{% block isiExpanded %}
  {% include './isi.html' %}
{% endblock %}