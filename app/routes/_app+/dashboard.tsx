import LogoutButton from '~/components/logoutButton'

export default function Dashboard() {
  return (
    <div className='bg-slate-900 rounded-lg p-4 m-2 flex-1'>
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  )
}
