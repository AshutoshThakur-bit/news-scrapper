import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { registerUser } from '../services/authService';

import { useAuth } from '../context/AuthContext';

const Register = () => {

  const navigate = useNavigate();

  const { login } = useAuth();




  const [formData, setFormData] = useState({
    name: '',
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

      const data = await registerUser(formData);

      login(data);

      navigate('/');

    } catch (error) {

      setError(
        error.response?.data?.message ||
        'Registration failed'
      );

    } finally {

      setLoading(false);
    }
  };




  return (
    <div className="flex justify-center items-center h-screen">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
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
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full border p-3 rounded mb-4"
            value={formData.name}
            onChange={handleChange}
          />



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
                : 'Register'
            }
          </button>

        </form>




        <p className="mt-4 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;