// Assign variables for date and table body
var tableData = data;
var tbody = d3.select("tbody");

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Loop Through `data` use d3 to append and Object.entries
data.forEach((ufoSighting) => {
  var row = tbody.append("tr");
  Object.entries(ufoSighting).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});

// Complete the event handler function for the form
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select(".form-control");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // Use the form input to filter the data by datetime
	var results = tableData.filter(ufoSighting => ufoSighting.datetime === inputValue);
	
	// Clear out current contents in the table
	tbody.html("");

	// Handle no matching results
	if (results.length === 0) {
		tbody.text(`No ufo sightings on ${inputValue}.`);
	}

	// Handle matching results
	else {
		results.forEach((ufoSighting) => {
			var row = tbody.append("tr");
			Object.entries(ufoSighting).forEach(([key, value]) => {
				var cell = row.append("td");
				cell.text(value);
			});
		});
	};
};