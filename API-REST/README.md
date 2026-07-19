# REST API – Domestic Services Platform

This is a REST API built with [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/), and [MySQL](https://www.mysql.com/).

The API provides the backend services for a web application where clients can find, contact, and review domestic service providers. It manages clients, service providers, professional experiences, and opinions.
 
Autor: Eliezer Andrés Zúñiga Nanjari. Universidad de Valparaíso.

## Technology Stack

* **Node.js** – JavaScript runtime environment
* **Express** – Web framework for creating the REST API
* **Sequelize** – Object-Relational Mapping library
* **MySQL** – Relational database management system
* **Nodemon** – Development tool for automatically restarting the server
* **NVM** – Node.js version manager

## Prerequisites

Before running the project, make sure the following tools are installed:

* [Git](https://git-scm.com/)
* [MySQL](https://www.mysql.com/)
* [NVM](https://github.com/nvm-sh/nvm)

You can verify that NVM is installed by running:

```bash
nvm --version
```

## Getting Started

First, clone the repository and move into the backend directory:

```bash
git clone <repository-url>
cd API-REST
```

The project includes a `.nvmrc` file that specifies the Node.js version required by the application.

Install the required Node.js version:

```bash
nvm install
```

Activate the Node.js version configured for the project:

```bash
nvm use
```

Verify the active versions:

```bash
node --version
npm --version
```

Install the project dependencies:

```bash
npm install
```

For an installation based exactly on the versions registered in `package-lock.json`, you can use:

```bash
npm ci
```

## Database Configuration

Make sure MySQL is installed and running on your system.

Create the application database:

```sql
CREATE DATABASE basicServices;
```

The repository includes a `dump.sql` file that can be used to initialize the database:

```bash
mysql -u root -p basicServices < dump.sql
```

After running the command, MySQL will request the password associated with the specified local user.

## Environment Variables

Create a `.env` file in the root directory of the project:

```text
API-REST/
├── app/
├── .env
├── .nvmrc
├── dump.sql
├── package.json
├── package-lock.json
└── server.js
```

Add your local application and MySQL configuration values to the `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=basicServices
PORT=8080
```

Replace `your-password` with the password configured for your local MySQL installation.

Each developer must create their own `.env` file using their local MySQL credentials.

The database configuration located at `app/config/db.config.js` uses these environment variables:

```javascript
const dbConfig = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME || "basicServices",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default dbConfig;
```

The `.env` file must be included in `.gitignore` to prevent local database credentials from being uploaded to the repository:

```gitignore
.env
node_modules/
```

## Running the Server

Make sure that the Node.js version specified in `.nvmrc` is active:

```bash
nvm use
```

Start the API server with:

```bash
npm start
```

This command runs:

```bash
node server.js
```

If the database connection and model synchronization are successful, the terminal should display messages similar to:

```text
Database connection established successfully.
Synced db.
Server is running on port 8080.
```

By default, the API is available at:

```text
http://localhost:8080
```

The port can be changed through the `PORT` variable defined in the `.env` file.

## Development Server

During development, [Nodemon](https://nodemon.io/) can be used to restart the server automatically whenever a source file changes.

Make sure Nodemon is installed as a development dependency:

```bash
npm install --save-dev nodemon
```

The scripts in `package.json` should include:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Start the development server with:

```bash
npm run dev
```

## Application Architecture

The project follows a structure based on models, controllers, and routes:

* **Config:** contains the database connection configuration.
* **Models:** define the Sequelize entities and their relationships.
* **Controllers:** contain the business logic and process HTTP requests.
* **Routes:** define the REST endpoints exposed by the API.
* **server.js:** initializes Express, registers middleware and routes, connects to the database, synchronizes the Sequelize models, and starts the HTTP server.

## API Resources

The API manages the following main resources.

### Clients

Represents users who search for and hire domestic service providers.

The routes are defined in:

```text
app/routes/client.routes.js
```

Base endpoint:

```http
/apiV1/client
```

### Providers

Represents users who publish and offer domestic services.

The routes are defined in:

```text
app/routes/provider.routes.js
```

Base endpoint:

```http
/apiV1/provider
```

### Experiences

Stores the professional experience associated with service providers.

The routes are defined in:

```text
app/routes/experience.routes.js
```

Base endpoint:

```http
/apiV1/experience
```

### Opinions

Stores ratings or opinions submitted by clients about service providers.

The routes are defined in:

```text
app/routes/opinion.routes.js
```

Base endpoint:

```http
/apiV1/opinion
```

## Main Route

The API includes a main route that can be used to verify that the server is responding:

```http
GET /apiV1/
```

Example request:

```bash
curl http://localhost:8080/apiV2/
```

Example response:

```json
{
  "message": "Welcome to search to basic services!"
}
```

## REST Operations

Depending on the operations implemented in each route file, the resources may expose endpoints such as:

```http
GET    /apiV1/<resource>
GET    /apiV1/<resource>/:id
POST   /apiV1/<resource>
PUT    /apiV1/<resource>/:id
DELETE /apiV1/<resource>/:id
```

For example, provider operations may use routes such as:

```http
GET    /apiV1/provider
GET    /apiV1/provider/:id
POST   /apiV1/provider
PUT    /apiV1/provider/:id
DELETE /apiV1/provider/:id
```

The exact endpoint paths and supported HTTP methods are defined in the files located in:

```text
app/routes/
```

## Testing the API

You can test the API using tools such as:

* [Postman](https://www.postman.com/)
* [Insomnia](https://insomnia.rest/)
* `curl`

Example request for retrieving providers:

```bash
curl http://localhost:8080/apiV1/provider
```

Example request for retrieving clients:

```bash
curl http://localhost:8080/apiV1/client
```

Example request for creating a provider:

```bash
curl -X POST http://localhost:8080/apiV1/provider \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example Provider"
  }'
```

The required request body properties depend on the Sequelize model and controller associated with each resource.

## Changing the Node.js Version

The Node.js version used by the project is specified in `.nvmrc`.

To activate it:

```bash
nvm use
```

If the specified version is not installed:

```bash
nvm install
```

To view the currently active Node.js version:

```bash
node --version
```

To list all Node.js versions installed through NVM:

```bash
nvm list
```

Using `.nvmrc` ensures that all developers can run the application with a compatible Node.js version.

## Learn More

To learn more about the technologies used in this project, see the following resources:

* [Node.js Documentation](https://nodejs.org/docs/latest/api/)
* [Express Documentation](https://expressjs.com/)
* [Sequelize Documentation](https://sequelize.org/docs/)
* [MySQL Documentation](https://dev.mysql.com/doc/)
* [NVM Documentation](https://github.com/nvm-sh/nvm)
* [Nodemon Documentation](https://nodemon.io/)
