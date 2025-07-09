document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});
document.getElementById("btnSaludo").addEventListener("click", async () => {
  const nombre = document.getElementById("nombreInput").value;
  if (!nombre) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }
  const response = await fetch(`/greet?name=${encodeURIComponent(nombre)}`);
  const data = await response.json();
  document.getElementById("nombreUsuario").innerText = data.message;
});
document.getElementById("btnEstudiante").addEventListener("click", async () => {
  const nombreEstudiante = document.getElementById("nombreEstudiante").value;
  if (!nombreEstudiante) {
    alert("Por favor, ingresa el nombre del estudiante.");
    return;
  }
  const response = await fetch(`/students?name=${encodeURIComponent(nombreEstudiante)}`);
  const data = await response.json();
  document.getElementById("nuevoEstudiante").innerText = data.name;
});