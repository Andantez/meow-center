// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = async (req, res) => {
  const response = await fetch('https://api.thecatapi.com/v1/favourites', {
    headers: {
      'x-api-key': process.env.X_API_KEY,
    },
  });
  const data = await response.json();
  res.status(200).json(data)
}

export default handler;