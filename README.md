# React Movies Frontend - Dockerization Lab

This project is only an experimental setup to learn how to containerize an application using **Docker**

## Objective
The primary goal of this project was to gain hands-on experience with:
- Writing an efficient `Dockerfile`
- Testing containerized static site serving locally on host ports.

## Tech Stack
- **Frontend:** React + Vite / JS
- **Containerization:** Docker
- **Web Server:** Nginx (Alpine)

## Running the Project with Docker

1. **Build the Docker Image:**
   ```bash
   docker build -t react-movies-app .