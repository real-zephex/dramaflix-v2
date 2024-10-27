"use client";

import { usePathname } from "next/navigation";

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
          <p>
            For transactions from India, use these UPI IDs: <br />
            <span className="text-amber-200">zephyr@pingpay</span> <br />
            <span className="text-amber-200">zephex0@okaxis</span>
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
