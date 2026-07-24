import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

export default function NewReply({ tweet }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [reply, setReply] = useState('')

  if (!session || !session.user) return null

  return (
    <form
      className='border-b border-gray-800 px-4 py-3'
      onSubmit={async (e) => {
        e.preventDefault()
        if (!reply.trim()) {
          alert('Enter some text in the reply')
          return
        }
        await fetch('/api/tweet', {
          body: JSON.stringify({
            parent: tweet.id,
            content: reply,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        router.reload(window.location.pathname)
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
          rows={1}
          placeholder='Tweet your reply'
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      </div>

      <div className='flex justify-end border-t border-gray-800 pt-3'>
        <button
          type='submit'
          disabled={!reply.trim()}
          className='rounded-full bg-sky-500 px-5 py-2 font-bold text-white transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-sky-500/40'
        >
          Reply
        </button>
      </div>
    </form>
  )
}