// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const API_KEY = process.env.BUTTONDOWN_API_KEY
    const buttondownRoute = `${process.env.BUTTONDOWN_API_URL}subscribers`
    // const buttondownRoute = `${process.env.BUTTONDOWN_API_URL}`
    const response = await fetch(buttondownRoute, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })

    if (response.status >= 400) {
      return res.status(500).json({ error: `There was an error subscribing to the list.` })
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
