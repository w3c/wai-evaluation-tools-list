---
# NEW: Comments for new repos start with "NEW". Please delete the NEW comments. Leave the other comments for translators. Also, search for @@s to replace. For multi-page resources and other frontmatter info, see: https://wai-website-theme.netlify.app/writing/frontmatter/
# Translation instructions are after the "#" character in this first section. They are comments that do not show up in the web page. You do not need to translate the instructions after #.
# In this first section, do not translate the words before a colon. For example, do not translate "title:". Do translate the text after "title:".
title: "Web Accessibility Evaluation Tools List"
title_html: "Web Accessibility Evaluation Tools List" 
nav_title: "Web Accessibility Evaluation Tools List"
doc-note-type: draft
lang: en   # Change "en" to the translated-language shortcode from https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
last_updated: 2021-@@-@@   # Put the date of this translation YYYY-MM-DD (with month in the middle)
# translators:    # remove from the beginning of this line and the lines below: "# " (the hash sign and the space)
# - name: "Jan Doe"   # Replace Jan Doe with translator name
# - name: "Jan Doe"   # Replace Jan Doe with name, or delete this line if not multiple translators
# contributors:
# - name: "Jan Doe"   # Replace Jan Doe with contributor name, or delete this line if none
# - name: "Jan Doe"   # Replace Jan Doe with name, or delete this line if not multiple contributors
github:
  repository: wai/wai-evaluation-tools-list
  path: content/index.md    # Add the language shortcode to the middle of the filename, for example: content/index.fr.md
permalink: /list-of-evaluation-tools/   # Add the language shortcode to the end, with no slash at end, for example: /link/to/page/fr
# NEW: 3 navigation lines below are only needed for multi-page resources where you have previous and next at the bottom. If so, un-comment them; otherwise delete these lines.
# navigation:
  # previous: /teach-advocate/list-of-evaluation-tools/@@
  # next: /teach-advocate/list-of-evaluation-tools/@@
ref: /teach-advocate/list-of-evaluation-tools/   # Translators, do not change this
changelog: /teach-advocate/list-of-evaluation-tools//changelog/  # NEW: set up a changelog so it's ready for later
acknowledgements: /teach-advocate/list-of-evaluation-tools/acknowledgements/  # NEW: delete if don't have a separate acknowledgements page. And delete it in the footer below.
description:  # NEW: add a 150ish-character-description for social media   # translate the description
# image: /content-images/list-of-evaluation-tools/social.png  # NEW: image for social media (leave commented out if we don't have a specific one for this reource)
# In the footer below:
# Do not translate or change CHANGELOG or ACKNOWLEDGEMENTS.
# Translate the other words below, including "Date:" and "Editor:"
# Translate the Working Group name. Leave the Working Group acronym in English.
# Do not change the dates in the footer below.
footer: >
   <p><strong>Date:</strong> <!-- Updated @@ Month 2021.--> First published Month 20@@. CHANGELOG.</p>
   <p><strong>Editors:</strong> @@name, @@name. <strong>Contributors:</strong> @@name, @@name, and <a href="https://www.w3.org/groups/wg/eowg/participants">participants of the EOWG</a>. ACKNOWLEDGEMENTS lists contributors and credits.</p>
   <p>Developed by the Accessibility Education and Outreach Working Group (<a href="http://www.w3.org/WAI/EO/">EOWG</a>). Developed as part of the <a href="https://www.w3.org/WAI/about/projects/wai-coop/">WAI-CooP project</a>, co-funded by the European Commission.</p>
---

<style> 
{% include css/styles.css %}
</style>
<div class="header-sup">
    <div class="header-left">
        <!-- <p>Web accessibility evaluation tools are software programs or online services that help you determine if web content meets accessibility guidelines. This page provides a list of evaluation tools that you can filter to find ones that match your particular needs.</p> -->
        <!-- <p>Web accessibility evaluation tools are software programs or online services that help you determine if web content meets accessibility guidelines. This page provides a list of evaluation tools that you can filter to find ones that match your particular needs. To determine what kind of tool you need and how they are able to assist you, see <a href="http://www.w3.org/WAI/eval/selectingtools">Selecting Web Accessibility Evaluation Tools</a>.</p> -->
        <p>Web accessibility evaluation tools are software programs or online services that help you determine if web content meets accessibility guidelines. This page provides a list of such tools.</p>
        <p>
            To determine what kind of tool you need and how they are able to assist you, see <a href="https://deploy-preview-32--wai-selecting-eval-tools.netlify.app/test-evaluate/tools/selecting/">Selecting Web Accessibility Evaluation Tools</a>.
        </p>
        {% include_cached button.html type="link" label="Submit your tool" class="more" href="submit-a-tool" %}
    </div>
    <div class="header-right">
    </div>
