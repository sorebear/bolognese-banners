{% macro link(link, class) %}<a href="javascript:window.open(window.{{ link }})" class="{{ class }}" target="_blank">{% endmacro %}

{% macro closeLink() %}</a>{% endmacro %}

{% macro enabler() %}
<script>
  <%clickTags%>
</script>
{% endmacro %}