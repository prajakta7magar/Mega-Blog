import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'; 
import authservice from './../Appwrite/auth_service'; 
import { useDispatch } from 'react-redux';
import { login } from '../store/authslice'; 
import { Button, Logo, Input } from './index'; 

function Signup() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); 

  const create = async (data) => {
    setError('');
    try {
      // Create account
      const userData = await authservice.createAccount(data);

      if (userData) {
        // Fetch current user data
        const currentUser = await authservice.getCurrentuser();

        if (currentUser) {
          dispatch(login(currentUser));
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="w-full inline-block max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-2xl text-center font-bold leading-tight">
          Signup to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-8">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              {...register('name', { required: true })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                    'Email address must be valid',
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register('password', { required: true })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
