import React, { useState, useEffect } from 'react';

const START_IDX = 0;

// Gallery of images in lightbox

export const ImageGallery = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [currentPic, setCurrentPic] = useState(0);

  const handleSelected = (index) => {
    setCurrentPic(index);
    setShowModal(true);
  };

  const handleClosePopup = () => {
    setShowModal(false);
  };

  const moveForward = () => {
    if (currentPic === pictures.length - 1) {
      return;
    }
    setCurrentPic(currentPic + 1);
  };

  const moveBack = () => {
    if (currentPic === START_IDX) {
      return;
    }
    setCurrentPic(currentPic - 1);
  };

  useEffect(() => {
    setPictures(props.pictures);
  }, []);

  return (
    <div className="gallery-wrap">
      <ul className="gallery-content">
        {pictures.map((el, i) => (
          <li key={i} className={`gallery-item`}>
            <a href="javascript:" onClick={() => handleSelected(i)}>
              <img src={el.photo} />
            </a>
          </li>
        ))}
      </ul>

      <div className={`modal-box${showModal ? ' active' : ''}`}>
        <div className="modal-box-content">
          <div className="close-btn-wrap">
            <span onClick={handleClosePopup}>
              <svg
                fill="white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 512 512"
                xml="preserve"
              >
                <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"></path>
              </svg>
            </span>
          </div>
          <div className="img-wrap">
            <img src={pictures.filter((el, index) => index === currentPic)[0]?.photo} />
          </div>
          <div className="arrows-wrap">
            <div className={`prev-arrow ${currentPic === START_IDX ? 'disabled' : ''} `} onClick={moveBack}>
              <svg
                fill="white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 512 512"
                xml="preserve"
              >
                <path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"></path>
              </svg>
            </div>
            <div className={`next-arrow ${currentPic === pictures.length - 1 ? 'disabled' : ''}`} onClick={moveForward}>
              <svg
                fill="white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 512 512"
                xml="preserve"
              >
                <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"></path>
              </svg>
            </div>
          </div>
          <div className="count-wrap">
            <span>{currentPic + 1}</span> of {pictures.length}
          </div>
        </div>
      </div>
    </div>
  );
};
