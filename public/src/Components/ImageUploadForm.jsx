import React, { useState } from "react";
import axios from "axios";

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?expiration=600&key=45453fa81d2b2102a03945185300b1c6",
          formData
        );

        setImageUrl(response.data.data.url);
        // Puedes hacer lo que quieras con la URL, como mostrarla en tu interfaz de usuario.
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Subir imagen</button>

      {imageUrl && (
        <div>
          <p>URL de la imagen:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
