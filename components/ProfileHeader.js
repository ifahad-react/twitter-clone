import Image from 'next/image'

export default function ProfileHeader({ name, image, tweetCount }) {
  return (
    <div className='border-b border-gray-800 px-4 py-6'>
      <div className='flex items-center gap-4'>
        {image ? (
          <Image
            className='h-20 w-20 rounded-full border-4 border-black'
            src={image}
            alt=''
            width={80}
            height={80}
          />
        ) : (
          <div className='flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-gray-700 text-2xl font-bold uppercase'>
            {name?.[0] ?? '?'}
          </div>
        )}

        <div>
          <h2 className='text-xl font-extrabold'>{name}</h2>
          <p className='text-gray-500'>@{name}</p>
        </div>
      </div>

      <p className='mt-4 text-sm text-gray-500'>
        {tweetCount} {tweetCount === 1 ? 'Tweet' : 'Tweets'}
      </p>
    </div>
  )
}
