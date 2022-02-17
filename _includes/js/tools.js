const filterForm = document.querySelector('[data-filter-form]');
const sortForm = document.querySelector('.sort-by');
const searchForm = document.querySelector('#search');

const importJson = String.raw`{{ site.data.tools | jsonify }}`;
importJson.replace("\\","\\\\");

const jsonTools = JSON.parse(importJson);
const jsonFilters = JSON.parse('{{site.data.filters | jsonify}}');
const jsonLang = JSON.parse('{{site.data.lang | jsonify}}');
const jsonCountry = JSON.parse('{{ site.data.countries | jsonify}}');
const jsonHelpers = JSON.parse('{{site.data.helpers | jsonify}}');

var toolsList = document.getElementById('tools-list');
var toolsListContent = document.querySelector('.tools-list');

var activeFiltersBlock = document.getElementById('activeFilters');

var activeHelperFilters = [];
var prevStep = [];

//Pagination settings
var currentPage = 1;
var toolsPerPage = 8;

document.querySelectorAll('fieldset').forEach(item => {
  if(item.getAttribute("collapsed")){
    makeCollapsible(item);
  }
})

document.querySelectorAll('.showmore').forEach(item => {
  makeShowMore(item);
})

document.querySelector('.button-help-me-choose').addEventListener('click', e => {
    getHelpMeChooseStep(e);
})

document.querySelector('.button-filters').addEventListener('click', e => {
    toggleFilters();
})

document.querySelector('.close-filters').addEventListener('click', e => {
    toggleFilters();
})

