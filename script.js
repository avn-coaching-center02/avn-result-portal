function show(value, type = "") {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    String(value).trim().toLowerCase() === "null"
  ) {
    if (type === "result") return "Result जल्द जारी किया जाएगा";
    if (type === "percentage") return "गणना शेष";
    if (type === "grade") return "निर्धारित नहीं";
    return "अंक अपलोड नहीं किए गए हैं";
  }
  return value;
}

async function searchResult() {
  const exam = document.getElementById("exam").value;
  const roll = document.getElementById("roll").value.trim();
  const output = document.getElementById("output");

  if (!roll) {
    output.innerHTML =
      "<h3 style='color:red;text-align:center'>कृपया Roll Number दर्ज करें।</h3>";
    return;
  }

  try {
    const res = await fetch("students.json");
    const students = await res.json();

    const student = students.find(
      x => String(x["Roll No"]).trim() === roll
    );

    if (!student) {
      output.innerHTML =
        "<h3 style='color:red;text-align:center'>Result Not Found</h3>";
      return;
    }

    output.innerHTML = `
      <div class="result-card">
        <h2 style="text-align:center;color:#0d47a1;">${student["Name"]}</h2>
        <h3 style="text-align:center;color:green;">${exam}</h3>

        <table class="result-table">
          <tr><th>Roll No</th><td>${show(student["Roll No"])}</td></tr>
          <tr><th>Father Name</th><td>${show(student["Parent Name"])}</td></tr>
          <tr><th>Class</th><td>${show(student["Class"])}</td></tr>

          <tr><th>Physics</th><td>${show(student["Physics"])}</td></tr>
          <tr><th>Chemistry</th><td>${show(student["Chemistry"])}</td></tr>
          <tr><th>Mathematics</th><td>${show(student["Mathematics"])}</td></tr>
          <tr><th>Biology</th><td>${show(student["Biology"])}</td></tr>

          <tr><th>Total</th><td>${
