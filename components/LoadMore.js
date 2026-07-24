export default function LoadMore({ tweets, setTweets }) {
    if (!tweets || tweets.length === 0) return null

    return (
      <div className='flex justify-center border-b border-gray-800 py-4'>
        <button
          className='rounded-full border border-gray-700 px-6 py-2 font-bold text-sky-500 transition-colors hover:bg-sky-500/10'
          onClick={async () => {
            const lastTweetId = tweets[tweets.length - 1].id
            const res = await fetch(`/api/tweets?take=2&cursor=${lastTweetId}`)
            const data = await res.json()
            setTweets([...tweets, ...data])
        }}
        >
          Load more
        </button>
      </div>
    )
  }