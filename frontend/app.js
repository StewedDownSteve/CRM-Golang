// Function to fetch all leads and display them
async function fetchLeads() {
    try {
        const response = await fetch('/api/v1/lead');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const leads = await response.json();
        console.log('Fetched leads:', leads); // Debugging line

        const leadList = document.getElementById('leadList');
        leadList.innerHTML = ''; 
        // Clear previous leads

        leads.forEach(lead => {
            const li = document.createElement('li');
            li.textContent = `Name: ${lead.name}, Company: ${lead.company}, Email: ${lead.email}, Phone: ${lead.phone}`;
            leadList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching leads:', error); // Debugging line
    }
}

// Function to add a new lead
document.getElementById('leadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const lead = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    try {
        const response = await fetch('/api/v1/lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lead),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        console.log('Lead added successfully'); // Debugging line

        // After adding a lead, fetch the updated lead list
        fetchLeads();
    } catch (error) {
        console.error('Error adding lead:', error); // Debugging line
    }
});


// Initial fetch of leads when the page loads
fetchLeads();