if (filterForm && sortForm && search) {

  filterForm.addEventListener('change', el => {
    filterJson(filterForm);
  });

  sortForm.querySelector('select').addEventListener('change', el => {
    filterJson(filterForm);
  });

  searchForm.addEventListener('keyup', el => {
    filterJson(filterForm);
  });
  searchForm.addEventListener('search', el => {
    filterJson(filterForm);
  });

  //Add pre-counters to filters
  showFilterCounters(filterForm, true);

  //Add pagination after showing tools
  var initialArticles = Array.from(toolsListContent.querySelectorAll('aside'));
  addPagination(initialArticles)

  function showFilterCounters(form, init){
    var counterFiltersOn = getActiveFiltersList(form);
    var counterResults = filterNewResultsList(counterFiltersOn);
    var projectedCounterFiltersOn = counterFiltersOn;

    form.querySelectorAll('fieldset').forEach(att => {
      att.querySelectorAll('input[type="checkbox"]').forEach(filter => {
        projectedCounterFiltersOn = getActiveFiltersList(form);
        
        var attValues = [];
        attValues.push(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText);
        filterName = att.querySelectorAll('legend')[0].innerText;
        
        var newFilter = false;
        projectedCounterFiltersOn.forEach(f => {
          if(f.filterId === att.id){
            f.filterValues = [];
            f.filterValues.push(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText);
            newFilter = true;
          }
        })
        if(newFilter === false){
          projectedCounterFiltersOn.push({ filterId: att.id, filterName: filterName, filterValues: attValues }); 
        }

        var projectedCounterResults = filterNewResultsList(projectedCounterFiltersOn);
        var counter = Object.values(projectedCounterResults).length;
        att.querySelector("label[for='" + filter.id + "']").querySelector(".filterPreCounter").innerText = "(" + counter + ")";
        
        if(init == true){
          if(att.id === "language" && counter === 0 && !filter.checked){
            att.querySelector("label[for='" + filter.id + "']").parentNode.style.display = "none";
          }
        }
      })
    });
  }

  function filterJson(form) {
    //form = document.querySelector('[data-filter-form]');

    // selecting filters on
    var filtersOn = getActiveFiltersList(form);
    console.log(filtersOn);

    // filtering results
    var newResults = [];

    newResults = filterNewResultsList(filtersOn);
    console.log(newResults);

    //Filter on search term
    var searchTerm = searchForm.value;
    console.log(searchTerm);
    var searchedResults = [];
    Object.values(newResults).forEach(o => {
      if(o.title.toLowerCase().includes(searchTerm.toLowerCase())){
        searchedResults.push(o);
      }
    })
    console.log(searchedResults);

    //rebuild document
    rebuildList(searchedResults, filtersOn);

    // callDebug(jsonFilters, jsonTools, filtersOn, newResults, toolsList);
  }

  function getActiveFiltersList(form) {
    var activeFiltersList = [];
    var attValues = [];

    // for each attribute group
    form.querySelectorAll('fieldset').forEach(att => {

      attValues = [];
      filterName = att.querySelectorAll('legend')[0].innerText;

      att.querySelectorAll('input[type="checkbox"]').forEach(filter => {
        if (filter.checked) {
          attValues.push(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText);
        }
      })

      if (attValues.length > 0){
        activeFiltersList.push({ filterId: att.id, filterName: filterName, filterValues: attValues });
      }

      att.querySelectorAll('select').forEach(filter => {
        attValues = [];
        if (filter.value != "") {
          attValues.push(filter.value)
          activeFiltersList.push({ filterId: filter.id, filterName: filterName, filterValues: attValues });
        }

      });

    });

    return activeFiltersList;
  }

  function updateHelperFiltersList(form, list, back) {
    console.log("oude");
    console.log(list);
    var activeFiltersList = list;
    var attValues = [];

    // for each attribute group
    form.querySelectorAll('fieldset').forEach(att => {

      attValues = [];
      filterName = att.querySelectorAll('legend')[0].innerText;

      att.querySelectorAll('input[type="checkbox"]').forEach(filter => {
        if (filter.checked) {
          attValues.push(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText);
        }
      })

      if(activeFiltersList.find(f => f.filterId === att.id)){
        var index = activeFiltersList.findIndex(i => i.filterId === att.id);
        activeFiltersList.splice(index, 1);
      }

      if (attValues.length > 0){
        activeFiltersList.push({ filterId: att.id, filterName: filterName, filterValues: attValues });
      }

      att.querySelectorAll('select').forEach(filter => {
        attValues = [];
        if (filter.value != "") {
          attValues.push(filter.value)
          activeFiltersList.push({ filterId: filter.id, filterName: filterName, filterValues: attValues });
        }

      });

    });

    return activeFiltersList;
  }

  function filterNewResultsList(filtersOnList) {
    var newResultsList = [];
    // console.log(filtersOnList);
    // by attribute
    filtersOnList.forEach(filter => {
      newResultsList.push(Object.values(jsonTools).filter((x) => filter.filterValues.some(
        function(r) {
          if(x[filter.filterId] !== undefined){
            if(filter.filterId === "language"){
              return x[filter.filterId].some(function(v){ return v.indexOf(r)>=0 });
            }else{
              console.log(jsonFilters);
              console.log(filter);
              var currentFilter = jsonFilters.find(f => f.id === filter.filterId && f.name === filter.filterName);
              var mask = currentFilter.options.find(o => o.name === r);

              if(mask.filtername != undefined){
                if(Array.isArray(mask.filtername)){
                  if(filter.filterId == "license"){
                    console.log(r);
                    console.log(mask);
                    console.log(x[filter.filterId]);
                  }
                  var tracker;
                  mask.filtername.forEach(mfn => {
                    if(tracker === undefined || tracker === false){
                      tracker = x[filter.filterId].some(function(m){ return m.indexOf(mfn)>=0 });
                    }
                  })
                  console.log(tracker);
                  return tracker;
                }else{
                  if(Array.isArray(x[filter.filterId])){  
                    return x[filter.filterId].some(function(m){ return m.indexOf(mask.filtername)>=0 }) || x[filter.filterId].includes(r);
                  }else{  
                    return x[filter.filterId] === mask.filtername || x[filter.filterId] === r;
                  }
                }
              }else{
                return x[filter.filterId].includes(r);
              }
            }
          }else{
            return false;
          }
        })
      ));
    })

    // if no filter, show all tools
    if (newResultsList.length === 0)
      newResultsList = jsonTools;
    // intersection between results [tools]
    else
      newResultsList = newResultsList.reduce((a, c) => a.filter(i => c.includes(i)));

    return newResultsList;
  }

  function rebuildList(newResults, filtersOn) {

    const articles = toolsListContent.querySelectorAll('aside');
    var totalToolsCounter = document.getElementById("total-tools");
    var totalTools = document.getElementById("found-tools");

    var listFiltersOnString = document.createElement('dl');

    filtersOn.forEach(f => {

      var attName = document.createElement('dt');
      attName.innerText = f.filterName + ':';
      listFiltersOnString.appendChild(attName);

      var attValues = document.createElement('dd');

      // if (f.filterId == 'language')
        // attValues.innerText = jsonLang[f.filterValues[0]].name + " (" + jsonLang[f.filterValues[0]].nativeName + ")";
      // else 
      if (f.filterId == 'country')
        attValues.innerText = jsonCountry[f.filterValues[0]].name + " (" + jsonCountry[f.filterValues[0]].nativeName + ")";
      else
        attValues.innerText = f.filterValues.join(', ');
      listFiltersOnString.appendChild(attValues);
    });

    //Sort items
    var list = document.querySelector('.tools-list');
    var sortedArticles = Array.from(articles);
    newResults.sort(sortList);
    sortedArticles.sort(function(a, b){  
      return newResults.findIndex(x => x.title === a.id) - newResults.findIndex(x => x.title === b.id);
    });
    //Reset list and pagination
    sortedArticles.forEach(a => {
      a.classList.remove("hiddenInPagination");
    })
    currentPage = 1;
    list.innerHTML = "";
    
    for (i = 0; i < sortedArticles.length; ++i) {
      list.appendChild(sortedArticles[i]);
    }

    sortedArticles.forEach(el => {
      if (!Object.values(newResults).find(o => o.title === el.id)){
        el.hidden = true;
        el.classList.add("inactive");
      }
      else{
        el.hidden = false;
        el.classList.remove("inactive");
      }
    })
    addPagination(sortedArticles);

    if (Object.values(newResults).length === 0) {
      totalTools.innerText = "Sorry, but no tools match the following criteria: ";
      totalTools.appendChild(listFiltersOnString);
      var searchTerm = searchForm.value;
      if(searchTerm.length > 0){
        totalTools.innerHTML += "<br>Searchterm: \"" + searchTerm + "\"";
      }
      hideClearButton(false);
    }else{
      totalTools.innerText = "";
      hideClearButton(true);
    }
    if(Object.values(newResults).length === 1){
      totalToolsCounter.innerHTML = "Showing <span>" + Object.values(newResults).length + " result</span>";
    }else{
      totalToolsCounter.innerHTML = "Showing <span>" + Object.values(newResults).length + " results</span>";
    }

    console.log(newResults);
    updateActiveFilters();
    showFilterCounters(filterForm, false);
  }

  function addPagination(sortedArticles) {
    // console.log(sortedArticles);
    var list = document.querySelector('.tools-list');
    var activeToolsCount = sortedArticles.filter((article) => !article.classList.contains("inactive")).length;
    if(activeToolsCount > toolsPerPage){
      list.innerHTML += '<div class="paginationBlock">' 
      +'<div id="btn_prev">{% include_cached icon.html name="arrow-left" %}<a href="#tools-list" onclick="previousPage('+activeToolsCount+')">Previous page</a></div>'
      +'<span id="pageCount"></span>'
      +'<div id="btn_next"><a href="#tools-list" onclick="nextPage('+activeToolsCount+')">Next page</a>{% include_cached icon.html name="arrow-right" %}</div>'
      +'</div>';
      changePage(currentPage, activeToolsCount);
    }
  }

  function previousPage(activeToolsCount) {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage, activeToolsCount);
    }
  }

  function nextPage(activeToolsCount) {
    if (currentPage < numPages(activeToolsCount)) {
        currentPage++;
        changePage(currentPage, activeToolsCount);
    }
  }

  function numPages(activeToolsCount) {
    return Math.ceil(activeToolsCount / toolsPerPage);
  }

  function changePage(page, activeToolsCount) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var list = document.querySelector('.tools-list');
    var page_span = document.getElementById("pageCount");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages(activeToolsCount)) page = numPages(activeToolsCount);
    const articles = toolsListContent.querySelectorAll('aside');
    var sortedArticles = Array.from(articles);
    var activeArticles = sortedArticles.filter((article) => !article.classList.contains("inactive"));

    activeArticles.forEach(a => {
      a.classList.add("hiddenInPagination");
    })

    for (var i = (page-1) * toolsPerPage; i < (page * toolsPerPage); i++) {
      if(activeArticles[i] != undefined){
        activeArticles[i].classList.remove("hiddenInPagination");
      }
    }
    page_span.innerHTML = "Page " + page + " of " + numPages(activeToolsCount);

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }
    if (page == numPages(activeToolsCount)) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
  }

  function updateActiveFilters() {
    var filtersOn = getActiveFiltersList(filterForm);
    activeFiltersBlock.innerHTML = "";
    filtersOn.forEach(filterGroup => {
      filterGroup.filterValues.forEach(filter => {
        var prefix = "";
        if(getFilterName(filter) == "Desktop application" || getFilterName(filter) == "Mobile application"){
          prefix += filterGroup.filterId + ": ";
        }
        if(getFilterName(filter) == "Statement available"){
          console.log(filterGroup);
          prefix += filterGroup.filterName + ": ";
        }
        activeFiltersBlock.innerHTML += '<div class="filterTag">'+prefix+getFilterName(filter)+' <a onclick="removeFilter(\''+filter+'\')">{% include_cached icon.html name="ex-circle" %}</a></div>';
      })
    })
    if(filtersOn.length > 0){
      activeFiltersBlock.innerHTML += '<div class="clearButton"><a class="button-clear-button">Clear all filters</a></div>';
    }

    document.querySelectorAll('.button-clear-button').forEach(item => {
      item.addEventListener('click', e => { clearFilters(e) });
    })
  }

  function getFilterName(filter){
    var guidelines = jsonFilters.find(e => e.id === 'guideline');
    var activeFilter = guidelines.options.find(e => e.name === filter);
    var name = "";
    if(activeFilter != undefined){
      name = activeFilter.short;
    }else{
      name = filter;
    }
    return name;
  }

  function removeFilter(filterTitle) {
    console.log(filterTitle);
    var form = filterForm;
    form.querySelectorAll('fieldset').forEach(att => {
      att.querySelectorAll('input[type="checkbox"]').forEach(filter => {
        if (att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText == filterTitle) {
          filter.checked = false;
        }
      })
    });
    filterJson(form);
  }

  function sortList(a, b) {
    var selectedSort = document.querySelector('.sort-by').querySelector('select').value;
    if(selectedSort == "alphabeticallyaz"){
      return a.title.localeCompare(b.title);
    }else if(selectedSort == "alphabeticallyza"){
      return b.title.localeCompare(a.title);
    }else if(selectedSort == "recentlyupdated"){
      return new Date(b.update) - new Date(a.update);
    }else if(selectedSort == "recentlyadded"){
      return new Date(b.release) - new Date(a.release);
    }
    return false;
  }

  function hideClearButton(isHidden) {
    document.querySelectorAll('.button-clear-button').forEach(item => { item.hidden = isHidden });
  }


  function clearFilters(e) {
    e.preventDefault();
    filterForm.querySelectorAll("input[type='checkbox']").forEach(el => el.checked = false);
    filterForm.querySelectorAll("select").forEach(el => el.selectedIndex = 0);
    filterJson(filterForm);
  }


  function callDebug(jsonFilters, jsonTools, filtersOn, newResults, toolsList) {
    console.log("Filters:");
    console.log(jsonFilters);
    console.log("Tools:");
    console.log(jsonTools);
    console.log("Filters On:");
    console.log(filtersOn);
    console.log("Results:");
    console.log(newResults);
    console.log("toolsList");
    console.log(toolsList);
  }

  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName].length === 0) {
        delete obj[propName];
      }
    }
    return obj
  }

}

