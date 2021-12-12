export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    res.status(200).json({
      success: true,
      message: `We've sent an email to ${email} with a link to create new password.`,
    });
  } else {
    res
      .status(405)
      .json({ success: false, message: `${req.method} method is not allowed` });
  }
}
