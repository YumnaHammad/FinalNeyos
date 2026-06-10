import React from "react";

const logos = [
  {
    src: "https://pelco-566282893.imgix.net/c1_v1_Fresno_Police_Department_Logo.png?auto=format&fit=clip&q=80&w=328&s=4e321565dce7338c234a88ee5adfce39",
    alt: "Hard Rock Hotel",
  },
  {
    src: "https://pelco-566282893.imgix.net/c1_v1_Chukchansi_Logo_2023-01-12-022321_iycj.png?auto=format&fit=clip&q=80&w=328&s=7b23920962b8e96f270824d266b3c2b0",
    alt: "MMA2",
  },
  {
    src: "https://pelco-566282893.imgix.net/c1_v1_Istanbul_BB_Logo_2023-01-12-022015_owef.png?auto=format&fit=clip&q=80&w=328&s=2c705514432f68301845389b84691262",
    alt: "T-Mobile Arena",
  },
  {
    src: "https://pelco-566282893.imgix.net/c1_v1_Fresno_Yosemite_Airport_Logo.png?auto=format&fit=clip&q=80&w=328&s=2ed45e331cb291638271f90eaa80d020",
    alt: "Fresno Yosemite International Airport",
  },
  {
    src: "https://pelco-566282893.imgix.net/c1_v1_t-mobile_Logo-copy.png?auto=format&fit=clip&q=80&w=328&s=bd47b0e173f55357f5262f44221991ac",
    alt: "Istanbul Municipality",
  },
  {
    src: "https://pelco-566282893.imgix.net/c1_v1_Murtala_Muhammed_Airport_Logo.png?auto=format&fit=clip&q=80&w=328&s=c654890f8fec42e68f091379633eee2f",
    alt: "Chukchansi Gold Resort & Casino",
  },
  {
    src: "https://pelco-566282893.imgix.net/c1_v1_Hard_Rock_Logo.png?auto=format&fit=clip&q=80&w=328&s=a0323a0c68f1108d9a8d2cb869dcddc0",
    alt: "Fresno Police",
  },
];

export default function TrustedBy() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center py-16">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-10">
          Trusted by 100,000+ organizations across the globe
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-80 grayscale opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
