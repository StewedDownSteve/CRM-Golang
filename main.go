package main

import (
	"fmt"
	"go-fiber-crm-basic/database"
	"go-fiber-crm-basic/lead"

	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// This sets up our routes like CRUD sort of
func setupRoutes(app *fiber.App) {
	app.Get("/api/v1/lead", lead.GetLeads)
	app.Get("/api/v1/lead/:id", lead.GetLead)
	app.Post("/api/v1/lead", lead.NewLead)
	app.Delete("/api/v1/lead/:id", lead.DeleteLead)
}

func initDatabase() {
	var err error
	database.DBConn, err = gorm.Open("sqlite3", "leads.db")
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Connection to database")
	database.DBConn.AutoMigrate(&lead.Lead{})
	fmt.Println("Database Migrate")
}

func main() {
	app := fiber.New()

	// Serves static files (HTML, CSS, JS) from frontend folder
	app.Static("/", "./frontend")

	// Initialize database
	initDatabase()

	// Set up API routes
	setupRoutes(app)

	// Start the server on port 3000
	err := app.Listen(":3000")
	if err != nil {
		fmt.Println("Error starting server:", err)
	}

	// this will close the connection after everything is done
	defer database.DBConn.Close()
}
