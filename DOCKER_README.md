# Running Video Transformer Pro with Docker

This guide explains how to run the Video Transformer Pro project using Docker.

## Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Steps

### 1. Build and Run Services

To build and run all services (frontend, backend, and server), execute the following command in the main project directory:

```bash
docker-compose up -d --build
```

This will build the images and run the containers in the background.

### 2. Accessing the Application

After running the services, you can access the application through:

- Frontend: http://localhost
- Backend API: http://localhost:5000
- Express Server: http://localhost:3000

### 3. Viewing Service Logs

To view logs for all services:

```bash
docker-compose logs -f
```

To view logs for a specific service (e.g., backend):

```bash
docker-compose logs -f backend
```

### 4. Stopping Services

To stop all services:

```bash
docker-compose down
```

To stop services and remove images:

```bash
docker-compose down --rmi all
```

### 5. Rebuilding a Specific Service

If you've modified the code and want to rebuild only a specific service (e.g., frontend):

```bash
docker-compose build frontend
docker-compose up -d frontend
```

## Project Structure with Docker

- `docker-compose.yml`: Docker Compose configuration file for running all services
- `Dockerfile`: Docker image build file for the Express server
- `backend/Dockerfile`: Docker image build file for the backend (Flask)
- `frontend/Dockerfile`: Docker image build file for the frontend (React)
- `frontend/nginx.conf`: Nginx configuration file for the frontend

## Shared Volumes

The following shared volumes are configured:

- `./backend/downloads:/app/downloads`: For sharing download files between the host and backend container
- `./backend/temp:/app/temp`: For sharing temporary files between the host and backend container
- `./downloads:/app/downloads`: For sharing download files between the host and Express server container

## Important Notes

- Make sure `.env` files exist in the appropriate directories before running the services
- If you encounter issues accessing the services, ensure that the ports (80, 3000, 5000) are not already in use on your machine
- You can modify the `docker-compose.yml` file to change ports if necessary 