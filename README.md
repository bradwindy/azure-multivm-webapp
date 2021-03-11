# Cloud Hosted Multi VM Web Application

## About

This is a project connecting two virtual machines and a cloud database service together to form a collaborative to-do list web app.

The system consists of two Azure virtual machines. One VM is hosting a to-do list web app written in React. There is another hosting a node server with an express.js API to load, save, and delete tasks based on requests from the web app. This project also uses the Microsoft Azure Cosmos DB to store the tasks to a database.

**See GitHub issues and commit history for project work history.**

**I am implementing issue driven development somewhat, and so issues may contain features I want to add in the future.**

## Deployment

### Prerequisites

- Azure CLI is needed. To install on macOS:
  - Install xcode extensions if not already installed. This is needed for the installation of homebrew.
    - `xcode-select --install`
  - Install homebrew if not already installed so we can use it to install the Azure CLI.
    - `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
  - Now we install the Azure CLI using homebrew.
    - `brew update && brew install azure-cli`
  - An Azure account also needs to be created.

### Setup & Deployment

- **Following instructions should work for both Linux and macOS but not Windows.**
- After installing prerequisites, open up a terminal window.
- Change directory to the folder you want this project to be enclosed within.
- Then enter into a terminal window `git clone https://github.com/bradwindy/azure-multivm-webapp.git`
- Then enter `cd azure-multivm-webapp`
- The project is viewable and editable from this directory.
- **IMPORTANT: CHANGE THE ADMIN PASSWORD ENTRY IN PARAMETERS.JSON OR YOUR VIRTUAL MACHINES WILL BE INSECURE**
- Next enter `az login` and follow the steps to login to the Azure CLI.
- Next, enter `az account show --out json` , and save the value in the ID field somewhere. This is your individual subscription ID and will be needed for setup of the virtual machines.
- Then, enter `./deploy.sh` and follow the steps that appear in the terminal window. The subscription ID is the ID value we obtained earlier. A good resource group and deployment name could be something like `multivmwebapp`. The location should be `eastasia`, look into the template file to change all the locations if you want to be in a different location. This process will take a while to complete. Around 6 - 7 minutes.
- The deployment process is not fully automated at this stage. So next go to the URL <https://portal.azure.com/> and log in.
- Here open **Resource Groups** from the sidebar and then select the resource group just created before during the deploy process.
- Click the **Add** button up the top of the new view within the browser window to add a new resource to this group.
- Search `Azure Cosmos DB` in the serch bar, and click the create button from its resource page.
- In the form that appears, add any account name to the account name field, and select **Azure Cosmos DB for MongoDB API** as the API option.
- Choose **East Asia** as the location as done before (or whichever location the values in template.json were changed to).
- Then click **Review + Create** and then **Create** as they appear. Deployment of the database may take some time.
- Next, click **Go to Resource** and then select the **Connection String** option on the inner sidebar.
- Copy the primary connection string to your keyboard, and save the value somewhere for safekeeping on your computer for the time being.
- **IMPORTANT:** Replace the `==` in the connection string with `%3D%3D` or you will get errors due to the way mongo parses URLs.
- Next, open **Resource Groups** from the sidebar again, and again choose the correct group.
- Click the **vm-1-ip** entry in the list that appears to open its resource page and select the **Configuration** option on the inner sidebar.
- Change the IP assignment from Dynamic to **Static**, then click save. Once the change has saved, copy the IP address and save it in the same place as the connection string that was saved before.
- **Do the same above** for _vm-2-ip_, making sure to save the IP again.
- Open up a terminal window again, and ssh into the API server VM using the command `ssh vmadmin@<VM-2 IP YOU COPIED>`
- Log-in using the password you chose above.
- Enter `sudo su` and then `cd /var/lib/waagent/custom-script/download/0/vm-2` in terminal.
- Then enter `nano app2.js` to edit the server file.
- Uncomment the mongo connection function by removing the `/* */` parts from either end of the statement.
- Remove the current connection string (The part that starts with `mongodb://`)
- Replace it with the modified connection string from earlier.
- `Ctrl-o` then `enter` then `Ctrl-x` saves the changes.
- Then run `forever start app2.js` and then `exit` and `exit` to leave su and then ssh.
- Next, ssh into the web app VM using the command `ssh vmadmin@<VM-1 IP YOU COPIED>`
- Enter `sudo su` and then `cd /var/lib/waagent/custom-script/download/0/vm-1/src/components` in terminal.
- Enter `nano Nav.jsx` into terminal, and replace the IP `13.70.6.93` with the IP of the **VM-2 VM** that was saved earlier. There are two entries of it in this file.
- `Ctrl-o` then `enter` then `Ctrl-x` saves the changes again.
- **Do the same for NoteList.jsx**, it has two addresses to be changed as well.
- Once done, run `npm run build` to build the files to be served. Then serve the web page using `forever start server.js` and then `exit` and `exit` to leave su and then ssh.
- **ALL DONE!** The web app is now available by entering the IP of VM-1 in your browser.

Apologies for not having a completely automated setup. I tried to automate the steps above, but ran into a lot of trouble, and the process was harder than I initially expected. This process is at least fully documented and should be replicable. The process may look long and complex, but my intention was just to be as verbose as possible to make the steps very clear, and so each step is quicker than it looks.

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

- The server code must be modified with an actual mongo DB connection string. You can use one hosted in the cloud or on your local device.
- Once the string is replaced, in a terminal window at the root directory of the project, enter `cd vm-2` which takes you to the server directory. Next enter `npm run start` to start the server.
- If any changes are made to the server code, you will need to stop the server process using Ctrl+C and restart it again using `npm run start` before any changes are visible.

### Web App

- To run a version of the web app for development. First you must change all URLs in the code that mention the IP address and port 13.70.6.93:3000 to instead be localhost:3000
- Then open another terminal window at the root directory of the project, enter `cd vm-1` which takes you to the web app directory. Next enter `npm run build && npm run start` to start the web app.
- The app is now viewable at: <http://localhost> Changes made to any of the code in the web app directory will be automatically loaded on save.

## Built With

- [MongoDB](https://github.com/mongodb/mongo) - Database used.
- [Express](https://github.com/expressjs/express) -Server/routing API for web app.
- [React](https://github.com/facebook/react) - Frontend JavaScript library.
- [Node](https://github.com/nodejs/node) - Backend JS runtime.
- [Bootstrap](https://github.com/twbs/bootstrap) - Frontend framework for website elements and styling.

## Author

- **Bradley Windybank** - _All work_
