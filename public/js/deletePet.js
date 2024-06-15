async function deletePet(id) {
    const response = await fetch(`/deletepet/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to deny inquiry');
    }
  }