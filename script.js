async function searchResult() {

const roll=document.getElementById("roll").value.trim();

const output=document.getElementById("output");

if(roll==""){

output.innerHTML="<h3>Roll Number दर्ज करें</h3>";

return;

}

try{

const res=await fetch("students.json");

const students=await res.json();

const student=students.find(x=>x.roll==roll);

if(!student){

output.innerHTML="<h3>Result Not Found</h3>";

return;

}

output.innerHTML=`

<h2>${student.name}</h2>

<table>

<tr>
<th>Roll No</th>
<td>${student.roll}</td>
</tr>

<tr>
<th>Class</th>
<td>${student.class}</td>
</tr>

<tr>
<th>Test</th>
<td>${student.test}</td>
</tr>

<tr>
<th>Status</th>
<td>${student.status}</td>
</tr>

</table>

`;

}catch{

output.innerHTML="<h3>students.json नहीं मिला</h3>";

}

}
