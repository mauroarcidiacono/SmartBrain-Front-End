# SmartBrain Web App

### Introduction
SmartBrain is a web application where users can submit pictures URLs to detect faces. To submit a picture, first you have to register yourself in the app. The web app is capable of detecting multiple faces in a picture. In each profile, the number of submissions are registered as entries. 

The tech stack used to develop this application is the following:
-	React.js
-	Node.js
-	Express.js
-	PostgreSQL  

### [Front end](https://github.com/mauroarcidiacono/SmartBrain-Front-End)
The front end was developed using React.js and it fetches data from the Clarifais API face detection AI to display boxes in faces. The components of the React front end are:
  1.	FaceRecognition: displays the submitted image and draws boxes where faces where detected. 
  2.	ImageLinkForm: displays the form to input URLs. 
  3.	Logo: this node displays the brain logo with the react-parallax-tilt npm package to produce movement when the user places the mouse cursor on top of it.
  4.	Navigation: deals with the navigation bar in the website, showing Sign out or Sign in and Register according to the App.js state. 
  5.	Rank: element that deals with the display of the number of entries in each users profile. 
  6.	Register: displays the registration form and performs checks on email and passwords validity using the npm package validator. Additionally, it renders a password strength bar with the package react-password-strength-bar.
  7.	Sign in: deals with the sign in form and validates the input by fetching the data from the back end.  

### [Back end](https://github.com/mauroarcidiacono/SmartBrain-Back-End)
The server is a RESTful API built with Express.js and that uses knex to connect to the PostgreSQL database. The passwords are protected with bcrypt and stored securely using a hashing algorithm in the database. The back end uses four controllers to handle the different requests and respond accordingly:

  1.	image: increases the number of entries in the user profile in the database and responds with the updated entries value. 
  2.	profile: responds with the user information from the database. 
  3.	register: stores the user registration data in the database. 
  4.	signin: validates the sign in information by comparing the submitted data with the databases data. 

The web application is deployed in Heroku where I created a PostgreSQL database. The relational database has two tables: login and users. The users table contains the ID (primary key), name, email, entries and joined columns. The login table contains three columns, the ID (primary key), password hash and email. Since the email column was declared as a unique and not null column, the joins can be performed using this attribute. 
