import { doc, setDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { useState } from "react";

function AddNoticesPage() {
  const [notice, setNotice] = useState("");

  const handleSubmitNotice = async (e) => {
    e.preventDefault();
    console.log(notice);

    //generate a random ID

    const res = await setDoc(doc(db, "notices", "13"), {
      messages1: notice,
    });
    console.log(res);
  };
  return (
    <div>
      <h1>Add Notices Page</h1>
      <form action="">
        <input
          type="text"
          className="w-[300px] h-10 border-black border-2"
          onChange={(e) => {
            setNotice(e.target.value);
          }}
        />
        <button type="submit" onClick={handleSubmitNotice}>
          submit
        </button>
      </form>
    </div>
  );
}

export default AddNoticesPage;
