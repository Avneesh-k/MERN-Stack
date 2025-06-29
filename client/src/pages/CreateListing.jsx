import React, { useState } from 'react'

function CreateListing() {
  const [files, setfiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (files.length > 0 && files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      try {
        const imageUrls = await Promise.all(promises);
        setImageUrls(imageUrls);
        console.log('Uploaded image URLs:', imageUrls); // You can use these URLs as needed
        alert("Images uploaded successfully!");
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Image upload failed!");
      }
    } else {
      alert("Please select 1 to 6 images.");
    }
  };

  const storeImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Listing_image'); // Replace with your unsigned preset
    formData.append('cloud_name', 'dnqmccbrp'); // Optional if URL includes cloud name

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dnqmccbrp/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      throw new Error("Cloudinary Upload Error: " + err.message);
    }
  };

  const handleDeleteImage = (indexToRemove) => {
    setImageUrls(prevUrls => prevUrls.filter((_, index) => index !== indexToRemove));
  };


  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className='flex flex-col gap-4 flex-1'>
          <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
          <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required />
          <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='name' required />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type="checkbox" id='sale' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='parking' className='w-5' />
              <span>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='offer' className='w-5' />
              <span>offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className="flex items-center gap-2">
              <input className='p-3 border border-gray-300 rounded-lg' type="number" id="bedrooms" min="1" max="10" required />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input className='p-3 border border-gray-300 rounded-lg' type="number" id="bathrooms" min="1" max="10" required />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input className='p-3 border border-gray-300 rounded-lg' type="number" id="regularPrice" min="1" max="10" required />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs'>(₹ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input className='p-3 border border-gray-300 rounded-lg' type="number" id="discountPrice" min="1" max="10" required />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>(₹ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The First image will be the cover (max 6MB)</span>
          </p>
          <div className="flex gap-4">
            <input onChange={(e) => setfiles(Array.from(e.target.files))} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button type="button" onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>

          </div>
          {/* Show uploaded images */}
          <div className='flex flex-wrap gap-3 mt-4'>
            {imageUrls.map((url, index) => (
              <div key={index} className='relative'>
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className='w-24 h-24 object-cover border rounded'
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className='absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                  title="Delete Image"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>


          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing
