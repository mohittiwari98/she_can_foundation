import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { User, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setServerError("");

    try {
      await axios.post("http://localhost:5000/api/submit", data);

      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    }
  };

  // ================= SUCCESS SCREEN =================
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-rose-100 px-4">
        <div className="bg-white/80 backdrop-blur-lg border border-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="w-14 h-14 text-green-600" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Message Sent!
          </h2>

          <p className="text-gray-500 leading-relaxed mb-8">
            Thank you for contacting She Can Foundation.
            Our team will review your message and get back to you within
            2–3 business days.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:scale-105 transition-all duration-300"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  // ================= FORM SCREEN =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute bottom-20 right-10 w-72 h-72 bg-rose-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-2xl p-8">
          {/* Logo & Heading */}
          <div className="text-center mb-8">
            <div className="mx-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
              S
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-800">
              She Can Foundation
            </h1>

            <p className="text-pink-600 font-medium mt-2">
              Empowering Women Through Opportunities
            </p>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Get in Touch
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              We'd love to hear from you. Fill out the form below and we'll
              get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                  size={18}
                />

                <input
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-4 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all"
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                  size={18}
                />

                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-4 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>

              <div className="relative">
                <MessageSquare
                  className="absolute left-4 top-4 text-pink-500"
                  size={18}
                />

                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-4 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all resize-none"
                />
              </div>

              {errors.message && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {serverError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />

              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;