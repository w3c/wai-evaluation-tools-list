const submitForm = document.querySelector('form[name="submission"]');

if (submitForm) {

    document.getElementById('update').valueAsDate = new Date();
    
    _addLine();

    submitForm.querySelectorAll('.other_field input[type="radio"]').forEach(item => {
        item.addEventListener('change', changeHandlerOtherField);
    });

    submitForm.querySelector('.tool-license-other-input').addEventListener('keyup', function (event) {
        console.log(document.querySelector('.tool-license-other-input'));
        var box = document.querySelector('.tool-license-other-input');
        if(box.value == undefined || box.value == "" || box.value.length == 0){
            console.log("empty");
            document.querySelector('.tool-license-other-check').checked = false;
        }else{
            console.log("full");
            document.querySelector('.tool-license-other-check').checked = true;
        }
    });

    submitForm.querySelector('.submit-tool').addEventListener('keyup', e => { 
      if (e.key === "Enter") {
        e.preventDefault();
        submitForm.querySelector('.submit-tool').click();
      }
    });

    submitForm.querySelectorAll('input[type=checkbox]').forEach(item => {
        item.addEventListener('keyup', e => { 
          if (e.key === "Enter") {
            e.preventDefault();
            item.click();
          }
        })
    })

    submitForm.querySelectorAll('select').forEach(item => {
        item.addEventListener('keyup', e => { 
          if (e.key === "Enter") {
            console.log("clicked");
            item.click();
          }
        })
    })

    function _addLine() {
        var buttonsAdd = document.querySelectorAll('button.add_line');

        Array.prototype.forEach.call(buttonsAdd, function addClickListener(button) {
            button.addEventListener('click', function (event) {
                console.log("accessed click add");
                var parent = event.target.parentNode;
                var lines = parent.querySelectorAll('.line');
                var proto = parent.querySelector('.proto');
                var newLine = proto.cloneNode(true);

                if((lines.length < 5 && parent.id == 'features') || parent.id == 'language'){
                    newLine.classList.remove('proto');
                    newLine.classList.add('line');
                    // newLine.innerHTML = newLine.innerHTML.replace(/\[n\]/g, lines.length + 1);
                    var counter = parseInt(lines[lines.length-1].querySelector('select').id.split("_")[1]) + 1;
                    console.log(counter);
                    newLine.querySelector('label').id = "language_" + counter; 
                    newLine.querySelector('label').innerHTML = "Language " + counter; 
                    newLine.querySelector('select').id = "language_" + counter; 

                    proto.parentNode.insertBefore(newLine, proto);

                    newLine.querySelector('input, checkbox, select').disabled = false;
                    newLine.querySelector('input, checkbox, select').focus();
                    newLine.querySelector('input, checkbox, select').classList.remove('input_hidden');

                    // parent.querySelector('button.remove_line').disabled = false;

                    newLine.querySelector('.remove_line').addEventListener('click', function (event) {
                        var parent = event.target.parentNode;
                        console.log("accessed click remove");
                        parent.remove();
                    });

                    newLine.querySelector('.remove_line').addEventListener("keyup", function(event) {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        newLine.querySelector('.remove_line').click();
                      }
                    });

                    newLine.querySelector('.remove_line').setAttribute("aria-label", "Remove " +  parent.id)
                }
            });
            button.addEventListener('keyup', function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    button.click();
                }
            });
        });

        // var buttonsRemove = document.querySelectorAll('.remove_line');

        // Array.prototype.forEach.call(buttonsRemove, function addClickListener(button) {
        //     button.addEventListener('click', function (event) {
        //         var parent = event.target.parentNode;
        //         var lines = parent.querySelectorAll('.line');
        //         var last = lines[lines.length - 1];

        //         last.parentNode.removeChild(last);

        //         lines = parent.querySelectorAll('.line');
        //         last = lines[lines.length - 1];
        //         last.querySelector('input, checkbox, select').focus();

        //         if (lines.length <= 1)
        //             button.disabled = true;
        //     });
        // });

        makeToggleTips();
    }

    function changeHandlerOtherField() {

        var newField = this.parentNode.parentNode.querySelector('input[type="text"]');

        if (this.classList.contains('option_field_other')) {
            newField.parentNode.classList.remove('hidden-element');
            newField.focus();
        }
        else
            newField.parentNode.classList.add('hidden-element');
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

        toggletip.addEventListener('keyup', function (e) {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              toggletip.click();
            }
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
          if (toggletip !== e.target) {
            liveRegion.innerHTML = '';
          }                        
        });

        // Remove toggletip on ESC
        document.addEventListener('keydown', function(e) {
          if ((e.keyCode || e.which) === 27 || e.key === "Tab")
          liveRegion.innerHTML = '';
        });
      });
    }
}