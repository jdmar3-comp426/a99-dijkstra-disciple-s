
### Understanding each file:

    Running the game
        - main.js = handles the functionality of the game: pipe generation, sprites, images, etc.
        - phaser.min.js = framework that the game runs on.

    HTML Webpages
        - index.html = main screen that allows users to choose: login, register, or play the game.
        - register.html = screen that allows users to create an account to track stats in game.
        - login.html = screen that allows registered users to login to the game.
        - game.html = screen where the actual game is played.
        - update.html = screen where users can update their account information
        - delete.html = screen where users can delete their account

    CSS
        - style.css = style guide for all html pages. 

    Database
        - database.js = initializes a database if one is not created yet
        - form.js = is used in conjunction with register.html and server.js to allow an account to be created
        - form2.js = is used in conjunction with login.html and server.js to allow a user to login to an account
        - form3.js = is used in conjunction with delete.html and server.js to allow a user to delete an account
        - form4.js = is used in conjunction with update.html and server.js to allow users to update account information
        - server.js = defines SQL queries and stitches together the clinet and database
        - user.db = the database storing user information

    Assests
        - blockpipe.png = old pipe image (obsolete)
        - layerback.png = the clouds in the background
        - partyparrot.png = old player icon (obsolete)
        - rameses.png = player icon
        - stars.wav = audio that played... kinda annoying (obsolete)
        - tarheel_blockpipe_black.png = pipe image
        - tarheel_blockpipe_gold.png = pipe image

    Other
        - package.json = defines all dependencies used and lists objects