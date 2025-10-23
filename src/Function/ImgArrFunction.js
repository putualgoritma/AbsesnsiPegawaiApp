import {launchCamera} from 'react-native-image-picker';

const getImageArr = (images, setImages, i) => {
  launchCamera(
    {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 500,
      maxWidth: 500,
      cameraType: 'front',
    },
    response => {
      // console.log('ini respon', response);
      if (response.assets) {
        let image = response.assets[0];
        if (i != null) {
          let ArrImg = [...images];
          console.log('arrrimg', ArrImg);
          ArrImg[i] = {
            name: 'image[]',
            filename: image.fileName,
            data: image.base64,
            uri: image.uri,
          };
          setImages(ArrImg);
        } else {
          console.log('sampai disini');
          setImages([
            ...images,
            {
              name: 'image[]',
              filename: image.fileName,
              data: image.base64,
              uri: image.uri,
            },
          ]);
          console.log('sampai disini 2');
        }
      }
    },
  );
};

const deleteImage = (images, setImages, i) => {
  console.log('hshjdkd', images.length);
  if (i > 1) {
    if (i === images.length) {
      const lastIndex = images.length - 1;
      setImages(images.filter((item, index) => index !== lastIndex));
    } else {
    }
  }
};

const resetImage = (images, setImages) => {
  if (images.length > 0) {
    setImages([]);
  }
};

const ImgArrFunction = {
  getImageArr,
  deleteImage,
  resetImage,
};

export default ImgArrFunction;
