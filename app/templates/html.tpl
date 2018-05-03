{% set banner = "<%fileName%>" %}
{% set width = <%width%> %} 
{% set height = <%height%> %}
{% from "./links.html" import link, closeLink, enabler %}

{% extends "layout.html" %}

{% block bannerClass %}{% endblock %}

{% block content %}

  {% include './main-content.html' %}
  <!--enter page specific content here-->

{% endblock %}

{% block isi %}
  {% include './isi.html' %}
{% endblock %}