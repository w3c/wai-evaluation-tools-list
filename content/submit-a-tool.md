---
title: "Submit an evaluation tool"
nav_title: "Submit an evaluation tool"
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

<div style="grid-column: 4 / span 4">

<style>
{% include css/styles.css %}
main > header { grid-column: 4 / span 4; }
</style>

<a href="../list-of-evaluation-tools/">Back to List of evaluation tools</a>
<p>
  This form allows you to provide information about a new evaluation tool to add to the list.

<p><em>Please note that <abbr title="World Wide Web Consortium">W3C</abbr> does not endorse specific providers. Resources are listed with no quality rating. All information (except your name and email) will be publicly available as this page generates a Pull Request on our GitHub repository where you can also come back to in order to edit your tool.</em></p> 

{% include netlify-form.liquid type="start" id="form-submit-a-tool" %}
  <h2 id="about-you">About you</h2>
  <p>We'd like to know who you are, so that we can contact you with questions about your submission. This information will not be publicly shared.</p>

  <div class="field">
     <label for="submitter-name" class="label-input">Name (Required)</label>
     <input type="text" id="submitter-name" required>
   </div>
   <div class="field">
     <label for="submitter-email" class="label-input">Email (Required)</label>
     <input type="email" id="submitter-email" required>
  </div>

  <h2 id="the-resource">About the resource</h2>
  <p>Provide some information about the tool. This information will be publicly shared.</p>

  <div class="field">
      <label for="tool-title" class="label-input">Title (Required)</label>
      <input type="text" id="tool-title" required>
  </div>
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
    <legend class="label">Paid or free (Required)</legend>
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
  </fieldset>

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
      <label for="course-website" class="label-input">Website (Required)</label>
      <p class="expl">Indicate the website containing more information about this tool.</p>
      <input type="url" name="tool-website" id="tool-website" required>
  </div>

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
  <p>When you submit the form, we will review your submission and add it to the list. This will be within a month.</p>
  <div class="field">
    <button type="submit">Send information</button>
  </div>
{% include netlify-form.liquid type="end"%}

<script>
{% include js/courses.js %}
</script>