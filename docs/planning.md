## Brainstorming
        - Discussed our ides of games where we can use databases
        - We wanted te project to reflect a part of UNC
        - We wanted it to be simple for everyone to understand and play
        - We choose FlappyBird simple using only space bar or with a left click on the mouse
        - Instead of a bird we used UNC spirit in our game
        
## Understanding each file:

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
        
        
        
## Roles
    - Front-end Lead: Lidia Mohammed 
    - Database Lead: Maik Ruckauf
    - Back-end Lead: Chetan Gongidi
    - Documentation Lead: Jordan Aasman
    - Design Lead: Derya Kilic
    
## How to run
    - Execute 'npm run start' in your console and enjoy!
