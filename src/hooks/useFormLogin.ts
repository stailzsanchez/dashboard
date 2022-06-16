import { ChangeEvent, ChangeEventHandler, useState } from 'react';

type FormLoginType = {
  email: string;
  password: string;
};

export const useForm = (initialValues: FormLoginType) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setForm((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    form,
  };
};
