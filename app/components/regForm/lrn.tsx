interface IContainerProps {
  registerFunc: Function;
}

const LRNInput: React.FC<IContainerProps> = (props) => {
  return (
    <div>
      <label htmlFor="lrn" className="label">
        <span className="text-base label-text">
          LRN <span className="text-red-600">*</span>
        </span>
      </label>
      <input
        type="text"
        placeholder="305469••••••"
        className="input input-bordered w-full"
        pattern="[0-9]{12}"
        title="Only accepts digits (0-9) and only 12 characters."
        id="lrn"
        required
        {...props.registerFunc("lrn", { required: true })}
      />
    </div>
  );
};

export default LRNInput;
