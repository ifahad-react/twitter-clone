import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function DeleteTweetButton({ tweet }) {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session || session.user.email !== tweet.author.email) return null

  return (
    <div className='border-b border-gray-800 px-4 py-2'>
      <button
        className='rounded-full px-4 py-2 text-sm font-bold text-red-500 transition-colors hover:bg-red-500/10'
        onClick={async () => {
          const res = await fetch('/api/tweet', {
            body: JSON.stringify({
              id: tweet.id,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'DELETE',
          })

          if (res.status === 401) {
            alert('Unauthorized')
          }
          if (res.status === 200) {
            router.push('/home')
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}
