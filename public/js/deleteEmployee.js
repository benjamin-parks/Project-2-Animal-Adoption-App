async function deleteEmployee(id) {
    const response = await fetch(`/employees/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to deny inquiry');
    }
  }