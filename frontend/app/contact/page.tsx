"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  Globe,
  CreditCard,
  RefreshCw,
  Package
} from "lucide-react";
import { api } from "@/lib/api";
import { useStore } from "@/lib/context";

function ContactContent() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get("topic") === "returns" ? "returns" : searchParams.get("topic") === "tracking" ? "tracking" : "general";

  const [activeTab, setActiveTab] = useState(initialTopic);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [returnReason, setReturnReason] = useState("size_exchange");
  const [desiredResolution, setDesiredResolution] = useState("exchange");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { showToast } = useStore();

  useEffect(() => {
    if (activeTab === "returns") {
      setSubject(`Return & Exchange Request — Order ${orderNumber || "[Order #]"}`);
    } else if (activeTab === "tracking") {
      setSubject(`Order Tracking Inquiry — Order ${orderNumber || "[Order #]"}`);
    } else {
      setSubject("General Atelier Consultation");
    }
  }, [activeTab, orderNumber]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    let detailedMessage = message;
    if (activeTab === "returns") {
      detailedMessage = `[RETURN & EXCHANGE INTAKE]\nOrder Number: ${orderNumber || "Not specified"}\nReason: ${returnReason}\nDesired Resolution: ${desiredResolution}\n\nClient Notes:\n${message}`;
    } else if (activeTab === "tracking") {
      detailedMessage = `[ORDER TRACKING INTAKE]\nOrder Reference: ${orderNumber || "Not specified"}\n\nClient Notes:\n${message}`;
    }

    try {
      const res = await api.submitContactInquiry({
        name,
        email,
        subject: subject || (activeTab === "returns" ? "Return & Exchange Request" : "General Consultation"),
        message: detailedMessage
      });

      if (res?.success) {
        setIsSuccess(true);
        setName("");
        setEmail("");
        setOrderNumber("");
        setMessage("");
        showToast(
          activeTab === "returns"
            ? "Return request received. Reverse pickup will be initiated."
            : "Inquiry delivered directly to the atelier concierge.",
          "success"
        );
      } else {
        setErrorMessage(res?.message || "Failed to transmit message. Please try again.");
      }
    } catch {
      setErrorMessage("Network error while connecting to atelier. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-void-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold tracking-super-wide uppercase text-void-slate block">
            CLIENT CONCIERGE &bull; ATELIER LIAISON &bull; RETURNS &amp; EXCHANGES
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-void-black font-display uppercase mt-2">
            CONTACT &amp; CLIENT SERVICES
          </h1>
          <p className="text-xs sm:text-sm text-void-slate mt-2 max-w-xl leading-relaxed">
            Reach out directly to our Jamnagar atelier for general consultations, order tracking, or seamless 15-day returns and size exchanges.
          </p>

          {/* Inquiry Category Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab("general")}
              className={`text-xs px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all ${
                activeTab === "general"
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-neutral-700 hover:text-black border border-neutral-200"
              }`}
            >
              General Consultation
            </button>
            <button
              onClick={() => setActiveTab("returns")}
              className={`text-xs px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "returns"
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-neutral-700 hover:text-black border border-neutral-200"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Return &amp; Exchange (15 Days)</span>
            </button>
            <button
              onClick={() => setActiveTab("tracking")}
              className={`text-xs px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "tracking"
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-neutral-700 hover:text-black border border-neutral-200"
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Track Your Order</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DEDICATED 15-DAY RETURN & EXCHANGE PROTOCOL BANNER       */}
        {/* ========================================================= */}
        {activeTab === "returns" && (
          <div className="bg-[#121214] text-white p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 text-[#D4AF37]">
              <RefreshCw className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest font-display">
                15-DAY COMPLIMENTARY RETURN &amp; EXCHANGE PROTOCOL
              </h3>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
              We stand by our material architecture. If the fit isn’t exact or you wish to exchange for another silhouette, submit your request below within 15 days of receiving your package.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs border-t border-neutral-800">
              <div className="space-y-1">
                <span className="text-[#D4AF37] font-mono text-[10px] block uppercase font-bold">01 / WINDOW</span>
                <p className="font-semibold text-white">15 Days from Delivery</p>
                <p className="text-neutral-400 text-[11px]">Unworn, unwashed, with all archival tags attached.</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#D4AF37] font-mono text-[10px] block uppercase font-bold">02 / PICKUP</span>
                <p className="font-semibold text-white">Doorstep Reverse Courier</p>
                <p className="text-neutral-400 text-[11px]">Scheduled across all pin codes in India at no additional charge.</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#D4AF37] font-mono text-[10px] block uppercase font-bold">03 / RESOLUTION</span>
                <p className="font-semibold text-white">Direct Refund / Size Swap</p>
                <p className="text-neutral-400 text-[11px]">Refunds credited directly to original payment mode (UPI/Card) in 48h.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact / Return Intake Form with Smooth Curves */}
          <div className="lg:col-span-7 bg-void-white border border-void-border/70 p-6 sm:p-10 shadow-sm rounded-3xl">
            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-void-black">
                  {activeTab === "returns" ? "RETURN REQUEST INITIATED" : "INQUIRY TRANSMITTED"}
                </h3>
                <p className="text-xs text-void-slate max-w-md mx-auto leading-relaxed">
                  {activeTab === "returns"
                    ? "Our logistics team will verify your order reference and schedule reverse pickup with our courier partner. You will receive an SMS and email update shortly."
                    : "An atelier concierge specialist will review your inquiry and respond within 24 business hours."}
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 bg-void-black text-void-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 rounded-full shadow-md"
                >
                  SUBMIT ANOTHER REQUEST
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Julian Vance"
                      className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@voidessentials.store"
                      className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                    />
                  </div>
                </div>

                {/* If Return/Exchange or Tracking: Order Number is Prominently Requested */}
                {(activeTab === "returns" || activeTab === "tracking") && (
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-void-black mb-1.5">
                        Order Number (e.g. VOID-12345678) *
                      </label>
                      <input
                        type="text"
                        required
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="VOID-XXXXXX"
                        className="w-full bg-white border border-void-border px-4 py-3 rounded-xl text-xs font-mono text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black uppercase transition-all"
                      />
                    </div>

                    {activeTab === "returns" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                            Reason for Return / Exchange
                          </label>
                          <select
                            value={returnReason}
                            onChange={(e) => setReturnReason(e.target.value)}
                            className="w-full bg-white border border-void-border px-3 py-2.5 rounded-xl text-xs text-void-black focus:outline-none cursor-pointer"
                          >
                            <option value="size_exchange">Size Exchange (Need different size)</option>
                            <option value="silhouette_adjustment">Style / Silhouette exchange</option>
                            <option value="color_preference">Colorway preference</option>
                            <option value="fabric_inquiry">Textile / Handfeel preference</option>
                            <option value="manufacturing_defect">Manufacturing flaw or defect</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                            Preferred Resolution
                          </label>
                          <select
                            value={desiredResolution}
                            onChange={(e) => setDesiredResolution(e.target.value)}
                            className="w-full bg-white border border-void-border px-3 py-2.5 rounded-xl text-xs text-void-black focus:outline-none cursor-pointer"
                          >
                            <option value="exchange">Exchange for new piece / size</option>
                            <option value="refund">Direct refund to original payment</option>
                            <option value="store_credit">Store credit voucher (+10% bonus)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                    {activeTab === "returns" ? "Pickup Address & Fit Feedback *" : "Message / Specification *"}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      activeTab === "returns"
                        ? "Please confirm your full reverse pickup address, preferred pickup date, and details about the size replacement you would like."
                        : "Describe your inquiry or order reference number. Our atelier reviews each communication personally."
                    }
                    className="w-full bg-void-cream border border-void-border p-4 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black leading-relaxed transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-void-black text-void-white py-4 px-6 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-lg rounded-full hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  <span>
                    {isSubmitting
                      ? "TRANSMITTING TO ATELIER..."
                      : activeTab === "returns"
                      ? "INITIATE RETURN / EXCHANGE DISPATCH"
                      : "SEND INQUIRY"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Channels & Atelier Disclosures */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Verified Atelier Details (Matched from voidessentials.store/contact) */}
            <div className="bg-void-pitch text-void-white p-6 sm:p-8 border border-void-charcoal space-y-5 rounded-3xl shadow-md">
              <span className="text-[10px] font-bold tracking-super-wide uppercase text-neutral-400 block border-b border-white/10 pb-2">
                VERIFIED ATELIER CHANNELS
              </span>
              
              <div className="space-y-4 text-xs">
                
                {/* Official Support Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-void-ash uppercase text-[10px] block font-bold">Official Support Email</span>
                    <a
                      href="mailto:support@voidessentials.store"
                      className="text-void-white underline font-mono text-xs hover:opacity-80"
                    >
                      support@voidessentials.store
                    </a>
                  </div>
                </div>

                {/* Direct Phone Support */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-void-ash uppercase text-[10px] block font-bold">Client Concierge Telephone</span>
                    <a
                      href="tel:+919510490976"
                      className="text-void-white underline font-semibold text-sm hover:opacity-80 tracking-wide"
                    >
                      +91 95104 90976
                    </a>
                  </div>
                </div>

                {/* Instant WhatsApp Support */}
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-void-ash uppercase text-[10px] block font-bold">Instant WhatsApp Desk</span>
                    <a
                      href="https://wa.me/919510490976"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold underline text-xs"
                    >
                      Chat on WhatsApp (+91 95104 90976) &rarr;
                    </a>
                  </div>
                </div>

                {/* Operational Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-void-ash uppercase text-[10px] block font-bold">Concierge Support Hours</span>
                    <span className="text-void-white font-medium">Monday &ndash; Saturday: 10:00 &ndash; 19:00 IST</span>
                    <span className="block text-[10px] text-neutral-400 mt-0.5">24/7 Digital Intake &bull; Rapid Dispatch</span>
                  </div>
                </div>

                {/* Dispatch & Atelier Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-void-ash uppercase text-[10px] block font-bold">Physical Dispatch Repository</span>
                    <span className="text-neutral-200 block text-xs leading-relaxed">
                      Thatharo Shop, Nagar Naka, Jamnagar, Gujarat - 361305, India
                    </span>
                  </div>
                </div>

                {/* Textile Origin */}
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-void-ash uppercase text-[10px] block font-bold">Textile Engineering &amp; Sourcing</span>
                    <span className="text-neutral-200 block text-xs">
                      Surat, Gujarat - 395007, India
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      100% Pure Long-Staple Supima Cotton
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Protocols & Payment Security */}
            <div className="bg-void-white border border-void-border/70 p-6 space-y-3 text-xs rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 text-void-black font-bold uppercase text-[11px] tracking-wider">
                <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                <span>ACCEPTED PAYMENT MODES</span>
              </div>
              <p className="text-void-slate leading-relaxed text-[11px]">
                UPI (GPay, PhonePe, Paytm), Credit &amp; Debit Cards (Visa, Mastercard, RuPay), and Secure Net Banking.
              </p>
              <div className="border-t border-void-border/60 pt-2 text-[10px] text-neutral-400">
                Languages supported: English, Hindi, Gujarati.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void-cream py-16 text-center text-xs tracking-widest uppercase">Loading Contact Concierge...</div>}>
      <ContactContent />
    </Suspense>
  );
}
