---
title: "Submit a tool - Web Accessibility Evaluation Tools List"
nav_title: "Submit a tool - Web Accessibility Evaluation Tools List"
lang: en   
last_updated: 2023-11-22
github:
  repository: w3c/wai-evaluation-tools-list
  path: content/submit-a-tool.md
permalink: /test-evaluate/tools/submit-a-tool/
ref: /test-evaluate/tools/submit-a-tool/
changelog: /teach-advocate/evaluation-tools-list/changelog/

acknowledgements: /test-evaluate/tools/acknowledgements/
footer: >
    <p><strong>Date:</strong> Information on specific tools is updated frequently, as we receive it. In the information for each tool there is a last updated date. The Evaluation Tools List user interface was updated in December 2023.</p>
    <p><strong>Editors and developers:</strong> <a href="https://www.w3.org/People/kevin/">Kevin White</a>, Michel Hansma, and Vera Lange. <strong>Content maintainers:</strong> José Ramón Hilera González and Len Beasley. ACKNOWLEDGEMENTS lists previous contributors, previous editors, and funders.</p>
---
<!-- markdownlint-disable no-inline-html -->

{% comment %}
  To DEBUG set any of the following to true.
  NB!! ensure to reset all to false before committing

  DEBUG_FUNCTION - pass DEBUG to submission function, causes function to return JSON rather than submitting to GitHub
  DEBUG_USE_LOCAL_FUNCTION - use local/domain function rather than live one exposed by the Netlify wai-website deploy
{% endcomment %}
{% assign DEBUG_SUBMISSION_FUNCTION = false %}
{% assign DEBUG_USE_LOCAL_SUBMISSION_FUNCTION = false %}

<div style="grid-column: 4 / span 4">

<style>
{% include wai-evaluation-tools-list/css/styles.css %}
main > header { grid-column: 4 / span 4; }
</style>

<div class="submission-header">
  <a href="../list/" class="backtolist">{% include_cached icon.html name="arrow-left" %}Back to List of Evaluation Tools</a>
  <p>
    This form allows you to provide information on your organization’s Tool for Web Accessibility Evaluation to be listed on the WAI website. Information submitted will also be publicly available in GitHub.
  </p>
  <p>

  </p>
  <p>
    If you have questions, want to update information in the list or delete a tool please send an e-mail to: <a href="mailto:group-wai-list-eval-tools@w3.org">group-wai-list-eval-tools@w3.org</a> 
  </p>
  <p>
    <i>Please note that W3C does not endorse specific providers. Resources are listed with no quality rating.</i>
  </p>
  
  <h2 id="scope">What evaluation tools are included</h2>
  
  <p>
    This list includes digital accessibility evaluation software tools in any language, free or paid. These tools are specifically designed to help determine if digital content meets accessibility guidelines.
  </p>
  
  <p>Tools that <strong>will</strong> be included on this list include:</p>

  <ul>
    <li>Tools, applications or extensions that are specifically designed to support the evaluation of digital accessibility.</li>
    <li>Tools that simulate user experience in order to support the identification of accessibility issues.</li>
  </ul>
    
  <p>Tools that <strong>will not</strong> be included in this list are:</p>
  
  <ul>
    <li>Assistive technologies, such as screen readers, or voice assistants, that are primarily designed to support people with disabilities using the web.</li>
    <li>Tools that primarily change content or code directly to improve accessibility.</li>
    <li>Checklists of accessibility requirements or Success Criteria.</li>
    <li>Recommendations, best practices, or methodologies about digital accessibility.</li>
  </ul>
</div>

{% capture success_page %}{{ page.dir }}success.html{% endcapture %}
{% capture failure_page %}{{ page.dir }}failure.html{% endcapture %}
{%- include list-submission-form.liquid type="start"
                                   name="submission"
                                   version="1"
                                   success=success_page
                                   failure=failure_page
                                   repository="wai-evaluation-tools-list"
                                   onsubmit="onSubmit"
                                   DEBUG_SUBMISSION_FUNCTION=DEBUG_SUBMISSION_FUNCTION
                                   DEBUG_USE_LOCAL_SUBMISSION_FUNCTION=DEBUG_USE_LOCAL_SUBMISSION_FUNCTION -%}