function showHelpMeChoose(step){
  var currentStep = step;
  var overlay = document.getElementById("help-me-choose-overlay");
  overlay.style.display = "flex";
  var overlayContent = overlay.querySelector('.overlay-content');
  overlayContent.innerHTML = "";

  var content = "<div class='helper-header'><h3>"+currentStep.name+"</h3>";
  content += "<h4>"+currentStep.question+"</h4>";
  content += '<a onclick="closeHelperOverlay()">{% include_cached icon.html name="ex-circle" %}</a></div>';
  content += "<div class='questionOptions'><fieldset id="+currentStep.id+"><legend class='label'>"+currentStep.name+"</legend>";
  console.log(currentStep);
  console.log(activeHelperFilters);
  console.log(activeHelperFilters.find(f => f.filterId === "type"));
  currentStep.options.forEach(option => {
    if(currentStep.id === "desktop" && !activeHelperFilters.find(f => f.filterId === "type").filterValues.includes(option.relevant)){
      content += '<div class="helper-options field closed">';
    }else{
      content += '<div class="helper-options field">';
    }
    content += '<input type="checkbox" id="filter-'+option.id+'" name="'+option.id+'">';
    content += '<div class="helper-option"><label for="filter-'+option.id+'"><span class="filterName">'+option.name+'</span></label>';
    content += '<p>'+option.info+'</p></div>';
    content += "</div>";
  })
  content += "</fieldset></div>";
  if(currentStep.info != undefined && currentStep.info != ""){
    content += '{% include box.html type="start" title="Title" %}'+currentStep.info+'{% include box.html type="end" %}';
  }
  content += "<div class='helper-footer'>";
  content += '<div id="backToList">{% include_cached icon.html name="arrow-left" %}<a class="prevStep">back to tools list</a></div>';
  content += '<div id="showHelperResults"><a onclick="applyHelper()">show <span class="helperResultsCounter">'+Object.values(jsonTools).length+'</span> results</a></div>';
  if(currentStep.skip != ""){
    content += '<div id="skipHelperStep"><a class="nextStep">Skip '+currentStep.id+'</a>{% include_cached icon.html name="arrow-right" %}</div>';
  }
  content += "</div>";
  overlayContent.innerHTML = content;
  updateHelperCounter(overlayContent);

  document.querySelector('.questionOptions').querySelectorAll('input[type=checkbox]').forEach(item => {
    console.log(item);
    item.addEventListener('change', e => { 
      updateHelperCounter(overlayContent);
      updateNextHelperButton();
    })
  })
  if(document.querySelector('.nextStep')){
    document.querySelector('.nextStep').addEventListener('click', e => {
      prevStep = currentStep;
      getHelpMeChooseStep(e);
    })
  }
  if(document.querySelector('.prevStep') && prevStep.length != 0){
    document.querySelector('.prevStep').addEventListener('click', e => {
      console.log(activeHelperFilters);
      handleBackStep();
    })
    document.querySelector('.prevStep').innerHTML = "back";
  }else{
    document.querySelector('.prevStep').addEventListener('click', e => {
      closeHelperOverlay()
    })
  }
}

