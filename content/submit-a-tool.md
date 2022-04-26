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
  <a href="../list-of-evaluation-tools/">Back to List of evaluation tools</a>
  <p>
    concise and clear information about:
  </p>
  <ul>
    <li>the submission & validation process</li>
    <li>how users can update information after submitting a tool</li>
    <li>which type of tools can be submitted</li>
    <li>info should be informative and easy-to-read</li>
  </ul>
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
      <label for="title" class="label-input">Tool name</label>
      <input type="text" id="title" name="title" required>
  </fieldset>
  <fieldset class="field">
      <label for="provider" class="label-input">Vendor / organisation</label>
      <input type="text" id="provider" name="provider" required>
  </fieldset>
  <fieldset class="field">
      <label for="website" class="label-input">Web Address (URI)</label>
      <input type="url" id="website" name="website" required>
  </fieldset>
  <fieldset class="field">
      <label for="release"  class="label-input">Release date (dd/mm/yyyy)</label>
      <input type="date" id="release" name="release" required>
  </fieldset>
  <fieldset class="field">
      <label for="update"  class="label-input">Date of most recent update (dd/mm/yyyy)</label>
      <input type="date" id="update" name="update" required>
  </fieldset>
  <fieldset class="field">
      <label for="a11yloc" class="label-input">Accessibility statement (URI)<span>Optional</span></label>
      <input type="url" id="a11yloc" name="a11yloc">
      <p>
        While an accessibility statement is not required to submit a tool, it provides valuable information on your commitment to accessibility to your (potential) users. Get started by visiting (link to resource).
      </p>
  </fieldset>

  <h2 id="tool-functionality"><span>2/3</span>Tool functionality</h2>

  <fieldset class="field" id="features">
    <legend class="label">Features</legend>
    <div class="line">
      <label for="tool-feature_1" class="label-input"></label>
      <input type="text" name="features[]" id="feature_1" class="select-form" required> 
    </div>
    <div class="proto">
      <label for="tool-feature_[n]" class="label-input"></label>
      <input type="text" name="features[]" id="feature_[n]" class="select-form" disabled> 
    </div>
    <button type="button" class="add_line small">Add feature</button>
    <button type="button" class="remove_line small" disabled>Remove last feature</button>
  </fieldset>
  {% assign purpose = site.data.filters | find: "id", "purpose" %}
  <fieldset class="field" id="purpose">
      <legend for="tool-purpose"  class="label-input">Purpose</legend>
      <p>What type of evaluations does this tool support?</p>
      {% for option in purpose.options %}
        <div class="radio-field">
          <input type="checkbox" name="purpose[]" id="tool-purpose-{{ option.id }}" value="{{ option.name }}" group="purpose" required>
          <label for="tool-purpose-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign product = site.data.filters | find: "id", "product" %}
  <fieldset class="field" id="product">
      <legend for="tool-product"  class="label-input">Product to evaluate</legend>
      <p>What type of evaluations does this tool support?</p>
      {% for option in product.options %}
        <div class="radio-field">
          <input type="checkbox" name="product[]" id="tool-product-{{ option.id }}" value="{{ option.name }}" group="product" required>
          <label for="tool-product-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign technology = site.data.filters | find: "id", "technology" %}
  <fieldset class="field" id="technology">
      <legend for="tool-technology"  class="label-input">Supported file / format<span>Optional</span></legend>
      {% for option in technology.options %}
        <div class="radio-field">
          <input type="checkbox" name="technology[]" id="tool-technology-{{ option.id }}" value="{{ option.name }}" group="technology">
          <label for="tool-technology-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign automated = site.data.filters | find: "id", "automated" %}
  <fieldset class="field" id="automated">
      <legend for="tool-automated"  class="label-input">Scope of evaluation</legend>
      {% for option in automated.options %}
        <div class="radio-field">
          <input type="checkbox" name="automated[]" id="tool-automated-{{ option.id }}" value="{{ option.name }}" group="automated" required>
          <label for="tool-automated-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign checks = site.data.filters | find: "id", "checks" %}
  <fieldset class="field" id="checks">
      <legend for="tool-checks"  class="label-input">Accessibility checks<span>Optional</span></legend>
      <p>Which aspects of web accessibility can users evaluate with this tool?</p>
      {% for option in checks.options %}
        <div class="radio-field">
          <input type="checkbox" name="checks[]" id="tool-checks-{{ option.id }}" value="{{ option.name }}" group="checks">
          <label for="tool-checks-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign guideline = site.data.filters | find: "id", "guideline" %}
  <fieldset class="field" id="guideline">
      <legend for="tool-guideline"  class="label-input">Guidelines<span>Optional</span></legend>
      {% for option in guideline.options %}
        <div class="radio-field">
          <input type="checkbox" name="guideline[]" id="tool-guideline-{{ option.id }}" value="{{ option.name }}" group="guideline">
          <label for="tool-guideline-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign assists = site.data.filters | find: "id", "assists" %}
  <fieldset class="field" id="assists">
      <legend for="tool-assists"  class="label-input">Output<span>Optional</span></legend>
      {% for option in assists.options %}
        <div class="radio-field">
          <input type="checkbox" name="assists[]" id="tool-assists-{{ option.id }}" value="{{ option.name }}" group="assists">
          <label for="tool-assists-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>

  <h2 id="tool-details"><span>3/3</span>Tool details </h2>

  <fieldset class="field" id="language">
    <legend class="label">Language</legend>
    <p class="expl">Indicate in which language or languages this resource is provided.</p>
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
      </div>
    <button type="button" class="add_line small">Add language</button>
    <button type="button" class="remove_line small" disabled>Remove last language</button>
  </fieldset>
  {% assign license = site.data.filters | find: "id", "license" %}
 <fieldset class="field" id="license">
      <legend for="tool-license"  class="label-input">License</legend>
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
      <div class="radio-field-other">
        <label for="tool-license-purchase">Other:</label>
        <input type="text" name="license[]" id="tool-license-other">
      </div>
  </fieldset>
  {% assign type = site.data.filters | find: "id", "type" %}
  <fieldset class="field" id="type">
      <legend for="tool-type"  class="label-input">Type of tool</legend>
      {% for option in type.options %}
        <div class="radio-field">
          <input type="checkbox" name="type[]" id="tool-type-{{ option.id }}" value="{{ option.name }}" group="type" required>
          <label for="tool-type-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign browsers = site.data.filters | find: "id", "browsers" %}
  <fieldset class="field" id="browsers">
      <legend for="tool-browsers"  class="label-input">Browser<span>Optional</span></legend>
      {% for option in browsers.options %}
        <div class="radio-field">
          <input type="checkbox" name="browsers[]" id="tool-browsers-{{ option.id }}" value="{{ option.name }}" group="browsers">
          <label for="tool-browsers-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign desktop = site.data.filters | find: "id", "desktop" %}
  <fieldset class="field" id="desktop">
      <legend for="tool-desktop"  class="label-input">Operating system</legend>
      {% for option in desktop.options %}
        <div class="radio-field">
          <input type="checkbox" name="desktop[]" id="tool-desktop-{{ option.id }}" value="{{ option.name }}" group="desktop">
          <label for="tool-desktop-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>

  <div class="field">
    <button type="submit" class="submit-tool">Submit tool</button>
  </div>
</div>
{% include list-submission-form.liquid type="end"%}

<script>
{% include js/submission.js %}
</script>