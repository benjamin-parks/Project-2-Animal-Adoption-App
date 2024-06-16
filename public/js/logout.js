const logout = async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to login page after successful logout
      document.location.replace('/login');
    } else {
      alert('Failed to log out.');
    }
  } catch (error) {
    console.error('Error logging out:', error);
    alert('Failed to log out.');
  }
};

document.getElementById('logout').addEventListener('click', logout);
