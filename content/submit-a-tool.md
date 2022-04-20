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
      <label for="tool-title" class="label-input">Tool name<span>Required</span></label>
      <input type="text" id="tool-title" required>
  </fieldset>
  <fieldset class="field">
      <label for="tool-provider" class="label-input">Vendor / organisation<span>Required</span></label>
      <input type="text" id="tool-provider" required>
  </fieldset>
  <fieldset class="field">
      <label for="tool-website" class="label-input">Web Address (URI)<span>Required</span></label>
      <input type="url" name="tool-website" id="tool-website" required>
  </fieldset>
  <fieldset class="field">
      <label for="tool-release"  class="label-input">Release date (dd/mm/yyyy)<span>Required</span></label>
      <input type="date" id="tool-release" required>
  </fieldset>
  <fieldset class="field">
      <label for="tool-a11yloc" class="label-input">Accessibility statement (URI)<span>Required</span></label>
      <input type="url" id="tool-a11yloc" required>
      <p>
        While an accessibility statement is not required to submit a tool, it provides valuable information on your commitment to accessibility to your (potential) users. Get started by visiting (link to resource).
      </p>
  </fieldset>

  <h2 id="tool-functionality"><span>2/3</span>Tool functionality</h2>

  <fieldset class="field" id="features">
    <legend class="label">Features</legend>
    <div class="line">
      <label for="tool-feature_1" class="label-input">Feature 1<span>Required</span></label>
      <input type="text" name="features[]" id="feature_1" class="select-form" required> 
    </div>
    <div class="proto">
      <label for="tool-feature_[n]" class="label-input">Feature [n]</label>
      <input type="text" name="feature[]" id="feature_[n]" class="select-form" required> 
    </div>
    <button type="button" class="add_line small">Add new feature</button>
    <button type="button" class="remove_line small" disabled>Remove last feature</button>
  </fieldset>
  {% assign purpose = site.data.filters | find: "id", "purpose" %}
  <fieldset class="field" id="purpose">
      <label for="tool-purpose"  class="label-input">Purpose<span>Required</span></label>
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
      <label for="tool-product"  class="label-input">Product to evaluate<span>Required</span></label>
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
      <label for="tool-technology"  class="label-input">Supported file / format<span>Required</span></label>
      {% for option in technology.options %}
        <div class="radio-field">
          <input type="checkbox" name="technology[]" id="tool-technology-{{ option.id }}" value="{{ option.name }}" group="technology" required>
          <label for="tool-technology-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign automated = site.data.filters | find: "id", "automated" %}
  <fieldset class="field" id="automated">
      <label for="tool-automated"  class="label-input">Scope of evaluation<span>Required</span></label>
      {% for option in automated.options %}
        <div class="radio-field">
          <input type="checkbox" name="automated[]" id="tool-automated-{{ option.id }}" value="{{ option.name }}" group="automated" required>
          <label for="tool-automated-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign checks = site.data.filters | find: "id", "checks" %}
  <fieldset class="field" id="checks">
      <label for="tool-checks"  class="label-input">Accessibility checks<span>Required</span></label>
      <p>Which aspects of web accessibility can users evaluate with this tool?</p>
      {% for option in checks.options %}
        <div class="radio-field">
          <input type="checkbox" name="checks[]" id="tool-checks-{{ option.id }}" value="{{ option.name }}" group="checks" required>
          <label for="tool-checks-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign guideline = site.data.filters | find: "id", "guideline" %}
  <fieldset class="field" id="checks">
      <label for="tool-guideline"  class="label-input">Guidelines<span>Required</span></label>
      {% for option in guideline.options %}
        <div class="radio-field">
          <input type="checkbox" name="guideline[]" id="tool-guideline-{{ option.id }}" value="{{ option.name }}" group="guideline" required>
          <label for="tool-guideline-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign assists = site.data.filters | find: "id", "assists" %}
  <fieldset class="field" id="checks">
      <label for="tool-assists"  class="label-input">Output<span>Required</span></label>
      {% for option in assists.options %}
        <div class="radio-field">
          <input type="checkbox" name="assists[]" id="tool-assists-{{ option.id }}" value="{{ option.name }}" group="assists" required>
          <label for="tool-assists-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>

  <h2 id="tool-details"><span>3/3</span>Tool details </h2>

  <fieldset class="field" id="language">
    <legend class="label">Language (Required)</legend>
    <p class="expl">Indicate in which language or languages this resource is provided.</p>
    <div class="line">
      <label for="tool-language_1" class="label-input">Language 1 (Required)</label>
      <select name="language[]" id="language_1" class="select-form" required> 
          <option value=""></option>
          {% for language in site.data.lang %}
              <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
          {% endfor %}
      </select>
    </div>
    <div class="proto">
      <label for="tool-language_[n]" class="label-input">Language [n]</label>
      <select name="language[]" id="language_[n]" class="select-form" required> 
          <option value=""></option>
          {% for language in site.data.lang %}
              <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
          {% endfor %}
      </select>
      </div>
    <button type="button" class="add_line small">Add new language</button>
    <button type="button" class="remove_line small" disabled>Remove last language</button>
  </fieldset>
  <!-- {% assign license = site.data.filters | find: "id", "license" %} -->
  <fieldset class="field" id="license">
      <label for="tool-license"  class="label-input">License<span>Required</span></label>
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
      <label for="tool-type"  class="label-input">Type of tool<span>Required</span></label>
      {% for option in type.options %}
        <div class="radio-field">
          <input type="checkbox" name="type[]" id="tool-type-{{ option.id }}" value="{{ option.name }}" group="type" required>
          <label for="tool-type-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign browsers = site.data.filters | find: "id", "browsers" %}
  <fieldset class="field" id="browsers">
      <label for="tool-browsers"  class="label-input">Browser<span>Required</span></label>
      {% for option in browsers.options %}
        <div class="radio-field">
          <input type="checkbox" name="browsers[]" id="tool-browsers-{{ option.id }}" value="{{ option.name }}" group="browsers" required>
          <label for="tool-browsers-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>
  {% assign desktop = site.data.filters | find: "id", "desktop" %}
  <fieldset class="field" id="desktop">
      <label for="tool-desktop"  class="label-input">Operating system<span>Required</span></label>
      {% for option in desktop.options %}
        <div class="radio-field">
          <input type="checkbox" name="desktop[]" id="tool-desktop-{{ option.id }}" value="{{ option.name }}" group="desktop" required>
          <label for="tool-desktop-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
  </fieldset>