function handleBackStep(){
  console.log(prevStep);
  showHelpMeChoose(prevStep);
  console.log(activeHelperFilters);
  var previousFilters = activeHelperFilters.find(f => f.filterId === prevStep.id);
  if(previousFilters != undefined){
    console.log(previousFilters);
    document.querySelector('.questionOptions').querySelectorAll('.helper-options').forEach(item => {
      console.log(item);
      if(previousFilters.filterValues.includes(item.querySelector('.filterName').innerText)){
        item.querySelector('input[type=checkbox]').checked = true;
      }
    })
  }
  var overlayContent = document.getElementById("help-me-choose-overlay").querySelector('.overlay-content');
  updateHelperCounter(overlayContent);
  updateNextHelperButton(); 
}

function getHelpMeChooseStep(e){
  e.preventDefault();
  console.log(jsonHelpers);
  var step = [];

  if(document.querySelector('.questionOptions') == undefined){
    step = jsonHelpers[0];
  }else{
    document.querySelector('.questionOptions').querySelectorAll('input[type=checkbox]').forEach(item => {
      if(item.checked == true){
        console.log(item.name);
        var currentCheckbox = jsonHelpers.find(f => f.id === document.querySelector('.questionOptions').querySelector("fieldset").id);
        console.log(currentCheckbox);
        var answer = currentCheckbox.options.find(f => f.id === item.name);
        console.log(answer);
        step = jsonHelpers.find(f => f.id === answer.next);
      }
    })
  }

  if(step.length === 0){
    var currentStep = jsonHelpers.find(f => f.id === document.querySelector('.questionOptions').querySelector("fieldset").id);
    step = jsonHelpers.find(f => f.id === currentStep.skip);
  }

  console.log(step);
  showHelpMeChoose(step);
}

