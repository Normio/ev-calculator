import LoginButton from '~/components/loginButton'

export default function Login() {
  return (
    <div className="relative z-0 flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-slate-950">
      <h1 className="text-2xl text-white">You need to login to access that page</h1>
      <LoginButton>Login with Google</LoginButton>
    </div>
  )
}
