"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LRNInput from "./components/lrn";
import NameInput from "./components/name";
import GradeInput from "./components/grade";
import { storageClient } from "@/utils/storage";
import { Turnstile } from "@marsidev/react-turnstile";
import { TablesInsert } from "../../database.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EmergencyContactsInput from "./components/emergencyContacts";
import useSupabaseBrowser from "@/utils/client";
import useTheme from "@/hooks/useTheme";
import { getSectionsByGrade } from "@/queries/getSectionsByGrade";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { IFormInput } from "./types";
import AuthInput from "./components/auth";

const Form = () => {
  const router = useRouter();
  const [isDisable, setDisable] = useState(true);
  const [selectedSections, setList] = useState<string[]>([]);
  const [isError, setError] = useState(false);
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
    getValues,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const supabase = useSupabaseBrowser();
  const isDarkTheme = useTheme();

  const useSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setLoading(1);

    const res = await fetch("/api/turnstile/verify", {
      method: "POST",
      body: JSON.stringify({ captchaToken }),
      headers: {
        "content-type": "application/json",
      },
    });

    const captchaData = await res?.json();
    if (captchaData.status == 400) {
      toast(`Captcha Error: ${captchaData.statusText}`, {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setLoading(0);
      return;
    }

    if (formData.grade === null) {
      console.error("Grade cannot be null.");
      toast("Grade cannot be empty.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setStep(2);
      setFocus("grade");
      setLoading(0);
      return;
    }

    if (formData.section === null) {
      console.error("Section cannot be null.");
      toast("Section cannot be empty.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setStep(2);
      setFocus("section");
      setLoading(0);
      return;
    }

    if (!formData.idpic.item(0)) {
      console.error("Image missing.");
      toast("Image is missing.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setStep(3);
      setFocus("idpic");
      setLoading(0);
      return;
    }

    setLoading(40);

    const signup = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password.trim(),
      options: {
        captchaToken: captchaToken,
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (signup.error) {
      console.error(signup.error.message);
      toast(signup.error.message, {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setLoading(0);
      return;
    }

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
      email: formData.email.trim(),
    };

    const { error } = await supabase.from("studentData").insert(submitData);

    if (error) {
      toast(`Error Submitting Form: ${error.code}. ${error.message}`, {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setError(true);
      setLoading(0);
      console.log(error);
      return;
    }

    await uploadPicture(formData);
    setLoading(70);

    setLoading(100);
    router.push("/info-reg/success");
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
      setLoading(0);
      console.log(error);
    }
  };

  const useHandleChange = async (e: { target: { value: number } }) => {
    const { data, error } = await getSectionsByGrade(supabase, e.target.value);

    if (error) console.error(error);

    const list = data!
      ?.map((e) => e.sectionName!)
      .sort((a: string, b: string) => a?.localeCompare(b));
    console.log(e.target.value, list);
    setList(list);

    if (e.target.value >= 7) {
      setDisable(false);
    }
  };

  const checkNext = async () => {
    setValues(getValues());
    if (step <= 4) {
      const result = await trigger();

      console.log(result, errors);

      if (result) setStep(step + 1);
    } else if (step == 5) {
      const result = await trigger();

      if (result) {
        console.log(currentValues);
        if (currentValues?.idpic.item(0)) {
          setBase64(URL.createObjectURL(currentValues?.idpic.item(0)!));
        }

        setStep(step + 1);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(useSubmit)}
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            event.preventDefault();
            checkNext();
          }
        }}
        className="form-control my-12 space-y-4"
      >
        {step == 0 ? (
          <>
            <p className="max-w-screen-md text-left">
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
          <AuthInput
            registerFunc={register}
            errors={errors}
            watch={watch}
          ></AuthInput>
        ) : (
          <></>
        )}
        {step == 2 ? (
          <>
            <NameInput registerFunc={register} errors={errors}></NameInput>
            <GradeInput
              registerFunc={register}
              onChange={useHandleChange}
              disabled={isDisable}
              selectedSections={selectedSections}
            ></GradeInput>
          </>
        ) : (
          <></>
        )}
        {step == 3 ? (
          <div>
            <label htmlFor="address" className="label mb-1">
              <span className="label-text text-left text-base">
                ID Picture <span className="text-red-600">*</span>
                <ul className="list-inside list-disc">
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
        {step == 4 ? (
          <>
            <div className="flex flex-col">
              <label htmlFor="bday" className="form-control">
                <label className="label">
                  <span className="label-text text-base">
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
              </label>
              <label htmlFor="address" className="form-control">
                <label className="label">
                  <span className="label-text text-base">
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
              </label>
            </div>
          </>
        ) : (
          <></>
        )}
        {step == 5 ? (
          <EmergencyContactsInput registerFunc={register} errors={errors} />
        ) : (
          <></>
        )}
        {step == 6 ? (
          <>
            <div className="my-2 rounded p-5 align-middle">
              {base64 && currentValues?.idpic.item(0) ? (
                <Image
                  src={base64}
                  width={128}
                  height={128}
                  alt=""
                  className="size-32 rounded"
                />
              ) : (
                <div className="skeleton mx-auto size-32"></div>
              )}
              <div className="divider"></div>
              <p className="text-left text-xl">{currentValues?.lrn}</p>
              <p className="text-left font-bold">LRN</p>
              <div className="divider"></div>
              <p className="text-left text-xl">
                {currentValues?.lname}, {currentValues?.fname}{" "}
                {currentValues?.mname}{" "}
              </p>
              <p className="text-left font-bold">Full Name</p>
              <div className="divider"></div>
              <p className="text-left text-xl">
                {currentValues?.grade} - {currentValues?.section}
              </p>
              <p className="text-left font-bold">Grade & Section</p>
              <div className="divider"></div>
              <p className="text-left text-xl">{currentValues?.address}</p>
              <p className="text-left font-bold">Address</p>
              <div className="divider"></div>
              <p className="text-left text-xl">
                {currentValues?.birthday.toString()}
              </p>
              <p className="text-left font-bold">
                Date of Birth{" "}
                <span className="text-neutral-content text-sm">
                  (YYYY-MM-DD)
                </span>
              </p>
              <div className="divider"></div>
              <p className="text-left text-xl">
                {currentValues?.e1Name} ({currentValues?.e1FB} -{" "}
                {currentValues?.e1Res})
              </p>
              <p className="text-left text-lg">{currentValues?.e1Num}</p>
              <p className="text-left font-bold">Emergency Contact 1</p>
              <div className="divider"></div>
              <p className="text-left text-xl">
                {currentValues?.e2Name} ({currentValues?.e2FB} -{" "}
                {currentValues?.e2Res})
              </p>
              <p className="text-left text-lg">{currentValues?.e2Num}</p>
              <p className="text-left font-bold">Emergency Contact 2</p>
              <div className="divider"></div>
              {currentValues?.e3Name.trim() != "" && (
                <>
                  <p className="text-left text-xl">
                    {currentValues?.e3Name} ({currentValues?.e3FB} -{" "}
                    {currentValues?.e3Res})
                  </p>
                  <p className="text-left text-lg">{currentValues?.e3Num}</p>
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
              disabled={isLoading !== 0 ? true : false}
              className="btn bg-error w-full text-white"
            >
              Back
            </button>
            <button
              className={
                isError ? "btn bg-error text-white" : "btn bg-info text-white"
              }
              type="submit"
              disabled={isLoading !== 0 ? true : false}
            >
              {isLoading !== 0 ? (
                <span className="loading loading-dots"></span>
              ) : (
                "Submit"
              )}
            </button>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_CF_SITEKEY!}
              onSuccess={(token) => {
                setCaptchaToken(token);
              }}
              className="mx-auto"
            />
            <p className="prose mx-auto text-center text-xs">
              If you are experiencing trouble registering, please contact the
              App Developers, Sulpicio Demontaño IV and Addy Suarnaba on
              Messenger.
            </p>
          </>
        ) : (
          <></>
        )}
        <div className="flex flex-nowrap justify-center gap-4">
          {step > 0 && step < 6 ? (
            <button
              onClick={() => {
                setStep(step - 1);
              }}
              type="button"
              className="btn bg-error w-1/2 text-white"
            >
              Back
            </button>
          ) : (
            <></>
          )}
          {step < 6 ? (
            <button
              onClick={() => {
                checkNext();
              }}
              type="button"
              className="btn bg-info w-1/2 text-white"
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
