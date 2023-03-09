$(document).ready(function () {

  // Display today's date
  const todayDate = dayjs();

  $('#currentDay').text(todayDate.format('dddd, MMMM D YYYY'));

  // Create schedule function
  function createSchedule(date) {

    // Set start time to 9am
    date = dayjs(date).hour(9);

    for (i = 0; i < 9; i++) {
      // Create div with row class for Bootstrap
      const rowDiv = $('<div>').addClass('row').attr('id', `row${i}`);

      // Create div for time block
      const hourDiv = $('<div>').addClass('col-2 col-md-1 time-block hour text-center py-3').text(date.format('H a')).attr('id', `hour${i}`);

      // Create area for text input
      const descriptionDiv = $('<textarea>').addClass('col-8 col-md-10 time-block description').attr('id', `description${i}`);

      // Create div for button
      const saveDiv = $('<div>').addClass('btn saveBtn col-2 col-md-1 save-block');
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
  //let hourBox = $('.description');

  // Display TODOs
  function displayTodo() {
    for (let i = 0; i < 9; i++) {
      let savedCal = localStorage.getItem('text' + i);
      $('#description' + i).text(savedCal);
    }
  }

  // Save input function
  function addDescrip(event) {
    event.preventDefault();
    localStorage.setItem($(this)[0].previousElementSibling.id, $(this)[0].previousElementSibling.value);
  }

  //Event Listener - save
  saveButton.click(addDescrip);
  displayTodo();
});