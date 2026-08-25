import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Unable to log out right now.');
        }
    }
    return (
        <header className='border-b border-slate-100 bg-white'>
            <div className='mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3'>
                <Link to="/" className='text-2xl font-bold tracking-tight' aria-label="Vingo home">
                    V<span className='text-[#6A38C2]'>ingo</span>
                </Link>
                <div className='flex items-center gap-4 sm:gap-8'>
                    <nav aria-label="Main navigation">
                        <ul className='flex items-center gap-3 text-sm font-medium text-slate-600 sm:gap-6'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li><Link className="hover:text-[#6A38C2]" to="/admin/companies">Companies</Link></li>
                                        <li><Link className="hover:text-[#6A38C2]" to="/admin/jobs">Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link className="hover:text-[#6A38C2]" to="/">Home</Link></li>
                                        <li><Link className="hover:text-[#6A38C2]" to="/jobs">Jobs</Link></li>
                                        <li><Link className="hover:text-[#6A38C2]" to="/browse">Browse</Link></li>
                                    </>
                                )
                            }
                        </ul>
                    </nav>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="px-3">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] px-3 hover:bg-[#5b30a6]">Sign up</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        <AvatarFallback>{user?.fullname?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                <AvatarFallback>{user?.fullname?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </header>
    )
}

export default Navbar