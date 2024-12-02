const apiUrl = 'http://localhost:3000/api/doctors'; // Your API endpoint

async function fetchDoctors() {
    try {
        const response = await fetch(apiUrl); // Fetch doctor data from backend
        if (response.ok) {
            const doctors = await response.json(); // Parse JSON response

            const tableBody = document.getElementById('doctor-table-body');
            tableBody.innerHTML = ''; // Clear the current rows in the table

            if (doctors.length > 0) {
                // Loop through doctors and display them in the table
                doctors.forEach(doctor => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${doctor._id}</td>
                        <td>${doctor.name}</td>
                        <td>${doctor.age}</td>
                        <td>${doctor.specialist}</td>
                        <td>${doctor.phone}</td>
                        <td>${doctor.education}</td>
                        <td>${doctor.email}</td> <!-- Include email here -->
                        <td>
                            <button onclick="editDoctor('${doctor._id}')">Edit</button>
                            <button onclick="deleteDoctor('${doctor._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row); // Append the new row to the table
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = <td colspan="8">No doctors found</td>; // Adjust colspan for 8 columns
                tableBody.appendChild(row); // Show message when no doctors
            }
        } else {
            console.error('Failed to fetch doctors');
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
}


// Function to edit a doctor's details
async function editDoctor(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const doctor = await response.json();
    if (response.ok) {
        document.getElementById('name').value = doctor.name;
        document.getElementById('email').value = doctor.email;
        document.getElementById('age').value = doctor.age;
        document.getElementById('education').value = doctor.education;
        document.getElementById('specialist').value = doctor.specialist;
        document.getElementById('phone').value = doctor.phone;
    }
}

// Function to delete a doctor
async function deleteDoctor(id) {
    const confirmation = confirm('Are you sure you want to delete this doctor?');
    if (confirmation) {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchDoctors(); // Refresh the doctor list after deletion
            alert('Doctor deleted successfully');
        } else {
            alert('Failed to delete doctor');
        }
    }
}

// Call the fetchDoctors function when the page loads
fetchDoctors();