---
title: "Tools for web evaluation - add a tool"
nav_title: "Tools for web evaluation - add a tool"
doc-note-type: draft
lang: en   
last_updated: 2021-@@-@@
github:
  repository: w3c/wai-evaluation-tools-list
  path: content/submit-a-tool.md
permalink: list-of-evaluation-tools/submit-a-tool
ref: /teach-advocate/evaluation-tools-list/
changelog: /teach-advocate/evaluation-tools-list/changelog/
acknowledgements: /teach-advocate/evaluation-tools-list/acknowledgements/
description:  # NEW: add a 150ish-character-description for social media   # translate the description
# image: /content-images/wai-evaluation-tools-list/social.png  # NEW: image for social media (leave commented out if we don't have a specific one for this reource)
footer: 
   <p><strong>Date:</strong> <!-- Updated @@ Month 2021.--> First published Month 20@@. CHANGELOG.</p>
   <p><strong>Editors:</strong> @@name, @@name. <strong>Contributors:</strong> @@name, @@name, and <a href="https://www.w3.org/groups/wg/eowg/participants">participants of the EOWG</a>. ACKNOWLEDGEMENTS lists contributors and credits.</p>
   <p>Developed by the Accessibility Education and Outreach Working Group (<a href="http://www.w3.org/WAI/EO/">EOWG</a>). Developed as part of the <a href="https://www.w3.org/WAI/about/projects/wai-coop/">WAI-CooP project</a>, co-funded by the European Commission.</p>
---
<!-- markdownlint-disable no-inline-html -->

<div style="grid-column: 4 / span 4">

<style>
{% include css/styles.css %}
main > header { grid-column: 4 / span 4; }
</style>

<div class="submission-header">
  <a href="../list-of-evaluation-tools/" class="backtolist">{% include_cached icon.html name="arrow-left" %}Back to List of Evaluation Tools</a>
  <p>
    This form allows vendors of tools for web accessibility evaluation to submit their tool to the List of Tools for Web Evaluation. 
  </p>
  <p>
    <b>Note:</b> Information sent using this form is reviewed before the tool is published to the list. It can take <i>up to 10 business days</i> until the tool is published. A notification email is sent to you after submitting this form. This email is also copied to a publicly archived <a href="https://lists.w3.org/Archives/Public/public-wai-ert-tools/" target="_blank">mailing list</a>. 
  </p>
  <p>
    Contact <a href="mailto:shawn@w3.org">Shawn Lawton Henry (shawn@w3.org)</a> if you have questions or comments. 
  </p>
</div>

{%- include list-submission-form.liquid type="start"
                                   name="submission"
                                   version="1"
                                   success="/success.html"
                                   failure="/failure.html"
                                   repository="wai-evaluation-tools-list" -%}


