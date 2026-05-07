import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { loginUser } from '../services/authService';

import { useAuth } from '../context/AuthContext';

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();




  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });




  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');




  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError('');

      const data = await loginUser(formData);

      login(data);

      navigate('/');

    } catch (error) {

      setError(
        error.response?.data?.message ||
        'Login failed'
      );

    } finally {

      setLoading(false);
    }
  };




  return (
    <div className="flex justify-center items-center h-screen">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>




        {
          error && (
            <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
              {error}
            </div>
          )
        }




        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded mb-4"
            value={formData.email}
            onChange={handleChange}
          />



          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded mb-4"
            value={formData.password}
            onChange={handleChange}
          />



          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full py-3 rounded"
          >
            {
              loading
                ? 'Loading...'
                : 'Login'
            }
          </button>

        </form>




        <p className="mt-4 text-center">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-500 ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;