</div>
<div id="app">
    <div id="left-col" class="tools-filters">
        <h2 class="visuallyhidden">Filters</h2>
        <button class="button button-filters" aria-haspopup="true" aria-expanded="false" id="openfilters">Filters</button>
        <form data-filter-form action="..." class="data-filter-form">
            <div class="filter-header">
                <a class="close-filters">{% include_cached icon.html name="ex-circle" %}</a>
            </div>
            {% include box.html type="start" class="simple" %}
                <p>Need help finding the right tool?</p>
                {% include_cached button.html type="link" label="Start filter assistant" class="help-me-choose" %}
            {% include box.html type="end" %}
            <a href="#tools-list" class="button button--skip-link">Skip filters</a>
            {% for filter in site.data.filters %}
                {% if filter.showmore %}
                    <fieldset id="{{ filter.id }}" collapsed="{{ filter.collapsed }}" class="showmore {{ filter.order }}">
                {% else %}
                    <fieldset id="{{ filter.id }}" collapsed="{{ filter.collapsed }}" class="{{ filter.order }}">
                {% endif %}
                <legend class="label" tabindex="0">{{ filter.name }}
                    {% if filter.info %}
                        <abbr title="{{ filter.info }}" class="toggletip-container">
                            <img alt="{{ filter.info }}" data-toggletip-content="{{ filter.info }}" tabindex="0" src="/content-images/wai-evaluation-tools-list/info.png" />
                            <span class="toggletip-span" role="status"></span>
                        </abbr>
                    {% endif %}
                </legend>
                    <div class="options">
                    {% for option in filter.options %}
                    <div class="filter-options field">
                        <input type="{{ filter.type }}" id="filter-{{ option.id }}" name="{{ option.id }}">
                        <label for="filter-{{ option.id }}"><span class='filterName'>{{ option.name }}</span><span class="filterPreCounter"></span>
                            {% if option.info %}
                                <abbr title="{{ option.info }}" class="toggletip-container">
                                    <img alt="{{option.info}}" data-toggletip-content="{{ option.info }}" tabindex="0" src="/content-images/wai-evaluation-tools-list/info.png" />
                                    <span class="toggletip-span-inline" role="status"></span>
                                </abbr>
                            {% endif %}
                        </label>
                    </div>
                {% endfor %}
                </div>
            </fieldset>
            {% endfor %}
            {% assign langAvailable = site.data.lang %}
            <fieldset id="language" collapsed="true">
                <legend class='collapsible'>Language </legend>  
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
        <div class="tools-list-header">
            <h2 class="visuallyhidden">List of tools</h2>
            <div class="field">
                <label for="search" aria-label="Search tools, eg. “contrast” or “WCAG”" class="visuallyhidden">Search tools, eg. “contrast” or “WCAG”</label>
                <input type="search" id="search" placeholder="Search tools, eg. “contrast” or “WCAG”">
            </div>
            <div class="field" class="sort-by">
                <label for="select">Sort by</label>
                <select id="select" class="field" alt="Sort by">
                    {% for sort in site.data.sorting %}
                        {% if sort.selected == "true" %}
                            <option value="{{ sort.id }}" selected>{{ sort.name }}</option>
                        {% else %}
                            <option value="{{ sort.id }}">{{ sort.name }}</option>
                        {% endif %}
                    {% endfor %}
                </select>
            </div>
            <span id="status">
                <p id="total-tools">Showing <span>{{ site.data.tools | size }} tools</span></p>
            </span>       
            <!-- {% include excol.html type="all" %} -->
            <!-- {% include_cached button.html label="Clear filters" class="clear-button"%} -->
        </div>
        <div id="activeFilters"></div>
        <h4 id="found-tools"></h4>
        <div id="tools-list-body" class="tools-list">
            {% assign defaultSort = site.data.sorting.first.sortkey %}
            {% include tool.liquid data=site.data.tools sort_key=defaultSort %}
        </div>
        <div id="disclaimer">
            {% include box.html type="start" title="Disclaimer" %}
                <p>Information on this page is provided by vendors. <abbr title="World Wide Web Consortium">W3C</abbr> does not endorse specific products.</p>
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
{% include js/utilities.js %}
{% include js/tools.js %}
{% include js/helpers.js %}
</script>