
/*
  MIT License
  Copyright (c) 2026 George H. Williams
  Permission is hereby granted...
  [See MIT License text for full details]
*/

$(document).ready(function () {

  /* Determines whether the user-defined name is required */
  function updateNameRequirement() {

    const userDefined = $('#name_radio-1').is(':checked');

    $('#button_name').prop('required', userDefined);
  }

  /* Set initial required status when page loads */
  updateNameRequirement();

  /* Update required status whenever name selection changes */
  $('input[name="name_selection"]').change(function () {
    updateNameRequirement();
  });


  /* When the "Submit" button is clicked */
  $("#create_button").click(function () {

    /* Gets data from the form */
    let button_name = $("#button_name").val().trim();
    let button_url = $("#button_url").val().trim();

    let buttonNameRaw = $('input[name="name_selection"]:checked').val() || '-ERROR-';

    /* Make sure URL is valid and not blank */
    if (!$("#button_url")[0].checkValidity()) {
      $("#button_url")[0].reportValidity();
      return;
    }

    /* Make sure name is entered if user-defined */
    if ($("#button_name").prop("required") && !button_name) {
      $("#button_name")[0].reportValidity();
      return;
    }

    /* Gets button type and size */
    let buttonType = $('input[name="button_type"]:checked').val() || 'primary';
    let buttonsize = $('input[name="button_size"]:checked').val() || '';
    let buttonClass = 'btn btn-' + buttonType + ' ' + buttonsize;

    /* Gets button target */
    const buttonTarget = $('#open_new_window').is(':checked') ? '_blank' : '_self';
    const buttonTargetIcon = $('#open_new_window').is(':checked') ? '  <i class="fa fa-square-up-right"></i>' : '';

    /* Determines button name */
    let buttonName = '';

    if (buttonNameRaw === 'user_defined') {
      buttonName = $('<div>').text(button_name).html();
    } else {
      buttonName = buttonNameRaw;
    }

    /* Generates the button HTML */
    $("#output").val(
      '<a class="' +
      buttonClass +
      '" style="margin-top: 1em;" href="' +
      $('<div>').text(button_url).html() +
      '" target="' +
      buttonTarget +
      '"' +
      (buttonTarget === '_blank' ? ' rel="noopener noreferrer"' : '') +
      '>' +
      buttonName +
      buttonTargetIcon +
      '</a>'
    );

  });


  /* Adds function to "Copy output to clipboard" button */
  $("#copy_to_clipboard").click(async function () {

    let copy_output = $("#output").val().trim();

    if (!copy_output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(copy_output);
    } catch (error) {
      console.error('Unable to copy to clipboard:', error);
    }

  });


  /* Adds function to "Reset" button */
  $("#reset").click(function () {

    /* Restores original HTML form defaults */
    $("#aspen_button_creator")[0].reset();

    /* Recalculates required status */
    updateNameRequirement();

  });

});
