# Members Only

## Project Summary

This project, created by The Odin Project, is an exclusive clubhouse where members can write anonymous posts. The main objectives of this project include managing data using PostgreSQL; implementing authentication using Passport.js; securing passwords with bcryptjs; and creating an organized Express application using routes, controllers, and views. Styling of the application was omitted to solely focus on the previously mentioned objectives. **This is not a complete application.**

## Features Overview

### Memberships

Anyone who visits the home page will see all messages posted on the forum as an anonymous visitor, but they will only see the title of the message and its content. Users who create an account and sign in are automatically given a "Guest" membership status, which grants them access to change their membership and unlock new features. The features for each memberships status are as follows:

<ins>Guest</ins>

Guests can only see the title and content of the messages posted on the forum.

<ins>Member</ins>

Members receive the same rights as guests, but members can also see the author of the posts and when each post was created. They can also create new messages themselves.

<ins>Admin</ins>

Admins receive the same rights as guest and members, but admins can also delete any post.

### Changing Membership Status

Users who are logged in to their account can change their membership by entering one of the secret passcodes:

- Guest: bemyguest
- Member: vipstatus
- Admin: adminislife

**Note**: Make sure to change the values of the environment variables `GUEST_PASSCODE`, `MEMBER_PASSCODE`, and `ADMIN_PASSCODE` before sending to production. These passcodes are exposed in the README for demonstration purposes only.

## Installation

### Prerequisites

Make sure you have the following installed on your system:

- Node.js: Version 20.0.0 or higher.
- npm
- PostgreSQL

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone git@github.com:hannahkim313/members-only.git
```

Navigate to the project directory:

```bash
cd members-only
```

### Install Dependencies

Install the dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory of the project and update the following variables:

```bash
DB_CONNECTION_STRING_DEV=your_db_url_here
PORT=3000
NODE_ENV=production_or_development
GUEST_PASSCODE=guest_passcode_here
MEMBER_PASSCODE=member_passcode_here
ADMIN_PASSCODE=admin_passcode_here
```

### Optional: Populate Database

To pre-populate the database with filler data, run the following code:

```bash
npm run populate 'your_db_url_here'
```

### Start the Application

Start the application in development mode:

```bash
npm run dev
```

Or for debugging purposes:

```bash
npm run debug:watch
```

Or for production mode:

```bash
npm run start
```

### Access the Application

Open your browser and navigate to http://localhost:3000.

## Reflection

This project allowed me to gain hands-on-experience implementing authentication and security practices using Passport.js and bcryptjs, which are important for real-world web applications. I also learned how to manage relational databases using PostgreSQL, defining appropriate schemas and performing queries that retrieve and manipulate the data based on user interactions. Compared to my previous Express applications, I focused a lot on modularization to maintain separation of concerns, maintainability, and reusability of the code for future development. Overall, I feel I learned a lot from this project that will help me build more robust applications that people can use.
