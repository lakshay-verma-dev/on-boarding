'use client'
import { useState, useEffect } from 'react'
import { LayoutDashboard, Users, Activity, Bell, Search, LogOut, Package, Settings, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { toast } from 'sonner'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      if ((session.user as any)?.role !== 'admin') {
        router.push('/employee')
        return
      }
      fetchStats()
    }
  }, [status, router, session])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      if (res.ok) {
        setStats(data)
      } else {
        toast.error(data.error || 'Failed to fetch admin stats')
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading || status === 'loading') {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50"><Activity className="animate-spin text-blue-600" /></div>
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1E293B',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: '#F1F5F9' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  const chartData = {
    labels: stats?.chartLabels || [],
    datasets: [
      {
        fill: true,
        label: 'Total Attendance',
        data: stats?.chartData || [],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#2563EB',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2563EB',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <h2 className="text-xl font-black text-blue-600 tracking-wider uppercase">Admin<span className="text-slate-800">Panel</span></h2>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <Users size={20} /> Manage Employees
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <button onClick={() => signOut({ callbackUrl: '/' })} className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
                {session?.user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{session?.user?.name || 'Admin'}</span>
                <span className="text-xs text-slate-400 leading-none">Superadmin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="p-8 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium bg-white px-4 py-2 rounded-xl border border-slate-200">
              <Calendar size={18} /> {dayjs().format('MMMM D, YYYY')}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-slate-500 font-medium mb-2">Total Employees</span>
              <span className="text-3xl font-bold">{stats?.totalUsers || 0}</span>
              <span className="text-emerald-500 text-sm font-medium mt-2 flex items-center gap-1">Registered</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-slate-500 font-medium mb-2">Total Clock-Ins Today</span>
              <span className="text-3xl font-bold">{stats?.totalToday || 0}</span>
              <span className="text-blue-500 text-sm font-medium mt-2 flex items-center gap-1">Present today</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-slate-500 font-medium mb-2">Active Working Now</span>
              <span className="text-3xl font-bold text-amber-500">{stats?.activeSessions || 0}</span>
              <span className="text-slate-400 text-sm font-medium mt-2 flex items-center gap-1">Currently clocked in</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-slate-500 font-medium mb-2">Completed Shifts</span>
              <span className="text-3xl font-bold text-emerald-600">{stats?.completedSessions || 0}</span>
              <span className="text-slate-400 text-sm font-medium mt-2 flex items-center gap-1">Clocked out today</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Activity size={20} className="text-blue-600"/> Weekly Attendance Trend</h2>
              <div className="flex-1 w-full min-h-[300px]">
                {stats?.chartLabels && <Line data={chartData} options={chartOptions} />}
              </div>
            </div>

            {/* Today's Logs */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col max-h-[400px]">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Users size={20} className="text-blue-600"/> Today's Activity</h2>
              <div className="flex-1 overflow-auto pr-2 space-y-4">
                {stats?.todayAttendances?.length > 0 ? stats.todayAttendances.map((record: any) => (
                  <div key={record._id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent border-b-slate-100 last:border-b-transparent">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{record.userId?.name || 'Unknown'}</p>
                      <p className="text-xs text-slate-500 mt-0.5">In: {dayjs(record.clockIn).format('hh:mm A')}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 inline-flex text-xs font-bold rounded-full ${!record.clockOut ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {!record.clockOut ? 'Active' : 'Finished'}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-slate-400 pt-8 text-sm">No activity recorded today yet.</div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  )
}
