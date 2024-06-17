"use client";
import { createClient } from "@/utils/client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LRNInput from "./lrn";
import NameInput from "./name";
import GradeInput from "./grade";
import { storageClient } from "@/utils/storage";
import { Turnstile } from "@marsidev/react-turnstile";
import { QueryData } from "@supabase/supabase-js";
import { TablesInsert } from "../../database.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const supabase = createClient();

export type IFormInput = {
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
  const router = useRouter();
  const [isDisable, setDisable] = useState(true);
  const [selectedSections, setList] = useState<string[]>([]);
  const [isError, setError] = useState(false);
  const [isDarkTheme, setTheme] = useState(false);
  const [isLoading, setLoading] = useState(0);
  const [captchaToken, setCaptchaToken] = useState<string>();
  const [step, setStep] = useState(0);
  const [currentValues, setValues] = useState<IFormInput>();
  const [base64, setBase64] = useState<string>();
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    getFieldState,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>();

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

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setLoading(1);

    setLoading(15);

    if (formData.grade === null) {
      console.error("Grade cannot be null.");
      toast("Grade cannot be empty.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setStep(1);
      setFocus("grade");
      return;
    }
    if (formData.section === null) {
      console.error("Section cannot be null.");
      toast("Section cannot be empty.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setStep(1);
      setFocus("section");
      return;
    }
    setLoading(40);

    const submitData: TablesInsert<"studentData"> = {
      lrn: formData.lrn,
      firstname: formData.fname.trim(),
      middlename: formData.mname.trim(),
      lastname: formData.lname.trim(),
      grade: parseInt(formData.grade),
      section: formData.section,
      idpicfile: formData.idpic.item(0)!.name,
      birthday: new Date(formData.birthday).toDateString(),
      address: formData.address.trim(),
      ecname1: formData.e1Name.trim(),
      ecfb1: formData.e1FB.trim(),
      ecres1: formData.e1Res.trim(),
      ecnum1: formData.e1Num.toString(),
      ecname2: formData.e2Name.trim(),
      ecfb2: formData.e2FB.trim(),
      ecres2: formData.e2Res.trim(),
      ecnum2: formData.e2Num.toString(),
      ecname3: formData.e3Name.trim(),
      ecfb3: formData.e3FB.trim(),
      ecres3: formData.e3Res.trim(),
      ecnum3: formData.e3Num.toString(),
      pwd: formData.pwd,
    };

    const submitQuery = supabase
      .from("studentData")
      .insert(submitData)
      .select();

    const { data, error } = await submitQuery;

    await uploadPicture(formData);
    setLoading(70);

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
      router.push("/info-reg/success");
    }

    console.log(formData, data);
  };

  const uploadPicture: SubmitHandler<IFormInput> = async (formData) => {
    const { error } = await storageClient
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

  const sectionListQuery = supabase.from("sections").select("sectionName");
  type sections = QueryData<typeof sectionListQuery>;

  const handleChange = async (e: { target: { value: number } }) => {
    const { data, error } = await sectionListQuery.eq("grade", e.target.value);
    if (error) console.error(error);
    const finalSectionList: sections = data!;

    const list = finalSectionList!
      ?.map((e) => e.sectionName!)
      .sort((a: string, b: string) => a?.localeCompare(b));
    console.log(e.target.value, list);
    setList(list);

    if (e.target.value >= 7) {
      setDisable(false);
    }
  };

  const checkNext = async () => {
    if (step <= 3) {
      const result = await trigger();

      console.log(result, errors);

      if (result) setStep(step + 1);
    } else if (step == 4) {
      const result = await trigger();

      if (result) {
        console.log(currentValues);
        if (currentValues?.idpic.item(0))
          setBase64(
            (await toBase64(currentValues?.idpic.item(0) as File)) as string
          );

        setStep(step + 1);
      }
    }
  };

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file as Blob);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            event.preventDefault();
            checkNext();
          }
        }}
        className="form-control space-y-4 my-12"
      >
        {step == 0 ? (
          <>
            <p className="text-left max-w-screen-md">
              Disclaimer: This form is hosted on a secure server and can only be
              viewed by the school authority. Please feel confident in filling
              out this form, as all of your information will be kept safe with
              every step of the process. This web application respects
              confidentiality agreement.
            </p>
            <LRNInput registerFunc={register} errors={errors}></LRNInput>
          </>
        ) : (
          <></>
        )}
        {step == 1 ? (
          <>
            <NameInput registerFunc={register} errors={errors}></NameInput>
            <GradeInput
              registerFunc={register}
              onChange={handleChange}
              disabled={isDisable}
              selectedSections={selectedSections}
            ></GradeInput>
          </>
        ) : (
          <></>
        )}
        {step == 2 ? (
          <div>
            <label htmlFor="address" className="label mb-1">
              <span className="text-base label-text text-left">
                ID Picture <span className="text-red-600">*</span>
                <ul className="list-disc list-inside">
                  <li>The photo must have a plain white background.</li>
                  <li>The photo must be taken recently</li>
                  <li>The photo must be in a 1:1 aspect ratio (square)</li>
                  <li>The student must wear decent attire. Ex. Uniform</li>
                  <li>The student must not be wearing eyeglasses.</li>
                </ul>
              </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              accept="image/png, image/jpeg"
              {...register("idpic", { required: true })}
            />
          </div>
        ) : (
          <></>
        )}
        {step == 3 ? (
          <>
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
                {...register("birthday", {
                  required: true,
                  min: "2000-01-01",
                  max: "2015-12-31",
                })}
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
                {...register("address", { required: true })}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        {step == 4 ? (
          <>
            <div className="w-96">
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
                  id="ec1name"
                  required
                  {...register("e1Name", {
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
                  <span className="text-base label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+63••••••••••"
                  className="input input-bordered w-full"
                  id="ec1num"
                  required
                  {...register("e1Num", {
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
                  <span className="text-base label-text">
                    Facebook Messenger Account
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Facebook Name"
                  className="input input-bordered w-full"
                  id="ec1fb"
                  required
                  {...register("e1FB", {
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
            <div className="w-96">
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
                  id="ec2name"
                  required
                  {...register("e2Name", {
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
                  <span className="text-base label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+63••••••••••"
                  className="input input-bordered w-full"
                  id="ec2num"
                  required
                  {...register("e2Num", {
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
                  <span className="text-base label-text">
                    Facebook Messenger Account
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Facebook Name"
                  className="input input-bordered w-full"
                  id="ec2fb"
                  required
                  {...register("e2FB", {
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
            <div className="w-96">
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
                  id="ec3name"
                  {...register("e3Name", {
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
                  <span className="text-base label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+63••••••••••"
                  className="input input-bordered w-full"
                  id="ec3num"
                  {...register("e3Num", {
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
                  <span className="text-base label-text">
                    Facebook Messenger Account
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Facebook Name"
                  className="input input-bordered w-full"
                  id="ec3fb"
                  {...register("e3FB", {
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
          </>
        ) : (
          <></>
        )}
        {step == 5 ? (
          <>
            <div className=" align-middle p-5 rounded my-2">
              {currentValues?.idpic.item(0) ? (
                <Image
                  src={base64!}
                  width={128}
                  height={128}
                  alt=""
                  className="rounded avatar w-32 h-32"
                />
              ) : (
                <div className="skeleton w-32 h-32"></div>
              )}
              <div className="divider"></div>
              <p className="text-xl text-left">{currentValues?.lrn}</p>
              <p className="text-left font-bold">LRN</p>
              <div className="divider"></div>
              <p className="text-xl text-left">
                {currentValues?.lname}, {currentValues?.fname}{" "}
                {currentValues?.mname}{" "}
              </p>
              <p className="text-left font-bold">Full Name</p>
              <div className="divider"></div>
              <p className="text-xl text-left">
                {currentValues?.grade} - {currentValues?.section}
              </p>
              <p className="text-left font-bold">Grade & Section</p>
              <div className="divider"></div>
              <p className="text-xl text-left">{currentValues?.address}</p>
              <p className="text-left font-bold">Address</p>
              <div className="divider"></div>
              <p className="text-xl text-left">
                {currentValues?.birthday.toString()}
              </p>
              <p className="text-left font-bold">
                Date of Birth{" "}
                <span className="text-neutral-content text-sm">
                  (YYYY-MM-DD)
                </span>
              </p>
              <div className="divider"></div>
              <p className="text-xl text-left">
                {currentValues?.e1Name} ({currentValues?.e1FB} -{" "}
                {currentValues?.e1Res})
              </p>
              <p className="text-lg text-left">{currentValues?.e1Num}</p>
              <p className="text-left font-bold">Emergency Contact 1</p>
              <div className="divider"></div>
              <p className="text-xl text-left">
                {currentValues?.e2Name} ({currentValues?.e2FB} -{" "}
                {currentValues?.e2Res})
              </p>
              <p className="text-lg text-left">{currentValues?.e2Num}</p>
              <p className="text-left font-bold">Emergency Contact 2</p>
              <div className="divider"></div>
              {currentValues?.e3Name.trim() != "" && (
                <>
                  <p className="text-xl text-left">
                    {currentValues?.e3Name} ({currentValues?.e3FB} -{" "}
                    {currentValues?.e3Res})
                  </p>
                  <p className="text-lg text-left">{currentValues?.e3Num}</p>
                  <p className="text-left font-bold">Emergency Contact 3</p>
                  <div className="divider"></div>
                </>
              )}
            </div>
            <div className="divider"></div>
            <button
              onClick={() => {
                setStep(step - 1);
              }}
              type="button"
              className="btn bg-error text-white w-full"
            >
              Back
            </button>
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
              If you are experiencing trouble registering, please contact the
              App Developers, Sulpicio Demontaño IV and Addy Suarnaba on
              Messenger.
            </p>
          </>
        ) : (
          <></>
        )}
        <div className="flex flex-nowrap justify-center gap-4s">
          {step > 0 && step < 5 ? (
            <button
              onClick={() => {
                setStep(step - 1);
              }}
              type="button"
              className="btn bg-error text-white w-1/2"
            >
              Back
            </button>
          ) : (
            <></>
          )}
          {step < 5 ? (
            <button
              onClick={() => {
                checkNext();
              }}
              type="button"
              className="btn bg-info text-white w-1/2"
            >
              Next
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </>
  );
};
export default Form;
