import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full bg-gradient-to-t from-[var(--color-surface-mixed-100)] to-[var(--color-primary-600)]' >
      <header className="flex items-center justify-between px-8 py-3">
        <h1 className="text-black font-bold text-2xl">QuizSpot.ai</h1>
        <div className="rounded-full py-2 px-5  gap-8 bg-[var(--color-primary-300)]">
          <ul className="flex items-center gap-4 text-white">
            <li>Features</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/signin">Log in</Link>
          <Link className="text-[var(--color-primary-100)] border border-[var(--color-primary-100)] px-6 py-1 rounded-full" href="/signup">
            Join
          </Link>
        </div>
      </header>
      <div className='w-full h-screen' >

      </div>
    </div>
  )
}
