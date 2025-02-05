import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authlogin } from '../store/authslice';
import { Button, Logo, Input } from './index';
import { useDispatch } from 'react-redux';
import authservice from './../Appwrite/auth_service'; 
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authservice.login(data);
      if (session) {
        const userData = await authservice.getCurrentUser();

        if (userData) dispatch(authlogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-2xl text-center font-bold leading-tight">
          Sign in to your account
        </h2>
        <p>
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup" // Corrected this to the correct signup path
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="text-center text-red-600 mt-8">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-3">
            <Input
              label="Email:"
              placeholder="Enter Your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter Your Password"
              {...register('password', {
                required: true,
              })}
            />
            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