<div class="radio-field external-checkbox">
  <input type="checkbox" id="readterms" name="readterms" required>
  <label for="readterms">I have read the above and confirm that this submission meets the criteria for tools that will be included (Required)</label>
</div>

<div class="submission-form">
  <h2 id="general-information"><span>1/3</span>General information</h2>

  <div class="field">
      <label for="title" class="label-input">Tool name<span>(Required)</span></label>
      <input type="text" id="title" name="title" required>
  </div>
  <div class="field">
      <label for="website" class="label-input" aria-describedby="website-desc">Web address (URL)<span>(Required)</span></label>
      <p id="website-desc">Include 'http://' or 'https://' as appropriate.</p>
      <input type="url" id="website" name="website" required>
  </div>
  <div class="field">
      <label for="provider" class="label-input">Vendor / organization<span>(Required)</span></label>
      <input type="text" id="provider" name="provider" required>
  </div>
  <div class="field">
      <label for="contact" class="label-input">Email address<span>(Required)</span></label>
      <input type="email" id="contact" name="contact" required>
      <p class="subfieldtext"> 
        The list maintainer may use this e-mail address solely to contact you in case of questions about this submission.  For this purpose, it will be published in <a href="https://github.com/w3c/wai-evaluation-tools-list/pulls" target="_blank">Github</a>, where your submission will be processed. The e-mail address will never be displayed in the tool list.
      </p>
  </div>
  <div class="field">
      <label for="release" class="label-input">Release date<span>(Required)</span></label>
      <input type="date" id="release" name="release" required>
  </div>
  <div class="field">
      <label for="a11yloc" class="label-input">Accessibility statement (URL)</label>
      <input type="url" id="a11yloc" name="a11yloc">
      <p class="subfieldtext"> 
        While an accessibility statement is not required to submit a tool, it provides valuable information on your commitment to accessibility to your users. Get started by visiting <a href="https://www.w3.org/WAI/planning/statements/" target="_blank">Developing an Accessibility Statement</a>.
      </p>
  </div>
  <div class="field">
    <label for="actrules" class="label-input">ACT Rules (URL)</label>
    <input type="url" id="actrules" name="actrules" placeholder="https://www.w3.org/WAI/standards-guidelines/act/implementations/...">
    <p class="subfieldtext">
      Tools that have a documented implementation of Accessibility Conformance Testing (ACT) Rules can include a link to their ACT implementation report. To learn more about ACT Rules, read <a href="https://www.w3.org/WAI/standards-guidelines/act/implementations/" target="_blank">ACT Rules Implementation in Test Tools and Methodologies</a>. See also <a href="https://www.w3.org/WAI/standards-guidelines/act/implementations/#add-a-tool-or-methodology" target="_blank">Add a Test Tool or Methodology</a> for information on how to submit a new ACT implementation.
    </p>
  </div>

  <h2 id="tool-functionality"><span>2/3</span>Tool functionality</h2>

  <div class="field" id="features">
    <label for="feature-desc" class="label specialField">Short product description (max. 350 characters)<span>(Required)</span></label>
    <p>Add a description of key features and functionalities of the tool. Try to write this description in a way that tool users can understand.</p>
    <textarea id="feature-desc" name="features" rows="5" maxlength="350" required></textarea>
  </div>
  {% assign purpose = site.data.wai-evaluation-tools-list.filters | find: "id", "purpose" %}
  <fieldset class="field" id="purpose">
      <legend class="label-input">Purpose<span class="short-sub">(Required)</span></legend>
      <p>{{ purpose.infoForm }}</p>
      <div class="field-group">
        {% for option in purpose.options %}
          <div class="radio-field">
            <input type="checkbox" name="purpose[]" id="tool-purpose-{{ option.id }}" value="{{ option.name | strip_html }}" group="purpose" required>
            <label for="tool-purpose-{{ option.id }}">
              {% if option.info %}
                <abbr title="{{ option.info }}">{{ option.name }}</abbr>
              {% else %}
                {{ option.name }}
              {% endif %}
            </label>
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign product = site.data.wai-evaluation-tools-list.filters | find: "id", "product" %}
  <fieldset class="field" id="product">
      <legend class="label-input">Product evaluated<span class="short-sub">(Required)</span></legend>
      <div class="field-group">
        {% for option in product.options %}
          <div class="radio-field">
            <input type="checkbox" name="product[]" id="tool-product-{{ option.id }}" value="{{ option.name | strip_html }}" group="product" required>
            <label for="tool-product-{{ option.id }}">
            {% if option.info %}
                {{ option.info }}
              {% else %}
                {{ option.name }}
              {% endif %}
            </label>
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign technology = site.data.wai-evaluation-tools-list.filters | find: "id", "technology" %}
  <fieldset class="field" id="technology">
      <legend class="label-input">File type</legend>
      <div class="field-group">
        {% for option in technology.options %}
          <div class="radio-field">
            <input type="checkbox" name="technology[]" id="tool-technology-{{ option.id }}" value="{{ option.name | strip_html }}" group="technology">
            <label for="tool-technology-{{ option.id }}">
            {% if option.info %}
                {{ option.info }}
              {% else %}
                {{ option.name }}
              {% endif %}
            </label>
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign automated = site.data.wai-evaluation-tools-list.filters | find: "id", "automated" %}
  <fieldset class="field" id="automated">
      <legend class="label-input">Scope<span class="short-sub">(Required)</span></legend>
      <p>{{ automated.infoForm }}</p>
      <div class="field-group">
        {% for option in automated.options %}
          <div class="radio-field">
            <input type="checkbox" name="automated[]" id="tool-automated-{{ option.id }}" value="{{ option.name | strip_html }}" group="automated" required>
            <label for="tool-automated-{{ option.id }}">
            {% if option.info %}
                option.info }}
              {% else %}
                {{ option.name }}
              {% endif %}
            </label>
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign guideline = site.data.wai-evaluation-tools-list.filters | find: "id", "guideline" %}
  <fieldset class="field" id="guideline">
      <legend class="label-input">Standards</legend>
      <div class="field-group">
        {% for option in guideline.options %}
          <div class="radio-field">
            <input type="checkbox" name="guideline[]" id="tool-guideline-{{ option.id }}" value="{{ option.name | strip_html }}" group="guideline">
            <label for="tool-guideline-{{ option.id }}">
            {% if option.info %}
                {{ option.info }}
              {% else %}
                {{ option.name }}
              {% endif %}
            </label>
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign assists = site.data.wai-evaluation-tools-list.filters | find: "id", "assists" %}
  <fieldset class="field" id="assists">
      <legend class="label-input">Assists by</legend>
      <div class="field-group">
        {% for option in assists.options %}
          <div class="radio-field">
            <input type="checkbox" name="assists[]" id="tool-assists-{{ option.id }}" value="{{ option.name | strip_html }}" group="assists">
            <label for="tool-assists-{{ option.id }}">
            {% if option.info %}
                {{ option.info }}
              {% else %}
                {{ option.name }}
              {% endif %}
            </label>
          </div>
        {% endfor %}
      </div>
  </fieldset>

  <h2 id="tool-details"><span>3/3</span>Tool details</h2>
  <div class="field" id="language">
    <label for="language_1" class="label specialField">Language<span>(Required)</span></label>
    <p class="expl">Indicate in which language or languages this tool is provided.</p>
    <div class="line">
      <select name="language[]" id="language_1" class="select-form" required> 
          <option value=""></option>
          {% for language in site.data.lang %}
              <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
          {% endfor %}
      </select>
    </div>
    <div class="proto">
      <label for="language_[n]" class="label-input no-display"></label>
      <select name="language[]" id="language_[n]" class="select-form" disabled> 
          <option value=""></option>
          {% for language in site.data.lang %}
              <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
          {% endfor %}
      </select>
      <button type="button" aria-label="Remove" class="remove_line">Remove</button>
      </div>
    <button type="button" class="add_line small">Add language</button>
  </div>
  {% assign license = site.data.wai-evaluation-tools-list.filters | find: "id", "license" %}
  <fieldset class="field" id="license">
    <legend class="label-input">License<span class="short-sub">(Required)</span></legend>
    <div class="field-group">
      {% for option in license.options %}
        <div class="radio-field">
          <input type="checkbox" name="license[]" id="tool-license-{{ option.id }}" value="{{ option.name }}" group="license" required>
          <label for="tool-license-{{ option.id }}">{{ option.name }}</label>
        </div>
      {% endfor %}
      <div class="radio-field">
        <input type="checkbox" name="license[]" id="tool-license-other" class="tool-license-other-check" group="licence">
        <label id="tool-license-other" for="tool-license-other">Other:</label>
        <input aria-labeledby="tool-license-other" type="text" name="license[]" id="tool-license-other" class="tool-license-other-input">
      </div>
    </div>
  </fieldset>
  {% assign type = site.data.wai-evaluation-tools-list.filters | find: "id", "type" %}
  <fieldset class="field" id="type">
      <legend class="label-input">Type of tool<span class="short-sub">(Required)</span></legend>
        <p>{{ type.infoForm }}</p>
      <div class="field-group">
        {% for option in type.options %}
          <div class="radio-field">
            <input type="checkbox" name="type[]" id="tool-type-{{ option.id }}" value="{{ option.name | strip_html }}" group="type" required>
            <label for="tool-type-{{ option.id }}">
            {% if option.info %}
                {{ option.info }}
              {% else %}
                {{ option.name }}
              {% endif %}
            </label>
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign browsers = site.data.wai-evaluation-tools-list.filters | find: "id", "browsers" %}
  <fieldset class="field" id="browsers">
      <legend class="label-input">Browser for plugin</legend>
      <div class="field-group">
        {% for option in browsers.options %}
          <div class="radio-field">
            <input type="checkbox" name="browsers[]" id="tool-browsers-{{ option.id }}" value="{{ option.name | strip_html }}" group="browsers">
            <label for="tool-browsers-{{ option.id }}">
            {% if option.info %}
                {{ option.info }}
              {% else %}
                {{ option.name }}
              {% endif %}
            </label>
          </div>
        {% endfor %}
      </div>
  </fieldset>
  {% assign desktop = site.data.wai-evaluation-tools-list.filters | find: "id", "desktop" %}
  <fieldset class="field" id="desktop">
      <legend class="label-input">Operating system</legend>
      <div class="field-group">
        {% for option in desktop.options %}
          <div class="radio-field">
            <input type="checkbox" name="desktop[]" id="tool-desktop-{{ option.id }}" value="{{ option.name | strip_html }}" group="desktop">
            <label for="tool-desktop-{{ option.id }}">
            {% if option.info %}
                {{ option.info }}
              {% else %}
                {{ option.name }}
              {% endif %}
            </label>
          </div>
        {% endfor %}
      </div>
  </fieldset>

  <h2 id="submission"><span>4/5</span>Submitting your evaluation tool</h2>

  <div class="field">
    <label for="comments" class="label-input">Comments</label>
    <p class="expl" id="expl_comments">Let us know if you have further comments. This comment will be publicly available but not published on the evaluation tools list.</p>
    <textarea id="comments" name="comments" aria-describedby="expl_comments"></textarea>
  </div>
  
  <div class="radio-field external-checkbox">
    <input type="checkbox" id="publish-permission" name="publish-permission" required>
    <label for="publish-permission">I give permission for the information about this resource to be published in the W3C's Evaluation Tools List and archived on GitHub (Required).</label>
  </div>
  
  <p>We will aim to review and publish your submission within 2-4 weeks depending on the content. You will receive an email when we have reviewed your submission.</p>

  <div class="field">
    <button type="submit" class="submit-tool">Submit tool</button>
  </div>
</div>
{% include list-submission-form.liquid type="end"%}

<script>
{% include wai-evaluation-tools-list/js/submission.js %}
</script>
