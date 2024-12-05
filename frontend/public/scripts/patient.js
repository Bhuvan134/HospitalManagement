const apiUrl = 'http://localhost:3000/api/patients'; // Your API endpoint

// Fetch and display all patients in the table
async function fetchPatients() {
    try {
        const response = await fetch(apiUrl); // Fetch patient data from backend
        if (response.ok) {
            const patients = await response.json(); // Parse JSON response

            const tableBody = document.getElementById('patient-table-body');
            tableBody.innerHTML = ''; // Clear the current rows in the table

            
            
            if (patients.length > 0) {
                // Loop through patients and display them in the table
                patients.forEach(patient => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${patient._id}</td>
                        <td>${patient.name}</td>
                        <td>${patient.age}</td>
                        <td>${patient.gender}</td>
                        <td>${patient.contact}</td>
                        <td>${patient.medicalHistory || 'N/A'}</td>
                        <td>
                            <button onclick="editPatient('${patient._id}')">Edit</button>
                            <button onclick="deletePatient('${patient._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row); // Append the new row to the table
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = <td colspan="7">No patients found.</td>;
                tableBody.appendChild(row);
            }
        } else {
            console.error('Error fetching patients:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

// Add or update a patient
async function savePatient(event) {
    event.preventDefault();

    const patientId = document.getElementById('patient-id').value;
    const patientData = {
        name: document.getElementById('name').value,
        age: parseInt(document.getElementById('age').value, 10),
        gender: document.getElementById('gender').value,
        contact: document.getElementById('contact').value,
        medicalHistory: document.getElementById('medical-history').value
    };

    if (patientId) {
        // Update existing patient
        await fetch(`${apiUrl}/${patientId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });
    } else {
        // Add new patient
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });
    }

    document.getElementById('patient-form').reset(); // Reset form
    fetchPatients(); // Fetch updated data to update table
}

// Delete a patient
async function deletePatient(id) {
    if (confirm('Are you sure you want to delete this patient?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchPatients(); // Fetch updated data to refresh the table
    }
}

// Populate the form for editing
async function editPatient(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const patient = await response.json();

    document.getElementById('patient-id').value = patient._id;
    document.getElementById('name').value = patient.name;
    document.getElementById('age').value = patient.age;
    document.getElementById('gender').value = patient.gender;
    document.getElementById('contact').value = patient.contact;
    document.getElementById('medical-history').value = patient.medicalHistory || '';
}

// Initialize event listeners
document.getElementById('patient-form').addEventListener('submit', savePatient);

// Fetch and display patients on page load
fetchPatients();