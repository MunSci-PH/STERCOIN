import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IFormInput } from "./form";
import { ErrorMessage } from "@hookform/error-message";

interface IContainerProps {
  registerFunc: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}

const LRNInput: React.FC<IContainerProps> = (props) => {
  return (
    <div>
      <label htmlFor="lrn" className="form-control">
        <label className="label">
          <span className="text-base label-text">
            LRN <span className="text-red-600">*</span>
          </span>
          <ErrorMessage
            errors={props.errors}
            name="lrn"
            render={({ message }) => {
              return (
                <span className="label-text-alt text-error">{message}</span>
              );
            }}
          />
        </label>
        <input
          type="text"
          placeholder="305469••••••"
          className={`input input-bordered w-full ${props.errors.lrn ? `input-error` : ``}`}
          id="lrn"
          {...props.registerFunc("lrn", {
            required: { value: true, message: "This field is required." },
            minLength: { value: 12, message: "Must be a valid LRN." },
            maxLength: { value: 12, message: "Must be a valid LRN." },
            pattern: { value: /[0-9]{12}/, message: "Must only use numbers." },
          })}
        />
      </label>
    </div>
  );
};

export default LRNInput;