<!--   <div class="field">
     <label for="submitter-name" class="label-input">Name (Required)</label>
     <input type="text" id="submitter-name" required>
   </div> -->
<!--    <div class="field">
     <label for="submitter-email" class="label-input">Email (Required)</label>
     <input type="email" id="submitter-email" required>
  </div> -->

<!--   <h2 id="the-resource">About the resource</h2>
  <p>Provide some information about the tool. This information will be publicly shared.</p>

  <div class="field">
      <label for="tool-provider" class="label-input">Provider (Required)</label>
      <input type="text" id="tool-provider" required>
  </div>
  <div class="field">
      <label for="tool-description" class="label-input">Description (Required)</label>
      <p class="expl">Provide a brief description of this tool (max.: 350 chars).</p>
      <textarea id="tool-description" maxlength="350" required></textarea>
      <p><em>Please enter only plain text (no HTML). URIs are not linked.</em></p>
  </div>

  <fieldset class="field"  id="tool-features">
    <legend class="label">Features (Required)</legend>
  </fieldset>

  <fieldset class="field" id="tool-purpose">
    <legend class="label">Purpose (Required)</legend>
    <div class="radio-field">
      <input type="radio" name="tool-purpose" id="tool-purpose-automated" required>
      <label for="tool-purpose-automated">Automatically test accessibility</label>
    </div> 
    <div class="radio-field">
      <input type="radio" name="tool-purpose" id="tool-purpose-manual" required>
      <label for="tool-purpose-manual">Support manual testing</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="tool-purpose" id="tool-purpose-simulate" required>
      <label for="tool-purpose-simulate">Simulate user experience</label>
    </div> 
  </fieldset>

  <fieldset class="field"  id="tool-product">
    <legend class="label">Product to evaluate (Required)</legend>
  </fieldset>

  <fieldset class="field"  id="tool-mediatype">
    <legend class="label">Media type (Required)</legend>
  </fieldset>

  <fieldset class="field"  id="tool-type">
    <legend class="label">Type of tool (Required)</legend>
  </fieldset>

  <fieldset class="field" id="course-license">
    <legend class="label">Paid or free (Required)</legend> -->
