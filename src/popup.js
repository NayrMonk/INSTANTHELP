document.getElementById('submit').addEventListener('click', async () => {
    const query = document.getElementById('query').value;

    if (!query) {
        alert('Please enter a query.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('response').textContent = data.text;
    } catch (error) {
        console.error('Error fetching response:', error);
        document.getElementById('response').textContent = 'Error fetching response.';
    }
});
