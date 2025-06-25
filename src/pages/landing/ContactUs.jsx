import React from "react";
import ContactCard from "../../components/common/ContactCard";

const ContactUs = () => {
  return (
    <main className=" container mx-auto px-10 py-8">
      <h1 className="text-2xl font-bold">We're here to help</h1>
      <p className="mt-2 text-light opacity-70">
        If you have any questions or need assistance, please don't hesitate to
        contact us.
      </p>

      <ContactCard />
    </main>
  );
};

export default ContactUs;
