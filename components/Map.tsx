import React from "react";

const Map: React.FC = () => {
  return (
    <div className="map-container">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d24315.005989466437!2d49.8470039!3d40.3783641!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2saz!4v1716639172007!5m2!1sen!2saz"
        width="300"
        height="200"
        style={{ border: 0 , borderRadius:"2%"}}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
