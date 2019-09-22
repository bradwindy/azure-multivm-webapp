# Cloud Hosted Multi VM Web Application

**FULL REPORT IS THE PDF IN LATEX FILES FOLDER**

## About

This is a project connecting two virtual machines and a cloud database service together to form a collaborative to-do list web app.

The system consists of two Azure virtual machines. One VM is hosting a to-do list web app written in React. There is another hosting a node server with an express.js API to load, save, and delete tasks based on request from the web app. This project also uses the Microsoft Azure Cosmos DB to store the tasks to a database.

**See GitHub issues and commit history for project work history.**

**I am implementing issue driven development somewhat, and so issues may contain features I want to add in the future.**

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

- Azure CLI is needed. To install on macOS:
  - Install xcode extensions if not already installed. This is needed for the installation of homebrew.
    - `xcode-select --install`
  - Install homebrew if not already installed so we can use it to install the Azure CLI.
    - `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
  - Now we install the Azure CLI using homebrew.
    - `brew update && brew install azure-cli`

### Setup & Starting

- After installing prerequisites, open up a terminal window.
- Change directory to the folder you want this project to be enclosed within.
- Then run `git clone https://github.com/bradwindy/azure-multivm-webapp.git`
- Next run `cd azure-multivm-webapp`
- The project is viewable and editable from this directory.
- Run `az login` and follow the steps to login to the Azure CLI.
- Next, run `az account show --out json` , and save the value in the ID field somewhere. This is your individual subscription ID and will be needed for setup of the virtual machines.

## Development

The setup for development and testing is as follows (for macOS):

### Initial Setup

- Install mongoDB by following instructions here: <https://treehouse.github.io/installation-guides/mac/mongo-mac.html>
- Install VSCode (or editor of choice): <https://code.visualstudio.com/>
- Install Node LTS version: <https://nodejs.org/en/download/>
- Open up a terminal window.
- Change directory to the folder you want this project to be enclosed within.
- Then clone the repository.
- This folder can now be opened in your editor of choice.

### Server

- First the server must be run. In a terminal window at the root directory of the project, enter `cd vm-2` which takes you to the server directory. Next enter `npm run start` to start the server.
- If any changes are made to the server code, you will need to stop the server process using Ctrl+C and restart it again using `npm run start` before any changes are visible.

### Web App

- To run a version of the web app for development. First you must change all URLs in the code that mention the IP address and port 192.168.55.11:3000 to instead be localhost:3000
- Then open another terminal window at the root directory of the project, enter `cd vm-1` which takes you to the web app directory. Next enter `npm run start` to start the web app. Press 'y' when prompted about ports.
- The app is now viewable at: <http://localhost:3001> Changes made to any of the code in the web app directory will be automatically loaded on save.

### PDF printing program

- In a terminal window at the root directory of the project, enter `cd vm-3` which takes you to the PDF program directory. Next enter `npm run start` to run the PDF printing program.
- If any changes are made to the list of tasks, this program can just be run again to overwrite the file.

## Built With

- [MongoDB](https://github.com/mongodb/mongo) - Database used.
- [Express](https://github.com/expressjs/express) -Server/routing API for web app.
- [React](https://github.com/facebook/react) - Frontend JavaScript library.
- [Node](https://github.com/nodejs/node) - Backend JS runtime.
- [Bootstrap](https://github.com/twbs/bootstrap) - Frontend framework for website elements and styling.
- [Vagrant](https://github.com/hashicorp/vagrant) - Setup and provisioning of virtual machines.
- [Ubuntu Xenial](https://kernel.ubuntu.com/git/) - Underlying VM.

## Author

- **Bradley Windybank** - _All work_
