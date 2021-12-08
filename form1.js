window.addEventListener("load", function(){                             // this form is used to logout
    function sendData() {   
        const sendRequest = new XMLHttpRequest();
        sendRequest.addEventListener("error", function (event){
            alert('Log Out unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function (event) {
            alert('You are logged out');
        });
        sendRequest.open("PATCH", "http://localhost:5000/app/update/user/logoff/1" );
        sendRequest.send();
    }
    const form = document.getElementById("login-form");
    form.addEventListener("submit", function ( event ){
        event.preventDefault();
        sendData();
    });
});
