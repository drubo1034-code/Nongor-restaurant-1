import { Phone, Mail, MapPin, Facebook } from "lucide-react";

export default function Contact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Contact Info Bento */}
      <section id="contact" className="bento-card bg-[#1c1917] p-6 md:p-8 shadow-sm border border-stone-800 col-span-1 md:col-span-2">
        <div className="flex flex-col h-full justify-between gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center gap-1">
              <h3 className="text-xs font-bold uppercase text-[#d97706] tracking-widest mb-2">যোগাযোগের ঠিকানা</h3>
              <p className="text-xl md:text-2xl font-extrabold text-stone-200">+880 1919-671919</p>
              <p className="text-sm text-stone-400 font-medium break-all">nongorrestora.patiya@yahoo.com</p>
            </div>
            
            <div className="flex flex-col gap-3 justify-center">
              <a 
                href="tel:+8801919671919"
                className="bg-[#991b1b] text-white text-center py-3 rounded-xl text-xs font-bold hover:bg-[#7f1d1d] transition"
              >
                কল করুন
              </a>
              <a 
                href="mailto:nongorrestora.patiya@yahoo.com"
                className="border border-stone-700 bg-stone-800 text-stone-300 text-center py-3 rounded-xl text-xs font-bold hover:bg-stone-700 transition"
              >
                ইমেইল পাঠান
              </a>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-6 mt-2 grid md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-stone-900 text-[#d97706] rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">অবস্থান</p>
                <p className="text-xs font-bold text-stone-300">এ. এস. রাহাত আলী স্কুল, পটিয়া</p>
              </div>
            </div>
            
            <div className="flex items-center md:justify-end gap-3">
              <span className="text-xs font-bold text-stone-500 uppercase">সোশ্যাল:</span>
              <a 
                href="https://www.facebook.com/share/18PGixzXJu/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Bento */}
      <section className="bento-card p-0 shadow-sm border-b-4 border-[#d97706] h-[300px] md:h-auto md:min-h-[250px] col-span-1 border-stone-800 bg-[#1c1917]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14774.960060938363!2d91.95764024467364!3d22.298083042456075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad5ee5fc6509f3%3A0xc3f6311651eb14cb!2sPatiya%20Thana!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
          className="w-full h-full absolute inset-0 grayscale-[0.2] contrast-[1.1] opacity-90 hover:grayscale-0 hover:opacity-100 transition duration-500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </section>
    </div>
  );
}
