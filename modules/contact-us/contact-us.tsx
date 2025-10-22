import React from "react";

type Props = {
  contactUsername: string | null;
};

const ContactUs = ({ contactUsername }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <p className="text-gray-300 text-lg mb-8">
            We&apos;re here to help! If you need any assistance or have
            questions, feel free to reach out to us on Telegram. Our team will
            do their best to respond as quickly as possible.
          </p>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-600">
            <p className="text-sm text-gray-400 mb-2 uppercase">
              Telegram Username
            </p>
            {contactUsername ? (
              <p className="text-2xl font-semibold text-blue-400">
                {contactUsername}
              </p>
            ) : (
              <p className="text-xl text-gray-400">
                Contact information unavailable at the moment
              </p>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400 text-center">
              Typically responds within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
