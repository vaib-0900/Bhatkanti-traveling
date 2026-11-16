import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import Header from "../componant/Header";
import Footer from "../componant/Footer";
import AuthUser from "../Auth/AuthUser";

const GENDERS = [
  "male",
  "female",
  "other",
];

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
  },
  {
    id: "upi",
    label: "UPI",
  },
  {
    id: "netbanking",
    label: "Net Banking",
  },
  {
    id: "cash",
    label: "Cash (Pay at Office)",
  },
];

const STEPS = [
  "Trip Details",
  "Traveler Info",
  "Review & Pay",
];

const emptyTraveler = (isPrimary = false) => ({
  first_name: "",
  last_name: "",
  gender: "male",
  nationality: "",
  passport_number: "",
  passport_expiry: "",
  is_primary: isPrimary,
});

/* =========================================================
   CUSTOMER ID
========================================================= */

const getCustomerId = () => {
  try {
    const directCustomerId =
      localStorage.getItem("customer_id") ||
      localStorage.getItem("user_id") ||
      localStorage.getItem("id");

    if (directCustomerId) {
      return directCustomerId;
    }

    const rawUser =
      localStorage.getItem("user") ||
      localStorage.getItem("customer");

    if (rawUser) {
      const parsedUser = JSON.parse(rawUser);

      return (
        parsedUser?._id ||
        parsedUser?.id ||
        parsedUser?.customer_id ||
        null
      );
    }
  } catch (error) {
    console.error(
      "CUSTOMER ID ERROR:",
      error
    );
  }

  return null;
};

/* =========================================================
   DATE FORMAT
========================================================= */

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

/* =========================================================
   BOOKING COMPONENT
========================================================= */

