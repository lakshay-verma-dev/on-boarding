'use client'
import { useState, useEffect } from 'react'
import { LayoutDashboard, CheckSquare, Clock, LogOut, Bell, Search, Activity, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { toast } from 'sonner'

export default function EmployeeDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [attendance, setAttendance] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [elapsed, setElapsed] = useState('00:00:00')
  const [isClocking, setIsClocking] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchAttendance()
    }
  }, [status, router])

  const fetchAttendance = async () => {
    try {
      const res = await fetch('/api/attendance/clock')
      const data = await res.json()
      if (res.ok) {
        setAttendance(data.today)
        setHistory(data.history || [])
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Failed to fetch attendance')
    } finally {
      setLoading(false)
    }
  }

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (attendance && attendance.clockIn && !attendance.clockOut) {
      interval = setInterval(() => {
        const start = dayjs(attendance.clockIn)
        const now = dayjs()
        const diff = now.diff(start)
        const d = dayjs(diff).add(new Date().getTimezoneOffset(), 'minute') // adjust for local tz zero
        setElapsed(d.format('HH:mm:ss'))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [attendance])

  const handleClockAction = async () => {
    setIsClocking(true)
    try {
      const res = await fetch('/api/attendance/clock', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setAttendance(data.attendance)
        if (data.attendance.clockOut) {
          toast.success('Successfully clocked out!')
        } else {
          toast.success('Successfully clocked in!')
        }
      } else {
        toast.error(data.error || 'Failed to clock action')
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setIsClocking(false)
    }
  }

  if (loading || status === 'loading') {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50"><Activity className="animate-spin text-emerald-600" /></div>
  }

  const isClockedIn = attendance && attendance.clockIn && !attendance.clockOut;
  const isClockedOut = attendance && attendance.clockOut;

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <h2 className="text-xl font-black text-emerald-600 tracking-wider uppercase">Employee<span className="text-slate-800">Portal</span></h2>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/employee" className="flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-medium transition-colors">
            <LayoutDashboard size={20} /> My Dashboard
          </Link>
          <Link href="/employee/tasks" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <CheckSquare size={20} /> My Tasks
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <button onClick={() => signOut({ callbackUrl: '/' })} className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
                {session?.user?.name?.charAt(0) || 'E'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{session?.user?.name || 'Employee'}</span>
                <span className="text-xs text-slate-400 leading-none">Employee</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="p-8 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Welcome back, {session?.user?.name?.split(' ')[0] || 'Employee'}!</h1>
            
            <button 
              onClick={handleClockAction}
              disabled={isClockedOut || isClocking}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                isClockedOut ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 
                isClockedIn ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse' : 
                'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Clock size={18} /> 
              {isClocking ? 'Processing...' : 
               isClockedOut ? 'Clocked Out' : 
               isClockedIn ? `Clock Out (${elapsed})` : 
               'Clock In Now'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-slate-500 font-medium mb-2">Today's Status</span>
              <span className={`text-3xl font-bold ${isClockedIn ? 'text-amber-500' : isClockedOut ? 'text-blue-500' : 'text-slate-800'}`}>
                {isClockedIn ? 'Active / Working' : isClockedOut ? 'Finished Shift' : 'Not Clocked In'}
              </span>
              {attendance?.clockIn && <span className="text-slate-400 text-sm font-medium mt-2">Started at {dayjs(attendance.clockIn).format('hh:mm A')}</span>}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-slate-500 font-medium mb-2">Hours Logged Today</span>
              <span className="text-3xl font-bold text-emerald-600">
                {isClockedIn ? elapsed : isClockedOut ? `${attendance?.totalHours}h` : '0h'}
              </span>
              {isClockedOut && attendance?.clockOut && <span className="text-slate-400 text-sm font-medium mt-2">Ended at {dayjs(attendance.clockOut).format('hh:mm A')}</span>}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-slate-500 font-medium mb-2">Next Meeting</span>
              <span className="text-xl font-bold mt-1">Standup Sync</span>
              <span className="text-slate-500 text-sm font-medium mt-1 flex items-center gap-1">
                <Calendar size={14} /> Today, 10:00 AM
              </span>
            </div>
          </div>
          
          {/* Recent History Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={20} className="text-slate-400"/> Last 7 Days Attendance</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 rounded-tl-lg">Date</th>
                    <th className="px-6 py-3">Clock In</th>
                    <th className="px-6 py-3">Clock Out</th>
                    <th className="px-6 py-3">Total Hours</th>
                    <th className="px-6 py-3 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 ? history.map((record) => (
                    <tr key={record._id} className="bg-white border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{dayjs(record.date).format('MMM D, YYYY')}</td>
                      <td className="px-6 py-4">{record.clockIn ? dayjs(record.clockIn).format('hh:mm A') : '-'}</td>
                      <td className="px-6 py-4">{record.clockOut ? dayjs(record.clockOut).format('hh:mm A') : '-'}</td>
                      <td className="px-6 py-4 font-semibold text-emerald-600">{record.totalHours ? `${record.totalHours}h` : '-'}</td>
                      <td className="px-6 py-4 capitalize">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${record.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400">No attendance records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </main>

    </div>
  )
}
