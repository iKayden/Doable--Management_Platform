# DOABLE Management Platform

## Project Description

Our project strives to make it easy for your team
to get work done. No matter the project, workflow,
or type of team, It will help keep things organized.
It is simple – sign-up, create a project, and
you’re off! Everything is Doable!

<hr>

# Getting Started

## Setup

Fork this repository, then clone your fork of this repository.

- Copy .env.example to .env

### Database / Back End Setup

- Create the database: `createdb final_project_name -O labber`
- Enter database details in `.env`
- Change directory to `backend`
- Install dependencies with `npm install`
- Seed the database: `npm run db:reset`
- Start the back end with `npm run dev`

### Front End Setup

- Change directory to `client`
- Install dependencies with `npm install`
- Start the front end with `npm start`

<hr>

# Visual Story

- Users can see all the projects they are assigned to, project progress and are able to create new projects, select other team-members for it.
  !["Users can see all the projects they are assigned to."](/client/public/images/newProjectgh.gif)

- Users can have create, edit and delete tasks in the projects they are assigned to. After project is completed user can mark it as such and it will be moved to the "Project History" of assigned users.

  !["Users can have a nice chat which each other"](/client/public/images/projectHistorygh.gif)

- Users can drag and drop tasks to change their status. All extra information about the task can be viewed on click. All the essential information about selected project is in the header tab.

  !["Users can drag and drop (edit and delete) tasks to change their status"](/client/public/images/tasksgh.gif)

- Users can have a nice chat with each other, discuss the project or just socialize. They can see who is currently online, who is typing message at the moment and who wrote each text.

  !["Users can have a nice chat which each other"](/client/public/images/chatgh.gif)

# Used Technologies

### Stack Choices:

- Front-end: React, Bootstrap
- Back-end: NodeJS, Express
- Database: PostgreSQL

<hr>

### Made by [Kayden](https://github.com/iKayden), [Rosanna](https://github.com/rosanna-z) and [Eileen](https://github.com/lyjeileen)