const Booking = () => {
  const { http } = AuthUser();

  /* =======================================================
     STATES
  ======================================================= */

  const [step, setStep] = useState(0);

  const [packages, setPackages] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [loadingPackages, setLoadingPackages] =
    useState(true);

  const [loadingSchedules, setLoadingSchedules] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const [bookingResult, setBookingResult] =
    useState(null);

  const [form, setForm] = useState({
    packageId: "",
    scheduleId: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
    name: "",
    email: "",
    phone: "",
    notes: "",
    paymentMethod: "card",
    currency: "INR",
  });

  const [travelers, setTravelers] =
    useState([
      emptyTraveler(true),
    ]);

  /* =======================================================
     GET PACKAGES
  ======================================================= */

  const getPackages = async () => {
    try {
      setLoadingPackages(true);

      const res = await http.get(
        "/tourpackages/list"
      );

      const packageList =
        Array.isArray(res.data)
          ? res.data
          : [];

      console.log(
        "PACKAGES:",
        packageList
      );

      const activePackages =
        packageList.filter(
          (item) =>
            item.is_active === true &&
            item.status === "published"
        );

      setPackages(activePackages);
    } catch (error) {
      console.error(
        "GET PACKAGES ERROR:",
        error
      );

      setPackages([]);
    } finally {
      setLoadingPackages(false);
    }
  };

  /* =======================================================
     GET SCHEDULES
  ======================================================= */

  const getSchedules = async () => {
    try {
      setLoadingSchedules(true);

      const res = await http.get(
        "/tourschedule/list"
      );

      const scheduleList =
        Array.isArray(res.data)
          ? res.data
          : [];

      console.log(
        "ALL SCHEDULES:",
        scheduleList
      );

      setSchedules(scheduleList);
    } catch (error) {
      console.error(
        "GET SCHEDULES ERROR:",
        error
      );

      setSchedules([]);
    } finally {
      setLoadingSchedules(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    getPackages();
    getSchedules();
  }, []);

  /* =======================================================
     SELECTED PACKAGE
  ======================================================= */

  const selectedPackage = useMemo(() => {
    if (!form.packageId) {
      return null;
    }

    return (
      packages.find(
        (item) =>
          String(item._id) ===
          String(form.packageId)
      ) || null
    );
  }, [
    packages,
    form.packageId,
  ]);

  /* =======================================================
     AVAILABLE SCHEDULES

     PACKAGE ID MATCH:
     
     Tourpackages._id
              ↓
     Tourschedules.package_id

     package_id is String.
     
     NO AUTO DEPARTURE
  ======================================================= */

  const availableSchedules = useMemo(() => {
    if (!form.packageId) {
      return [];
    }

    console.log(
      "SELECTED PACKAGE ID:",
      form.packageId
    );

    const filtered =
      schedules.filter((schedule) => {
        /*
         * package_id String असल्यामुळे
         * String() वापरून comparison
         */
        const schedulePackageId =
          typeof schedule.package_id ===
            "object"
            ? schedule.package_id?._id
            : schedule.package_id;

        const packageMatch =
          String(schedulePackageId) ===
          String(form.packageId);

        const notCancelled =
          schedule.is_cancelled !== true;

        const seatsAvailable =
          Number(
            schedule.available_seats || 0
          ) > 0;

        console.log(
          "SCHEDULE CHECK:",
          {
            scheduleId:
              schedule._id,

            schedulePackageId:
              schedulePackageId,

            selectedPackageId:
              form.packageId,

            packageMatch:
              packageMatch,

            notCancelled:
              notCancelled,

            seatsAvailable:
              seatsAvailable,
          }
        );

        return (
          packageMatch &&
          notCancelled &&
          seatsAvailable
        );
      });

    return filtered.sort(
      (a, b) =>
        new Date(
          a.departure_date
        ) -
        new Date(
          b.departure_date
        )
    );
  }, [
    schedules,
    form.packageId,
  ]);

  /* =======================================================
     SELECTED SCHEDULE
  ======================================================= */

  const selectedSchedule = useMemo(() => {
    if (!form.scheduleId) {
      return null;
    }

    return (
      availableSchedules.find(
        (schedule) =>
          String(schedule._id) ===
          String(form.scheduleId)
      ) || null
    );
  }, [
    availableSchedules,
    form.scheduleId,
  ]);

  /* =======================================================
     TOTAL TRAVELERS
  ======================================================= */

  const totalTravelers =
    Number(
      form.numberOfAdults || 0
    ) +
    Number(
      form.numberOfChildren || 0
    );

  /* =======================================================
     SYNC TRAVELERS
  ======================================================= */

  useEffect(() => {
    setTravelers((previous) => {
      const next = [...previous];

      while (
        next.length < totalTravelers
      ) {
        next.push(
          emptyTraveler(
            next.length === 0
          )
        );
      }

      if (
        next.length >
        totalTravelers
      ) {
        next.length = Math.max(
          totalTravelers,
          1
        );
      }

      next.forEach(
        (traveler, index) => {
          traveler.is_primary =
            index === 0;
        }
      );

      return next;
    });
  }, [totalTravelers]);

  /* =======================================================
     PRICING
  ======================================================= */

  const pricing = useMemo(() => {
    if (!selectedPackage) {
      return {
        listPrice: 0,
        base: 0,
        discount: 0,
        subtotal: 0,
        taxes: 0,
        total: 0,
      };
    }

    const listPrice =
      Number(
        selectedPackage.base_price || 0
      );

    const salePrice =
      Number(
        selectedPackage.discount_price ||
        selectedPackage.base_price ||
        0
      );

    const travelerCount =
      Math.max(
        totalTravelers,
        1
      );

    const listBase =
      listPrice *
      travelerCount;

    const saleBase =
      salePrice *
      travelerCount;

    const discount =
      Math.max(
        listBase - saleBase,
        0
      );

    const subtotal =
      saleBase;

    const taxes =
      Math.round(
        subtotal * 0.05
      );

    const total =
      subtotal + taxes;

    return {
      listPrice,
      base: saleBase,
      discount,
      subtotal,
      taxes,
      total,
    };
  }, [
    selectedPackage,
    totalTravelers,
  ]);

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (
      name ===
      "numberOfAdults" ||
      name ===
      "numberOfChildren"
    ) {
      setForm(
        (previous) => ({
          ...previous,
          [name]:
            Number(value),
        })
      );
    } else {
      setForm(
        (previous) => ({
          ...previous,
          [name]: value,
        })
      );
    }

    setSubmitError("");
  };

  /* =======================================================
     PACKAGE CHANGE

     IMPORTANT:
     SCHEDULE WILL NOT AUTO SELECT
  ======================================================= */

  const handlePackageChange = (
    e
  ) => {
    const packageId =
      e.target.value;

    setForm(
      (previous) => ({
        ...previous,

        packageId,

        /*
         * Package change झाल्यावर
         * previous departure remove
         */
        scheduleId: "",
      })
    );

    setSubmitError("");
  };

  /* =======================================================
     TRAVELER CHANGE
  ======================================================= */

  const handleTravelerChange = (
    index,
    field,
    value
  ) => {
    setTravelers(
      (previous) => {
        const next = [
          ...previous,
        ];

        next[index] = {
          ...next[index],
          [field]: value,
        };

        return next;
      }
    );

    setSubmitError("");
  };

  /* =======================================================
     NEXT
  ======================================================= */

  const next = () => {
    setSubmitError("");

    /* ================= STEP 1 ================= */

    if (step === 0) {
      if (!form.packageId) {
        setSubmitError(
          "Please select a tour package."
        );
        return;
      }

      if (!form.scheduleId) {
        setSubmitError(
          "Please select a departure."
        );
        return;
      }

      if (
        Number(
          form.numberOfAdults
        ) < 1
      ) {
        setSubmitError(
          "At least one adult is required."
        );
        return;
      }

      if (!selectedSchedule) {
        setSubmitError(
          "Please select a valid departure."
        );
        return;
      }

      const availableSeats =
        Number(
          selectedSchedule.available_seats ||
          0
        );

      if (
        totalTravelers >
        availableSeats
      ) {
        setSubmitError(
          `Only ${availableSeats} seats are available.`
        );
        return;
      }
    }

    /* ================= STEP 2 ================= */

    if (step === 1) {
      if (
        !form.name.trim() ||
        !form.email.trim() ||
        !form.phone.trim()
      ) {
        setSubmitError(
          "Please fill all contact details."
        );
        return;
      }

      const invalidTraveler =
        travelers.find(
          (traveler) =>
            !traveler.first_name?.trim() ||
            !traveler.last_name?.trim()
        );

      if (invalidTraveler) {
        setSubmitError(
          "Please enter first name and last name for all travelers."
        );
        return;
      }
    }

    setStep(
      (previous) =>
        Math.min(
          previous + 1,
          STEPS.length - 1
        )
    );
  };

  /* =======================================================
     BACK
  ======================================================= */

  const back = () => {
    setSubmitError("");

    setStep(
      (previous) =>
        Math.max(
          previous - 1,
          0
        )
    );
  };

  /* =======================================================
     SUBMIT BOOKING
  ======================================================= */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitError("");

    /* ================= PACKAGE ================= */

    if (!selectedPackage) {
      setSubmitError(
        "Please select a package."
      );

      setStep(0);

      return;
    }

    /* ================= SCHEDULE ================= */

    if (
      !selectedSchedule?._id
    ) {
      setSubmitError(
        "Please select a departure."
      );

      setStep(0);

      return;
    }

    /* ================= CUSTOMER ================= */

    const customerId =
      getCustomerId();

    console.log(
      "CUSTOMER ID:",
      customerId
    );

    if (!customerId) {
      setSubmitError(
        "You need to be logged in to complete a booking."
      );

      return;
    }

    /* ================= SEATS ================= */

    const availableSeats =
      Number(
        selectedSchedule.available_seats ||
        0
      );

    if (
      totalTravelers >
      availableSeats
    ) {
      setSubmitError(
        `Only ${availableSeats} seats are available.`
      );

      setStep(0);

      return;
    }

    /* ================= TRAVELERS ================= */

    if (
      travelers.length !==
      totalTravelers
    ) {
      setSubmitError(
        "Please provide information for all travelers."
      );

      setStep(1);

      return;
    }

    try {
      setSubmitting(true);

      // 1. Create booking ONCE
      const bookingPayload = {
        booking_reference: `BK-${Date.now().toString(36).toUpperCase()}`,
        customer_id: String(customerId),
        schedule_id: String(selectedSchedule._id),
        number_of_travelers: Number(totalTravelers),
        number_of_adults: Number(form.numberOfAdults || 0),
        number_of_children: Number(form.numberOfChildren || 0),
        total_price: String(Number(pricing.total || 0)),
        discount_applied: String(Number(pricing.discount || 0)),
        booking_status: "pending",
        payment_status: "pending",
        special_requests: form.notes?.trim() || "",
        cancellation_reason: "",
      };

      console.log("BOOKING PAYLOAD:", bookingPayload);
      const bookingRes = await http.post("/bookings/store", bookingPayload);
      console.log("BOOKING RESPONSE:", bookingRes.data);

      const bookingData = bookingRes.data?.data || bookingRes.data?.booking || null;
      const bookingId = bookingData?._id;
      if (!bookingId) {
        throw new Error("Booking was created, but the server did not return a booking ID.");
      }

      // 2. Create traveler records
      for (let index = 0; index < travelers.length; index += 1) {
        const traveler = travelers[index];
        const travelerPayload = {
          booking_id: String(bookingId),
          first_name: traveler.first_name?.trim() || "",
          last_name: traveler.last_name?.trim() || "",
          gender: traveler.gender || "male",
          nationality: traveler.nationality?.trim() || "",
          passport_number: traveler.passport_number?.trim() || "",
          passport_expiry: traveler.passport_expiry || "",
          is_primary: index === 0,
        };

        console.log("TRAVELER PAYLOAD:", travelerPayload);
        await http.post("/bookingtravelers/store", travelerPayload);
      }

      // 3. Create payment record. This records the selected method; it does not charge a card.
      const paymentPayload = {
        booking_id: String(bookingId),
        payment_reference: `PAY-${Date.now()}`,
        amount: Number(pricing.total),
        currency: form.currency || "INR",
        payment_method: form.paymentMethod || "card",
        transaction_id: "",
        refund_reason: "",
        notes: "",
        processed_by: "",
      };

      console.log("PAYMENT PAYLOAD:", paymentPayload);

      const paymentRes = await http.post(
        "/payments/store",
        paymentPayload
      );

      console.log("PAYMENT RESPONSE:", paymentRes.data);

      setBookingResult({
        ...bookingData,
        _id: bookingId,
        payment: paymentRes.data,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("BOOKING SUBMIT ERROR:", error);
      console.error("ERROR STATUS:", error?.response?.status);
      console.error("ERROR RESPONSE:", JSON.stringify(error?.response?.data, null, 2));
      setSubmitError(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong while creating booking."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =======================================================
     SUCCESS PAGE
  ======================================================= */

  if (submitted) {
    return (
      <>
        <Header />

        <main
          className="main"
          id="top"
        >
          <section className="bhk-book-success">
            <div className="container text-center">

              <div className="bhk-success-icon">
                ✓
              </div>

              <h2>
                Booking Request Received!
              </h2>

              <p>
                Thanks{" "}
                {form.name ||
                  "traveler"},
                we've received your
                request for{" "}

                <strong>
                  {
                    selectedPackage?.package_name
                  }
                </strong>

                {(bookingResult?.booking_reference || bookingResult?._id) && (
                  <>
                    {" "}
                    (Ref:{" "}
                    <strong>
                      {
                        bookingResult.booking_reference || bookingResult._id
                      }
                    </strong>
                    )
                  </>
                )}

                .

                <br />

                Departure:{" "}
                <strong>
                  {formatDate(
                    selectedSchedule?.departure_date
                  )}
                </strong>

                <br />

                Return:{" "}
                <strong>
                  {formatDate(
                    selectedSchedule?.return_date
                  )}
                </strong>

                <br />

                Our team will contact you
                at{" "}
                {form.phone ||
                  form.email}.
              </p>

              <a
                href="/"
                className="bhk-cta-btn"
              >
                Back to Home
              </a>

            </div>
          </section>
        </main>

        <Footer />

        <style>{`
          .bhk-book-success {
            padding: 8rem 0 6rem;
          }

          .bhk-success-icon {
            width: 84px;
            height: 84px;
            border-radius: 50%;
            background: #1f4d3d;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 40px;
            font-weight: 700;
          }

          .bhk-book-success h2 {
            font-weight: 700;
            color: #1e1e1e;
          }

          .bhk-book-success p {
            color: #6b7280;
            max-width: 600px;
            margin: 1rem auto 2rem;
            line-height: 1.8;
          }

          .bhk-cta-btn {
            display: inline-block;
            background: #f5581f;
            color: #fff;
            font-weight: 600;
            padding: .85rem 2.25rem;
            border-radius: 8px;
            text-decoration: none;
          }
        `}</style>
      </>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <>
      <Header />

      <main
        className="main"
        id="top"
      >

        {/* =================================================
            BANNER
        ================================================= */}

        <section className="bhk-book-banner mt-7">

          <img
            className="bhk-banner-img"
            src="https://i.pinimg.com/1200x/85/62/a8/8562a863b19d2075eb119f1a22044bfe.jpg"
            alt="Booking Banner"
          />

          <div className="bhk-banner-overlay" />

          <div className="container position-relative text-center">

            <h1>
              Book Your Trip
            </h1>

            <p className="mb-0">

              <span>
                Home
              </span>

              <span className="sep">
                /
              </span>

              <span className="active">
                Booking
              </span>

            </p>

          </div>

        </section>

        {/* =================================================
            BOOKING SECTION
        ================================================= */}

        <section className="bhk-book-section">

          <div className="container">

            {/* =================================================
                STEPS
            ================================================= */}

            <div className="bhk-steps">

              {STEPS.map(
                (label, index) => (
                  <div
                    key={label}
                    className={
                      "bhk-step " +
                      (
                        index === step
                          ? "active"
                          : index < step
                            ? "done"
                            : ""
                      )
                    }
                  >

                    <span className="bhk-step-num">
                      {
                        index < step
                          ? "✓"
                          : index + 1
                      }
                    </span>

                    <span className="bhk-step-label">
                      {label}
                    </span>

                    {index <
                      STEPS.length - 1 && (
                        <span className="bhk-step-line" />
                      )}

                  </div>
                )
              )}

            </div>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="row g-4">

                {/* =================================================
                    LEFT
                ================================================= */}

                <div className="col-lg-8">

                  <div className="bhk-form-card">

                    {/* ERROR */}

                    {submitError && (
                      <div className="alert alert-danger">
                        {submitError}
                      </div>
                    )}

                    {/* =================================================
                        STEP 1
                    ================================================= */}

                    {step === 0 && (
                      <>
                        <h5 className="bhk-form-title">
                          Choose Your Trip
                        </h5>

                        {loadingPackages ? (
                          <div className="text-center py-4">

                            <div className="spinner-border" />

                            <p className="mt-2">
                              Loading packages...
                            </p>

                          </div>
                        ) : packages.length === 0 ? (
                          <div className="alert alert-warning">
                            No packages available right now.
                          </div>
                        ) : (
                          <>

                            {/* PACKAGE */}

                            <div className="mb-3">

                              <label className="bhk-label">
                                Tour Package
                              </label>

                              <select
                                name="packageId"
                                value={
                                  form.packageId
                                }
                                onChange={
                                  handlePackageChange
                                }
                                className="form-select bhk-input-plain"
                              >

                                <option value="">
                                  Select Package
                                </option>

                                {packages.map(
                                  (item) => (
                                    <option
                                      key={
                                        item._id
                                      }
                                      value={
                                        item._id
                                      }
                                    >
                                      {
                                        item.package_name
                                      }

                                      {" — "}

                                      {
                                        item.destination
                                      }
                                    </option>
                                  )
                                )}

                              </select>

                            </div>

                            {/* DEPARTURE */}

                            <div className="mb-3">

                              <label className="bhk-label">
                                Select Departure
                              </label>

                              <select
                                name="scheduleId"
                                value={
                                  form.scheduleId
                                }
                                onChange={
                                  handleChange
                                }
                                className="form-select bhk-input-plain"
                                disabled={
                                  !form.packageId ||
                                  loadingSchedules
                                }
                              >

                                <option value="">
                                  {!form.packageId
                                    ? "First select package"
                                    : loadingSchedules
                                      ? "Loading departures..."
                                      : availableSchedules.length === 0
                                        ? "No departure available"
                                        : "Select Departure"}
                                </option>

                                {availableSchedules.map(
                                  (
                                    schedule
                                  ) => (
                                    <option
                                      key={
                                        schedule._id
                                      }
                                      value={
                                        schedule._id
                                      }
                                    >

                                      {formatDate(
                                        schedule.departure_date
                                      )}

                                      {" → "}

                                      {formatDate(
                                        schedule.return_date
                                      )}

                                      {" | Seats: "}

                                      {
                                        schedule.available_seats
                                      }

                                    </option>
                                  )
                                )}

                              </select>

                            </div>

                            {/* SELECTED DEPARTURE */}

                            {selectedSchedule && (
                              <div className="alert alert-success">

                                <strong>
                                  Selected Departure
                                </strong>

                                <br />

                                Departure:{" "}
                                {formatDate(
                                  selectedSchedule.departure_date
                                )}

                                <br />

                                Return:{" "}
                                {formatDate(
                                  selectedSchedule.return_date
                                )}

                                <br />

                                Available Seats:{" "}

                                <strong>
                                  {
                                    selectedSchedule.available_seats
                                  }
                                </strong>

                              </div>
                            )}

                            {/* NO DEPARTURES */}

                            {form.packageId &&
                              !loadingSchedules &&
                              availableSchedules.length === 0 && (
                                <div className="alert alert-warning">
                                  No departures are available for this package.
                                  Please select another package.
                                </div>
                              )}

                            {/* PEOPLE */}

                            <div className="row g-3">

                              <div className="col-sm-6">

                                <label className="bhk-label">
                                  Adults
                                </label>

                                <input
                                  type="number"
                                  min="1"
                                  max="20"
                                  name="numberOfAdults"
                                  value={
                                    form.numberOfAdults
                                  }
                                  onChange={
                                    handleChange
                                  }
                                  className="form-control bhk-input-plain"
                                />

                              </div>

                              <div className="col-sm-6">

                                <label className="bhk-label">
                                  Children
                                </label>

                                <input
                                  type="number"
                                  min="0"
                                  max="20"
                                  name="numberOfChildren"
                                  value={
                                    form.numberOfChildren
                                  }
                                  onChange={
                                    handleChange
                                  }
                                  className="form-control bhk-input-plain"
                                />

                              </div>

                            </div>

                          </>
                        )}
                      </>
                    )}

                    {/* =================================================
                        STEP 2
                    ================================================= */}

                    {step === 1 && (
                      <>
                        <h5 className="bhk-form-title">
                          Traveler Information
                        </h5>

                        {/* CONTACT */}

                        <div className="row g-3 mb-4">

                          <div className="col-sm-6">

                            <label className="bhk-label">
                              Contact Name
                            </label>

                            <input
                              type="text"
                              name="name"
                              value={
                                form.name
                              }
                              onChange={
                                handleChange
                              }
                              className="form-control bhk-input-plain"
                              placeholder="Enter contact name"
                            />

                          </div>

                          <div className="col-sm-6">

                            <label className="bhk-label">
                              Phone
                            </label>

                            <input
                              type="tel"
                              name="phone"
                              value={
                                form.phone
                              }
                              onChange={
                                handleChange
                              }
                              className="form-control bhk-input-plain"
                              placeholder="Enter phone number"
                            />

                          </div>

                          <div className="col-12">

                            <label className="bhk-label">
                              Email
                            </label>

                            <input
                              type="email"
                              name="email"
                              value={
                                form.email
                              }
                              onChange={
                                handleChange
                              }
                              className="form-control bhk-input-plain"
                              placeholder="Enter email address"
                            />

                          </div>

                        </div>

                        {/* TRAVELERS */}

                        {travelers.map(
                          (
                            traveler,
                            index
                          ) => (
                            <div
                              key={index}
                              className="bhk-traveler-block"
                            >

                              <h6 className="bhk-traveler-title">
                                Traveler{" "}
                                {index + 1}

                                {traveler.is_primary &&
                                  " (Primary)"}
                              </h6>

                              <div className="row g-3">

                                {/* FIRST NAME */}

                                <div className="col-sm-6">

                                  <label className="bhk-label">
                                    First Name
                                  </label>

                                  <input
                                    type="text"
                                    value={
                                      traveler.first_name
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      handleTravelerChange(
                                        index,
                                        "first_name",
                                        e.target.value
                                      )
                                    }
                                    className="form-control bhk-input-plain"
                                  />

                                </div>

                                {/* LAST NAME */}

                                <div className="col-sm-6">

                                  <label className="bhk-label">
                                    Last Name
                                  </label>

                                  <input
                                    type="text"
                                    value={
                                      traveler.last_name
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      handleTravelerChange(
                                        index,
                                        "last_name",
                                        e.target.value
                                      )
                                    }
                                    className="form-control bhk-input-plain"
                                  />

                                </div>

                                {/* GENDER */}

                                <div className="col-sm-4">

                                  <label className="bhk-label">
                                    Gender
                                  </label>

                                  <select
                                    value={
                                      traveler.gender
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      handleTravelerChange(
                                        index,
                                        "gender",
                                        e.target.value
                                      )
                                    }
                                    className="form-select bhk-input-plain"
                                  >

                                    {GENDERS.map(
                                      (
                                        gender
                                      ) => (
                                        <option
                                          key={
                                            gender
                                          }
                                          value={
                                            gender
                                          }
                                        >
                                          {gender}
                                        </option>
                                      )
                                    )}

                                  </select>

                                </div>

                                {/* NATIONALITY */}

                                <div className="col-sm-4">

                                  <label className="bhk-label">
                                    Nationality
                                  </label>

                                  <input
                                    type="text"
                                    value={
                                      traveler.nationality
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      handleTravelerChange(
                                        index,
                                        "nationality",
                                        e.target.value
                                      )
                                    }
                                    className="form-control bhk-input-plain"
                                  />

                                </div>

                                {/* PASSPORT */}

                                <div className="col-sm-4">

                                  <label className="bhk-label">
                                    Passport Number
                                  </label>

                                  <input
                                    type="text"
                                    value={
                                      traveler.passport_number
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      handleTravelerChange(
                                        index,
                                        "passport_number",
                                        e.target.value
                                      )
                                    }
                                    className="form-control bhk-input-plain"
                                  />

                                </div>

                                {/* PASSPORT EXPIRY */}

                                <div className="col-sm-6">

                                  <label className="bhk-label">
                                    Passport Expiry
                                  </label>

                                  <input
                                    type="date"
                                    value={
                                      traveler.passport_expiry
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      handleTravelerChange(
                                        index,
                                        "passport_expiry",
                                        e.target.value
                                      )
                                    }
                                    className="form-control bhk-input-plain"
                                  />

                                </div>

                              </div>

                            </div>
                          )
                        )}

                        {/* NOTES */}

                        <div className="mb-3">

                          <label className="bhk-label">
                            Special Requests
                          </label>

                          <textarea
                            name="notes"
                            value={
                              form.notes
                            }
                            onChange={
                              handleChange
                            }
                            rows="3"
                            className="form-control bhk-input-plain"
                            placeholder="Any special requests..."
                          />

                        </div>

                      </>
                    )}

                    {/* =================================================
                        STEP 3
                    ================================================= */}

                    {step === 2 && (
                      <>
                        <h5 className="bhk-form-title">
                          Review Your Booking
                        </h5>

                        <ul className="bhk-review-list">

                          <li>
                            <span>
                              Package
                            </span>

                            <strong>
                              {
                                selectedPackage?.package_name
                              }
                            </strong>
                          </li>

                          <li>
                            <span>
                              Destination
                            </span>

                            <strong>
                              {
                                selectedPackage?.destination
                              }
                            </strong>
                          </li>

                          <li>
                            <span>
                              Departure
                            </span>

                            <strong>
                              {formatDate(
                                selectedSchedule?.departure_date
                              )}
                            </strong>
                          </li>

                          <li>
                            <span>
                              Return
                            </span>

                            <strong>
                              {formatDate(
                                selectedSchedule?.return_date
                              )}
                            </strong>
                          </li>

                          <li>
                            <span>
                              Available Seats
                            </span>

                            <strong>
                              {
                                selectedSchedule?.available_seats
                              }
                            </strong>
                          </li>

                          <li>
                            <span>
                              Travelers
                            </span>

                            <strong>
                              {
                                form.numberOfAdults
                              }
                              A /{" "}
                              {
                                form.numberOfChildren
                              }
                              C
                            </strong>
                          </li>

                          <li>
                            <span>
                              Contact
                            </span>

                            <strong>
                              {
                                form.name
                              }
                            </strong>
                          </li>

                          <li>
                            <span>
                              Total
                            </span>

                            <strong>
                              ₹
                              {pricing.total.toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </li>

                        </ul>

                        {/* PAYMENT */}

                        <div className="row g-3">

                          <div className="col-sm-7">

                            <label className="bhk-label">
                              Payment Method
                            </label>

                            <select
                              name="paymentMethod"
                              value={
                                form.paymentMethod
                              }
                              onChange={
                                handleChange
                              }
                              className="form-select bhk-input-plain"
                            >

                              {PAYMENT_METHODS.map(
                                (
                                  method
                                ) => (
                                  <option
                                    key={
                                      method.id
                                    }
                                    value={
                                      method.id
                                    }
                                  >
                                    {
                                      method.label
                                    }
                                  </option>
                                )
                              )}

                            </select>

                          </div>

                          <div className="col-sm-5">

                            <label className="bhk-label">
                              Currency
                            </label>

                            <select
                              name="currency"
                              value={
                                form.currency
                              }
                              onChange={
                                handleChange
                              }
                              className="form-select bhk-input-plain"
                            >

                              <option value="INR">
                                INR (₹)
                              </option>

                              <option value="USD">
                                USD ($)
                              </option>

                            </select>

                          </div>

                        </div>

                      </>
                    )}

                    {/* =================================================
                        BUTTONS
                    ================================================= */}

                    <div className="bhk-step-actions">

                      {step > 0 && (
                        <button
                          type="button"
                          onClick={back}
                          className="bhk-btn-outline"
                          disabled={
                            submitting
                          }
                        >
                          Back
                        </button>
                      )}

                      {step <
                        STEPS.length - 1 && (
                          <button
                            type="button"
                            onClick={next}
                            className="bhk-btn-solid ms-auto"
                            disabled={
                              submitting ||
                              (
                                step === 0 &&
                                (
                                  !form.packageId ||
                                  !form.scheduleId
                                )
                              )
                            }
                          >
                            Continue
                          </button>
                        )}

                      {step ===
                        STEPS.length - 1 && (
                          <button
                            type="submit"
                            className="bhk-btn-solid ms-auto"
                            disabled={
                              submitting
                            }
                          >
                            {submitting
                              ? "Submitting..."
                              : "Confirm Booking"}
                          </button>
                        )}

                    </div>

                  </div>

                </div>

                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="col-lg-4">

                  <div className="bhk-summary-card">

                    {selectedPackage?.featured_image && (
                      <img
                        src={`http://localhost:3000/media/${selectedPackage.featured_image}`}
                        alt={
                          selectedPackage.package_name
                        }
                        className="bhk-summary-img"
                      />
                    )}

                    <div className="bhk-summary-body">

                      <h6>
                        {
                          selectedPackage?.package_name ||
                          "Select a package"
                        }
                      </h6>

                      {selectedPackage && (
                        <p className="bhk-summary-place">
                          {
                            selectedPackage.destination
                          }
                        </p>
                      )}

                      {/* SELECTED DEPARTURE */}

                      {selectedSchedule && (
                        <div className="bhk-summary-departure">

                          <small>
                            Selected Departure
                          </small>

                          <strong>
                            {formatDate(
                              selectedSchedule.departure_date
                            )}
                          </strong>

                          <span>
                            Return:{" "}
                            {formatDate(
                              selectedSchedule.return_date
                            )}
                          </span>

                          <span>
                            Seats:{" "}
                            {
                              selectedSchedule.available_seats
                            }
                          </span>

                        </div>
                      )}

                      {/* PRICE */}

                      <div className="bhk-summary-row">

                        <span>
                          Base price ×{" "}
                          {totalTravelers || 1}
                        </span>

                        <span>
                          ₹
                          {pricing.base.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                      {pricing.discount >
                        0 && (
                          <div className="bhk-summary-row">

                            <span>
                              Discount
                            </span>

                            <span>
                              -₹
                              {pricing.discount.toLocaleString(
                                "en-IN"
                              )}
                            </span>

                          </div>
                        )}

                      <div className="bhk-summary-row">

                        <span>
                          Taxes & fees
                        </span>

                        <span>
                          ₹
                          {pricing.taxes.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                      <div className="bhk-summary-total">

                        <span>
                          Total
                        </span>

                        <span>
                          ₹
                          {pricing.total.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </form>

          </div>

        </section>

      </main>

      <Footer />

      {/* =======================================================
          CSS
      ======================================================= */}

      <style>{`

        .bhk-book-banner {
          position: relative;
          overflow: hidden;
          padding: 7rem 0 3.5rem;
          min-height: 280px;
          display: flex;
          align-items: center;
        }

        .bhk-banner-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .bhk-banner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.45);
        }

        .bhk-book-banner .container {
          z-index: 1;
        }

        .bhk-book-banner h1 {
          color: white;
          font-weight: 700;
        }

        .bhk-book-banner p {
          color: white;
        }

        .bhk-book-banner .sep {
          margin: 0 10px;
        }

        .bhk-book-banner .active {
          color: #f5581f;
          font-weight: 600;
        }

        .bhk-book-section {
          padding: 3.5rem 0 5rem;
          background: #f8f9fa;
        }

        .bhk-steps {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .bhk-step {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bhk-step-num {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .bhk-step.active .bhk-step-num {
          background: #1f4d3d;
          color: white;
        }

        .bhk-step.done .bhk-step-num {
          background: #f5581f;
          color: white;
        }

        .bhk-step-label {
          font-size: .85rem;
          font-weight: 600;
        }

        .bhk-step-line {
          width: 40px;
          height: 2px;
          background: #ddd;
          margin: 0 10px;
        }

        .bhk-form-card,
        .bhk-summary-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,.06);
        }

        .bhk-form-card {
          padding: 2rem;
        }

        .bhk-form-title {
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .bhk-label {
          display: block;
          font-size: .82rem;
          font-weight: 600;
          margin-bottom: 5px;
          color: #6b7280;
        }

        .bhk-input-plain {
          border-radius: 8px !important;
          padding: .65rem .8rem !important;
        }

        .bhk-traveler-block {
          border: 1px dashed #ddd;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .bhk-traveler-title {
          color: #1f4d3d;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .bhk-review-list {
          list-style: none;
          padding: 0;
        }

        .bhk-review-list li {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: .7rem 0;
          border-bottom: 1px dashed #eee;
        }

        .bhk-review-list li span {
          color: #6b7280;
        }

        .bhk-review-list li strong {
          text-align: right;
        }

        .bhk-step-actions {
          display: flex;
          margin-top: 2rem;
          gap: .75rem;
        }

        .bhk-btn-solid {
          background: #1f4d3d;
          color: white;
          border: none;
          padding: .7rem 1.75rem;
          border-radius: 8px;
          font-weight: 600;
        }

        .bhk-btn-solid:hover {
          background: #173c30;
          color: white;
        }

        .bhk-btn-solid:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .bhk-btn-outline {
          background: white;
          border: 1px solid #ccc;
          padding: .7rem 1.5rem;
          border-radius: 8px;
        }

        .bhk-summary-card {
          overflow: hidden;
          position: sticky;
          top: 100px;
        }

        .bhk-summary-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .bhk-summary-body {
          padding: 1.5rem;
        }

        .bhk-summary-body h6 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: .35rem;
        }

        .bhk-summary-place {
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .bhk-summary-departure {
          background: #f1f8f5;
          border-radius: 10px;
          padding: .85rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .bhk-summary-departure small {
          color: #6b7280;
        }

        .bhk-summary-departure strong {
          color: #1f4d3d;
        }

        .bhk-summary-departure span {
          font-size: .85rem;
          color: #6b7280;
        }

        .bhk-summary-row,
        .bhk-summary-total {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: .5rem 0;
        }

        .bhk-summary-row span:first-child {
          color: #6b7280;
        }

        .bhk-summary-total {
          border-top: 1px solid #eee;
          margin-top: .5rem;
          padding-top: 1rem;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .bhk-summary-total span:last-child {
          color: #1f4d3d;
        }

        @media(max-width:991px) {

          .bhk-summary-card {
            position: static;
            margin-top: 1rem;
          }

        }

        @media(max-width:576px) {

          .bhk-form-card {
            padding: 1.25rem;
          }

          .bhk-steps {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 5px;
          }

          .bhk-step-label {
            white-space: nowrap;
          }

          .bhk-step-line {
            width: 20px;
            margin: 0 5px;
          }

        }

      `}</style>
    </>
  );
};

export default Booking;