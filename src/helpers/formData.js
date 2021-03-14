export default function formData(form, data) {
  let forms;
  if (form === 'FormData') {
    forms = new FormData();
  } else {
    forms = new URLSearchParams();
  }
  for (let name in data) {
    console.log(name);
    console.log(data[name]);
    forms.append(name, data[name]);
  }

  return forms;
}
