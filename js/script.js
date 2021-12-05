
/* Function  which interannly invokes fetch call, */
function displayDegree() {
    /* fetch call by passing the JSON location to retrieve the data */
    makeRequest("./data/degree.json");
}

/* Funtion to hide the table when page loads for the first time. */
function hideTable() {
    document.getElementById("degreeTable").style.display = "none";
}

/* Function for fetch call and to handle the success and error usecase ,exceptions(if any) */
function makeRequest(url) {
    fetch(url)
        .then(response => retrieveData(response))
        .then(data => displayData(data))
        .catch(err => displayError(err))

}

/* Function which look for status code , if 200 then treated as success and pass the response json data, else customized error message is thrown as expcetion to handle later . */
function retrieveData(response) {
    console.log("retrieve");
    if (response.status != 200) {
        throw "Unable to retrieve data";
    }
    return response.json();

}


/* When status code is 200, this function will be invoked to display the data into page in tabular format */
function displayData(degree) {
    var table = document.getElementById('degreeTable');
    
    /* Toggle state of button between "Hide Degrees" and "Display Degrees" */
    if (table.style.display === "none") {
        table.style.display = "block";
        document.getElementById('display').innerHTML="Hide Degrees";
      } else {
        table.style.display = "none";
        document.getElementById('display').innerHTML="Display Degrees";
      }

    /* Additionally Display the Json data into console */
    console.log(degree.degrees);
    var data = degree.degrees;
    var headerRow = 1;
    var numOfRows = table.rows.length;
    for (var i = headerRow; i < numOfRows; i++) {
        table.deleteRow(headerRow);
    }

    /* Below set of code is to dynamically create the rows and cell data */
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow(1);
        var td1 = row.insertCell(0);
        var td2 = row.insertCell(1);
        var td3 = row.insertCell(2);
        var td4 = row.insertCell(3);

        td1.innerHTML = data[i].school;
        td2.innerHTML = data[i].program;
        td3.innerHTML = data[i].type;
        td4.innerHTML = data[i].year;
    }

}


/* Function to display the error into log and also as alert */
function displayError(err) {
    console.log(err);
    alert(err);
}