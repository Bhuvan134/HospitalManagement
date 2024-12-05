const apiUrl = 'http://localhost:3000/api/billing'; // Your API endpoint for billing

// Fetch and display all bills in the table
async function fetchBills() {
    try {
        const response = await fetch(apiUrl); // Fetch billing data from backend
        if (response.ok) {
            const bills = await response.json(); // Parse JSON response

            const tableBody = document.getElementById('billing-table-body');
            tableBody.innerHTML = ''; // Clear the current rows in the table

            if (bills.length > 0) {
                // Loop through bills and display them in the table
                bills.forEach(bill => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${bill._id}</td>
                        <td>${bill.patientName}</td>
                        <td>${bill.patientEmail}</td>
                        <td>${bill.amount}</td>
                        <td>${bill.description}</td>
                        <td>${new Date(bill.billingDate).toLocaleDateString()}</td>
                        <td>
                            <button onclick="editBill('${bill._id}')">Edit</button>
                            <button onclick="deleteBill('${bill._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row); // Append the new row to the table
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="7">No billing records found.</td>';
                tableBody.appendChild(row);
            }
        } else {
            console.error('Error fetching bills:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching bills:', error);
    }
}

// Add or update a bill
async function saveBill(event) {
    event.preventDefault();

    const billId = document.getElementById('bill-id').value;
    const billData = {
        patientName: document.getElementById('patient-name').value,
        patientEmail: document.getElementById('patient-email').value,
        amount: parseFloat(document.getElementById('amount').value),
        description: document.getElementById('description').value,
        billingDate: document.getElementById('billing-date').value
    };

    if (billId) {
        // Update existing bill
        await fetch(`${apiUrl}/${billId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(billData)
        });
    } else {
        // Add new bill
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(billData)
        });
    }

    document.getElementById('billing-form').reset(); // Reset form
    fetchBills(); // Fetch updated data to update table
}

// Delete a bill
async function deleteBill(id) {
    if (confirm('Are you sure you want to delete this bill?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchBills(); // Fetch updated data to refresh the table
    }
}

// Populate the form for editing
async function editBill(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const bill = await response.json();

    document.getElementById('bill-id').value = bill._id;
    document.getElementById('patient-name').value = bill.patientName;
    document.getElementById('patient-email').value = bill.patientEmail;
    document.getElementById('amount').value = bill.amount;
    document.getElementById('description').value = bill.description;
    document.getElementById('billing-date').value = new Date(bill.billingDate).toISOString().split('T')[0];
}

// Initialize event listeners
document.getElementById('billing-form').addEventListener('submit', saveBill);

// Fetch and display bills on page load
fetchBills();
