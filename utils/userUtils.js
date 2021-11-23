export const createUser = async (name, email, password) => {
  const user = { name, email, password };

  try {
    const response = await fetch('api/signUp', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
