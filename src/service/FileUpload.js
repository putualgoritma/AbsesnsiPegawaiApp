import RNFetchBlob from 'react-native-blob-util';
import {RootPath} from './Config';
const FileUpload = (url, data) => {
  const promise = new Promise((resolve, reject) => {
    RNFetchBlob.fetch(
      'POST',
      RootPath + url,
      {
        //   Authorization: `Bearer ${TOKEN}`,
        otherHeader: 'foo',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data,
    )
      .then(result => {
        resolve(result.data);
        console.log(result.data);
      })
      .catch(e => {
        reject(e);
      });
  });
  return promise;
};

export default FileUpload;
