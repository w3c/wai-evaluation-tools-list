const filterForm = document.querySelector('[data-filter-form]');
const jsonOffers = JSON.parse('{{ site.data.offers | jsonify}}');
const jsonFilters = JSON.parse('{{site.data.filters | jsonify}}');
const jsonLang = JSON.parse('{{site.data.lang | jsonify}}');
const jsonCountry = JSON.parse('{{ site.data.countries | jsonify}}');

console.log(jsonOffers);
var offersList = document.getElementById('offers-list');

document.querySelectorAll('.button-clear-button').forEach(item => {
  item.hidden = true;
  item.addEventListener('click', e => { clearFilters() });
})

if (filterForm) {

  filterForm.addEventListener('change', el => {
    filterJson(filterForm);
  });



  function filterJson(form) {

    //form = document.querySelector('[data-filter-form]');

    // selecting filters on
    var attValues = [];
    var filtersOn = [];

    // for each attribute group
    form.querySelectorAll('fieldset').forEach(att => {

      // [att, [checked values]]
      attValues = [];
      filterName = att.querySelectorAll('legend')[0].innerText;

      att.querySelectorAll('input[type="checkbox"]').forEach(filter => {
        if (filter.checked) {
          attValues.push(att.querySelector("label[for='" + filter.id + "']").innerText);
        }
      })

      if (attValues.length > 0)
        filtersOn.push({ filterId: att.id, filterName: filterName, filterValues: attValues });

      att.querySelectorAll('select').forEach(filter => {
        attValues = [];

        if (filter.value != "") {
          attValues.push(filter.value)
          filtersOn.push({ filterId: filter.id, filterName: filterName, filterValues: attValues });
        }
      });

    });

    // filtering results
    var newResults = [];

    // by attribute
    filtersOn.forEach(filter => {
      newResults.push(jsonOffers.filter((x) => filter.filterValues.some(r => x[filter.filterId].includes(r))));
    })

    // if no filter, show all offers
    if (newResults.length === 0)
      newResults = jsonOffers;
    // intersection between results [offers]
    else
      newResults = newResults.reduce((a, c) => a.filter(i => c.includes(i)));

    //rebuild document
    rebuildList(newResults, filtersOn);

    // callDebug(jsonFilters, jsonOffers, filtersOn, newResults, offersList);

  }

  function rebuildList(newResults, filtersOn) {

    const articles = offersList.querySelectorAll('aside');
    var totalOffers = document.getElementById("total-offers");

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


    articles.forEach(el => {
      if (!newResults.find(o => o.id === el.id))
        el.hidden = true;
      else
        el.hidden = false;
    })

    if (filtersOn.length === 0) {
      totalOffers.innerText = "Showing " + newResults.length + " offers";
      hideClearButton(true);
    }
    else if (newResults.length > 0) {
      if (newResults.length === 1)
        totalOffers.innerText = "Showing " + newResults.length + " offer matching the following criteria: ";
      else
        totalOffers.innerText = "Showing " + newResults.length + " offers matching the following criteria: ";
      totalOffers.appendChild(listFiltersOnString);
      hideClearButton(false);
    }
    else {
      totalOffers.innerText = "Sorry, but no offers match the following criteria: ";
      totalOffers.appendChild(listFiltersOnString);
      hideClearButton(false);
    }
  }


  function hideClearButton(isHidden) {
    document.querySelectorAll('.button-clear-button').forEach(item => { item.hidden = isHidden });
  }


  function clearFilters() {
    rebuildList(jsonOffers, []);
    filterForm.querySelectorAll("input[type='checkbox']").forEach(el => el.checked = false);
    filterForm.querySelectorAll("select").forEach(el => el.selectedIndex = 0);
  }


  function callDebug(jsonFilters, jsonOffers, filtersOn, newResults, offersList) {
    console.log("Filters:");
    console.log(jsonFilters);
    console.log("Offers:");
    console.log(jsonOffers);
    console.log("Filters On:");
    console.log(filtersOn);
    console.log("Results:");
    console.log(newResults);
    console.log("offersList");
    console.log(offersList);
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

const divSelectLang = document.getElementById("divSelectLang");
const fieldLang = document.getElementsByClassName("field-language")[0];
document.getElementsByClassName("button-new-lang")[0].addEventListener('click', e => { addNewField(divSelectLang,fieldLang)});

const divSelectCountry = document.getElementById("divSelectCountry");
const fieldCountry = document.getElementsByClassName("field-country")[0];
document.getElementsByClassName("button-new-country")[0].addEventListener('click', e => { addNewField(divSelectCountry,fieldCountry)});

const divInputPrerequisite = document.getElementById("divInputPrerequisite");
const fieldPrequisite = document.getElementsByClassName("field-prerequisite")[0];
document.getElementsByClassName("button-new-prerequisite")[0].addEventListener('click', e => { addNewField(divInputPrerequisite,fieldPrequisite)});

const divInputTopic = document.getElementById("divInputTopic");
const fieldTopic = document.getElementsByClassName("field-topic")[0];
document.getElementsByClassName("button-new-topic")[0].addEventListener('click', e => { addNewField(divInputTopic,fieldTopic)});



function addNewField(divToAppend, fieldToAppend){
  divToAppend.insertBefore(fieldToAppend.cloneNode(true), divToAppend.lastElementChild);
}