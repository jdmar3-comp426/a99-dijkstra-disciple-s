window.addEventListener("load", function () {                   // this form is used when deleting accounts
    function sendData() {
        // get data from form element
        const sendRequest = new XMLHttpRequest();

        // error handling
        sendRequest.addEventListener("error", function (event) {
            alert("Delete unsuccessful, please check your input and try again");
        });

        // success message
        sendRequest.addEventListener("load", function (event) {
            alert("Account successfully deleted");
        });
        sendRequest.open("DELETE", "http://localhost:5000/app/delete/logged/1");
        sendRequest.send();
        
        // open endpoint and send data
        
    }

    // define location of form to get data from
    const form = document.getElementById("delete-form");

    // listener that calls send data function
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData();
    });
});

const form = document.getElementById('form')

form.addEventListener('submit', submitForm)

function submitForm(e) {
    e.preventDefault()
    let pass = form.elements['pass']
    let email = form.elements['email']
    const sendRequest = new XMLHttpRequest();
    sendRequest.open("DELETE", "http://localhost:5000/app/delete/logged/1");
    sendRequest.send();
    
    
}