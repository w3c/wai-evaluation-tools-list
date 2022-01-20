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

document.querySelectorAll('.button-clear-button').forEach(item => {
  item.hidden = true;
  item.addEventListener('click', e => { clearFilters() });
})

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
  showFilterCounters(filterForm);

  function showFilterCounters(form){
    var filtersOnInit = [];
    console.log(filtersOnInit);
    form.querySelectorAll('fieldset').forEach(att => {
      att.querySelectorAll('input[type="checkbox"]').forEach(filter => {
        filtersOnInit = getActiveFiltersList(form);
        var attValues = [];
        attValues.push(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText);
        filterName = att.querySelectorAll('legend')[0].innerText;
        if(filtersOnInit.length != 0){
          filtersOnInit.forEach(f => {
            if(f.filterId === att.id){
              var test1 = filterNewResultsList(filtersOnInit);
              filtersOnInit = [];
              var test2 = filtersOnInit.push({ filterId: att.id, filterName: filterName, filterValues: attValues });
              var test3 = filterNewResultsList(filtersOnInit);
              console.log(test1);
              console.log(test3);
              // f.filterValues.push(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText);
            }else{
              filtersOnInit.push({ filterId: att.id, filterName: filterName, filterValues: attValues });
            }
          })
        }else{
          filtersOnInit.push({ filterId: att.id, filterName: filterName, filterValues: attValues });
        }

        var counterResults = filterNewResultsList(filtersOnInit);
        att.querySelector("label[for='" + filter.id + "']").querySelector(".filterPreCounter").innerText = "(" + Object.values(counterResults).length + ")";
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

    // by attribute
    filtersOnList.forEach(filter => {
      newResultsList.push(Object.values(jsonTools).filter((x) => filter.filterValues.some(
        function(r) {
          if(x[filter.filterId] !== undefined){
            return x[filter.filterId].includes(r);
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

      if (f.filterId == 'language')
        attValues.innerText = jsonLang[f.filterValues[0]].name + " (" + jsonLang[f.filterValues[0]].nativeName + ")";
      else if (f.filterId == 'country')
        attValues.innerText = jsonCountry[f.filterValues[0]].name + " (" + jsonCountry[f.filterValues[0]].nativeName + ")";
      else
        attValues.innerText = f.filterValues.join(', ');
      listFiltersOnString.appendChild(attValues);
    });

    //Sort items
    var list = document.querySelector('.tools-list');
    var sortedArticles = Array.from(articles);
    sortedArticles.sort(sortList);
    list.innerHTML = "";
    
    for (i = 0; i < sortedArticles.length; ++i) {
      list.appendChild(sortedArticles[i]);
    }

    sortedArticles.forEach(el => {
      if (!Object.values(newResults).find(o => o.title === el.id))
        el.hidden = true;
      else
        el.hidden = false;
    })

    // if (filtersOn.length === 0) {
    //   totalTools.innerText = "Showing " + newResults.length + " tools";
    //   hideClearButton(true);
    // }
    // else if (newResults.length > 0) {
    //   if (newResults.length === 1)
    //     totalTools.innerText = "Showing " + newResults.length + " tool matching the following criteria: ";
    //   else
    //     totalTools.innerText = "Showing " + newResults.length + " tools matching the following criteria: ";
    //   totalTools.appendChild(listFiltersOnString);
    //   hideClearButton(false);
    // }
    // else {
    //   totalTools.innerText = "Sorry, but no tools match the following criteria: ";
    //   totalTools.appendChild(listFiltersOnString);
    //   hideClearButton(false);
    // }

    if (Object.values(newResults).length === 0) {
      totalTools.innerText = "Sorry, but no tools match the following criteria: ";
      totalTools.appendChild(listFiltersOnString);
      var searchTerm = searchForm.value;
      if(searchTerm.length > 0){
        totalTools.innerHTML += "Searchterm: \"" + searchTerm + "\"";
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
    showFilterCounters(filterForm);
  }

  function sortList(a, b) {
    var selectedSort = document.querySelector('.sort-by').querySelector('select').value;
    if(selectedSort == "alphabeticallyaz"){
      return a.id.localeCompare(b.id);
    }else if(selectedSort == "alphabeticallyza"){
      return b.id.localeCompare(a.id);
    }else if(selectedSort == "recentlyupdated"){
      return false;
    }else if(selectedSort == "recentlyadded"){
      return false;
    }
    return false;
  }

  function hideClearButton(isHidden) {
    document.querySelectorAll('.button-clear-button').forEach(item => { item.hidden = isHidden });
  }


  function clearFilters() {
    rebuildList(jsonTools, []);
    filterForm.querySelectorAll("input[type='checkbox']").forEach(el => el.checked = false);
    filterForm.querySelectorAll("select").forEach(el => el.selectedIndex = 0);
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