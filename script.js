function show(value, type = "") {
    if (
        value === null ||
        value === undefined ||
        value === "" ||
        String(value).trim().toLowerCase() === "null"
    ) {
        switch (type) {
            case "result":
                return "Result जल्द जारी किया जाएगा";
            case "percentage":
                return "गणना शेष";
            case "grade":
                return "निर्धारित नहीं";
            default:
                return "अंक अपलोड नहीं किए गए हैं";
        }
    }
    return value;
}

async function searchResult() {
    const exam = document.getElementById("exam")?.value || "1st Assessment";
    const roll = document.getElementById("roll").value.trim();
    const output = document.getElementById("output");

    if (!roll) {
        output.innerHTML =
            "<h3 style='color:red;text-align:center'>कृपया Roll Number दर्ज करें।</h3>";
        return;
    }

    try {
        const response = await fetch("students.json");
        const students = await response.json();

        const student = students.find(
            s => String(s["Roll No"]).trim() === roll
        );

        if (!student) {
            output.innerHTML =
                "<h3 style='color:red;text-align:center'>Result Not Found</h3>";
            return;
        }

        output.innerHTML = `
            <div class="result-card">
                <h2 style="text-align:center;color:#0d47a1;">AVN Coaching Center</h2>
                <h4 style="text-align:center;">Naraini, Shafipur, Sultanpur</h4>
                <h3 style="text-align:center;color:green;">${exam}</h3>

                <table class="result-table">
                    <tr><th>Roll No</th><td>${show(student["Roll No"])}</td></tr>
                    <tr><th>Student Name</th><td>${show(student["Name"])}</td></tr>
                    <tr><th>Father Name</th><td>${show(student["Parent Name"])}</td></tr>
                    <tr><th>Class</th><td>${show(student["Class"])}</td></tr>

                    <tr><th>Physics</th><td>${show(student["Physics"])}</td></tr>
                    <tr><th>Chemistry</th><td>${show(student["Chemistry"])}</td></tr>
                    <tr><th>Mathematics</th><td>${show(student["Mathematics"])}</td></tr>
                    <tr><th>Biology</th><td>${show(student["Biology"])}</td></tr>

                    <tr><th>Total</
