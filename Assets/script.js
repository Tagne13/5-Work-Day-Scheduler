$(document).ready(function() {

  // Today's date
  const todayDate = dayjs();

  $('#currentDay').text(todayDate.format('dddd, MMMM D YYYY'));

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // Create schedule function
  function createSchedule(date) {

    // Set start time to 9am
    date = dayjs(date).hour(9);

    for (i = 0; i < 9; i++) {
      // Create div with row class for Bootstrap
      const rowDiv = $('<div>').addClass('row').attr('id', `row${i}`);

      // Create div for time block
      const hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(date.format('H a')).attr('id', `hour${i}`);

      // Create area for text input
      const descriptionDiv = $('<textarea>').addClass('col-8 col-md-10 description').attr('id', `description${i}`);

      // Create div for button
      const saveDiv = $('<div>').addClass('btn saveBtn col-2 col-md-1');
      const saveBtn = $('<button>').addClass('btn fas fa-save').attr('id', i).attr('title', 'Save');

      // Append to calendar
      $('.container').append(rowDiv.append(hourDiv, descriptionDiv, saveDiv.append(saveBtn)));

      // Color code descriptionDiv by time
      if (todayDate.isAfter(date, 'hour')) {
        descriptionDiv.addClass('past');
      } else if (todayDate.isBefore(date, 'hour')) {
        descriptionDiv.addClass('future');
      } else {
        descriptionDiv.addClass('present');
      }

      // Increment time by 1 hour for each row
      date.add(1, 'hour');
    }

  }  

  $(window).on('load', createSchedule());

  let saveButton = $('.saveBtn');
  let hourBox = $('.description');

  function displayTodo() {
    for (let i = 0; i < 9; i++) {
      let savedCal = localStorage.getItem('text' + i);
      $('#description' + i).text(savedCal);
    }
  }

  function addDescrip (event) {
    event.preventDefault();
    localStorage.setItem($(this)[0].previousElementSibling.id, $(this)[0].previousElementSibling.value);
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Save input function

  //Event Listener
  saveButton.click(addDescrip);
  displayTodo();
});