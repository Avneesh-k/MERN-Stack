import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function About() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(currentUser.avatar);
  const [uploading, setUploading] = useState(false);

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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
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
        <input className='border p-3 rounded-lg' type='text' placeholder='username' id='username' />
        <input className='border p-3 rounded-lg' type='email' placeholder='email' id='email' />
        <input className='border p-3 rounded-lg' type='password' placeholder='password' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
}
