const getCboxArr = (Cboxs, setCboxs, i, value) => {
  if (Cboxs[i] != null) {
    let ArrImg = [...Cboxs];
    console.log('arrrimg', ArrImg);
    ArrImg[i] = {
      name: 'staff_id[]',
      data: value,
    };
    setCboxs(ArrImg);
  } else {
    console.log('sampai disini');
    setCboxs([
      ...Cboxs,
      {
        name: 'staff_id[]',
        data: value,
      },
    ]);
    console.log('sampai disini 2');
  }
};

const deleteCbox = (data, setData, i) => {
  console.log('hshjdkd', data.length);
  // if (i > 0) {
  // if (i === data.length) {
  const lastIndex = i;
  console.log(data[lastIndex]);
  setData(data.filter((item, index) => index !== lastIndex));
  console.log('data terakhir ', data);

  // return data;

  // } else {
  // }
  // }
};

const resetCbox = (Cboxs, setCboxs) => {
  if (Cboxs.length > 0) {
    setCboxs([]);
  }
};

const CboxArrFunction = {
  getCboxArr,
  deleteCbox,
  resetCbox,
};

export default CboxArrFunction;
