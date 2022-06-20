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
var toolsListContent = document.querySelector('.tools-list');

var activeFiltersBlock = document.getElementById('activeFilters');

//Pagination settings
var currentPage = 1;
var toolsPerPage = 8;

document.querySelectorAll('.showmore').forEach(item => {
  makeShowMore(item);
})

document.querySelectorAll('fieldset').forEach(item => {
  if(item.getAttribute("collapsed")){
    makeCollapsible(item);
  }
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
    if(event.key != "Tab"){
      filterJson(filterForm);
    }
  });
  searchForm.addEventListener('search', el => {
    filterJson(filterForm);
  });

  //Make info-icons toggle
  makeToggleTips();

  //Add pre-counters to filters
  showFilterCounters(filterForm, true);

  //Order filters by amount
  orderFilterOptions(filterForm);

  //Add pagination after showing tools
  var initialArticles = Array.from(toolsListContent.querySelectorAll('aside'));
  addPagination(initialArticles);

  //Sort and filter init
  filterJson(filterForm);

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
    var searchedResults = [];
    searchedResults = filterSearchList(newResults);
    console.log(searchedResults);

    //rebuild document
    rebuildList(searchedResults, filtersOn);
  }

  function filterSearchList(filteredResults){
    var searchTerm = searchForm.value;
    var searchOutputList = [];
    Object.values(filteredResults).forEach(o => {
      if(o.title.toLowerCase().includes(searchTerm.toLowerCase())){
        searchOutputList.push(o);
      }
    })
    return searchOutputList;
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
    // by attribute
    filtersOnList.forEach(filter => {
      newResultsList.push(Object.values(jsonTools).filter((x) => filter.filterValues.some(
        function(r) {
          if(x[filter.filterId] !== undefined){
            if(filter.filterId === "language"){
              return x[filter.filterId].some(function(v){ return v.indexOf(r)>=0 });
            }else{
              var currentFilter = jsonFilters.find(f => f.id === filter.filterId && f.name === filter.filterName);
              var mask = currentFilter.options.find(o => o.name === r);

              if(mask.filtername != undefined){
                if(Array.isArray(mask.filtername)){
                  var tracker;
                  mask.filtername.forEach(mfn => {
                    if(tracker === undefined || tracker === false){
                      tracker = x[filter.filterId].some(function(m){ return m.indexOf(mfn)>=0 });
                    }
                  })
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
      if (!Object.values(newResults).find(o => o.title === el.id && o.creator === el.querySelector('.leftColHeader').innerHTML.replace("by ", ""))){
        el.hidden = true;
        el.classList.add("inactive");
      }
      else{
        el.hidden = false;
        el.classList.remove("inactive");
      }
    })
    addPagination(sortedArticles);

    var searchTerm = searchForm.value;
    if (Object.values(newResults).length === 0 && filtersOn.length > 0) {
      totalTools.innerText = "Sorry, but no tools match the following criteria: ";
      totalTools.appendChild(listFiltersOnString);
      hideClearButton(false);
    }else{
      totalTools.innerText = "";
      hideClearButton(true);
    }
    if(Object.values(newResults).length === 1){
      totalToolsCounter.innerHTML = "Showing <span>" + Object.values(newResults).length + " tool</span>";
    }else{
      totalToolsCounter.innerHTML = "Showing <span>" + Object.values(newResults).length + " tools</span>";
    }

    if(searchTerm.length > 0){
      totalToolsCounter.innerHTML += " for: <span>\"" + searchTerm + "\"</span>";
    }

    console.log(newResults);
    updateActiveFilters();
    showFilterCounters(filterForm, false);
  }

  function orderFilterOptions(form) {
    form.querySelectorAll('fieldset').forEach(att => {
      if(att.classList.contains("default")){
        var myListParent = att;
        var myListChildren = myListParent.querySelectorAll('.filter-options');
        var myListArray = [];

        for (var i = 0; i < myListChildren.length; i++) {
          myListArray.push(myListChildren[i]);
        }
        
        myListArray.sort(function(a, b){
          var a2 = a.querySelector('.filterPreCounter').innerHTML.replace(/[{()}]/g, '');
          var b2 = b.querySelector('.filterPreCounter').innerHTML.replace(/[{()}]/g, '');
          return parseInt(b2) - parseInt(a2);
        });

        for (var i = 0; i < myListArray.length; i++) {
          myListParent.querySelector('.options').appendChild(myListArray[i]);
        }
      } 
    });
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
          prefix += filterGroup.filterName + ": ";
        }
        activeFiltersBlock.innerHTML += '<div class="filterTag">'+prefix+getFilterName(filter)+' <a onclick="removeFilter(\''+filter+'\')" tabindex="0">{% include_cached icon.html name="ex-circle" %}</a></div>';
      })
    })
    if(filtersOn.length > 0){
      activeFiltersBlock.innerHTML += '<div class="clearButton"><a class="button-clear-button" tabindex="0">Clear all filters</a></div>';
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
}

document.querySelectorAll('summary').forEach(item => {
  item.addEventListener('click', e => { 
    updateDetail(e.target);
  });
})

function updateDetail(e){
  var r = document.querySelector(':root');
  if(e.querySelector("h4")){
    e = e.querySelector("h4");
  }
  if(e.innerHTML == "Show more details"){
    e.innerHTML = "Show less details";
    // e.target.parentNode.parentNode.style.borderTop = "none"
    // r.style.setProperty("--pseudo-backgroundcolor", 'white');
  }else{
    e.innerHTML = "Show more details";
    // e.target.parentNode.parentNode.style.borderTop = ""
    // r.style.setProperty("--pseudo-backgroundcolor", 'lightgray');
  }
}


