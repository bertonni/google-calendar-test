import React from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IAuthContext, IFormInputs } from "../@types/types";
import api from "../assets/api";
import { useAuthContext } from "../contexts/AuthContext";

const schema = yup
  .object({
    title: yup.string().required("field required"),
    description: yup.string(),
    start: yup.date().required("filed required"),
    end: yup.date(),
    location: yup.string(),
    recurrence: yup.string(),
  })
  .required();

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const { loggedUser, accessToken } = useAuthContext() as IAuthContext;

  const onSubmit = async (data: IFormInputs) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const sendData = {
      user: JSON.stringify(loggedUser),
      token: accessToken,
      formData: JSON.stringify(data),
    };

    const res = await api.post("/api/add-event", sendData, config);
    const response = res.data;
    console.log(response);
  };

  return (
    <Layout>
      <div className="h-full flex flex-col gap-6 items-center justify-center px-40">
        <h1 className="text-2xl text-gray-600 font-medium">Add Event</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-1 py-2">
            <input
              className="input"
              autoComplete="off"
              placeholder="title"
              {...register("title")}
            />
            <p className="text-rose-500 text-sm">{errors.title?.message}</p>
          </div>

          <div className="flex flex-col gap-1 py-2">
            <input
              className="input"
              autoComplete="off"
              placeholder="description"
              {...register("description")}
            />
            <p className="text-rose-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          <div className="flex flex-col gap-1 py-2">
            <input
              className="input"
              autoComplete="off"
              placeholder="start"
              {...register("start")}
              type="datetime-local"
            />
            <p className="text-rose-500 text-sm">{errors.start?.message}</p>
          </div>

          <div className="flex flex-col gap-1 py-2">
            <input
              className="input"
              autoComplete="off"
              placeholder="end"
              {...register("end")}
              type="datetime-local"
            />
            <p className="text-rose-500 text-sm">{errors.end?.message}</p>
          </div>

          <div className="flex flex-col gap-1 py-2">
            <input
              className="input"
              autoComplete="off"
              placeholder="location"
              {...register("location")}
            />
            <p className="text-rose-500 text-sm">{errors.location?.message}</p>
          </div>

          <div className="flex flex-col gap-1 py-2">
            <input
              className="input"
              autoComplete="off"
              placeholder="recurrence"
              {...register("recurrence")}
            />
            <p className="text-rose-500 text-sm">
              {errors.recurrence?.message}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <input
              className="input px-4 bg-emerald-400 border-emerald-600 text-white w-32
                cursor-pointer hover:brightness-125"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddEvent;
