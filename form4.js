window.addEventListener("load", function () {                   // this form is used when updating accounts
    function sendData() {
        // get data from form element
        const sendRequest = new XMLHttpRequest();
        const signupInfo = new URLSearchParams(new FormData(form));

        // error handling
        sendRequest.addEventListener("error", function (event) {
            alert("Update unsuccessful, please check your input and try again");
        });

        // success message
        sendRequest.addEventListener("load", function (event) {
            alert("Account successfully updated");
        });
        sendRequest.open("PATCH", "http://localhost:5000/app/update/user/1");
        sendRequest.send(signupInfo);
        
        // open endpoint and send data
        
    }

    // define location of form to get data from
    const form = document.getElementById("update-form");

    // listener that calls send data function
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData();
    });
});