window.addEventListener("load", function () {
    function sendData() {
        // get data from form element
        const sendRequest = new XMLHttpRequest();
        const loginInfo = new FormData(form);

        // error handling
        sendRequest.addEventListener("error", function (event) {
            alert("Submission unsuccessful, please check your input and try again");
        });

        // success message
        sendRequest.addEventListener("load", function (event) {
            alert("Account successfully loggedin");
            //open endpoint and send data
            window.location.replace("http://localhost:3000/game.html");
        });

        sendRequest.open("POST", "http://localhost:5000/app/login");
        sendRequest.send(loginInfo);

        
       
        
    }

    // define location of form to get data from
    const form = document.getElementById("signupForm");

    // listener that calls send data function
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData();
    });
});
