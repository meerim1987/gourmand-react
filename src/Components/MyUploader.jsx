import React, { useState, useEffect } from 'react';
import { useFetch } from '../utils/useFetch';
import { DELETE_TEMP_UPLOAD, getUrl } from '../constants/url';
import { PARAM_ID } from '../constants/routes';
import { Helmet } from 'react-helmet';



// Custom images uploader 
const MAX_ALLOWED = 10;
const UPLOADS_URL = '/recipe/temp-uploads';

export const MyUploader = (props) => {
  const [btnDisabled, setBtnDisable] = useState(false);
  const [fileList, uploadFileList] = useState([]);

  const handleFilesCount = () => {
    if (fileList.length >= MAX_ALLOWED) {
      window.toaster.addMessage('You can upload maximum 10 pictures!', 'info');
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  };

  useEffect(() => {
    if (props.makeFilesEmpty) {
      uploadFileList([]);
    }
  }, [props.makeFilesEmpty]);

  const { data } = useFetch(UPLOADS_URL, false, { credentials: 'include' });

  useEffect(() => {
    if (Array.isArray(data)) {
      uploadFileList([...fileList, ...data]);
      if (props.onFileListUpdate) {
        props.onFileListUpdate(data);
      }
    }
  }, [data]);

  useEffect(() => {
    handleFilesCount();
  }, [fileList]);

  const getName = (url) => {
    const split = url.split('/');
    return split[split.length - 1];
  };

  const handleFiles = async (e) => {
    const data = new FormData();
    for (const file of e.target.files) {
      data.append('imageList[]', file, file.name);
    }

    const rawResponse = await fetch(props.url, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    try {
      if (rawResponse.ok) {
        const response = await rawResponse.json();
        const container = [];
        response.forEach((url) => container.push(url));
        uploadFileList([...container, ...fileList]);
        props.onFileListUpdate([...container, ...fileList]);
      }
    } catch (err) {
      console.error(err);
      window.toaster.addMessage(err.message, 'info');
    }
  };

  const handleDeleteImage = async (url) => {
    const id = url.split('/').pop().split('.')[0].substr(5);
    const response = await fetch(getUrl(DELETE_TEMP_UPLOAD, new Map([[PARAM_ID, id]])), {
      credentials: 'include',
    });
    if (response.ok) {
      const list = fileList.filter((el) => el !== url);
      uploadFileList([...list]);
      props.onFileListUpdate(list);
    }
  };

  return (
    <div className={btnDisabled ? 'disabled' : ''}>
      <Helmet>
        <link rel="stylesheet" href="/assets/files_uploader.css" />
      </Helmet>
      <div className="upload-btn-wrapper" style={{ display: btnDisabled ? 'none' : 'block' }}>
        <button style={{ borderColor: `${props.color}` }} className="btn-upload">
          {props.label}
        </button>
        <input type="file" multiple id="filesInput" name="filesInput" accept="image/*" onChange={handleFiles} />
      </div>
      <ul className="image-preview-cont">
        {fileList.length
          ? fileList.map((url, i) => (
              <li key={i} className="image-preview">
                <a onClick={() => handleDeleteImage(url)}>x</a>
                <div className="item-image" style={{ backgroundImage: `url(${url})` }} />
                <span className="label">{getName(url)}</span>
              </li>
            ))
          : ''}
      </ul>
    </div>
  );
};
