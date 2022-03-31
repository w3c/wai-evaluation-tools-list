const jsonHelpers = JSON.parse('{{site.data.helpers | jsonify}}');

var activeHelperFilters = [];
var prevStep = [];

function updateHelperFiltersList(form, list) {
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
  currentStep.options.forEach(option => {
    if(currentStep.id === "desktop" && !activeHelperFilters.find(f => f.filterId === "type").filterValues.includes(option.relevant) && option.name != "Other"){
      content += '<div class="helper-options field closed">';
    }else{
      content += '<div class="helper-options field">';
    }
    content += '<input type="checkbox" id="filter-'+option.id+'-help" name="'+option.id+'">';
    content += '<div class="helper-option"><label for="filter-'+option.id+'-help"><span class="filterName">'+option.name+'</span><span class="filterPreCounter"></span></label>';
    content += '<p>'+option.info+'</p></div>';
    content += "</div>";
  })
  content += "</fieldset></div>";
  if(currentStep.info != undefined && currentStep.info != ""){
    content += '{% include box.html type="start" title="Info" %}'+currentStep.info+'{% include box.html type="end" %}';
  }
  content += "<div class='helper-footer'>";
  content += '<div id="backToList">{% include_cached icon.html name="arrow-left" %}<a class="prevStep">back to tools list</a></div>';
  content += '<div id="showHelperResults"><a onclick="applyHelper()"><span class="helperResultsCounter">'+Object.values(jsonTools).length+'</span> results</a></div>';
  if(currentStep.skip != ""){
    content += '<div id="skipHelperStep"><a class="nextStep">Skip '+currentStep.id+'</a>{% include_cached icon.html name="arrow-right" %}</div>';
  }
  content += "</div>";
  overlayContent.innerHTML = content;
  updateBackHelperButton();
  updateHelperCounter(overlayContent);

  document.querySelector('.questionOptions').querySelectorAll('input[type=checkbox]').forEach(item => {
    item.addEventListener('change', e => { 
      activeHelperFilters = updateHelperFiltersList(overlayContent, activeHelperFilters);
      updateHelperCounter(overlayContent);
    })
  })
  if(document.querySelector('.nextStep')){
    document.querySelector('.nextStep').addEventListener('click', function handler(e) {
      if(!document.querySelector('.nextStep').classList.contains("disabled")){
        prevStep.push(currentStep);
        getHelpMeChooseStep(e);
      }
    })
  }
  
  if(document.querySelector('.prevStep') && prevStep.length != 0 && currentStep.step != 1){
    document.querySelector('.prevStep').addEventListener('click', e => {
      handleBackStep();
      prevStep.pop();
      updateBackHelperButton();
    })
  }else{
    document.querySelector('.prevStep').addEventListener('click', e => {
      closeHelperOverlay()
    })
  }
  showFilterCountersHelper(overlayContent, false);
}

function showFilterCountersHelper(form, init){
  var projectedCounterFiltersOn = activeHelperFilters;
  form.querySelectorAll('fieldset').forEach(att => {
    att.querySelectorAll('input[type="checkbox"]').forEach(filter => {
      projectedCounterFiltersOn = activeHelperFilters;
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
      var projectedFilter = { filterId: att.id, filterName: filterName, filterValues: attValues };
      if(newFilter === false){
        projectedCounterFiltersOn.push(projectedFilter); 
      }
      var projectedCounterResults = filterNewResultsList(projectedCounterFiltersOn);
      var counter = Object.values(projectedCounterResults).length;
      att.querySelector("label[for='" + filter.id + "']").querySelector(".filterPreCounter").innerText = "(" + counter + ")";
      
      const index = projectedCounterFiltersOn.indexOf(projectedFilter);
      projectedCounterFiltersOn.splice(index, 1);
    })
  });
}

function updateBackHelperButton(){
  if(prevStep[prevStep.length - 1]){
    document.querySelector('.prevStep').innerHTML = prevStep[prevStep.length - 1].id;
  }else{
    document.querySelector('.prevStep').innerHTML = "back to list";
  }
}

function handleBackStep(){
  var previousFilters = activeHelperFilters.find(f => f.filterId === prevStep[prevStep.length - 1].id);
  showHelpMeChoose(prevStep[prevStep.length - 1]);
  if(previousFilters != undefined){
    document.querySelector('.questionOptions').querySelectorAll('.helper-options').forEach(item => {
      if(previousFilters.filterValues.includes(item.querySelector('.filterName').innerText)){
        item.querySelector('input[type=checkbox]').checked = true;
      }
    })
  }
  var overlayContent = document.getElementById("help-me-choose-overlay").querySelector('.overlay-content');
  updateHelperCounter(overlayContent); 
}

function getHelpMeChooseStep(e){
  e.preventDefault();
  var step = [];

  if(document.querySelector('.questionOptions') == undefined){
    step = jsonHelpers[0];
  }else{
    document.querySelector('.questionOptions').querySelectorAll('input[type=checkbox]').forEach(item => {
      if(item.checked == true){
        var currentCheckbox = jsonHelpers.find(f => f.id === document.querySelector('.questionOptions').querySelector("fieldset").id);
        var answer = currentCheckbox.options.find(f => f.id === item.name);
        step = jsonHelpers.find(f => f.id === answer.next);
      }
    })
  }

  if(step.length === 0){
    var currentStep = jsonHelpers.find(f => f.id === document.querySelector('.questionOptions').querySelector("fieldset").id);
    step = jsonHelpers.find(f => f.id === currentStep.skip);
  }

  showHelpMeChoose(step);
}

function updateHelperCounter(overlayContent){
  var projectedHelperResults = filterNewResultsList(activeHelperFilters);
  var counter = Object.values(projectedHelperResults).length;
  if(counter == 0){
    document.querySelector('.helperResultsCounter').innerText = counter;
  }else{
    document.querySelector('.helperResultsCounter').innerText = "show " + counter;
  }
  updateNextHelperButton(counter);
}

function updateNextHelperButton(counter){
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
    if(counter == 0){
      document.querySelector('.nextStep').classList.add("disabled");
    }else{
      document.querySelector('.nextStep').classList.remove("disabled");
    }
  }else{
    if(document.querySelector('.nextStep')){
      document.querySelector('.nextStep').innerHTML = "Skip " + document.querySelector('.questionOptions').querySelector('fieldset').id;
      document.querySelector('.nextStep').classList.remove("disabled");
    }
    
  }
}

function applyHelper(){
  filterForm.querySelectorAll("input[type='checkbox']").forEach(el => el.checked = false);
  activeHelperFilters.forEach(filter => {
    var currentFilter = jsonFilters.find(f => f.id === filter.filterId);
    filter.filterValues.forEach(value => {
      var filterValueId = currentFilter.options.find(o => o.name === value).id;
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