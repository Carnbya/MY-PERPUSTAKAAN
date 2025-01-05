document.getElementById('transactionForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const fields = ["name", "nim", "book", "pickupDate", "returnDate"];
    let isValid = true;

    fields.forEach(field => {
        const value = document.getElementById(field).value.trim();
        const error = document.getElementById(`${field}Error`);
        if (!value) {
            error.textContent = `${field} wajib diisi.`;
            error.style.display = "block";
            isValid = false;
        } else {
            error.style.display = "none";
        }
    });

    if (isValid) {
        const transaction = {
            name: document.getElementById('name').value.trim(),
            nim: document.getElementById('nim').value.trim(),
            book: document.getElementById('book').value.trim(),
            pickupDate: document.getElementById('pickupDate').value,
            returnDate: document.getElementById('returnDate').value,
            status: "Dipinjam"
        };

        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        alert("Transaksi berhasil ditambahkan!");
        document.getElementById('transactionForm').reset();
    }
});

window.addEventListener('load', () => {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const tableBody = document.querySelector('#transactionTable tbody');

    transactions.forEach(t => {
        const row = `
            <tr>
                <td>${t.name}</td>
                <td>${t.nim}</td>
                <td>${t.book}</td>
                <td>${t.pickupDate}</td>
                <td>${t.returnDate}</td>
                <td>${t.status}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
});
