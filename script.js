async function searchResult() {
  const roll = document.getElementById("roll").value.trim();
  const output = document.getElementById("output");

  if (!roll) {
    output.innerHTML = "<h3>Roll Number दर्ज करें</h3>";
    return;
  }

  try {
    const res = await fetch("students.json");
    const students = await res.json();

    const student = students.find(
      x => String(x["Roll No"]).trim() === roll
    );

    if (!student) {
      output.innerHTML = "<h3>Result Not Found</h3>";
      return;
    }

    output.innerHTML = `
      <h2>${student["Name"]}</h2>
      <table border="1" cellpadding="8">
        <tr><th>Roll No</th><td>${student["Roll No"]}</td></tr>
        <tr><th>Parent</th><td>${student["Parent Name"] || ""}</td></tr>
        <tr><th>Class</th><td>${student["Class"]}</td></tr>
        <tr><th>Physics</th><td>${student["Physics"]}</td></tr>
        <tr><th>Chemistry</th><td>${student["Chemistry"]}</td></tr>
        <tr><th>Mathematics</th><td>${student["Mathematics"]}</td></tr>
        <tr><th>Biology</th><td>${student["Biology"]}</td></tr>
        <tr><th>Total</th><td>${student["Total"]}</td></tr>
        <tr><th>Percentage</th><td>${student["Percentage"]}%</td></tr>
        <tr><th>Grade</th><td>${student["Grade"]}</td></tr>
        <tr><th>Result</th><td>${student["Result"]}</td></tr>
      </table>`;
  } catch (e) {
    output.innerHTML = "<h3>students.json नहीं मिला</h3>";
  }
}
