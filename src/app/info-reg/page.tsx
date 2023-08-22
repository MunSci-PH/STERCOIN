"use client";

export default function infoReg() {
  const handleSubmit = (formData: FormData) => {
    const data = {
      lrn: formData.get("lrn"),
      fname: formData.get("fname"),
      mname: formData.get("mname"),
      lname: formData.get("lname"),
      grade: formData.get("grade"),
      section: formData.get("section"),
    };

    alert(
      `LRN: ${data.lrn} Name: ${data.fname} ${data.mname} ${data.lname} Grade: ${data.grade} Section: ${data.section}`
    );
  };

  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-col items-center">
            <p className="text-center text-4xl font-sans font-bold mb-8">
              Information Registration
            </p>
            <form
              action={handleSubmit}
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
                    disabled
                    required
                  >
                    <option value="none" disabled>
                      Section
                    </option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              {/**hi */}
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
