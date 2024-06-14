
async function approveInquiry(id) {
  const response = await fetch(`/petinquiries/approve/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log("response", response)

  //looking for not okay because the location is being deleted
  if (!response.ok) {
    document.location.reload();
  } else {
    alert('Failed to approve inquiry');
  }
}

async function denyInquiry(id) {
  const response = await fetch(`/petinquiries/deny/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to deny inquiry');
  }
}