# Simple CRM with Go and Fiber

This project is a simple CRM (Customer Relationship Management) application built using Go and Fiber. It demonstrates basic CRUD operations with a Go backend and a simple front-end interface to interact with the API.


The Simple UI I made for the CRM, allows you to add new customers and see a list of all customers in the DB.
![CRM Screenshot](https://github.com/StewedDownSteve/CRM-Golang/blob/main/CRM-Go-UI-SH.png)


To test the back end I used Postman to make sure i could add, delete, and view all customers
![Postman Testint](https://github.com/StewedDownSteve/CRM-Golang/blob/main/CRM-Go-Testing-SH.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Go, Fiber, Gorm, SQLite, Postman

This project was built as a second Golang project, where I explored using Go as a backend with Fiber for handling web requests and Gorm for database interactions. The CRM supports basic CRUD operations (Create, Read, Update, Delete) for managing customer leads. 

I followed a tutorial that utilized Postman for testing the backend. To make the project more interactive and user-friendly, I created a simple front-end interface with HTML and JavaScript. This UI allows users to add new leads and view existing ones, integrating async functions to handle data retrieval and submission smoothly.

## Optimizations
- **Error Handling:** Improved error handling in the backend to provide more meaningful responses and status codes.
- **Async Functions:** Utilized async functions in JavaScript to ensure that the UI updates dynamically without requiring page reloads.
- **Database Operations:** Implemented efficient database operations with Gorm, ensuring quick data retrieval and updates.

## Lessons Learned:

This project was a valuable learning experience in several ways:

- **Golang for Backend Development:** Gained hands-on experience with Go as a backend language and learned how to set up a web server and handle HTTP requests using Fiber.
- **Front-End Integration:** Developed a simple front-end to interact with the Go backend, enhancing my skills in integrating front-end with a backend API.
- **Error Handling and Async Operations:** Improved my understanding of error handling in Go and the use of async functions in JavaScript to manage asynchronous data operations.

Overall, this project helped solidify my knowledge of Go, Fiber, and front-end integration, and I’m excited to apply these skills to future projects.

## Other Projects

**Go Web Scraper** https://github.com/StewedDownSteve/Go-html-web-scraper

**Project Management App (Full-Stack)** https://github.com/StewedDownSteve/ProjectManagment_FS_App

