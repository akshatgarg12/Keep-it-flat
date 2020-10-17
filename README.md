# Keep-it-flat
   A fitness tracking app created in MERN stack.


## intro
   1. This a basic entry level app, created for users to log their calorie intakes and burns throughout the day.
   2. Diet is often considered the most important part of a transformation journey in fitness, that is what the application encourages.
   3. Their exists a few workout plans as well, the user can complete these and log them in the calorie counter.
   4. User can have a personalised user card, with height, weight, age , gender, BMI.
   5. Keep it flat stands for keeping things flat in the user calorie count graph, to maintain a healthy lifestyle.

## usage
1. users can log their activity
2. based on the intensity of the value the app shows different colors. for eg: BMI>25 || BMI<18 are shown with red, activity logs are also 
   shown in different colors denoting different intensities.
3. Light bluish-green color indicates a health activity or BMI. 
4. Exercise sessions are also provided for home workouts.

## features:
1. user authentication
2. activity logger
3. Graphical representation
4. exercise sessions
5. somewhat responsive

## Screenshots

![Home page](https://github.com/akshatgarg12/Keep-it-flat/blob/master/Screenshot%202020-10-18%20at%203.05.09%20AM.png)
![Graph Section](https://github.com/akshatgarg12/Keep-it-flat/blob/master/Screenshot%202020-10-18%20at%203.05.17%20AM.png)
![Workout Section](https://github.com/akshatgarg12/Keep-it-flat/blob/master/Screenshot%202020-10-18%20at%203.05.21%20AM.png)
![log a workout](https://github.com/akshatgarg12/Keep-it-flat/blob/master/Screenshot%202020-10-18%20at%203.05.27%20AM.png)


## To run this project on localhost:
  1. nodemon server.js
  2. cd client
  3. npm start

## Tech Stack used:
  1. Node.js with express
  2. React.js with hooks
  3. MongoDb with mongoose

## main packages used:
  1. cloudinary: to store user images
  2. jsonwebtoken and bcrypt: for userAuth and password hashing
  3. mongoose: to make life simple with mongoDB
  4. emailverification: to check whether the mail provided during registration is valid or not
  5. sendgrid: to send verification mails and password reset system
  6. momentJS: to make database queries easier, regarding particular dates
  7. toast-react: to provide with toast notifications
  8. react-graphjs-2: to create line graphs
  
## future views with this:
  1. I want to add the features of user tracking with maps, to log cycling, walking or running.
  2. Make it completely mobile friendly so that the app is used by more people, also being fitness tracker the app must be mobile friendly.
  3. Add a social media side to it.
  4. A little bit of gamification.
  5. Diet manager and a chat with nutritionist.

