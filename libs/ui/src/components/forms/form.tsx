"use client"

import type {
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  Path,
  UnpackNestedValue,
  DeepPartial,
  FieldValues,
} from 'react-hook-form';
import  {ObjectSchema} from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
type ServerErrors<T> = {
  [Property in keyof T]: string;
};
type FormProps<TFormValues extends FieldValues > = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: ObjectSchema<TFormValues>;
  serverError?: ServerErrors<Partial<TFormValues>> | null;
  resetValues?:
    | UnpackNestedValue<TFormValues>
    | UnpackNestedValue<DeepPartial<TFormValues>>
    | null;
  className?: string;
  [key: string]: unknown;
};

export const Form = <
  TFormValues extends Record<string, any> = Record<string, any>
>({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  serverError,
  resetValues,
  ...props
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...(!!validationSchema && { resolver: yupResolver(validationSchema as any) }),
    ...(!!useFormProps && useFormProps),
  });
  useEffect(() => {
    if (serverError) {
      Object.entries(serverError).forEach(([key, value]) => {
        methods.setError(key as Path<TFormValues>, {
          type: 'manual',
          message: value,
        });
      });
    }
  }, [serverError, methods]);

  useEffect(() => {
    if (resetValues) {
      methods.reset(resetValues as any);
    }
  }, [resetValues, methods]);
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate {...props}>
      {children(methods)}
    </form>
  );
};