<div class="submission-form">
  <h2 id="general-information"><span>1/3</span>General information</h2>

  <fieldset class="field">
      <legend for="title" class="label-input">Tool name<span>Required</span></legend>
      <input type="text" id="title" name="title" required>
  </fieldset>
  <fieldset class="field">
      <legend for="website" class="label-input">Web Address (URL)<span>Required</span></legend>
      <input type="url" id="website" name="website" required>
  </fieldset>
  <fieldset class="field">
      <legend for="provider" class="label-input">Vendor / organization<span>Required</span></legend>
      <input type="text" id="provider" name="provider" required>
  </fieldset>
  <fieldset class="field">
      <legend for="contact" class="label-input">Email Address<span>Required</span></legend>
      <input type="email" id="contact" name="contact" required>
  </fieldset>
  <fieldset class="field">
      <legend for="release"  class="label-input">Release date<span>Required</span></legend>
      <input type="date" id="release" name="release" required>
  </fieldset>
  <fieldset class="field">
      <legend for="update"  class="label-input">Date of most recent updat<span>Required</span>e</legend>
      <input type="date" id="update" name="update" required>
  </fieldset>
  <fieldset class="field">
      <legend for="a11yloc" class="label-input">Accessibility statement (URL)</legend>
      <input type="url" id="a11yloc" name="a11yloc">
      <p class="subfieldtext"> 
        While an accessibility statement is not required to submit a tool, it provides valuable information on your commitment to accessibility to your (potential) users. Get started by visiting <a href="https://www.w3.org/WAI/planning/statements/" target="_blank">Developing an Accessibility Statement</a>.
      </p>
  </fieldset>

  <h2 id="tool-functionality"><span>2/3</span>Tool functionality</h2>

  <fieldset class="field" id="features">
    <legend class="label">Features<span>Required</span></legend>
    <div class="line">
      <label for="tool-feature_1" class="label-input"></label>
      <input type="text" name="features[]" id="feature_1" class="select-form" required>
    </div>
    <div class="proto">
      <label for="tool-feature_[n]" class="label-input"></label>
      <input type="text" name="features[]" id="feature_[n]" class="select-form" disabled> 
      <button type="button" class="remove_line">Remove</button>
    </div>
    <button type="button" class="add_line small">Add feature</button>
    <!-- <button type="button" class="remove_line small" disabled>Remove last feature</button> -->
  </fieldset>
  {% assign purpose = site.data.filters | find: "id", "purpose" %}
  <fieldset class="field" id="purpose">
      <div class="fieldheader">
        <legend for="tool-purpose"  class="label-input">Purpose<span class="short-sub">(Required)</span></legend>
      </div>
      <p>What type of evaluations does this tool support?</p>
      <div class="field-group">
        {% for option in purpose.options %}
          <div class="radio-field">
            <input type="checkbox" name="purpose[]" id="tool-purpose-{{ option.id }}" value="{{ option.name }}" group="purpose" required>
            <label for="tool-purpose-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign product = site.data.filters | find: "id", "product" %}
  <fieldset class="field" id="product">
      <div class="fieldheader">
        <legend for="tool-product"  class="label-input">Product to evaluate<span class="short-sub">(Required)</span></legend>
        {% if product.info %}
          <abbr title="{{ product.info }}" class="toggletip-container">
              <img aria-label="Info Product to evaluate" tabindex="0" data-toggletip-content="{{ product.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
              <span class="toggletip-span" role="status"></span>
          </abbr>
        {% endif %}
      </div>
      <div class="field-group">
        {% for option in product.options %}
          <div class="radio-field">
            <input type="checkbox" name="product[]" id="tool-product-{{ option.id }}" value="{{ option.name }}" group="product" required>
            <label for="tool-product-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign technology = site.data.filters | find: "id", "technology" %}
  <fieldset class="field" id="technology">
      <div class="fieldheader">
        <legend for="tool-technology"  class="label-input">Supported files</legend>
        {% if technology.info %}
          <abbr title="{{ technology.info }}" class="toggletip-container">
              <img aria-label="Info Supported file / format" tabindex="0" data-toggletip-content="{{ technology.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
              <span class="toggletip-span" role="status"></span>
          </abbr>
        {% endif %}
      </div>
      <div class="field-group">
        {% for option in technology.options %}
          <div class="radio-field">
            <input type="checkbox" name="technology[]" id="tool-technology-{{ option.id }}" value="{{ option.name }}" group="technology">
            <label for="tool-technology-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign automated = site.data.filters | find: "id", "automated" %}
  <fieldset class="field" id="automated">
      <div class="fieldheader">
        <legend for="tool-automated"  class="label-input">Scope of evaluation<span class="short-sub">(Required)</span></legend>
        <p>{{ automated.info }}</p>
      </div>
      <div class="field-group">
        {% for option in automated.options %}
          <div class="radio-field">
            <input type="checkbox" name="automated[]" id="tool-automated-{{ option.id }}" value="{{ option.name }}" group="automated" required>
            <label for="tool-automated-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign checks = site.data.filters | find: "id", "checks" %}
  <fieldset class="field" id="checks">
      <div class="fieldheader">
        <legend for="tool-checks"  class="label-input">Accessibility checks</legend>
      </div>
      <p>Which aspects of web accessibility can users evaluate with this tool?</p>
      <div class="field-group">
        {% for option in checks.options %}
          <div class="radio-field">
            <input type="checkbox" name="checks[]" id="tool-checks-{{ option.id }}" value="{{ option.name }}" group="checks">
            <label for="tool-checks-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign guideline = site.data.filters | find: "id", "guideline" %}
  <fieldset class="field" id="guideline">
      <div class="fieldheader">
        <legend for="tool-guideline"  class="label-input">Guidelines</legend>
        {% if guideline.info %}
          <abbr title="{{ guideline.info }}" class="toggletip-container">
              <img aria-label="Info Guidelines" tabindex="0" data-toggletip-content="{{ guideline.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
              <span class="toggletip-span" role="status"></span>
          </abbr>
        {% endif %}
      </div>
      <div class="field-group">
        {% for option in guideline.options %}
          <div class="radio-field">
            <input type="checkbox" name="guideline[]" id="tool-guideline-{{ option.id }}" value="{{ option.name }}" group="guideline">
            <label for="tool-guideline-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign assists = site.data.filters | find: "id", "assists" %}
  <fieldset class="field" id="assists">
      <div class="fieldheader">
        <legend for="tool-assists"  class="label-input">Output</legend>
        {% if assists.info %}
          <abbr title="{{ assists.info }}" class="toggletip-container">
              <img aria-label="Info Output" tabindex="0" data-toggletip-content="{{ assists.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
              <span class="toggletip-span" role="status"></span>
          </abbr>
        {% endif %}
      </div>
      <div class="field-group">
        {% for option in assists.options %}
          <div class="radio-field">
            <input type="checkbox" name="assists[]" id="tool-assists-{{ option.id }}" value="{{ option.name }}" group="assists">
            <label for="tool-assists-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>

  <h2 id="tool-details"><span>3/3</span>Tool details</h2>
  <fieldset class="field" id="language">
    <legend class="label">Language<span>Required</span></legend>
    <p class="expl">Indicate in which language or languages this tool is provided.</p>
    <div class="line">
      <label for="tool-language_1" class="label-input"></label>
      <select name="language[]" id="language_1" class="select-form" required> 
          <option value=""></option>
          {% for language in site.data.lang %}
              <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
          {% endfor %}
      </select>
    </div>
    <div class="proto">
      <label for="tool-language_[n]" class="label-input"></label>
      <select name="language[]" id="language_[n]" class="select-form" disabled> 
          <option value=""></option>
          {% for language in site.data.lang %}
              <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
          {% endfor %}
      </select>
      <button type="button" class="remove_line">Remove</button>
      </div>
    <button type="button" class="add_line small">Add language</button>
    <!-- <button type="button" class="remove_line small" disabled>Remove last language</button> -->
  </fieldset>
  {% assign license = site.data.filters | find: "id", "license" %}
 <fieldset class="field" id="license">
  <div class="field-group">
      <legend for="tool-license"  class="label-input">License<span class="short-sub">(Required)</span></legend>
