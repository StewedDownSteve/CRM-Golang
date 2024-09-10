package lead

import (
	"go-fiber-crm-basic/database"

	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// This is our structure for Lead, like a collection of objects. We are telling Golang what each will look like in JSON. It doesnt understand JSON by default.
type Lead struct {
	gorm.Model
	Name    string `json:"name"`
	Company string `json:"company"`
	Email   string `json:"email"`
	Phone   int    `json:"phone"`
}

// GetLeads retrieves all leads
func GetLeads(c *fiber.Ctx) error {
	db := database.DBConn
	var leads []Lead
	if err := db.Find(&leads).Error; err != nil {
		return c.Status(500).SendString("Error retrieving leads")
	}
	return c.JSON(leads)
}

// GetLead retrieves a single lead by ID
func GetLead(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	var lead Lead
	if err := db.First(&lead, id).Error; err != nil {
		return c.Status(404).SendString("Lead not found")
	}
	return c.JSON(lead)
}

// NewLead creates a new lead
func NewLead(c *fiber.Ctx) error {
	db := database.DBConn
	lead := new(Lead)
	if err := c.BodyParser(lead); err != nil {
		return c.Status(400).SendString("Invalid request body")
	}
	if err := db.Create(lead).Error; err != nil {
		return c.Status(500).SendString("Error creating lead")
	}
	return c.Status(201).JSON(lead)
}

// DeleteLead deletes a lead by ID
func DeleteLead(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn

	var lead Lead
	if err := db.First(&lead, id).Error; err != nil {
		return c.Status(404).SendString("Lead not found")
	}
	if err := db.Delete(&lead).Error; err != nil {
		return c.Status(500).SendString("Error deleting lead")
	}
	return c.SendString("Lead successfully deleted")
}
