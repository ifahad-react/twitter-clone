import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function NewTweet({ tweets, setTweets }) {
  const [content, setContent] = useState('')
  const { data: session } = useSession()

  if (!session || !session.user) return null

  return (
    <form
      className='border-b border-gray-800 px-4 py-3'
      onSubmit={async (e) => {
        e.preventDefault()

        if (!content.trim()) {
          alert('No content')
          return
        }

        const res = await fetch('/api/tweet', {
            body: JSON.stringify({
                content,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
        const tweet = await res.json()

        setTweets([tweet, ...tweets])
        setContent('')
      }}
    >
      <div className='flex gap-3'>
        {session.user.image && (
          <Image
            className='h-10 w-10 flex-shrink-0 rounded-full'
            src={session.user.image}
            alt=''
            width={40}
            height={40}
          />
        )}
        <textarea
          className='w-full flex-1 resize-none bg-transparent pt-2 text-lg outline-none placeholder:text-gray-500'
          rows={2}
          placeholder="What's happening?"
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className='flex justify-end border-t border-gray-800 pt-3'>
        <button
          type='submit'
          disabled={!content.trim()}
          className='rounded-full bg-sky-500 px-5 py-2 font-bold text-white transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-sky-500/40'
        >
          Tweet
        </button>
      </div>
    </form>
  )
}