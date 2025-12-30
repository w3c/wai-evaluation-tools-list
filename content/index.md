---
# Translation instructions are after the "#" character in this first section. They are comments that do not show up in the web page. You do not need to translate the instructions after #.
# In this first section, do not translate the words before a colon. For example, do not translate "title:". Do translate the text after "title:".
title: "Web Accessibility Evaluation Tools List"
title_html: "Web Accessibility Evaluation Tools List" 
nav_title: "Web Accessibility Evaluation Tools List"
lang: en   # Change "en" to the translated-language shortcode from https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
last_updated: 2025-12-19   # Put the date of this translation YYYY-MM-DD (with month in the middle)

# translators:    # remove from the beginning of this line and the lines below: "# " (the hash sign and the space)
# - name: "Jan Doe"   # Replace Jan Doe with translator name
# - name: "Jan Doe"   # Replace Jan Doe with name, or delete this line if not multiple translators
# contributors:
# - name: "Jan Doe"   # Replace Jan Doe with contributor name, or delete this line if none
# - name: "Jan Doe"   # Replace Jan Doe with name, or delete this line if not multiple contributors

permalink: /test-evaluate/tools/list/   # Add the language shortcode to the end, with no slash at end, for example: /link/to/page/fr
ref: /teach-advocate/list-of-evaluation-tools/   # Do not change this

sidebar: false
---

<style> 
{% include wai-evaluation-tools-list/css/styles.css %}
</style>
<div class="header-sup">
    <div class="header-left">
        <p>Web accessibility evaluation tools are software programs or online services that help you determine if web content meets accessibility guidelines. This page provides a list of such tools.</p>
        <p>
            To determine what kind of tool you need and how they are able to assist you, see <a href="../selecting/">Selecting Web Accessibility Evaluation Tools</a>.
        </p>
        {% include box.html type="start" %}
        <p>Information on this page is submitted by providers and others. <abbr title="World Wide Web Consortium">W3C</abbr> does not endorse specific products.</p>
        <p>See <a href="#disclaimer">Disclaimer</a>.</p>
        {% include box.html type="end" %}
        <p>
          {% assign submit = "/test-evaluate/tools/submit-a-tool/" | relative_url %}
          {% include_cached button.html type="link" label="Submit your tool" class="more" href=submit %}
        </p>
    </div>
    <div class="header-right">
    </div>
</div>
<div id="app">
    <div id="left-col" class="tools-filters">
        <button class="button button-filters" aria-haspopup="true" aria-expanded="false" id="openfilters">Filters</button>
        <form data-filter-form action="..." class="data-filter-form">
            <h2>Filters</h2>
            <div class="filter-header">
                <a class="close-filters">{% include_cached icon.html name="ex-circle" %}</a>
            </div>
            <a href="#tools-list" class="button button--skip-link">Skip filters</a>
            {% for filter in site.data.wai-evaluation-tools-list.filters %}
                {% if filter.showfilter  %}
                    {% if filter.showmore %}
                        <fieldset id="{{ filter.id }}" collapsed="{{ filter.collapsed }}" class="showmore {{ filter.order }}">
                    {% else %}
                        <fieldset id="{{ filter.id }}" collapsed="{{ filter.collapsed }}" class="{{ filter.order }}">
                    {% endif %}
                    <legend class="label" tabindex="0">
                        {% if filter.info %}
                            {{ filter.info }}
                        {% else %}
                            {{ filter.name }}
                        {% endif %}
                    </legend>
                    <div class="options">
                    {% for option in filter.options %}
                    <div class="filter-options field">
                        <input type="{{ filter.type }}" id="filter-{{ option.id }}" name="{{ option.id }}">
                            {% if option.info %}
                                <label for="filter-{{ option.id }}"><span class='filterName'>{{ option.info }}</span><span class="filterPreCounter"></span>
                            {% else %}
                                <label for="filter-{{ option.id }}"><span class='filterName'>{{ option.name }}</span><span class="filterPreCounter"></span>
                            {% endif %}
                        </label>
                    </div>
                    {% endfor %}
                    </div>
                    <a href="#tools-list" class="button button--skip-link">Skip to results</a>
                </fieldset>
                {% endif %}
            {% endfor %}
            {% assign langAvailable = site.data.lang %}
            <fieldset id="language" collapsed="true">
                <legend class='collapsible' tabindex="0">Language </legend>  
                    <div class="options collapsible">
                    {% for language in langAvailable %}
                        <div class="filter-options field">
                            <input type="checkbox" id="lang-filter-{{ language.first }}" name="language">
                            <label for="lang-filter-{{ language.first }}"><span class='filterName'>{{ language.last.name }}</span><span lang="{{ language.first }}"> ({{
                                language.last.nativeName}})</span><span class="filterPreCounter"></span></label>
                        </div>
                    {% endfor %}
                    </div>
            </fieldset>
        </form>
    </div>
    <div id="tools-list">
        <h2>Tools list</h2>
        <div class="tools-list-header">
            <h2 class="visuallyhidden">List of tools</h2>
            <div class="field searchbox">
                <label for="search" aria-label="Search tools" class="visuallyhidden">Search tools</label>
                {% include_cached icon.html name="search" %}<input type="search" id="search" placeholder="Search tools">
            </div>
            <div class="field" class="sort-by">
                <label for="select">Sort by</label>
                <select id="select" class="field">
                    {% for sort in site.data.wai-evaluation-tools-list.sorting %}
                        {% if sort.selected == "true" %}
                            <option value="{{ sort.id }}" selected>{{ sort.name }}</option>
                        {% else %}
                            <option value="{{ sort.id }}">{{ sort.name }}</option>
                        {% endif %}
                    {% endfor %}
                </select>
            </div>
            <span id="status">
                <p id="total-tools">Showing <span>{{ site.data.wai-evaluation-tools-list.submissions | size }} tools</span></p>
            </span>       
            <!-- {% include excol.html type="all" %} -->
            <!-- {% include_cached button.html label="Clear filters" class="clear-button"%} -->
        </div>
        <div id="activeFilters"></div>
        <h4 id="found-tools"></h4>
        <div id="tools-list-body" class="tools-list">
            {% assign defaultSort = site.data.wai-evaluation-tools-list.sorting.first.sortkey %}
            {% include wai-evaluation-tools-list/liquid/tool.liquid data=site.data.wai-evaluation-tools-list.submissions sort_key=defaultSort %}
        </div>
        <div id="disclaimer">
            {% include box.html type="start" title="Disclaimer" h="3" %}
                <p><abbr title="World Wide Web Consortium">W3C</abbr> does not endorse specific vendor products. Inclusion of products in this list does not indicate endorsement by W3C. Products and search criteria are listed with no quality rating.</p>
                <p>Tool descriptions, search criteria, and other information in this database is provided by tool developers, vendors, or others. W3C does not verify the accuracy of the information.</p>
                <p>The list is not a review of evaluation tools, nor a complete or definitive list of all tools. The information can change at any time.</p>
            {% include box.html type="end" %}
        </div>
    </div>
</div>
<div id="help-me-choose-overlay"><div class="overlay-content"></div></div>
<!-- <div class="button-submit-end">
    {% include_cached button.html type="link" label="Add your tool" class="more" href="submit-a-tool" %}  
</div> -->
<script>
{% include wai-evaluation-tools-list/js/utilities.js %}
{% include wai-evaluation-tools-list/js/tools.js %}
</script>