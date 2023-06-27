# Flight Ticket Management

Web Application build using the MERN (MongoDB, ExpressJS, ReactJS, NodeJS) stack. It allows the users to search for flights, view flight details, and can book tickets online.
Seperate login routes for the user and admin.


### Frontend - ReactJS:
* Components are used to create reusable UI elements, such as search forms, flight listing components, booking forms, etc.
* React Router is used for managing different routes and navigation within the application.
* Form validation is implemented to ensure data integrity and user input validation.

### Backend - NodeJS and ExpressJS:
* The backend is build using NodeJS and ExpressJS for handling HTTP requests, routing and API end points.
* Mongoose - a MongoDB library, is used for allowing easy interaction with the database, and for creating data models and schemas for easy data manipulation and retrivals.

### Database - MongoDB:
* MongoDB Atlas - A Cloud database service for secured data storage and access of the user, flight and booking data.


# Features:

### User Authentication and Authorization:
* The Authentication of valid user is done using JWT Tokens and passport(user authentication library) strategies.
* Role based authorization is implemented using JWT Tokens.
* All the secured resources can be accessed only by the authorized user, who has the access token.

### Password Handling:
* User passwords are secured using encryption.
* Encryption is implemented using hasing libraries for user data securities.

### Session Handling:
* Stateless session handling is implemented using JWT Token.
* JWT Token is generated using user authentication details, role and session expiry time.

### Ticket Booking - Data Integrity and Atomicity:
* Seat booking sessions are maintained using Transaction techniques.
* Each seat booking is isolated from other concurrent bookings to prevent conflicts.
* Atomicity is ensured by treating seat reservations as a single, indivisible operation. That means either fully booked or not booked at all.

# Website workflow:

### User side:
* Users can search for flights based on various parameters such as source, destination, date etc.
* Booked seats are managed to avoid double bookings and ensure seat availability.
* Booking history is stored in the database, allowing users to access their previous and upcoming flights.

### Admin side:
* Admins can view the flights and trips, and can remove any of them whenever necessary.
* New flights and trips can be added.
* Admins can view the bookings of a particular flight based on the flight number and the desired date. 


[Click here](https://unrivaled-eclair-d2cd26.netlify.app/) to check out the site.
