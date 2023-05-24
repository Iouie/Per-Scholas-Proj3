# JOB APPLICATION TRACKER


## Demo link:
Access my site at [https://job-application-tracker-vmpa.onrender.com/](https://job-application-tracker-vmpa.onrender.com/)

## Table of Content:

- [About The App](#about-the-app)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Started](#started)
- [Approach](#approach)
- [Unsolved Problems](#unsolved)
- [Future](#future)

## About The App
[JOB APPLICATION TRACKER] is a full stack applications that utilizes CRUD for job applications. Users are able to create an account, create, read, update, and delete job applications as well dragging those components to other columns.

## Screenshots

![Screenshot 1](https://i.imgur.com/TaLCygU.png)
![Screenshot 2](https://i.imgur.com/QD3pvEx.png)
![Screenshot 3](https://i.imgur.com/q0diR4e.png)
![Screenshot 4](https://i.imgur.com/5WV9QwY.png)


## Technologies Used
`MongoDB`, `Express`, `React`, `Node`, `JavasScript`, `Tailwind CSS`, `react-beautiful-dnd`

## Setup
- download or clone the repository
- run `npm install`
- ...

## Started
Trello Link -(https://trello.com/b/M8okzCvS/mern-project)

## Approach
I had a hard time understanding full-stack so I created something similar to a To-Do list so I made a Job Application Tracker. I also wanted to incorporate a drag and drop function.


**Pages**  

AuthPage => Holds SignUp and Login Pages

MainPage => Holds all the MERN stuff like creating job applications, drag and drop functionality, and dashboard/modal


**Components**  

Dashboard => Holds drag and drop functions and all job application data

LoginForm => Holds the Login Page

Modal => Holds a modal that lets user enter and edit job applications

NavBar => Welcome users and Dashboard as well as ability to logout

SignUpForm => Holds Sign Up Page

## Unsolved Problems
Whenever I drag a draggable component to any other column other than column 1(Applied) and press on Add Job Application button, it duplicates all draggable divs not in column 1 then when I try to drag the div, it breaks.
I'm having trouble incorporating localStorage that keeps certain draggable divs onto whatever column they place.
When I drag a draggable component on top or below another component and press edit, it still gets the initial data.

## Future
I want to add a theme and add a dark mode so it's easier for my eyes.
I also want to add achievements like Leetcode based on how many job applications a user posted.
