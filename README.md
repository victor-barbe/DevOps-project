# DevOps project for Victor Barbe and Pierre-Louis gaucher. This README file will provide the explanations and instructions to run our project.

## Create a web application

To create a web application, we use the application for Lab 4 which we improved.

1. CRUD user functionality

We added the update and delete functionalities, which were not available at the start. They allow to modify the lastname and firstname of a user, and delete a user.

2. Storage

The application uses Redis to store the new users we can create, read, update or delete thanks to the CRUD user functionality.

3. Continuous-testing

The application was also supposed to use test. We implemented the missing tests for the update and delete functionalities, as well as the missing parts for the configuration.

4. Use the application

To use this application, we first have to install npm with `npm install`. Then to run it, we need to type `npm start` in the command line, and the web server will be available at http://localhost:3000 .

To run the test, we have to type in the command line `npm test`. The test will then confirm in the terminal that unit, API, configuration and connection are correct.

## Apply CI/CD pipeline

## Configure and provision a virtual environment and run your application using the IaC approach

## Build Docker image of your application

To build a docker image of our application, first we create the [`Dockerfile`](Dockerfile`).
Then in a terminal, we navigate to the `devops-project` directory and run the following command:

```
docker build -t devops-project.
```

This will build our docker image, base on the docker file in our directory. The `.` at the end of the commands tells Docker to look for the [`Dockerfile`](Dockerfile`) in the current directory.

we can Check if our Docker container appears in the local Docker images:

```
docker images
```

Now we run the container we just created with the following command:

```
docker run -p 12345:3000 -d devops-project
```

-p maps a port on your local machine to a port inside the container
-d makes the container run in the background

Now, we can open your web browser and go to http://localhost:12345. We can see that the message `Hello World, this is Victor's and pl project!` is displayed, because it is now running in the container and not on VS-code like before !

[Webpage](image/image1.png)

//////Now we use the command `docker ps` to check if the container is running and to get its ID. We can also print out the logs of the container using ////////

We tag our container with the following command:

```
docker tag devops-project barbevictor/devops-project
```

Now we have to olg in to Docker Hub from the terminal with the command:

```
docker login
```

We can now push the docker image to Docker Hub with the following command:

```
docker push barbevictor/devops-project
```

Now when we go to my repositories on the dockerhub, we can see that the image is visible.
[Dockerhub](image/image2.png)

It can now be retrived from an other computer using the command:

```
docker pull barbevictor/devops-project
```

And it can be started using this command:

```
docker run -p 12345:3000 -d barbevictor/devops-project
```

This now allows somebody to run our small CRUD application using Docker, without having it locally in his computer which was mandatory in the part 1 of our project.

## Make container orchestration using Docker Compose

Now, we can orchestrate our container using Docker Compose. To do so, we first create our [`Docker compose file`](docker-compose.yml`). This file will containt all the information needed to use docker-compose.

Then in a terminal, we navigate to the `devops-project` directory where the Docker file and Docker-compose files are located and run the following command:

```
docker-compose up
```

On our docker-compose.yml file, we assigned the port 2500. Once the docker compose up command as been used, if we go to http://localhost:2500 we will have the message `Hello World, this is Victor's and pl project!`.
[pageweb](image/image3.png)

We can also see the new composed-container that is created on Docker, with a container for redis and one for the web part.
[Docker](image/image4.png)

In our terminal we can run the command `docker-compose ps` to see the composed apps that are running. Here, there will be `devops-project_redis_1` and `devops-project_web_1`.
[terminal](image/image5.png)

With this part, we orchestrated our container using compose. The Docker volume used in the [`Docker compose file`](docker-compose.yml`) will allow use to keep data that might be modified, the Redis container stores its data in the `/data` directory

## Make docker orchestration using Kubernetes

## Make a service mesh using Istio

## Implement Monitoring to your containerized application
