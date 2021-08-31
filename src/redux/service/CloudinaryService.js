import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
import { config } from '../../config/config';
import { CommonUtils } from '../../utils/apiCallerUtils';

const url = (publicId, options) => {
    try {
        const scOptions = Util.withSnakeCaseKeys(options);
        const cl = CoreCloudinary.new();
        return cl.url(publicId, scOptions);
    } catch (e) {
        console.error(e);
        return null;
    }
};

const openUploadWidget = (options, callback) => {
    window.cloudinary.openUploadWidget(options, callback);
};

const fetchPhotos = cloudName => {
    // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
    // and simply retrieve a list of all images with that tag.
    // the version property is used for cache bust (lists are cached by the CDN for 1 minute)
    // *************************************************************************
    // Note that this practice is DISCOURAGED in production code and is here
    // for demonstration purposes only
    // *************************************************************************
    const options = {
        cloudName: cloudName,
        format: 'json',
        type: 'list',
        version: Math.ceil(new Date().getTime() / 1000),
    };

    const urlPath = url('myphotoalbum', options);

    return fetch(urlPath)
        .then(res => res.text())
        .then(text => (text ? JSON.parse(text).resources : []));
};

const uploadPhoto = (file) =>{
    const url = `https://api.cloudinary.com/v1_1/${config.cloudinaryConfig.cloud_name}/image/upload`
    const formData = new FormData()
    formData.append("file",file)
    formData.append("upload_preset",config.cloudinaryConfig.upload_preset)
    const requestOptions = {
        method: 'POST',
        //headers: { "content-type": "multipart/form-data" },
        body:formData
    };

    return fetch(url,requestOptions)
            .then(CommonUtils.handleResponse)
            .then(payload=>{
                return payload
            })
}

export const cloudinarySerevice = {
    url,
    openUploadWidget,
    fetchPhotos,
    uploadPhoto
}