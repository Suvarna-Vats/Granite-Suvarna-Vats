import React from "react";

import { Button, Input } from "components/commons";
import { Link } from "react-router-dom";

const Signup = ({
  handleSubmit,
  setName,
  setEmail,
  setPassword,
  loading,
  setPasswordConfirmation,
}) => (
  <div
    className="flex min-h-screen items-center justify-center bg-gray-50
    px-4 py-12 sm:px-6 lg:px-8 "
  >
    <div className="w-full max-w-md">
      <h2
        className="mt-6 text-center text-3xl font-extrabold
        leading-9 text-gray-700"
      >
        Sign Up
      </h2>
      <div className="text-center">
        <Link
          to="/"
          className="mt-2 text-center text-sm font-medium
            text-bb-purple transition duration-150 ease-in-out
            focus:underline focus:outline-none"
        >
          Or Login Now
        </Link>
      </div>
      <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
        <Input
          label="Name"
          placeholder="Oliver"
          onChange={e => setName(e.target.value)}
        />
        <Input
          label="Email"
          placeholder="oliver@example.com"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          placeholder="********"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          label="Password Confirmation"
          placeholder="********"
          type="password"
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
        <Button buttonText="Register" loading={loading} type="submit" />
      </form>
    </div>
  </div>
);

export default Signup;
