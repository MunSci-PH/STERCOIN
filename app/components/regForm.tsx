import { createClient } from "@/utils/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LRNInput from "./regForm/lrn";
import NameInput from "./regForm/name";
import GradeInput from "./regForm/grade";
import { storageClient } from "@/utils/storage";

const supabase = createClient();

export type FormData = {
  lrn: number;
  fname: string;
  mname: string;
  lname: string;
  grade: string;
  section: string;
  pwd: boolean;
  idpic: FileList;
  birthday: Date;
  address: string;
  e1Name: string;
  e1Num: number;
  e1FB: string;
  e1Res: string;
  e2Name: string;
  e2Num: number;
  e2FB: string;
  e2Res: string;
  e3Name: string;
  e3Num: number;
  e3FB: string;
  e3Res: string;
};

const Form = () => {
  const [isDisable, setDisable] = useState(true);
  const [selectedSections, setList] = useState<string[]>([]);
  const [isError, setError] = useState(false);
  const [isDarkTheme, setTheme] = useState(false);
  const { reset, register, handleSubmit } = useForm<FormData>();

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

  const onSubmit = async (formData: FormData) => {
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

    await uploadPicture(formData);

    const { data, error } = await supabase
      .from("studentData")
      .insert([
        {
          lrn: formData.lrn,
          firstname: formData.fname,
          middlename: formData.mname,
          lastname: formData.lname,
          grade: formData.grade,
          section: formData.section,
          idpicfile: formData.idpic.item(0)!.name,
          birthday: formData.birthday,
          address: formData.address,
          ecname1: formData.e1Name,
          ecfb1: formData.e1FB,
          ecres1: formData.e1Res,
          ecnum1: formData.e1Num,
          ecname2: formData.e2Name,
          ecfb2: formData.e2FB,
          ecres2: formData.e2Res,
          ecnum2: formData.e2Num,
          ecname3: formData.e3Name,
          ecfb3: formData.e3FB,
          ecres3: formData.e3Res,
          ecnum3: formData.e3Num,
          pwd: formData.pwd,
        },
      ])
      .select();

    if (error) {
      toast(`Error Submitting Form: ${error.code}. ${error.details}`, {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      console.log(error);
    } else {
      toast("Successfully submitted.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "success",
      });
      reset();
    }

    console.log(formData, data);
  };

  const uploadPicture = async (formData: FormData) => {
    const { data, error } = await storageClient
      .from("idpics")
      .upload(
        `${formData.lrn}/${formData.idpic.item(0)!.name}`,
        formData.idpic.item(0)!
      );

    if (error) {
      toast(`Error Uploading Image: ${error.message}.`, {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      console.log(error);
    }
  };

  const handleChange = async (e: { target: { value: number } }) => {
    const { data: sections, error } = await supabase
      .from("sections")
      .select()
      .eq("grade", e.target.value);
    const list = sections
      ?.map((e) => e.sectionName)
      .sort((a, b) => a.localeCompare(b));

    console.log(e.target.value, list);
    //@ts-expect-error
    setList(list);

    if (e.target.value >= 7) {
      setDisable(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-control space-y-4">
      <p className="text-left max-w-screen-md">
        Disclaimer: This form is hosted on a secure server and can only be
        viewed by the school authority. Please feel confident in filling out
        this form, as all of your information will be kept safe with every step
        of the process. This web application respects confidentiality agreement.
      </p>
      <LRNInput registerFunc={register}></LRNInput>
      <div className="divider"></div>
      <NameInput registerFunc={register}></NameInput>
      <GradeInput
        registerFunc={register}
        onChange={handleChange}
        disabled={isDisable}
        selectedSections={selectedSections}
      ></GradeInput>
      <div className="divider"></div>
      <div>
        <label htmlFor="address" className="label">
          <span className="text-base label-text text-left">
            ID Picture
            <span className="text-red-600">*</span>
            <p className="text-left">
              - The photo must have a plain white background. <br />- The photo
              must be taken recently <br /> - The student must wear decent
              attire. Ex. Uniform <br /> - The student must not be wearing
              eyeglasses.
            </p>
          </span>
          <div></div>
        </label>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          accept="image/png, image/jpeg"
          {...register("idpic", { required: true })}
        />
      </div>
      <div className="divider"></div>
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
      <div className="divider"></div>
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
            pattern=".{1,90}"
            title="Only accepts up to 90 characters."
            id="ec1fb"
            required
            {...register("e1FB", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="ec1res" className="label">
            <span className="text-base label-text">
              Relationship with Emergency Contact
            </span>
          </label>
          <select
            className="select select-bordered w-full max-w-s"
            id="ec1res"
            defaultValue="parent"
            required
            {...register("e1Res", { required: true })}
          >
            <option value="Parent">Parent</option>
            <option value="Legal Guardian">Legal Guardian</option>
            <option value="Relative">Relative</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="divider"></div>
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
            pattern=".{1,90}"
            title="Only accepts up to 90 characters."
            id="ec2fb"
            required
            {...register("e2FB", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="ec2res" className="label">
            <span className="text-base label-text">
              Relationship with Emergency Contact
            </span>
          </label>
          <select
            className="select select-bordered w-full max-w-s"
            id="ec2res"
            defaultValue="parent"
            required
            {...register("e2Res", { required: true })}
          >
            <option value="Parent">Parent</option>
            <option value="Relative">Relative</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="divider"></div>
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
            pattern=".{1,90}"
            title="Only accepts up to 90 characters."
            id="ec3fb"
            {...register("e3FB")}
          />
        </div>
        <div>
          <label htmlFor="ec3res" className="label">
            <span className="text-base label-text">
              Relationship with Emergency Contact
            </span>
          </label>
          <select
            className="select select-bordered w-full max-w-s"
            id="ec3res"
            defaultValue="parent"
            required
            {...register("e3Res", { required: true })}
          >
            <option value="Parent">Parent</option>
            <option value="Relative">Relative</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="divider"></div>
      <button
        className={isError ? "btn bg-red-700" : "btn bg-blue-700"}
        type="submit"
      >
        Submit
      </button>
      <p className="prose text-xs text-center mx-auto">
        If you are experiencing trouble registering, please contact the App
        Developers, Sulpicio Demontaño IV and Addy Suarnaba on Messenger.
      </p>
    </form>
  );
};
export default Form;
