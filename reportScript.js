// Initialize report data
const reportData = JSON.parse(localStorage.getItem('reportData')) || [];

// Function to add bill to report table
function addBillToReportTable(bill) {
    const table = document.getElementById('reportTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell().textContent = bill.billNumber;
    row.insertCell().textContent = bill.date;
    row.insertCell().textContent = bill.amount;
    row.insertCell().textContent = bill.description;
    row.insertCell().textContent = bill.category;
}

// Render report
function renderReport() {
    const table = document.getElementById('reportTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear table
    reportData.forEach(addBillToReportTable);
}

// Download report as CSV
document.getElementById('downloadReport').addEventListener('click', function() {
    const table = document.getElementById('reportTable');
    const rows = table.querySelectorAll('tr');
    const csv = [];

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const csvRow = [];
        cols.forEach(col => csvRow.push('"' + col.innerText.replace(/"/g, '""') + '"'));
        csv.push(csvRow.join(','));
    });

    const csvString = csv.join('\n');
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString);
    link.download = 'report.csv';
    link.click();
});

// Render report on page load
renderReport();
