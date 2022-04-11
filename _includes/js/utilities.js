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
    if(item.querySelector('.showMoreBlock') != undefined){
      item.querySelector('.showMoreBlock').classList.remove("collapsed");
    }
  }else{
    label.querySelector('.icon-chevron-up').remove();
    label.innerHTML += '{% include_cached icon.html name="chevron-down" %}';
    options.classList.add("collapsed");
    if(item.querySelector('.showMoreBlock') != undefined){
      item.querySelector('.showMoreBlock').classList.add("collapsed");
    }
  }
  makeToggleTips();
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

function makeToggleTips() {
  // Get all the toggletip buttons
  var toggletips = document.querySelectorAll('[data-toggletip-content]');

  // Iterate over them
  Array.prototype.forEach.call(toggletips, function (toggletip) {
    // Get the message from the data-content element
    var message = toggletip.getAttribute('data-toggletip-content');

    // Get the live region element
    var liveRegion = toggletip.nextElementSibling;

    // Toggle the message
    toggletip.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        toggletips.forEach(tip => {
          tip.nextElementSibling.innerHTML = '';
        })
        liveRegion.innerHTML = '';
        window.setTimeout(function() {
          liveRegion.innerHTML = '<span class="toggletip-bubble">'+ message +'</span>';
        }, 100);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (toggletip !== e.target) {
        liveRegion.innerHTML = '';
      }                        
    });

    // Remove toggletip on ESC
    document.addEventListener('keydown', function(e) {
      if ((e.keyCode || e.which) === 27)
      liveRegion.innerHTML = '';
    });
  });
}

document.querySelectorAll('details').forEach(item => {
  item.addEventListener('click', e => { 
    updateDetailText(e);
  });
})

function updateDetailText(e){
  if(e.target.innerHTML == "Show more details"){
    e.target.innerHTML = "Show less details";
  }else{
    e.target.innerHTML = "Show more details";
  }
}

function addPagination(sortedArticles) {
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