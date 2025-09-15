"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Awards() {
  return (
    <section className=" bg-white dark:bg-gray-900">
      <div
      className="w-full px-4 lg:px-12 py-12 border-y border-transparent dark:border-y-white"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
         {/* <div>
  <h2 className="text-2xl lg:text-3xl font-semibold relative inline-block"
      style={{ color: "var(--foreground)" }}>
    Awards & Achievements
    <span className="absolute left-0 -bottom-3 w-20 h-[3px] bg-cyan-400"></span>
  </h2>
  <p className="text-base lg:text-lg max-w-2xl mt-6"
     style={{ color: "var(--foreground)" }}>
    Our achievements and awards showcase the recognition we have received
            for consistently delivering value, excellence, and outstanding
            contributions in our field.
  </p>
</div> */}
  <div style={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>
      <h1 style={{ margin: 0, fontSize: '38px', fontWeight:'550', display: 'flex', alignItems: 'baseline' }}>
        <span style={{ color: '#000',marginRight:10 }}>Awards &</span>
        <span style={{ color: '#0FC6D6', alignItems:'center'}}>
            Achievements
          <hr style={{ border: '2px solid #D3F1F8', width: '100%', marginTop: '1px',borderRadius:10 }} />
        </span>
      </h1>
      <p
      className="text-base lg:text-lg max-w-2xl mt-6"
      style={{ color: "var(--foreground)" }}
    >
      Our achievements and awards showcase the recognition we have received
            for consistently delivering value, excellence, and outstanding
            contributions in our field.
    </p>
    </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            el: ".awards-pagination", // 👈 custom container
            clickable: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <SwiperSlide key={i}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-start justify-center hover:shadow-lg transition">
                <Image
                  src="/awards.png"
                  alt="Award"
                  width={350}
                  height={350}
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 👇 Pagination outside */}
        <div className=" awards-pagination mt-6 flex justify-center"></div>
      </div>
    </section>
  );
}
