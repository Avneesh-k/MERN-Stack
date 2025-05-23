import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
          dispatch(signInStart());
          const res = await fetch('/api/auth/signin',
            {
              method:'POST',
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify(formData),
            }
          );
          const data = await res.json();
          if(data.success === false){
            dispatch(signInFailure(data.message))
            return;
          }
          dispatch(signInSuccess(data));
          navigate('/')
        }catch(error){
          dispatch(signInFailure(error.message));
        }
        
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
        <input required className='border p-3 rounded-lg' id='email' type="text" placeholder='Email'onChange={handleChange} />
        <input required className='border p-3 rounded-lg' id='password' type="text" placeholder='Password'onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:80'>{loading ? 'Loading...':'Sign In'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account</p>
        <Link to={"/sign-up"}>
        <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
