import Image from 'next/image'
import Link from 'next/link'
import timeago from 'lib/timeago'

export default function Tweet({ tweet, nolink }) {
  return (
    <div className='flex gap-3 border-b border-gray-800 px-4 py-3 transition-colors hover:bg-white/[0.03]'>
      <div className='flex-shrink-0'>
        {tweet.author.image ? (
          <Image
            className='h-10 w-10 rounded-full'
            src={tweet.author.image}
            alt=''
            width={40}
            height={40}
          />
        ) : (
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm font-bold uppercase'>
            {tweet.author.name?.[0] ?? '?'}
          </div>
        )}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='flex items-center gap-1 truncate'>
          <Link href={`/${tweet.author.name}`}>
            <span className='font-bold hover:underline'>
              {tweet.author.name}
            </span>
          </Link>

          <span className='text-gray-500'>·</span>

          {nolink ? (
            <span className='text-gray-500'>
              {timeago.format(new Date(tweet.createdAt))}
            </span>
          ) : (
            <Link
              href={`/${tweet.author.name}/status/${tweet.id}`}
              className='text-gray-500 hover:underline'
            >
              {timeago.format(new Date(tweet.createdAt))}
            </Link>
          )}
        </p>

        <p className='whitespace-pre-wrap break-words text-[15px] leading-normal'>
          {tweet.content}
        </p>
      </div>
    </div>
  );
}