import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import RHFTextField from "../../components/RHFTextField";
import FormProvider from "../../components/FormProvider";
import Label from "../../components/Label";
import RHFButton from "../../components/RHFButton";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const FormDetailsSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("password is required"),
  });

  let defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(FormDetailsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = (values: FormValues) => {};

  return (
    <div>
      <FormProvider<FormValues>
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <Label title="email" mandatory={true} />
          <RHFTextField type="text" name="email" className="form-control" />
        </div>
        <div>
          <Label title="password" mandatory={true} />
          <RHFTextField type="text" name="password" className="form-control" />
        </div>
        <div>
          <RHFButton label="Login" />
        </div>
      </FormProvider>
    </div>
  );
};

export default Login;
