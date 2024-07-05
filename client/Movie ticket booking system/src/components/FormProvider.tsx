import {
  FormProvider as Form,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";

interface FormProviderProps<T extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: (event?: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
  ...props
}: FormProviderProps<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    </Form>
  );
}
