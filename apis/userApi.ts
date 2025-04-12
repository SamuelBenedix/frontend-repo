export const getUserData = async () => {
 const res = await fetch('http://localhost:5001/YOUR_PROJECT/us-central1/getUser'); // adjust as needed
 if (!res.ok) throw new Error('Failed to fetch user');
 return await res.json();
};
