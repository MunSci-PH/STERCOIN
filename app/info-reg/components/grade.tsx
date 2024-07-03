import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "../types";

interface IContainerProps {
  registerFunc: UseFormRegister<IFormInput>;
  onChange: Function;
  disabled: boolean;
  selectedSections: string[];
}

const GradeInput: React.FC<IContainerProps> = (props) => {
  return (
    <div className="flex w-full justify-around">
      <div className="flex justify-around">
        <select
          className="select select-bordered w-full max-w-sm"
          id="grade"
          defaultValue="none"
          {...props.registerFunc("grade", {
            onChange: (e: any) => {
              props.onChange(e);
            },
            required: true,
          })}
        >
          <option value="none" disabled>
            Grade
          </option>
          <option value="7">Grade 7</option>
          <option value="8">Grade 8</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
        </select>
        <select
          className="select select-bordered w-full max-w-xs"
          id="section"
          defaultValue="none"
          {...props.registerFunc("section", {
            required: true,
            disabled: props.disabled,
          })}
        >
          <option value="none" disabled>
            Section
          </option>
          {props.selectedSections.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="pwd"
          className="checkbox"
          {...props.registerFunc("pwd")}
        />
        <label htmlFor="pwd" className="label">
          <span className="label-text text-base">
            Are you a person with a disability?
          </span>
        </label>
      </div>
    </div>
  );
};

export default GradeInput;
