import { createClient } from "@/utils/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LRNInput from "./regForm/lrn";
import NameInput from "./regForm/name";
import GradeInput from "./regForm/grade";
import { storageClient } from "@/utils/storage";
import { Turnstile } from "@marsidev/react-turnstile";

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
  const [isLoading, setLoading] = useState(0);
  const [captchaToken, setCaptchaToken] = useState<string>();
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
    setLoading(1);

    if (!(await verifyCaptcha())) {
      console.error("Captcha is invalid.");
      toast("Captcha is invalid.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setError(true);
      return;
    }

    setLoading(15);

    const formDataFormatted = {
      lrn: formData.lrn,
      firstname: formData.fname.trim(),
      middlename: formData.mname.trim(),
      lastname: formData.lname.trim(),
      grade: formData.grade,
      section: formData.section,
      idpicfile: formData.idpic.item(0)!.name,
      birthday: formData.birthday,
      address: formData.address.trim(),
      ecname1: formData.e1Name.trim(),
      ecfb1: formData.e1FB.trim(),
      ecres1: formData.e1Res.trim(),
      ecnum1: formData.e1Num,
      ecname2: formData.e2Name.trim(),
      ecfb2: formData.e2FB.trim(),
      ecres2: formData.e2Res.trim(),
      ecnum2: formData.e2Num,
      ecname3: formData.e3Name.trim(),
      ecfb3: formData.e3FB.trim(),
      ecres3: formData.e3Res.trim(),
      ecnum3: formData.e3Num,
      pwd: formData.pwd,
    };

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
    setLoading(40);

    await uploadPicture(formData);
    setLoading(70);

    const { data, error } = await supabase
      .from("studentData")
      .insert(formDataFormatted)
      .select();

    if (error) {
      toast(`Error Submitting Form: ${error.code}. ${error.details}`, {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setError(true);
      console.log(error);
    } else {
      setLoading(100);
      toast("Successfully submitted.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "success",
      });
      reset();
    }

    console.log(formData, data);
  };

  const verifyCaptcha = async () => {
    const formData = {
      secret: process.env.CF_SECRET,
      response: captchaToken,
      idempotency_key: crypto.randomUUID(),
    };
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    setLoading(5);

    const firstResult = await fetch(url, {
      body: JSON.stringify(formData),
      method: "POST",
    });
    const firstOutcome = await firstResult.json();
    setLoading(10);
    if (firstOutcome.success) {
      return true;
    }
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
    <>
      {isLoading == 0 || isLoading == 100 ? (
        <></>
      ) : (
        <div className="z-10 bg-opacity-50 bg-black w-full h-full fixed flex">
          <div
            className="radial-progress m-auto"
            style={{ ["--value" as any]: isLoading }}
            role="progressbar"
          >
            {isLoading}%
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control space-y-4 my-12"
      >
        <p className="text-left max-w-screen-md">
          Disclaimer: This form is hosted on a secure server and can only be
          viewed by the school authority. Please feel confident in filling out
          this form, as all of your information will be kept safe with every
          step of the process. This web application respects confidentiality
          agreement.
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
              ID Picture <span className="text-red-600">*</span>
              <p className="text-left">
                - The photo must have a plain white background. <br />- The
                photo must be taken recently <br /> - The photo must be in a 1:1
                aspect ratio (square) <br /> - The student must wear decent
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
              <option value="Legal Guardian">Legal Guardian</option>
              <option value="Relative">Relative</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <p className="text-l text-left prose">
            Emergency Contact 3 (Optional)
          </p>
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
              <option value="Legal Guardian">Legal Guardian</option>
              <option value="Relative">Relative</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="divider"></div>
        <button
          className={
            isError ? "btn text-white bg-error" : "btn text-white bg-info"
          }
          type="submit"
        >
          Submit
        </button>
        <Turnstile
          siteKey="0x4AAAAAAAOMOy_l-B3ae-Jg"
          onSuccess={(token) => {
            setCaptchaToken(token);
          }}
          className="mx-auto"
        />
        <p className="prose text-xs text-center mx-auto">
          If you are experiencing trouble registering, please contact the App
          Developers, Sulpicio Demontaño IV and Addy Suarnaba on Messenger.
        </p>
      </form>
    </>
  );
};
export default Form;
