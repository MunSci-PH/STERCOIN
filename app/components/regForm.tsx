import { createClient } from "@/utils/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Database } from "../../supabase.types";

const supabase = createClient();

export type FormData = {
  lrn: number;
  fname: string;
  mname: string;
  lname: string;
  grade: string;
  section: string;
  pwd: boolean;
  birthday: Date;
  address: string;
  e1Name: string;
  e1Num: number;
  e1FB: string;
  e2Name: string;
  e2Num: number;
  e2FB: string;
  e3Name: string;
  e3Num: number;
  e3FB: string;
};

const Form = () => {
  const [isDisable, setDisable] = useState(true);
  const [selectedSections, setList] = useState<string[]>([]);
  const [isError, setError] = useState(false);
  const [isDarkTheme, setTheme] = useState(false);
  const { register, handleSubmit, watch } = useForm<FormData>();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }, []);

  const onSubmit = (formData: FormData) => {
    if (formData.grade === null) {
      console.error("Grade cannot be null.");
      toast("Grade cannot be empty.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setError(true);
      return;
    }
    if (formData.grade === null) {
      console.error("Section cannot be null.");
      toast("Section cannot be empty.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setError(true);
      return;
    }

    toast("Successfully submitted.", {
      theme: isDarkTheme ? "dark" : "light",
      autoClose: 2000,
      type: "success",
    });
    console.log(formData);
  };

  const handleChange = async (e: { target: { value: number } }) => {
    const { data: sections, error } = await supabase
      .from("sections")
      .select()
      .eq("grade", e.target.value);
    const list = sections?.map((e) => e.sectionName);

    console.log(e.target.value, list);
    //@ts-expect-error
    setList(list);

    if (e.target.value >= 7) {
      setDisable(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-control space-y-4">
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
          {...register("lrn", { required: true })}
        />
      </div>
      <hr />
      <div className="flex items-end">
        <div>
          <label htmlFor="fname" className="label">
            <span className="label-text text-sm md:text-base">
              First Name (With Extension){" "}
              <span className="text-red-600">*</span>
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
            {...register("fname", { required: true })}
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
            {...register("fname", { required: true })}
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
            {...register("lname", { required: true })}
          />
        </div>
      </div>
      <div className="flex justify-around w-full">
        <div className="flex justify-around">
          <select
            className="select select-bordered w-full max-w-s"
            id="grade"
            defaultValue="none"
            required
            {...register("grade", {
              onChange: (e) => {
                handleChange(e);
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
            disabled={isDisable}
            required
            {...register("section", { required: true })}
          >
            <option value="none" disabled>
              Section
            </option>
            {selectedSections.map((option) => (
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
            {...register("pwd")}
          />
          <label htmlFor="pwd" className="label">
            <span className="text-base label-text">
              Are you a person with a disability?
            </span>
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="bday" className="label">
          <span className="text-base label-text">
            Birthday <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="date"
          className="input input-bordered w-full"
          id="bday"
          min="2000-01-01"
          max="2015-12-31"
          required
          {...register("birthday", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="address" className="label">
          <span className="text-base label-text">
            Full Address (Street Name, Barangay, City, Zip Code){" "}
            <span className="text-red-600">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="999 Buendia St., Tunasan, Muntinlupa, 1774"
          className="input input-bordered w-full"
          id="address"
          required
          {...register("address", { required: true })}
        />
      </div>
      <hr />
      <div>
        <p className="text-l text-left prose">
          Emergency Contact 1 <span className="text-red-600">*</span>
        </p>
        <div>
          <label htmlFor="ec1name" className="label">
            <span className="text-base label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Emergency Contact 1"
            className="input input-bordered w-full"
            pattern=".{1,30}"
            title="Only accepts up to 30 characters."
            id="ec1name"
            required
            {...register("e1Name", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="ec1num" className="label">
            <span className="text-base label-text">Phone Number</span>
          </label>
          <input
            type="tel"
            placeholder="+63••••••••••"
            className="input input-bordered w-full"
            pattern="((^(\+)(\d){12}$)|(^\d{11}$))"
            title="Only accepts the following format: 09151231234 or +6391551231234"
            id="ec1num"
            required
            {...register("e1Num", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="ec1fb" className="label">
            <span className="text-base label-text">
              Facebook Messenger Account
            </span>
          </label>
          <input
            type="text"
            placeholder="Facebook Name"
            className="input input-bordered w-full"
            pattern=".{1,30}"
            title="Only accepts up to 30 characters."
            id="ec1fb"
            required
            {...register("e1FB", { required: true })}
          />
        </div>
      </div>
      <hr />
      <div>
        <p className="text-l text-left prose">
          Emergency Contact 2 <span className="text-red-600">*</span>
        </p>
        <div>
          <label htmlFor="ec2name" className="label">
            <span className="text-base label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Emergency Contact 2"
            className="input input-bordered w-full"
            pattern=".{1,30}"
            title="Only accepts up to 30 characters."
            id="ec2name"
            required
            {...register("e2Name", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="ec2num" className="label">
            <span className="text-base label-text">Phone Number</span>
          </label>
          <input
            type="tel"
            placeholder="+63••••••••••"
            className="input input-bordered w-full"
            pattern="((^(\+)(\d){12}$)|(^\d{11}$))"
            title="Only accepts the following format: 09151231234 or +6391551231234"
            id="ec2num"
            required
            {...register("e2Num", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="ec2fb" className="label">
            <span className="text-base label-text">
              Facebook Messenger Account
            </span>
          </label>
          <input
            type="text"
            placeholder="Facebook Name"
            className="input input-bordered w-full"
            pattern=".{1,30}"
            title="Only accepts up to 30 characters."
            id="ec2fb"
            required
            {...register("e2FB", { required: true })}
          />
        </div>
      </div>
      <hr />
      <div>
        <p className="text-l text-left prose">Emergency Contact 3 (Optional)</p>
        <div>
          <label htmlFor="ec3name" className="label">
            <span className="text-base label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Emergency Contact 3"
            className="input input-bordered w-full"
            pattern=".{1,30}"
            title="Only accepts up to 30 characters."
            id="ec3name"
            {...register("e3Name")}
          />
        </div>
        <div>
          <label htmlFor="ec3num" className="label">
            <span className="text-base label-text">Phone Number</span>
          </label>
          <input
            type="tel"
            placeholder="+63••••••••••"
            className="input input-bordered w-full"
            pattern="((^(\+)(\d){12}$)|(^\d{11}$))"
            title="Only accepts the following format: 09151231234 or +6391551231234"
            id="ec3num"
            {...register("e3Num")}
          />
        </div>
        <div>
          <label htmlFor="ec3fb" className="label">
            <span className="text-base label-text">
              Facebook Messenger Account
            </span>
          </label>
          <input
            type="text"
            placeholder="Facebook Name"
            className="input input-bordered w-full"
            pattern=".{1,30}"
            title="Only accepts up to 30 characters."
            id="ec3fb"
            {...register("e3FB")}
          />
        </div>
      </div>
      <hr />
      <button
        className={isError ? "btn bg-red-700" : "btn bg-blue-700"}
        type="submit"
      >
        Submit
      </button>
      <p className="prose text-xs text-center mx-auto">
        If you are experiencing trouble registering, please contact Sulpicio
        Demontaño IV on Messenger.
      </p>
    </form>
  );
};
export default Form;
