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
    const exam = document.getElementById("exam")
        ? document.getElementById("exam").value
        : "1st Assessment";

    const roll = document.getElementById("roll").value.trim();
    const output = document.getElementById("output");

    if (!roll) {
        output.innerHTML = "<h3>कृपया Roll Number दर्ज करें।</h3>";
        return;
    }

    try {
        const response = await fetch("students.json");
        const students = await response.json();

        const student = students.find(
            s => String(s["Roll No"]).trim() === roll
        );

        if (!student) {
            output.innerHTML = "<h3>Result Not Found</h3>";
            return;
        }

        output.innerHTML = `
            <h2 style="text-align:center;">${exam}</h2>
            <h2>${show(student["Name"])}</h2>

            <table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;">
                <tr><th>Roll No</th><td>${show(student["Roll No"])}</td></tr>
                <tr><th>Student Name</th><td>${show(student["Name"])}</td></tr>
                <tr><th>Father Name</th><td>${show(student["Parent Name"])}</td></tr>
                <tr><th>Class</th><td>${show(student["Class"])}</td></tr>

                <tr><th>Physics</th><td>${show(student["Physics"])}</td></tr>
                <tr><th>Chemistry</th><td>${show(student["Chemistry"])}</td></tr>
                <tr><th>Mathematics</th><td>${show(student["Mathematics"])}</td></tr>
                <tr><th>Biology</th><td>${show(student["Biology"])}</td></tr>

                <tr><th>Total</th><td>${show(student["Total"])}</td></tr>
                <tr><th>Percentage</th><td>${show(student["Percentage"], "percentage")}</td></tr>
                <tr><th>Grade</th><td>${show(student["Grade"], "grade")}</td></tr>
                <tr><th>Result</th><td>${show(student["Result"], "result")}</td></tr>
            </table>
        `;
    } catch (error) {
        output.innerHTML = "<h3>students.json लोड नहीं हो पाया।</h3>";
    }
}
