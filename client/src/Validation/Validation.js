export default function validation(values, avatar, isSignup) {
  const errors = {};
  const email_pattern = /^[^\s@]+@gmail\.com$/;
  const password_pattern = /^.{6,}$/;
  const allowed_file_types = ["image/jpeg", "image/png", "image/gif"];
  const max_file_size = 2 * 1024 * 1024; // 2 MB

  if (isSignup) {
    if (values.name === "") {
      errors.name = "Please enter name";
    }

    
  if (avatar) {
    if (!allowed_file_types.includes(avatar.type)) {
      errors.avatar = "Please upload a valid image (jpg, png, gif)";
    }
    if (avatar.size > max_file_size) {
      errors.avatar = "File size should be less than 2 MB";
    }
  } else {
    errors.avatar = "Please upload an avatar";
  }
  }

  if (values.email === "") {
    errors.email = "Please enter email";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (values.password === "") {
    errors.password = "Please enter password";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Password should be at least 6 characters";
  }


  return errors;
}
