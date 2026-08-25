import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' })
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
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex max-w-7xl justify-center px-4 py-12">
        <form onSubmit={submitHandler} className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="mb-1 text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mb-6 text-sm text-slate-500">Log in to continue to Vingo.</p>
          <div className="my-4">
            <Label htmlFor="login-email">Email</Label>
            <Input id="login-email" type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="you@example.com" required />
          </div>
          <div className="my-4">
            <Label htmlFor="login-password">Password</Label>
            <Input id="login-password" type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter your password" required />
          </div>
          <Label className="mb-3">Continue as</Label>
          <RadioGroup className="mb-6 flex gap-5">
            {['student', 'recruiter'].map((role) => (
              <label key={role} className="flex items-center gap-2 text-sm capitalize">
                <Input type="radio" name="role" value={role} checked={input.role === role} onChange={changeEventHandler} required />
                {role}
              </label>
            ))}
          </RadioGroup>
          <Button type="submit" disabled={loading} className="w-full bg-[#6A38C2] hover:bg-[#582ca8]">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Please wait' : 'Log in'}
          </Button>
          <p className="mt-5 text-center text-sm text-slate-600">Need an account? <Link to="/signup" className="font-semibold text-[#6A38C2] hover:underline">Sign up</Link></p>
        </form>
      </main>
    </div>
  )
}

export default Login