<!--       {% for option in license.options %}
        <div class="radio-field">
          <input type="checkbox" name="license[]" id="tool-license-{{ option.id }}" value="{{ option.name }}" required>
          <label for="tool-license-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %} -->
      <div class="radio-field">
        <input type="checkbox" name="license[]" id="tool-license-free" value="Free" group="licence" required>
        <label for="tool-license-free">Free</label>
      </div>
      <div class="radio-field">
        <input type="checkbox" name="license[]" id="tool-license-limited" value="Limited free functionality" group="licence" required>
        <label for="tool-license-limited">Limited free functionality</label>
      </div>
      <div class="radio-field">
        <input type="checkbox" name="license[]" id="tool-license-time" value="Time-limited trial" group="licence" required>
        <label for="tool-license-time">Time-limited trial</label>
      </div>
      <div class="radio-field">
        <input type="checkbox" name="license[]" id="tool-license-subscription" value="Subscription" group="licence" required>
        <label for="tool-license-subscription">Subscription</label>
      </div>
      <div class="radio-field">
        <input type="checkbox" name="license[]" id="tool-license-purchase" value="One-time purchase" group="licence" required>
        <label for="tool-license-purchase">One-time purchase</label>
      </div>
      <div class="radio-field">
        <input type="checkbox" name="license[]" id="tool-license-other" class="tool-license-other-check" group="licence">
        <label for="tool-license-purchase">Other:</label>
        <input type="text" name="license[]" id="tool-license-other" class="tool-license-other-input">
      </div>
    </div>
  </fieldset>
  {% assign type = site.data.filters | find: "id", "type" %}
  <fieldset class="field" id="type">
      <div class="fieldheader">
        <legend for="tool-type"  class="label-input">Type of tool<span class="short-sub">(Required)</span></legend>
        {% if type.info %}
          <abbr title="{{ type.info }}" class="toggletip-container">
              <img aria-label="Info Type of tool" tabindex="0" data-toggletip-content="{{ type.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
              <span class="toggletip-span" role="status"></span>
          </abbr>
        {% endif %}
      </div>
      <div class="field-group">
        {% for option in type.options %}
          <div class="radio-field">
            <input type="checkbox" name="type[]" id="tool-type-{{ option.id }}" value="{{ option.name }}" group="type" required>
            <label for="tool-type-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign browsers = site.data.filters | find: "id", "browsers" %}
  <fieldset class="field" id="browsers">
      <div class="fieldheader">
        <legend for="tool-browsers"  class="label-input">Browser</legend>
        {% if browsers.info %}
          <abbr title="{{ browsers.info }}" class="toggletip-container">
              <img aria-label="Info Browser" tabindex="0" data-toggletip-content="{{ browsers.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
              <span class="toggletip-span" role="status"></span>
          </abbr>
        {% endif %}
      </div>
      <div class="field-group">
        {% for option in browsers.options %}
          <div class="radio-field">
            <input type="checkbox" name="browsers[]" id="tool-browsers-{{ option.id }}" value="{{ option.name }}" group="browsers">
            <label for="tool-browsers-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign desktop = site.data.filters | find: "id", "desktop" %}
  <fieldset class="field" id="desktop">
      <div class="fieldheader">
      <legend for="tool-desktop"  class="label-input">Operating system</legend>
        {% if desktop.info %}
          <abbr title="{{ desktop.info }}" class="toggletip-container">
              <img aria-label="Info Operating System" tabindex="0" data-toggletip-content="{{ desktop.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
              <span class="toggletip-span" role="status"></span>
          </abbr>
        {% endif %}
      </div>
      <div class="field-group">
        {% for option in desktop.options %}
          <div class="radio-field">
            <input type="checkbox" name="desktop[]" id="tool-desktop-{{ option.id }}" value="{{ option.name }}" group="desktop">
            <label for="tool-desktop-{{ option.id }}">{{ option.name }}</label>
            {% if option.info %}
              <abbr title="{{ option.info }}" class="toggletip-container">
                  <img aria-label="Info {{ option.name }}" tabindex="0" data-toggletip-content="{{ option.info }}" src="/content-images/wai-evaluation-tools-list/info.png" />
                  <span class="toggletip-span-inline" role="status"></span>
              </abbr>
            {% endif %}
          </div>
        {% endfor %}
      </div>
  </fieldset>

  <div class="field">
    <button type="submit" class="submit-tool">Submit tool</button>
  </div>
</div>
{% include list-submission-form.liquid type="end"%}

<script>
{% include js/submission.js %}
</script>