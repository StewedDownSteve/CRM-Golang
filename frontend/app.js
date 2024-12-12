const apiBase = "/api/v1/lead"; 
// Base API URL, connects to lead/customer
const leadsContainer = document.querySelector(".overflow-y-auto"); // Reference the container for customer cards
const leadForm = document.getElementById("lead-form");



// All backend stuff refers to lead/ leads for customer info, some frontend and functions i refer to customers

// -------- FUNCTIONS, anything that get populated has TailwindCSS styling to match front end --------------


// Function 1 - to create a customer card with TailwindCSS
function createCustomerCard(lead) {
    // Create a wrapper div for the customer card
    const card = document.createElement("div");
    card.className = "p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center";

    // Add the customer details
    const details = document.createElement("div");
    details.innerHTML = `
        <p class="text-sm font-medium text-gray-800">${lead.name}</p>
        <p class="text-sm text-gray-500">${lead.company}</p>
        <p class="text-sm text-gray-500">${lead.email}</p>
        <p class="text-sm text-gray-500">${lead.phone}</p>
    `;

    // Add a "Remove" button
    const removeButton = document.createElement("button");
    removeButton.className = "text-sm text-red-600 hover:underline hover:text-red-700";
    removeButton.textContent = "Remove";

    // Event listener to handle the removal from delete
    removeButton.addEventListener("click", () => {
        deleteLead(lead.id); // Call delete API
        card.remove(); // Remove the card from the DOM
    });

    // Put the details and button to the card
    card.appendChild(details);
    card.appendChild(removeButton)

    return card;
}




// Function 2 - to fetch all leads and display them
async function fetchLeads() {
    try {
        const response = await fetch(apiBase);
        if (!response.ok) throw new Error("Failed to fetch leads");
        const leads = await response.json();

        // This Clears the leads container/display
        // we just make the inner HTML blank/clear it. We will repopulate it
        leadsContainer.innerHTML = "";

        // Populates the container with lead cards
        // **Tailwind CSS needed????????****
        leads.forEach(lead => {
            const leadCard = document.createElement("div");
            leadCard.className = "lead-card";
            leadCard.innerHTML = `
                <h2>${lead.name}</h2>
                <p><strong>Company:</strong> ${lead.company}</p>
                <p><strong>Email:</strong> ${lead.email}</p>
                <p><strong>Phone:</strong> ${lead.phone}</p>
            `;
            leadsContainer.appendChild(leadCard);
        });
    } catch (error) {
        console.error("Error fetching leads", error);
    }
}


// Function 3 - Create a new lead
async function createLead(leadData) {
    try {
        const response = await fetch(apiBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
        });
        if (!response.ok) throw new Error("Failed to create lead");

        // Refetch leads to update the UI
        fetchLeads();
    } catch (error) {
        console.error("Error creating lead:", error);
    }
}

// Function to delete a lead by ID
async function deleteLead(id) {
    try {
        const response = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete lead");

        console.log(`Lead with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting lead:", error);
    }
}

// Form submission event handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value; // Check this ID
    const company = document.getElementById('company').value; // Check this ID
    const email = document.getElementById('email').value; // Check this ID
    const phone = document.getElementById('phone').value; // Check this ID
    // Create lead data object
    const newLead = { name, company, email, phone };

    // Clear the form fields
    leadForm.reset();

    // Call createLead function to add the lead
    createLead(newLead);
});

// Fetch and display leads on page load
fetchLeads();




// Postman format for POST, GET requests
// {
//     "ID": 1,
//     "CreatedAt": "some sort of date format",
//     "UpdatedAt": "some sort of date format",
//     "DeletedAt": null,
//     "name": "John Doe",
//     "company": "Random Company",
//     "email": "random@email.com",
//     "phone": 1232223232
// }