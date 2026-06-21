let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const search = document.getElementById("search");

function displayStudents(data = students){

    studentList.innerHTML = "";

    data.forEach((student,index)=>{

        let row = `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.branch}</td>
            <td>${student.year}</td>
            <td>
                <button class="delete-btn"
                onclick="deleteStudent(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;

        studentList.innerHTML += row;
    });
}

form.addEventListener("submit",function(e){

    e.preventDefault();

    const student = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        branch: document.getElementById("branch").value,
        year: document.getElementById("year").value
    };

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();

    form.reset();
});

function deleteStudent(index){

    students.splice(index,1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();
}

search.addEventListener("keyup",function(){

    let value = search.value.toLowerCase();

    let filtered = students.filter(student =>
        student.name.toLowerCase().includes(value) ||
        student.id.toLowerCase().includes(value)
    );

    displayStudents(filtered);
});

displayStudents();