<!--     <div class="radio-field">
      <input type="radio" name="course-cost" id="course-cost-free">
      <label for="course-cost-free">Free of charge</label>
    </div> 
    <div class="radio-field">
      <input type="radio" name="course-cost" id="course-cost-free-certificates-for-purchase" required>
      <label for="course-cost-free-certificates-for-purchase">Free with certificates for purchase</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="course-cost" id="course-cost-free-limited-time">
      <label for="course-cost-free-limited-time">Free for limited content or duration</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="course-cost" id="course-cost-free-or-reduced-for-some">
      <label for="course-cost-free-or-reduced-for-some">Free or reduced fee for some</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="course-cost" id="course-cost-paid">
      <label for="course-cost-paid">Paid</label>
    </div>  --> 
 <!--   </fieldset>

  <fieldset class="field"  id="tool-scope">
    <legend class="label">Scope (Required)</legend>
  </fieldset>

  <fieldset class="field"  id="tool-guideline">
    <legend class="label">Guidelines (Required)</legend>
  </fieldset>

  <fieldset class="field"  id="tool-technology">
    <legend class="label">File format (Required)</legend>
  </fieldset>

  <fieldset class="field"  id="tool-operatingsystem">
    <legend class="label">Operating system (Required)</legend>
  </fieldset>

  <fieldset class="field"  id="tool-browser">
    <legend class="label">Browser (Required)</legend>
  </fieldset>

  <fieldset class="field"  id="tool-metrics">
    <legend class="label">Metrics (Required)</legend>
  </fieldset>

  <fieldset class="field" id="language">
    <legend class="label">Language (Required)</legend>
    <p class="expl">Indicate in which language or languages this resource is provided.</p>
    <div class="line">
      <label for="course-language_1" class="label-input">Language 1 (Required)</label>
      <select name="language" id="language_1" class="select-form" required> 
          <option value=""></option>
          {% for language in site.data.lang %}
              <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
          {% endfor %}
      </select>
    </div>
    <div class="proto">
      <label for="course-language_[n]" class="label-input">Language [n]</label>
      <select name="language" id="language_[n]" class="select-form" required> 
          <option value=""></option>
          {% for language in site.data.lang %}
              <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
          {% endfor %}
      </select>
      </div>
    <button type="button" class="add-line small">Add new language</button>
    <button type="button" class="remove-line small" disabled>Remove last language</button>
  </fieldset>

  <fieldset class="field"  id="course-accessibility-support">
    <legend><h3>Accessibility support</h3></legend>
    <p class="expl">If applicable, indicate what accessibility support is provided (see guidance on <a href="https://www.w3.org/WAI/teach-advocate/accessible-presentations/">How to Make Your Presentations Accessible to All</a>). Include details in the text box.</p>
    {% include accessibility-support.liquid %}
  </fieldset>

  <div class="field">
      <label for="tool-content-update"  class="label-input">Last updated (Required)</label>
      <input type="date" id="tool-content-update" required>
  </div>
  <div class="field">
      <label for="tool-content-release"  class="label-input">Date added? (Required)</label>
      <input type="date" id="tool-content-release" required>
  </div>

  <h2>Submitting your tool</h2>
  <div class="field">
    <label for="comments" class="label-input">Comments</label>
    <p class="expl">Let us know if you have any comments. This information will not be publicly shared.</p>
    <textarea id="comments"></textarea>
  </div>
  <fieldset class="field">
    <div class="radio-field">  
      <input type="checkbox" id="check-correct-info" required> 
      <label for="check-correct-info">The information I provided is correct according to the best of my knowledge (Required).</label>
    </div>
    <div class="radio-field">  
      <input type="checkbox" id="check-publish-info" required> 
      <label for="confirmatin-publish-info">I give permission for the information about this resource to be published in the W3C's List of Evaluation Tools (Required).</label>
    </div>
  </fieldset>
  <p>When you submit the form, we will review your submission and add it to the list. This will be within a month.</p> -->
  <div class="field">
    <button type="submit">Send information</button>
  </div>
</div>
{% include list-submission-form.liquid type="end"%}

<script>
{% include js/submission.js %}
</script>