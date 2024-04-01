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
      <label htmlFor="lrn" className="label">
        <span className="text-base label-text">
          LRN <span className="text-red-600">*</span>
        </span>
      </label>
      <ErrorMessage
        errors={props.errors}
        name="lrn"
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <span key={type} className="indicator-item badge badge-secondary">
              {message}
            </span>
          ))
        }
      />
      <input
        type="text"
        placeholder="305469••••••"
        className="input input-bordered w-full"
        id="lrn"
        {...props.registerFunc("lrn", {
          required: true,
          minLength: { value: 12, message: "Must be 12 characters only." },
          maxLength: { value: 12, message: "Must be 12 characters only." },
          pattern: { value: /[0-9]{12}/, message: "Must only be numbers" },
        })}
      />
    </div>
  );
};

export default LRNInput;
