"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMail } from "react-icons/ci";

const Donate = () => {
  const pathname = usePathname().split("/");

  if (pathname.length > 2) {
    return;
  }

  function handleDonationBox(action: "show" | "hide") {
    const modal = document.getElementById("donationBox") as HTMLDialogElement;
    if (modal) {
      if (action === "show") {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }

  return (
    <main>
      <button
        className="btn btn-info"
        onClick={() => handleDonationBox("show")}
      >
        Donate
      </button>
      <dialog id="donationBox" className="modal">
        <div className="modal-box max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <div className="py-4">
            <p>
              Zephex here, developer of this site. <br />
              Sites like these require regular maintenance and some capital to
              stay hosted. In the past, I had to take down the site due to the
              same reason. If possible, consider donating some amount to keep
              the site running. <br />
              Regards,
              <br />
              Zephex
            </p>
          </div>
          <p className="text-sky-400 font-bold">
            UPI ID:{" "}
            <span className="text-white italic font-normal">
              zephex@pingpay
            </span>
          </p>
          <p>
            <span className="text-sky-400 font-bold">Bitcoin wallet: </span>
            <i className="text-white">
              0x6d60f7602ace960de79143010a1fc657b44698a7
            </i>
          </p>
          <p className="flex items-center">
            Contact me:{" "}
            <Link href="mailto:zephex@duck.com" className="text-lime-200 ml-2">
              <button className="btn p-2">
                <CiMail size={24} />
              </button>
            </Link>
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default Donate;
