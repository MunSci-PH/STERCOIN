import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IFormInput } from "../types";

interface IContainerProps {
  registerFunc: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}

const NameInput: React.FC<IContainerProps> = (props) => {
  return (
    <div className="flex flex-nowrap items-center">
      <label htmlFor="fname" className="form-control max-w-xs">
        <label className="label">
          <span className="label-text text-sm md:text-base">
            First Name (With Extension) <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="Juan Jr."
          className={`input input-bordered w-full ${props.errors.fname ? `input-error` : ``}`}
          id="fname"
          required
          {...props.registerFunc("fname", {
            required: true,
            minLength: { value: 1, message: "This is a required field." },
            maxLength: {
              value: 30,
              message: "Must not exceed 30 characters.",
            },
            pattern: {
              value: /.{1,30}/,
              message: "Only accepts alphabet letters.",
            },
          })}
        />
        {
          <label className="label">
            <ErrorMessage
              errors={props.errors}
              name="fname"
              render={({ message }) => {
                return (
                  <span className="label-text-alt text-error">{message}</span>
                );
              }}
            />
          </label>
        }
      </label>
      <label htmlFor="mname" className="form-control max-w-xs">
        <label className="label">
          <span className="label-text text-sm md:text-base">Middle Name</span>
        </label>
        <input
          type="text"
          placeholder="Martinez"
          className={`input input-bordered w-full ${props.errors.mname ? `input-error` : ``}`}
          id="mname"
          required
          {...props.registerFunc("mname", {
            minLength: { value: 1, message: "Must be atleast 1 letter long." },
            maxLength: {
              value: 30,
              message: "Must not exceed 30 characters.",
            },
            pattern: {
              value: /.{1,30}/,
              message: "Only accepts alphabet letters.",
            },
          })}
        />
        {
          <label className="label">
            <ErrorMessage
              errors={props.errors}
              name="mname"
              render={({ message }) => {
                return (
                  <span className="label-text-alt text-error">{message}</span>
                );
              }}
            />
          </label>
        }
      </label>
      <label htmlFor="lname" className="form-control max-w-xs">
        <label className="label">
          <span className="label-text text-sm md:text-base">
            Last Name <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="Dela Cruz"
          className={`input input-bordered w-full ${props.errors.lname ? `input-error` : ``}`}
          id="lname"
          required
          {...props.registerFunc("lname", {
            required: true,
            minLength: { value: 1, message: "This is a required field." },
            maxLength: {
              value: 30,
              message: "Must not exceed 30 characters.",
            },
            pattern: {
              value: /.{1,30}/,
              message: "Only accepts alphabet letters.",
            },
          })}
        />
        {
          <label className="label">
            <ErrorMessage
              errors={props.errors}
              name="lname"
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

export default NameInput;
