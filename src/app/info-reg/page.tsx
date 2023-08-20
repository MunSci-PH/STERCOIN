"use client";
import { FormEvent, useState } from "react";

export default function Home() {
  const [lrn, setLRN] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [sectionDisable, setDisable] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault() // Prevent the redirect

    alert(`LRN: ${lrn} Name: ${fname} ${mname} ${lname} Grade: ${grade}`)
  }

  function handleChange(e: any) {
    setGrade(e);

    if (e == "7") {
      console.log("we7");
      setDisable(false);
    } else if (e == "8") {
      console.log("we8");
      setDisable(false);
    } else if (e == "9") {
      console.log("we9");
      setDisable(false);
    } else if (e == "10") {
      console.log("we10");
      setDisable(false);
    } else if (e == "11") {
      console.log("we11");
      setDisable(false);
    } else if (e == "12") {
      console.log("we12");
      setDisable(false);
    } else if (e == "none") {
      console.log("none");
      setDisable(true);
    }
  }

  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-col items-center">
            <p className="text-center text-4xl font-sans font-bold mb-8">
              Information Registration
            </p>
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="form-control space-y-4"
            >
              <div>
                <label htmlFor="lrn" className="label">
                  <span className="text-base label-text">LRN</span>
                </label>
                <input
                  type="text"
                  placeholder="305469XXXXXX"
                  className="input input-bordered w-full"
                  pattern="[0-9]{12}"
                  title="Only accepts digits (0-9) and only 12 characters."
                  id="lrn"
                  name="lrn"
                  onChange={e => setLRN(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-end">
                <div>
                  <label htmlFor="fname" className="label">
                    <span className="label-text text-sm md:text-base">
                      First Name (With Extension)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Juan JR"
                    className="input input-bordered w-full max-w-xs"
                    pattern="{1,15}"
                    title="Only accepts alphabet letters."
                    id="fname"
                    name="fname"
                    onChange={e => setFname(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mname" className="label">
                    <span className="text-base label-text">Middle Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Martinez"
                    className="input input-bordered w-full max-w-xs"
                    pattern="{1,15}"
                    title="Only accepts alphabet letters."
                    id="mname"
                    name="mname"
                    onChange={e => setMname(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lname" className="label">
                    <span className="text-base label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Dela Cruz"
                    className="input input-bordered w-full max-w-xs"
                    pattern="{1,15}"
                    title="Only accepts alphabet letters."
                    id="lname"
                    name="lname"
                    onChange={e => setLname(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    id="grade"
                    name="grade"
                    defaultValue="none"
                    onChange={e => handleChange(e.target.value)}
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
                </div>
                <div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    id="section"
                    name="section"
                    defaultValue="Section"
                    disabled={sectionDisable}
                    onChange={e => setSection(e.target.value)}
                    required
                  >
                    <option disabled>Section</option>
                  </select>
                </div>
              </div>
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div >
      </main >
    </>
  );
}
