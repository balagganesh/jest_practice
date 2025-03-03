import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phonenumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  Age: yup.number().positive().integer().required("Age is required"),
  Gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"], "Select a valid gender")
    .required("Gender is required"),
  Interest: yup.array().min(1, "Select at least one interest"),
  DateofBirth: yup.date().required("Date of Birth is required"),
});

const SimpleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstname">First Name:</label>
        <input id="firstname" {...register("firstname")} type="text" />
        {errors.firstname && <p>{errors.firstname.message}</p>}

        <label htmlFor="lastname">Last Name:</label>
        <input id="lastname" {...register("lastname")} type="text" />
        {errors.lastname && <p>{errors.lastname.message}</p>}

        <label htmlFor="email">Email:</label>
        <input id="email" {...register("email")} type="email" />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="phonenumber">Phone Number:</label>
        <input id="phonenumber" {...register("phonenumber")} type="text" />
        {errors.phonenumber && <p>{errors.phonenumber.message}</p>}

        <label htmlFor="password">Password:</label>
        <input id="password" {...register("password")} type="password" />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <label htmlFor="Age">Age:</label>
        <input id="Age" {...register("Age")} type="number" />
        {errors.Age && <p>{errors.Age.message}</p>}

        <label>Gender:</label>
        <div>
          <input type="radio" id="male" value="Male" {...register("Gender")} checked/>
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            value="Female"
            {...register("Gender")}
          />
          <label htmlFor="female">Female</label>

          <input
            type="radio"
            id="other"
            value="Other"
            {...register("Gender")}
          />
          <label htmlFor="other">Other</label>
        </div>
        {errors.Gender && <p>{errors.Gender.message}</p>}

        <label>Interests:</label>
        <div>
          <input
            type="checkbox"
            id="sports"
            value="Sports"
            {...register("Interest")}
          />
          <label htmlFor="sports">Sports</label>

          <input
            type="checkbox"
            id="music"
            value="Music"
            {...register("Interest")} checked
          />
          <label htmlFor="music">Music</label>

          <input
            type="checkbox"
            id="reading"
            value="Reading"
            {...register("Interest")}
          />
          <label htmlFor="reading">Reading</label>

          <input
            type="checkbox"
            id="gaming"
            value="Gaming"
            {...register("Interest")}
          />
          <label htmlFor="gaming">Gaming</label>
        </div>
        {errors.Interest && <p>{errors.Interest.message}</p>}

        <label htmlFor="DateofBirth">Date of Birth:</label>
        <input id="DateofBirth" {...register("DateofBirth")} type="date" />
        {errors.DateofBirth && <p>{errors.DateofBirth.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SimpleForm;
