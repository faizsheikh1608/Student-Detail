let students = [];

// Fetch student data
fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(response => response.json())
    .then(data => {
        students = data;
        displayStudents(students);
    })
    .catch(error => console.error('Error fetching data:', error));

// Display students in the table
function displayStudents(students) {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td><img src="${student.image}" class="student-img">${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
        `;
        tbody.appendChild(row);
    });
}

// Search function
function search() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.first_name.toLowerCase().includes(query) ||
        student.last_name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
    displayStudents(filteredStudents);
}

// Sort functions
function sortAZ() {
    const sortedStudents = [...students].sort((a, b) => 
        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
    );
    displayStudents(sortedStudents);
}

function sortZA() {
    const sortedStudents = [...students].sort((a, b) => 
        `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`)
    );
    displayStudents(sortedStudents);
}

function sortByMarks() {
    const sortedStudents = [...students].sort((a, b) => a.marks - b.marks);
    displayStudents(sortedStudents);
}

function filterPassing() {
    const passingStudents = students.filter(student => student.passing);
    displayStudents(passingStudents);
}

function sortByClass() {
    const sortedStudents = [...students].sort((a, b) => a.class - b.class);
    displayStudents(sortedStudents);
}

function sortByGender() {
    const maleStudents = students.filter(student => student.gender === 'male');
    const femaleStudents = students.filter(student => student.gender === 'female');
    
    displayStudents(maleStudents);

    const tbody = document.querySelector('#studentTable tbodys');
    const separator = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 7;
    cell.textContent = 'Female Students';
    separator.appendChild(cell);
    tbody.appendChild(separator);

    displayStudents(femaleStudents);
}



