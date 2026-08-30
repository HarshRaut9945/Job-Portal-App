import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { BriefcaseBusiness, Eye, EyeOff, GraduationCap, Loader2, LockKeyhole, Mail, Sparkles } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' })
  const [showPassword, setShowPassword] = useState(false)
  const { loading, user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      if (response.data.success) {
        dispatch(setUser(response.data.user))
        toast.success(response.data.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to log in right now.')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50">
      <Navbar />
      <main className="relative isolate mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center justify-center px-4 py-10 sm:py-14">
        <div className="absolute -left-28 top-8 -z-10 h-72 w-72 rounded-full bg-violet-200/60 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 -z-10 h-80 w-80 rounded-full bg-fuchsia-100 blur-3xl" />
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl shadow-violet-950/10 lg:grid-cols-[.9fr_1.1fr]">
          <section className="relative hidden min-h-[590px] overflow-hidden bg-gradient-to-br from-[#432080] via-[#6A38C2] to-[#9c61ee] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-20 -top-16 h-64 w-64 rounded-full border-[32px] border-white/10" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[38px] border-white/10" />
            <div className="relative">
              <div className="mb-8 flex size-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm"><Sparkles className="size-5" /></div>
              <p className="text-sm font-semibold tracking-[0.18em] text-violet-100 uppercase">Vingo careers</p>
              <h2 className="mt-4 max-w-sm text-4xl font-bold leading-tight">Your next great opportunity starts here.</h2>
              <p className="mt-5 max-w-sm text-base leading-7 text-violet-100">Connect with roles and people that move your career forward.</p>
            </div>
            <div className="relative rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm leading-6 text-violet-50">A simpler way to discover the work that feels right for you.</p>
              <p className="mt-3 text-sm font-semibold">- The Vingo community</p>
            </div>
          </section>

          <form onSubmit={submitHandler} className="w-full p-6 sm:p-10 lg:px-14 lg:py-12">
            <div className="mb-8">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold tracking-wide text-[#6A38C2] uppercase lg:hidden"><Sparkles className="size-3.5" /> Vingo careers</span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">Log in to pick up where your career journey left off.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="font-semibold text-slate-700">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input id="login-email" type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="you@example.com" required className="h-11 border-slate-200 pl-10 shadow-none focus-visible:border-[#6A38C2] focus-visible:ring-[#6A38C2]/20" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="login-password" className="font-semibold text-slate-700">Password</Label>
                </div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input id="login-password" type={showPassword ? 'text' : 'password'} name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter your password" required className="h-11 border-slate-200 px-10 shadow-none focus-visible:border-[#6A38C2] focus-visible:ring-[#6A38C2]/20" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-[#6A38C2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2]" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            </div>
            <fieldset className="mt-7">
              <legend className="mb-3 text-sm font-semibold text-slate-700">I'm continuing as a</legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'student', label: 'Student', icon: GraduationCap },
                  { value: 'recruiter', label: 'Recruiter', icon: BriefcaseBusiness },
                ].map(({ value, label, icon: Icon }) => (
                  <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${input.role === value ? 'border-[#6A38C2] bg-violet-50 text-[#582ca8] ring-1 ring-[#6A38C2]' : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50/50'}`}>
                    <input type="radio" name="role" value={value} checked={input.role === value} onChange={changeEventHandler} required className="sr-only" />
                    <span className={`flex size-9 items-center justify-center rounded-lg ${input.role === value ? 'bg-[#6A38C2] text-white' : 'bg-slate-100 text-slate-500'}`}><Icon className="size-4" /></span>
                    <span className="text-sm font-semibold">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <Button type="submit" disabled={loading} className="mt-7 h-11 w-full bg-[#6A38C2] text-sm font-semibold shadow-lg shadow-violet-300/50 transition hover:bg-[#582ca8]">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Signing you in...' : 'Log in to Vingo'}
            </Button>
            <p className="mt-6 text-center text-sm text-slate-600">New to Vingo? <Link to="/signup" className="font-semibold text-[#6A38C2] transition hover:text-[#582ca8] hover:underline">Create an account</Link></p>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
