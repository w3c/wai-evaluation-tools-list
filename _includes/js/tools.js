const filterForm = document.querySelector('[data-filter-form]');
const sortForm = document.querySelector('.sort-by');
const searchForm = document.querySelector('#search');

const importJson = String.raw`{{ site.data.tools | jsonify }}`;
importJson.replace("\\","\\\\");

const jsonTools = JSON.parse(importJson);
const jsonFilters = JSON.parse('{{site.data.filters | jsonify}}');
const jsonLang = JSON.parse('{{site.data.lang | jsonify}}');
const jsonCountry = JSON.parse('{{ site.data.countries | jsonify}}');

var toolsList = document.getElementById('tools-list');

var activeFiltersBlock = document.getElementById('activeFilters');

//Pagination settings
var currentPage = 1;
var toolsPerPage = 8;

document.querySelectorAll('fieldset').forEach(item => {
  if(item.getAttribute("collapsed")){
    makeCollapsible(item);
  }
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

  //Add pre-counters to filters
  showFilterCounters(filterForm, true);

  //Add pagination after showing tools
  var initialArticles = Array.from(toolsList.querySelectorAll('aside'));
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
            if(att.id === "language"){
              if(f.filterValues.some(function(v){ return v.indexOf(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText)<0 })){
                f.filterValues.push(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText);
                newFilter = true;
              }
            }else{
              if(!f.filterValues.includes(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText)){
                f.filterValues.push(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText);
              }
              newFilter = true;
            }
          }
        })
        if(newFilter === false){
          projectedCounterFiltersOn.push({ filterId: att.id, filterName: filterName, filterValues: attValues }); 
        }

        var projectedCounterResults = filterNewResultsList(projectedCounterFiltersOn);
        var counter = 0;
        if(Object.values(projectedCounterResults).length >= Object.values(counterResults).length){
          if(filter.checked){
            Object.values(projectedCounterResults).forEach(r => {
              if(att.id === "language"){
                if(r[att.id].some(function(v){ return v.indexOf(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText)>=0 })){
                  counter++;
                }
              }else{
                if(r[att.id].includes(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText)){
                  counter++;
                }
              }
            })
          }else{
            counter = Object.values(projectedCounterResults).length - Object.values(counterResults).length;
          }
        }else if(Object.values(projectedCounterResults).length < Object.values(counterResults).length){
          counter = Object.values(projectedCounterResults).length;
        }
        att.querySelector("label[for='" + filter.id + "']").querySelector(".filterPreCounter").innerText = "(" + counter + ")";
        if(init == true){
          if(att.id === "language" && counter === 0 && !filter.checked){
            att.querySelector("label[for='" + filter.id + "']").parentNode.hidden = true;
          }else{
            att.querySelector("label[for='" + filter.id + "']").parentNode.hidden = false;
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
              return x[filter.filterId].includes(r);
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

    const articles = toolsList.querySelectorAll('aside');
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
        totalTools.innerText += "Searchterm: \"" + searchTerm + "\"";
      }
      hideClearButton(false);
    }else{
      totalTools.innerText = "";
      hideClearButton(true);
    }
    if(Object.values(newResults).length === 1){
      totalToolsCounter.innerText = Object.values(newResults).length + " tool";
    }else{
      totalToolsCounter.innerText = Object.values(newResults).length + " tools";
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
      +'<div id="btn_prev">{% include_cached icon.html name="arrow-left" %}<a onclick="previousPage('+activeToolsCount+')">Previous page</a></div>'
      +'<span id="pageCount"></span>'
      +'<div id="btn_next"><a onclick="nextPage('+activeToolsCount+')">Next page</a>{% include_cached icon.html name="arrow-right" %}</div>'
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
    const articles = toolsList.querySelectorAll('aside');
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
        activeFiltersBlock.innerHTML += '<div class="filterTag">'+filter+' <a onclick="removeFilter(\''+filter+'\')">{% include_cached icon.html name="ex-circle" %}</a></div>';
      })
    })
    if(filtersOn.length > 0){
      activeFiltersBlock.innerHTML += '<div class="clearButton">{% include_cached button.html label="Clear filters" class="clear-button" %}</div>';
    }

    document.querySelectorAll('.button-clear-button').forEach(item => {
      item.addEventListener('click', e => { clearFilters(e) });
    })
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