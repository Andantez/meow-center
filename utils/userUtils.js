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

export const deleteFavourite = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URI}/favourites/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
        },
      }
    );
    if (!res.ok) throw new Error('Something went wrong please try again');

    const data = await res.json();
    return {
      message: data.message,
    };
  } catch (error) {
    console.log(error);
  }
};
