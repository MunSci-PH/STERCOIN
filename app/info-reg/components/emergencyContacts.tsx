import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IFormInput } from "../form";
import { ErrorMessage } from "@hookform/error-message";

interface IContainerProps {
  registerFunc: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}

const EmergencyContactsInput: React.FC<IContainerProps> = (props) => {
  return (
    <>
      <div className="w-96">
        <p className="prose text-left text-lg">
          Emergency Contact 1 <span className="text-red-600">*</span>
        </p>
        <div>
          <label htmlFor="ec1name" className="label">
            <span className="label-text text-base">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Emergency Contact 1"
            className="input input-bordered w-full"
            id="ec1name"
            required
            {...props.registerFunc("e1Name", {
              required: true,
              minLength: 1,
              maxLength: 30,
              pattern: {
                value: /.{1,30}/,
                message: "Only accepts up to 30 characters.",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="ec1num" className="label">
            <span className="label-text text-base">Phone Number</span>
          </label>
          <input
            type="tel"
            placeholder="+63••••••••••"
            className="input input-bordered w-full"
            id="ec1num"
            required
            {...props.registerFunc("e1Num", {
              required: true,
              pattern: {
                value: /((^(\+)(\d){12}$)|(^\d{11}$))/,
                message:
                  "Only accepts the following format: 09151231234 or +6391551231234",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="ec1fb" className="label">
            <span className="label-text text-base">
              Facebook Messenger Account
            </span>
          </label>
          <input
            type="text"
            placeholder="Facebook Name"
            className="input input-bordered w-full"
            id="ec1fb"
            required
            {...props.registerFunc("e1FB", {
              required: true,
              minLength: 1,
              maxLength: 30,
              pattern: {
                value: /.{1,90}/,
                message: "Only accepts up to 90 characters.",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="ec1res" className="label">
            <span className="label-text text-base">
              Relationship with Emergency Contact
            </span>
          </label>
          <select
            className="select select-bordered w-full max-w-sm"
            id="ec1res"
            defaultValue="parent"
            required
            {...props.registerFunc("e1Res", { required: true })}
          >
            <option value="Parent">Parent</option>
            <option value="Legal Guardian">Legal Guardian</option>
            <option value="Relative">Relative</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="divider"></div>
      <div className="w-96">
        <p className="prose text-left text-lg">
          Emergency Contact 2 <span className="text-red-600">*</span>
        </p>
        <div>
          <label htmlFor="ec2name" className="label">
            <span className="label-text text-base">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Emergency Contact 2"
            className="input input-bordered w-full"
            id="ec2name"
            required
            {...props.registerFunc("e2Name", {
              required: true,
              minLength: 1,
              maxLength: 30,
              pattern: {
                value: /.{1,30}/,
                message: "Only accepts up to 30 characters.",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="ec2num" className="label">
            <span className="label-text text-base">Phone Number</span>
          </label>
          <input
            type="tel"
            placeholder="+63••••••••••"
            className="input input-bordered w-full"
            id="ec2num"
            required
            {...props.registerFunc("e2Num", {
              required: true,
              pattern: {
                value: /((^(\+)(\d){12}$)|(^\d{11}$))/,
                message:
                  "Only accepts the following format: 09151231234 or +6391551231234",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="ec2fb" className="label">
            <span className="label-text text-base">
              Facebook Messenger Account
            </span>
          </label>
          <input
            type="text"
            placeholder="Facebook Name"
            className="input input-bordered w-full"
            id="ec2fb"
            required
            {...props.registerFunc("e2FB", {
              required: true,
              minLength: 1,
              maxLength: 30,
              pattern: {
                value: /.{1,90}/,
                message: "Only accepts up to 90 characters.",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="ec2res" className="label">
            <span className="label-text text-base">
              Relationship with Emergency Contact
            </span>
          </label>
          <select
            className="select select-bordered w-full max-w-sm"
            id="ec2res"
            defaultValue="parent"
            required
            {...props.registerFunc("e2Res", { required: true })}
          >
            <option value="Parent">Parent</option>
            <option value="Legal Guardian">Legal Guardian</option>
            <option value="Relative">Relative</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="divider"></div>
      <div className="w-96">
        <p className="prose text-left text-lg">
          Emergency Contact 3 (Optional)
        </p>
        <div>
          <label htmlFor="ec3name" className="label">
            <span className="label-text text-base">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Emergency Contact 3"
            className="input input-bordered w-full"
            id="ec3name"
            {...props.registerFunc("e3Name", {
              minLength: 1,
              maxLength: 30,
              pattern: {
                value: /.{1,30}/,
                message: "Only accepts up to 30 characters.",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="ec3num" className="label">
            <span className="label-text text-base">Phone Number</span>
          </label>
          <input
            type="tel"
            placeholder="+63••••••••••"
            className="input input-bordered w-full"
            id="ec3num"
            {...props.registerFunc("e3Num", {
              pattern: {
                value: /((^(\+)(\d){12}$)|(^\d{11}$))/,
                message:
                  "Only accepts the following format: 09151231234 or +6391551231234",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="ec3fb" className="label">
            <span className="label-text text-base">
              Facebook Messenger Account
            </span>
          </label>
          <input
            type="text"
            placeholder="Facebook Name"
            className="input input-bordered w-full"
            id="ec3fb"
            {...props.registerFunc("e3FB", {
              minLength: 1,
              maxLength: 30,
              pattern: {
                value: /.{1,90}/,
                message: "Only accepts up to 90 characters.",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="ec3res" className="label">
            <span className="label-text text-base">
              Relationship with Emergency Contact
            </span>
          </label>
          <select
            className="select select-bordered w-full max-w-sm"
            id="ec3res"
            defaultValue="parent"
            required
            {...props.registerFunc("e3Res", { required: true })}
          >
            <option value="Parent">Parent</option>
            <option value="Legal Guardian">Legal Guardian</option>
            <option value="Relative">Relative</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default EmergencyContactsInput;
