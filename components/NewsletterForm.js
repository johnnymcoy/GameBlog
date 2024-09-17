import { useRef, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

const NewsletterForm = ({ title = 'Subscribe to the newsletter' }) => {
  const inputEl = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [manualLink, setManualLink] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()
    const buttondownRoute = `${process.env.NEXT_PUBLIC_BUTTONDOWN_SUBSCRIBE_URL}`
    const form = e.target
    const formData = new FormData(form)
    // const email = inputEl.current.value;
    fetch(buttondownRoute, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log(response)
          inputEl.current.value = ''
          setError(false)
          setSubscribed(true)
          setManualLink(false)
          setMessage('Successfully! 🎉 You are now subscribed.')
        } else {
          console.log('Error: ' + response)
          inputEl.current.value = ''
          setError(true)
          setSubscribed(false)
          setMessage('Failed to subscribe, You can manually subscribe here')
          setManualLink(true)
        }
      })
      .catch((error) => {
        console.log('Error: ' + error)
        inputEl.current.value = ''
        setError(true)
        setSubscribed(true)
        setManualLink(false)
        setMessage('Failed to subscribe, Error: ' + error.message)
      })
    //- The old regular method by the template
    //- above method doesn't use the buttondown API, as it's possible to subscribe free without
    {
      // const res = await fetch(`pages/api/${siteMetadata.newsletter.provider}`, {
      //   body: JSON.stringify({
      //     email: inputEl.current.value,
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   method: 'POST',
      // // })
      // const { error } = await res.json()
      // if (error) {
      //   setError(true)
      //   setMessage('Your e-mail address is invalid or you are already subscribed!')
      //   console.log(error)
      //   return
      // }
      // inputEl.current.value = ''
      // setError(false)
      // setSubscribed(true)
      // setMessage('Successfully! 🎉 You are now subscribed.')
    }
  }

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <div>
          <label className="sr-only" htmlFor="email-input">
            Email address
          </label>
          <input
            autoComplete="email"
            className="w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
            id="email-input"
            name="email"
            placeholder={subscribed ? "You're subscribed !  🎉" : 'Enter your email'}
            ref={inputEl}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0">
          <button
            className={`w-full rounded-md bg-primary-500 px-4 py-2 font-medium text-white sm:py-0 ${
              subscribed ? 'cursor-default' : 'hover:bg-primary-700 dark:hover:bg-primary-400'
            } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}
            type="submit"
            disabled={subscribed}
          >
            {subscribed ? 'Thank you!' : 'Sign up'}
          </button>
        </div>
      </form>
      {error && (
        <div className="flex w-72 flex-col pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96 sm:flex-row">
          {message}
        </div>
      )}
      {manualLink && (
        <a
          href={'https://buttondown.com/api/emails/embed-subscribe/johnny-mcoy'}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="manual subscription link"
          target="_blank"
          without
          rel="noreferrer"
        >
          Manual Link
        </a>
      )}
    </div>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title }) => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={title} />
    </div>
  </div>
)
