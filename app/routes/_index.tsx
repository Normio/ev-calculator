import { redirect, type LoaderFunction, type MetaFunction } from '@remix-run/node'
import Login from '~/components/login'
import { LampContainer } from '~/components/ui/lamp'
import { motion } from 'framer-motion'
import { getSession } from '~/utils/auth'

export const meta: MetaFunction = () => {
  return [{ title: 'EV calculator - Is your EV cheap to drive?' }, { name: 'description', content: 'Welcome to EV calculator' }]
}

export const loader: LoaderFunction = async ({ request }) => {
  const { session } = await getSession(request)

  return session ? redirect('/dashboard') : null
}

export default function Index() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-8 bg-gradient-to-b from-purple-500 to-purple-100 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        <div className="flex flex-col items-center gap-16">
          <span>
            Track your EV&apos;s consumption <br /> the right way
          </span>
          <Login />
        </div>
      </motion.h1>
    </LampContainer>
  )
}
