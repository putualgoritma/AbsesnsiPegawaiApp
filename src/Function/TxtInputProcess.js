const TxtInputProcess = (setForm, form, type, value) => {
  if (type == 'email') {
    setForm({...form, email: value});
  } else if (type == 'password') {
    setForm({...form, password: value});
  } else if (type == 'description') {
    setForm({...form, description: value});
  } else if (type == 'search') {
    setForm({...form, search: value});
  }
  // console.log(form);
};

export default TxtInputProcess;
