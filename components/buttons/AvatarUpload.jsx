import React, {useEffect} from 'react';
import { Button } from '@mui/material';
import loadImage from 'blueimp-load-image';
import "./imageupload.css"
export default function AvatarUpload({ setImageBase64, imageBase64 }) {
  const targetWidth = 300; // Target resize width
  const targetHeight = 300; // Target resize height

  useEffect(()=>{
    setImageBase64(null);
},[])

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    loadImage(
      file,
      (canvas) => {
        const resizedImageBase64 = canvas.toDataURL('image/jpeg');
        setImageBase64(resizedImageBase64);
      },
      {
        maxWidth: targetWidth,
        maxHeight: targetHeight,
        canvas: true,
        cover: true,
        crop: true,
      }
    );
  }
};

  return (
    <div className='imageUploadBtnAndPic'>
        <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="image">
        <Button variant="contained" component="span">
         Add Profile Picture 
        </Button>
      </label>
      </div>
      {/* <div> */}
      {imageBase64 && <img src={imageBase64} alt='test' className='imgInForm'/> }
     
      {/* </div> */}
    </div>
  );
}
