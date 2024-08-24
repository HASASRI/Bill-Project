// Initialize bill data
const storageKey = 'bills';
let bills = JSON.parse(localStorage.getItem(storageKey)) || [];

// Function to save bills to localStorage
function saveBills() {
    localStorage.setItem(storageKey, JSON.stringify(bills));
}

// Function to add bill to table
function addBillToTable(bill) {
    const table = document.getElementById('billsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell().textContent = bill.billNumber;
    row.insertCell().textContent = bill.date;
    row.insertCell().textContent = bill.amount;
    row.insertCell().textContent = bill.description;
    row.insertCell().textContent = bill.category;
}

// Function to render all bills to table
function renderBills() {
    const table = document.getElementById('billsTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear table
    bills.forEach(addBillToTable);
}

// Handle form submission
document.getElementById('billForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const bill = {
        billNumber: document.getElementById('billNumber').value,
        date: document.getElementById('date').value,
        amount: parseFloat(document.getElementById('amount').value),
        description: document.getElementById('description').value,
        category: document.getElementById('category').value
    };
    
    bills.push(bill);
    saveBills();
    addBillToTable(bill);
    
    // Clear form
    this.reset();
});

// Handle clear all button click
document.getElementById('clearAll').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all bills?')) {
        bills = [];
        saveBills();
        renderBills();
    }
});

// Generate report
document.getElementById('generateReport').addEventListener('click', function() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    
    // Store the filtered bills in localStorage
    const reportData = bills.filter(bill => {
        const billDate = new Date(bill.date);
        return billDate >= startDate && billDate <= endDate;
    });
    localStorage.setItem('reportData', JSON.stringify(reportData));

    // Redirect to the report page
    window.location.href = 'report.html';
});

// Render bills on page load
renderBills();
