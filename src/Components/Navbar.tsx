import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IUser } from '../Interfaces/Users'

const Navbar = ({ user, setUser }: { user: IUser | null, setUser: Function }) => {

    const navigate = useNavigate();

    console.log('User in the navbar', user)

    function logout() {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/')
    }


    return (
        <header>
            <nav>
                <div>
                    <div>
                        <Link to='/'>
                            Home
                        </Link>
                    </div>
                    <div>
                        <Link to='/recipes'>
                            Recipes
                        </Link>
                    </div>
                    <div>
                        <Link to='/login'>
                            Login
                        </Link>
                    </div>
                    <div>
                        <Link to='/signup'>
                            Signup
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar