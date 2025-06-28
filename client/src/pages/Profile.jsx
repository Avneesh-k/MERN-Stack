import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateUserStart,updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function About() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(currentUser.avatar);
  const [uploading, setUploading] = useState(false);
  const [formData,setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const { error } = useSelector((state) => state.user);
 
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload"); // your preset name
    formData.append("folder", "user_profiles"); // optional

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dnqmccbrp/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImage(data.secure_url); // Update profile pic on UI
      console.log("Uploaded Image URL:", data.secure_url);

      // 👉 You can now send `data.secure_url` to your backend to update DB
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };



  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());

    const updatedData = {
      ...formData,
      avatar: image, // ✅ include uploaded image URL
    };

    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData) // ✅ FIXED
    });

    const data = await res.json();
    if (data.success === false) {
      dispatch(updateUserFailure(data.message || 'Update failed'));
      return;
    }

    dispatch(updateUserSuccess(data)); // ✅ updates Redux state
    setUpdateSuccess(true);
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};


const handleDeleteUser = async () =>{
  try{
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE'
    });
    const data = await res.json();
    if (data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data))
  }catch(error){
    dispatch(deleteUserFailure(error.message))
  }
}



const handleSignOut = async() => {
   try{
    dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
   }catch(error){
      dispatch(deleteUserFailure(data.message));
   }
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          onChange={handleFileChange}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          src={image}
          alt='Profile'
          
        />
        {uploading && <p className='text-center text-sm'>Uploading image...</p>}
        <input className='border p-3 rounded-lg' type='text' placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <input className='border p-3 rounded-lg' type='email' placeholder='email' id='email'defaultValue={currentUser.email} onChange={handleChange}/>
        <input className='border p-3 rounded-lg' type='password' placeholder='password' id='password' onChange={handleChange}/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90'>
          Update
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-listing"}> Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700'>{error ? error:'' }</p>
      <p className='text-green-700'>{updateSuccess ? 'User is updated Successfully!':'' }</p>
    </div>
  );
}
