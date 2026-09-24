$(document).ready(function () {

  /* When the "Submit" button is clicked, all this happens */
    $("#create_button").click(function () {
      
      // Prevent the form from actually submitting
        event.preventDefault();

      /* Gets data from the form to build the output */
        let button_name = $("#button_name").val().trim();
        let button_url = $("#button_url").val().trim();
        
        console.log('button_name: ' + button_name);
        console.log('button_url: ' + button_url);

        if (!button_url) {
          $("#button_url")[0].reportValidity();
          return;
        }

        let buttonType = $('input[name="button_type"]:checked').val() || 'primary';
        let buttonClass = 'btn btn-' + buttonType + ' btn-lg';

        console.log('buttonClass: ' + buttonClass);

        let buttonNameRaw = $('input[name="name_selection"]:checked').val() || '-ERROR-';
        let buttonName = ''

        if (buttonNameRaw === 'user_defined') {
          buttonName = button_name
        } else buttonName = buttonNameRaw

        console.log('buttonName: ' + buttonName);

        $("#output").val(
          '<a class="' + 
          buttonClass +
          '" style="margin-top: 1em;" href="' + 
          button_url +
          '">' + 
          buttonName +
          '</a>'
        );
        

    });

  /* Copies output to clipboard */
    $("#copy_to_clipboard").click(function () {
      event.preventDefault();
      var copy_output = $("#output").val().trim();
      console.log(copy_output);
      navigator.clipboard.writeText(copy_output);
    })

  /* Adds function to reset button */
    $("#reset").click(function () {
      event.preventDefault();
      $("input, textarea").val("");
      $("#type_primary, #name_radio-1").prop("checked", true);
    });

});