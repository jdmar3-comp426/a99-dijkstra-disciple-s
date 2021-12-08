        // post to currentuser database to log the current users score
    window.addEventListener("load", function(){                             // this form is used to login
        function sendData() {   
            const sendRequest = new XMLHttpRequest();
            const signupInfo = new URLSearchParams(new FormData(form));
            sendRequest.addEventListener("error", function (event){
                alert('Log In unsuccessful! Please try again.');
            });
            sendRequest.addEventListener("load", function (event) {
                alert('You are logged in!!!');
            });
            sendRequest.open("PATCH", "http://localhost:5000/app/update/user/logged/1" );
            sendRequest.send( signupInfo );
        }
        const form = document.getElementById("login-form");
        form.addEventListener("submit", function ( event ){
            event.preventDefault();
            sendData();
        });
    });
