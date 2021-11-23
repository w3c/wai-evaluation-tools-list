---
# NEW: Comments for new repos start with "NEW". Please delete the NEW comments. Leave the other comments for translators. Also, search for @@s to replace. For multi-page resources and other frontmatter info, see: https://wai-website-theme.netlify.app/writing/frontmatter/
# Translation instructions are after the "#" character in this first section. They are comments that do not show up in the web page. You do not need to translate the instructions after #.
# In this first section, do not translate the words before a colon. For example, do not translate "title:". Do translate the text after "title:".
title: "List of Evaluation Tools"
title_html: "List of Evaluation Tools" 
nav_title: "List of Ealuation Tools"
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
  # previous: /teach-advocate/course-list/@@
  # next: /teach-advocate/course-list/@@
ref: /teach-advocate/course-list/   # Translators, do not change this
changelog: /teach-advocate/course-list/changelog/  # NEW: set up a changelog so it's ready for later
acknowledgements: /teach-advocate/course-list/acknowledgements/  # NEW: delete if don't have a separate acknowledgements page. And delete it in the footer below.
description:  # NEW: add a 150ish-character-description for social media   # translate the description
# image: /content-images/wai-course-list/social.png  # NEW: image for social media (leave commented out if we don't have a specific one for this reource)
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
    <p>This List of Courses provides information about courses, training, and certification on web accessibility from different providers. It is meant to help you make informed decisions to choose a resource. The page allows you to filter submissions to find ones that match your specific interest and need. If you wish to provide information about a course, training, or certification on web accessibility, please use the following button to add or update information about your resource.</p>
    {% include_cached button.html type="link" label="Submit a course, training, or certification" class="more" href="submit-an-offer" %}
    <p><em>Please note that the list items are provider-submitted, not <abbr title="World Wide Web Consortium">W3C</abbr>-endorsed. See the full <a href="#disclaimer">disclaimer</a> for more information about provider-submitted content.
    </em></p>
</div>
<div id="app">
    <div id="left-col" class="offers-filters">
        <form data-filter-form action="...">
            <h2>Filters</h2>
            {% for filter in site.data.filters %}
            <fieldset id="{{ filter.id }}">
                <legend class="label">{{ filter.name }}</legend>
<!--                {% if filter.name == "Format" %}
                    {% include resource-link.html label="Show info" href="#"%}
                {% endif %} -->
                {% for option in filter.options %}
                <div class="filter-options field">
                    <input type="{{ filter.type }}" id="filter-{{ option.id }}" name="{{ option.id }}">
                    <label for="filter-{{ option.id }}">{{ option.name }}</label>
                </div>
                {% endfor %}
            </fieldset>
            {% endfor %}
            {% assign langAvailable = site.data.offers | map: "language" | uniq %}
            <fieldset id="language-filter">
                <legend>Language</legend>
                <div class="filter-options field">
                    <select name="language" id="language">
                        <option value="">--Select an option--</option>
                        {% for language in langAvailable %}
                        <option value="{{ language }}">{{ site.data.lang[language].name }} ({{
                            site.data.lang[language].nativeName}})</option>
                        {% endfor %}
                    </select>
                </div>
            </fieldset>
            {% assign countriesAvailable = site.data.offers | map: "country" | uniq %}
            <fieldset id="contry-filter">
                <legend>Country</legend>
                <div class="filter-options field">
                    <select name="country" id="country">
                        <option value="">--Select an option--</option>
                        {% for country in countriesAvailable %}
                        <option value="{{ country }}">{{ site.data.countries[country].name }} ({{
                            site.data.countries[country].nativeName}})</option>
                        {% endfor %}
                    </select>
                </div>
            </fieldset>
        </form>
        {% include_cached button.html label="Clear filters" class="clear-button"%}
        <div id="disclaimer">
            <h2>Important Disclaimer</h2>
            <p><abbr title="World Wide Web Consortium">W3C</abbr> does not endorse specific vendor products. Inclusion of resources in this list does not indicate endorsement by W3C. Products and search criteria are listed with no quality rating.</p>
            <p>Courses descriptions, search criteria, and other information in this database are provider-submitted. W3C does not verify the accuracy of the information.</p>
            <p>The list is not a review of courses, nor a complete or definitive list of all courses. The information can change at any time.</p>
        </div>
    </div>
    <div id="offers-list">
        <span id="status">
            <p id="total-offers">Showing {{ site.data.offers | size }} results</p>
        </span>
        <div class="field" class="sort-by">
            <label for="select">Sort by</label>
            <select id="select">
                <option selected="selected">Alphabetically (A to Z)</option>
                <option>Most recently updated</option>
            </select>
        </div>        
        {% include excol.html type="all" %}
        {% include_cached button.html label="Clear filters" class="clear-button"%}
        {% assign offers = site.data.offers | sort: 'name' %}
        {% for offer in offers %}
            {% include offer.liquid %}
        {% endfor %}      
    </div>
    
</div>
<div class="button-submit-end">
    {% include_cached button.html type="link" label="Submit a course, training, or certification" class="more" href="submit-an-offer" %}  
</div>

<script>
{% include js/offers.js %}
</script>