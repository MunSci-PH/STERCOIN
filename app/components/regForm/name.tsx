interface IContainerProps {
  registerFunc: Function;
}

const NameInput: React.FC<IContainerProps> = (props) => {
  return (
    <div className="flex items-end">
      <div>
        <label htmlFor="fname" className="label">
          <span className="label-text text-sm md:text-base">
            First Name (With Extension) <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="Juan Jr."
          className="input input-bordered w-full max-w-xs"
          pattern=".{1,15}"
          title="Only accepts alphabet letters."
          id="fname"
          required
          {...props.registerFunc("fname", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="mname" className="label">
          <span className="text-base label-text">
            Middle Name <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="Martinez"
          className="input input-bordered w-full max-w-xs"
          pattern=".{1,15}"
          title="Only accepts alphabet letters."
          id="mname"
          required
          {...props.registerFunc("mname", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="lname" className="label">
          <span className="text-base label-text">
            Last Name <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="Dela Cruz"
          className="input input-bordered w-full max-w-xs"
          pattern=".{1,15}"
          title="Only accepts alphabet letters."
          id="lname"
          required
          {...props.registerFunc("lname", { required: true })}
        />
      </div>
    </div>
  );
};

export default NameInput;
