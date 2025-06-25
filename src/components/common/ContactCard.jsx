import { Phone, User2 } from "lucide-react";

const ContactCard = () => {
  const contact = {
    manager: "Brian",
    phone: "08123456789",
  };

  return (
    <div className="max-w-sm mt-12  glassmorphism rounded-2xl shadow-lg p-6 flex items-center gap-4 glassmorphism">
      <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-500/20 rounded-full p-3">
        <User2 className="text-accent" />
      </div>
      <div className="flex-grow">
        <h4 className="text-lg font-semibold text-light">Manager: {contact.manager}</h4>
        <div className="flex items-center gap-2 text-sm text-light mt-1">
          <Phone className="w-4 h-4" />
          <span>{contact.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
