import LogoutButton from '~/components/logoutButton'

export default function Dashboard() {
  return (
    <div className="m-2 flex-1 rounded-lg bg-slate-800 p-4">
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  )
}
