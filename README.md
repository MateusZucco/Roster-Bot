# Roster Bot API

This is a Telegram Chatbot, called Roster Bot, with the purpose of helping users when they need manage a roster. I did it for my undergraduate thesis for [IFRS](https://ifrs.edu.br/) about Chatbots. You can find the bot in Telegram [here](https://t.me/BOT_roster_BOT). 

## About this project
 
In this repository you will find a Telegram ChatBotbuilt with [Node.js](https://nodejs.org/en/), [JavaScript](https://www.javascript.com/), [Telegraf.js](https://telegraf.js.org/) and [Axios](https://axios-http.com/), with the main objective of assisting users in organizing rosters, using the [Roster-Bot-Api](https://github.com/MateusZucco/Roster-Bot-Api) to service rosters and manage route items, in addition to registering users through the [Roster-Bot-Website](https://github.com/MateusZucco/Roster-Bot-Website).
  
## ChatBot functions
- Authenticate user <br /><br />
![Preview-Screens](https://github.com/MateusZucco/Roster-Bot/blob/master/assets/login2.jpeg)
<br /><br />
- Show all rosters <br /><br />
![Preview-Screens](https://github.com/MateusZucco/Roster-Bot/blob/master/assets/list.png)
<br /><br />
- Create new roster<br /><br />
![Preview-Screens](https://github.com/MateusZucco/Roster-Bot/blob/master/assets/create.png)
<br /><br />
- Edit roster
  - edit title<br /><br />
![Preview-Screens](https://github.com/MateusZucco/Roster-Bot/blob/master/assets/edit%20title.png)
<br /><br />
  - Edit description<br /><br />
  - Remove item<br /><br />
![Preview-Screens](https://github.com/MateusZucco/Roster-Bot/blob/master/assets/delete%20item.png)
<br /><br />
  - Add new item<br /><br />
  - Edit item<br /><br />
- Delete roster<br /><br />
![Preview-Screens](https://github.com/MateusZucco/Roster-Bot/blob/master/assets/delete.png)
<br /><br />
  
## Getting Started

### Prerequisites

To run this BOT in the development mode, you'll need to have a environment with NodeJS installed and run the [API](https://github.com/MateusZucco/Roster-Bot-Api).

### Environment variables example
Create a .env.token file to save yours environment variables, like this:

```
const TOKEN = "your token bot"
module.exports = {
    TOKEN
}
```

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/MateusZucco/Roster-Bot.git
$ cd roster-bot
```

**Installing dependencies**

```
$ npm install
```

### Running the Development environment

With all dependencies installed, the Database running and the environment properly configured, you can now run the server:

```
$ npm run dev
```

