# PagePals Prototype Platform 


https://github.com/mariakoutsoukalis/Phase4_Fullstack_Project/assets/147335262/6594f8bf-a9ba-4969-bd17-9d762aded3ae


# New Branch with Individual Updates
Added Enhanced Database Content reflected in updated UI
Refined CSS by scoping content with container resizing and opacity editing within content loops.
Trimmed NavLink for Demonstration Purposes

# Introduction
Welcome to the PagePals Prototype Platform, a full-stack web application designed for book enthusiasts to engage in lively discussions, share their passion for literature, and connect with fellow readers.

# Key Features
- Platform with (6) diverse book clubs.
- Discussion forums with dialogues on (3) different books.
- User-friendly interface.
  
# Technology Stack
Front-End: React.js
Back-End: Flask - SQLAlchemy

## Back-End Architecture: Maria Koutsoukalis 

### Models & Relationships:

- **User to BookClub**: Many-to-Many
   - Users can join multiple book clubs, and book clubs can have multiple users.
   - Facilitated through `UserBookClubAssociation` as an associative table.

- **BookClub to DiscussionPost**: One-to-Many
   - A book club can have multiple discussion posts.
   - Each discussion post is associated with one book club.

- **BookClub to Books**: One-to-Many
    - A book club can have multiple books
    - Each book is associated with one book club.

- **User to DiscussionPost**: One-to-Many
   - A user can create multiple discussion posts.
   - Each discussion post is created by one user.

## Seeding the Database
The `seed.py` script uses Faker to generate and populate the database with realistic but fictional account details and likes for users and posts. Dummy data for the discussions and books are coded to streamline titles into post content creating associations with different book clubs, randomizing user assignments to discussion posts.

## Front-End Design: Snehal Abhale

### Features:
- **Discussion Posts**: 
   - Users can view discussion posts from fellow lit lovers.

- **Reccomendation Form**: 
    - Includes an AddReccomendationForm component for users to submit book reccomendations. 

- **Navigation/Error Handling**: 
  - NavLink from React Router uses seamless navigation without full page reloads. Custom 'Error' component handles errors.

## Styling & Routing
Tailwind CSS is used for a modern, responsive design. React Router for effective page navigation.

## Running the Application
Install Pipfile dependencies from the server. Execute `python app.py` to start the Flask application. Run npm install then npm start for the client.