function updateHelperCounter(overlayContent){
  activeHelperFilters = updateHelperFiltersList(overlayContent, activeHelperFilters);
  console.log(activeHelperFilters);
  var projectedHelperResults = filterNewResultsList(activeHelperFilters);
  var counter = Object.values(projectedHelperResults).length;
  console.log(counter);
  document.querySelector('.helperResultsCounter').innerText = counter;
}

function updateNextHelperButton(){
  var active = false;
  document.querySelector('.questionOptions').querySelectorAll('input[type=checkbox]').forEach(item => {
    if(item.checked == true){
      active = true;
    }
  })
  if(active == true){
    if(document.querySelector('.nextStep')){
      document.querySelector('.nextStep').innerHTML = "Next";
    }
  }else{
    console.log(document.querySelector('.questionOptions').querySelector('fieldset'));
    console.log(document.querySelector('.questionOptions').querySelector('fieldset').id);
    document.querySelector('.nextStep').innerHTML = "Skip " + document.querySelector('.questionOptions').querySelector('fieldset').id;
  }
}

function applyHelper(){
  console.log(activeHelperFilters);
  filterForm.querySelectorAll("input[type='checkbox']").forEach(el => el.checked = false);
  activeHelperFilters.forEach(filter => {
    var currentFilter = jsonFilters.find(f => f.id === filter.filterId);
    filter.filterValues.forEach(value => {
      var filterValueId = currentFilter.options.find(o => o.name === value).id;
      console.log(filterValueId);
      console.log(filterForm.querySelector('#filter-'+filterValueId));
      filterForm.querySelector('#filter-'+filterValueId).checked = true;
    })
  })
  var event = new Event('change');
  filterForm.dispatchEvent(event);
  closeHelperOverlay();
}

