import Link from 'next/link'

export default function PageContainer({ title, showHomeLink = true, children }) {
  return (
    <div className='mx-auto min-h-screen w-full max-w-xl border-x border-gray-800'>
      {title && (
        <h1 className='sticky top-0 z-10 flex items-center gap-4 border-b border-gray-800 bg-black/80 px-4 py-3 text-xl font-extrabold backdrop-blur'>
          {showHomeLink && (
            <Link
              href='/home'
              className='rounded-full p-2 -m-2 transition-colors hover:bg-white/10'
              aria-label='Home'
            >
              ←
            </Link>
          )}
          {title}
        </h1>
      )}
      {children}
    </div>
  )
}
