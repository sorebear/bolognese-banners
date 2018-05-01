{% set banner = "<%fileName%>" %}
{% set size = "width: <%width%>px; height:<%height%>px;" %}
{% from "./links.html" import link, closeLink %}

{% extends "layout.html" %}

{% block bodyClass %}{% endblock %}

{% block content %}

  {% include './main-content.html' %}
  <!--enter page specific content here-->

{% endblock %}

{% block isi %}
  {% include './isi.html' %}
{% endblock %}

{% block scripts %}
   <script src="js/bundle.js"></script>
   {% if orientationScript %}<script src="{{ orientationScript }}"></script>{% endif %}
{% endblock %}