function closeHelperOverlay(){
  var overlay = document.getElementById("help-me-choose-overlay");
  var overlayContent = overlay.querySelector('.overlay-content');
  overlayContent.innerHTML = "";
  overlay.style.display = "none";
  activeHelperFilters = [];
  prevStep = [];
}

// const divSelectLang = document.getElementById("divSelectLang");
// const fieldLang = document.getElementsByClassName("field-language")[0];
// document.getElementsByClassName("button-new-lang")[0].addEventListener('click', e => { addNewField(divSelectLang,fieldLang)});

// const divSelectCountry = document.getElementById("divSelectCountry");
// const fieldCountry = document.getElementsByClassName("field-country")[0];
// document.getElementsByClassName("button-new-country")[0].addEventListener('click', e => { addNewField(divSelectCountry,fieldCountry)});

// const divInputPrerequisite = document.getElementById("divInputPrerequisite");
// const fieldPrequisite = document.getElementsByClassName("field-prerequisite")[0];
// document.getElementsByClassName("button-new-prerequisite")[0].addEventListener('click', e => { addNewField(divInputPrerequisite,fieldPrequisite)});

// const divInputTopic = document.getElementById("divInputTopic");
// const fieldTopic = document.getElementsByClassName("field-topic")[0];
// document.getElementsByClassName("button-new-topic")[0].addEventListener('click', e => { addNewField(divInputTopic,fieldTopic)});

function addNewField(divToAppend, fieldToAppend){
  divToAppend.insertBefore(fieldToAppend.cloneNode(true), divToAppend.lastElementChild);
}

function makeCollapsible(item){
  var label = item.querySelector('legend');
  label.classList.add("collapsible");
  if(item.getAttribute("collapsed") == "true"){
    label.innerHTML += '{% include_cached icon.html name="chevron-down" %}';
    item.querySelector('.options').classList.add("collapsed");
  }else{
    label.innerHTML += '{% include_cached icon.html name="chevron-up" %}';
  }
  label.addEventListener('click', e => { toggleCollapsed(item) });
}

function makeShowMore(item){
  var options = item.querySelectorAll('.filter-options');
  var filter = jsonFilters.find(e => e.id === item.id);
  for(var i = 0; i < options.length; i++){
    if(i >= filter.showmore){
      options[i].classList.add("closed");
    }
  }
  if(item.querySelector('.showMoreBlock') == undefined){
    item.innerHTML += '<div class="showMoreBlock">{% include_cached icon.html name="chevron-down" %}see more</div>';
    item.querySelector('.showMoreBlock').addEventListener('click', e => { toggleShowMore(item) });
  }

}

function toggleShowMore(item){
  var options = item.querySelectorAll('.filter-options');
  var closed = item.querySelectorAll('.closed');
  if(closed.length > 0){
    options.forEach(option => {
      option.classList.remove("closed");
    })
  }else{
    makeShowMore(item);
  }
  if(item.querySelectorAll('.closed').length > 0){
    item.querySelector('.showMoreBlock').innerHTML = '{% include_cached icon.html name="chevron-down" %}see more';
  }else{
    item.querySelector('.showMoreBlock').innerHTML = '{% include_cached icon.html name="chevron-up" %}see less';
  }
}

function toggleCollapsed(item){
  var label = item.querySelector('legend');
  var options = item.querySelector('.options');
  if(options.classList.contains("collapsed")){
    label.querySelector('.icon-chevron-down').remove();
    label.innerHTML += '{% include_cached icon.html name="chevron-up" %}';
    options.classList.remove("collapsed");
  }else{
    label.querySelector('.icon-chevron-up').remove();
    label.innerHTML += '{% include_cached icon.html name="chevron-down" %}';
    options.classList.add("collapsed");
  }
}

function toggleFilters(){
  if(!filterForm.classList.contains("open")){
    filterForm.classList.add("open");
    document.querySelector('.button-filters').classList.add("closed");
  }else{
    filterForm.classList.remove("open");
    document.querySelector('.button-filters').classList.remove("closed");
  }
}