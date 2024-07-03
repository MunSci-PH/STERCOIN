import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IFormInput } from "../types";

interface IContainerProps {
  registerFunc: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  watch: UseFormWatch<IFormInput>;
}

const AuthInput: React.FC<IContainerProps> = (props) => {
  return (
    <div className="flex w-full min-w-80 max-w-screen-md grow flex-col">
      <label htmlFor="email" className="form-control w-full max-w-xl">
        <label className="label">
          <span className="label-text text-sm md:text-base">
            Email <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="Email"
          className={`input input-bordered w-full ${props.errors.fname ? `input-error` : ``}`}
          id="email"
          required
          {...props.registerFunc("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please input a valid email.",
            },
          })}
        />
        {
          <label className="label">
            <ErrorMessage
              errors={props.errors}
              name="email"
              render={({ message }) => {
                return (
                  <span className="label-text-alt text-error">{message}</span>
                );
              }}
            />
          </label>
        }
      </label>
      <label htmlFor="password" className="form-control w-full max-w-xl">
        <label className="label">
          <span className="label-text text-sm md:text-base">
            Password <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className={`input input-bordered w-full ${props.errors.mname ? `input-error` : ``}`}
          id="password"
          required
          {...props.registerFunc("password", {
            required: true,
            minLength: 8,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Must be atleast eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
            },
          })}
        />
        {
          <label className="label">
            <ErrorMessage
              errors={props.errors}
              name="password"
              render={({ message }) => {
                return (
                  <span className="label-text-alt text-error">{message}</span>
                );
              }}
            />
          </label>
        }
      </label>
      <label htmlFor="confirm" className="form-control w-full max-w-xl">
        <label className="label">
          <span className="label-text text-sm md:text-base">
            Confirm Password <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          className={`input input-bordered w-full ${props.errors.mname ? `input-error` : ``}`}
          id="confirm"
          required
          {...props.registerFunc("confirm", {
            required: true,
            validate: (e) =>
              e === props.watch("password") || "Passwords don't match",
          })}
        />
        {
          <label className="label">
            <ErrorMessage
              errors={props.errors}
              name="confirm"
              render={({ message }) => {
                return (
                  <span className="label-text-alt text-error">{message}</span>
                );
              }}
            />
          </label>
        }
      </label>
    </div>
  );
};

export default AuthInput;
