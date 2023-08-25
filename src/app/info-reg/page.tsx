"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InfoReg() {
  const [isDisable, setDisable] = useState(true);
  const [selectedSections, setList] = useState<string[]>([]);
  const [isError, setError] = useState(false);
  const [isDarkTheme, setTheme] = useState(false);
  const supabase = createClientComponentClient();

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

  const handleSubmit = (formData: FormData) => {
    const data = {
      lrn: formData.get("lrn"),
      fname: formData.get("fname"),
      mname: formData.get("mname"),
      lname: formData.get("lname"),
      grade: formData.get("grade"),
      section: formData.get("section"),
      pwd: formData.get("pwd"),
      birthday: formData.get("bday"),
      address: formData.get("address"),
      e1Name: formData.get("ec1name"),
      e1Num: formData.get("ec1num"),
      e1FB: formData.get("ec1fb"),
      e2Name: formData.get("ec2name"),
      e2Num: formData.get("ec2num"),
      e2FB: formData.get("ec2fb"),
      e3Name: formData.get("ec3name"),
      e3Num: formData.get("ec3num"),
      e3FB: formData.get("ec3fb"),
    };

    if (data.grade === null) {
      console.error("Grade cannot be null.");
      toast("Grade cannot be empty.", {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      setError(true);
      return;
    }
    if (data.section === null) {
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
    console.log(data);
  };

  const handleChange = async (e: any) => {
    const { data: sections } = await supabase
      .from("sections")
      .select()
      .eq("grade", e.target.value);
    const list = sections?.map((e) => e.sectionName);

    //@ts-expect-error
    setList(list);

    if (e.target.value >= 7) {
      setDisable(false);
    }
  };

  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-col items-center my-12">
            <p className="text-center text-4xl font-sans font-bold mb-8">
              Information Registration
            </p>
            <form action={handleSubmit} className="form-control space-y-4">
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
                  name="lrn"
                  required
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
                    placeholder="Juan JR"
                    className="input input-bordered w-full max-w-xs"
                    pattern=".{1,15}"
                    title="Only accepts alphabet letters."
                    id="fname"
                    name="fname"
                    required
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
                    name="mname"
                    required
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
                    name="lname"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-around w-full">
                <div className="flex justify-around">
                  <select
                    className="select select-bordered w-full max-w-s"
                    id="grade"
                    name="grade"
                    defaultValue="none"
                    onChange={handleChange}
                    required
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
                    name="section"
                    defaultValue="none"
                    disabled={isDisable}
                    required
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
                    name="pwd"
                    id="pwd"
                    className="checkbox"
                  />
                  <p>Are you a person with a disability?</p>
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
                  name="bday"
                  min="2000-01-01"
                  max="2015-12-31"
                  required
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
                  name="address"
                  required
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
                    name="ec1name"
                    required
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
                    name="ec1num"
                    required
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
                    name="ec1fb"
                    required
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
                    name="ec2name"
                    required
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
                    name="ec2num"
                    required
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
                    name="ec2fb"
                    required
                  />
                </div>
              </div>
              <hr />
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
                    name="ec3name"
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
                    name="ec3num"
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
                    name="ec3fb"
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
                If you are experiencing trouble registering, please contact
                Sulpicio Demontaño IV on Messenger.
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
