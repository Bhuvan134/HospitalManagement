const apiUrl = 'http://localhost:3000/api/appointments'; // Your API endpoint for appointments

// Fetch and display all appointments in the table
async function fetchAppointments() {
    try {
        const response = await fetch(apiUrl); // Fetch appointment data from backend
        if (response.ok) {
            const appointments = await response.json(); // Parse JSON response

            const tableBody = document.getElementById('appointment-table-body');
            tableBody.innerHTML = ''; // Clear the current rows in the table

            if (appointments.length > 0) {
                // Loop through appointments and display them in the table
                appointments.forEach(appointment => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${appointment._id}</td>
                        <td>${appointment.name}</td>
                        <td>${appointment.email}</td>
                        <td>${appointment.age}</td>
                        <td>${appointment.problem}</td>
                        <td>${appointment.doctorName}</td>
                        <td>
                            <button onclick="editAppointment('${appointment._id}')">Edit</button>
                            <button onclick="deleteAppointment('${appointment._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row); // Append the new row to the table
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="7">No appointments found.</td>';
                tableBody.appendChild(row);
            }
        } else {
            console.error('Error fetching appointments:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// Add or update an appointment
async function saveAppointment(event) {
    event.preventDefault();

    const appointmentId = document.getElementById('appointment-id').value;
    const appointmentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value, 10),
        problem: document.getElementById('problem').value,
        doctorName: document.getElementById('doctor-name').value
    };

    if (appointmentId) {
        // Update existing appointment
        await fetch(`${apiUrl}/${appointmentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });
    } else {
        // Add new appointment
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });
    }

    document.getElementById('appointment-form').reset(); // Reset form
    fetchAppointments(); // Fetch updated data to update table
}

// Delete an appointment
async function deleteAppointment(id) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchAppointments(); // Fetch updated data to refresh the table
    }
}

// Populate the form for editing
async function editAppointment(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const appointment = await response.json();

    document.getElementById('appointment-id').value = appointment._id;
    document.getElementById('name').value = appointment.name;
    document.getElementById('email').value = appointment.email;
    document.getElementById('age').value = appointment.age;
    document.getElementById('problem').value = appointment.problem;
    document.getElementById('doctor-name').value = appointment.doctorName;
}

// Initialize event listeners
document.getElementById('appointment-form').addEventListener('submit', saveAppointment);

// Fetch and display appointments on page load
fetchAppointments();
