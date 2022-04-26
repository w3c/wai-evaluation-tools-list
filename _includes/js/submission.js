const submitForm = document.querySelector('form');

if (submitForm) {
    
    _addLine();

    submitForm.querySelectorAll('.other_field input[type="radio"]').forEach(item => {
        item.addEventListener('change', changeHandlerOtherField);
    });


    function _addLine() {
        var buttonsAdd = document.querySelectorAll('button.add_line');

        Array.prototype.forEach.call(buttonsAdd, function addClickListener(button) {
            button.addEventListener('click', function (event) {
                var parent = event.target.parentNode;
                var lines = parent.querySelectorAll('.line');
                var proto = parent.querySelector('.proto');
                var newLine = proto.cloneNode(true);

                newLine.classList.remove('proto');
                newLine.classList.add('line');
                // newLine.innerHTML = newLine.innerHTML.replace(/\[n\]/g, lines.length + 1);

                proto.parentNode.insertBefore(newLine, proto);

                newLine.querySelector('input, checkbox, select').disabled = false;
                newLine.querySelector('input, checkbox, select').focus();
                newLine.querySelector('input, checkbox, select').classList.remove('input_hidden');

                parent.querySelector('button.remove_line').disabled = false;

            });
        });

        var buttonsRemove = document.querySelectorAll('button.remove_line');

        Array.prototype.forEach.call(buttonsRemove, function addClickListener(button) {
            button.addEventListener('click', function (event) {
                var parent = event.target.parentNode;
                var lines = parent.querySelectorAll('.line');
                var last = lines[lines.length - 1];

                last.parentNode.removeChild(last);

                lines = parent.querySelectorAll('.line');
                last = lines[lines.length - 1];
                last.querySelector('input, checkbox, select').focus();

                if (lines.length <= 1)
                    button.disabled = true;
            });
        });

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
}