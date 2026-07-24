import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Setup() {
    const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [name, setName] = useState('')
  if (!session || !session.user) return null
  if (loading) return null
  if (!loading && session.user.name) {
    router.push('/home')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-black px-4'>
      <form
        className='w-full max-w-sm'
        onSubmit={async (e) => {
          e.preventDefault()
          await fetch('/api/setup', {
            body: JSON.stringify({
              name
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })
          session.user.name = name
          router.push('/home')
        }}
      >
        <h1 className='mb-2 text-2xl font-extrabold text-white'>
          What should we call you?
        </h1>
        <p className='mb-8 text-sm text-gray-500'>
          Your name appears on your profile and tweets.
        </p>

        <div className='relative mb-8'>
          <input
            id='name'
            type='text'
            name='name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=' '
            className='peer w-full rounded-md border border-gray-700 bg-black px-3 pb-2 pt-5 text-white outline-none transition-colors focus:border-sky-500'
          />
          <label
            htmlFor='name'
            className='pointer-events-none absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-sky-500'
          >
            Username
          </label>
        </div>

        <button
          type='submit'
          disabled={!name.trim()}
          className='w-full rounded-full bg-sky-500 py-2.5 font-bold text-white transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-sky-500/40'
        >
          Save
        </button>
      </form>
    </div>
  )
}