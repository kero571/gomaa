import Image from "next/image";
import Icon from "../ui/Icon";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate h-[calc(100svh-3.5rem)] overflow-hidden bg-bg"
    >
      {/* Mobile Background Image */}
      <div className="pointer-events-none absolute inset-0 md:hidden">
        <Image
          src="/profile-Photoroom.png"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-top opacity-85"
        />
      </div>

      {/* Dark Gradient for Readable Text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/10 md:hidden" />

      {/* Hero Content */}
      <div className="container-x relative z-10 flex h-full flex-col justify-end py-5 text-center md:flex-row md:items-center md:justify-between md:gap-10 md:py-8 md:text-start lg:gap-16">

        {/* Text */}
        <div className="mx-auto w-full max-w-2xl md:mx-0 md:min-w-0 md:flex-1">
          <span className="chip animate-fadeUp">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Video Editor | Motion Graphics
          </span>

          <h1 className="mx-auto mt-3 text-[clamp(1.65rem,6vw,2.35rem)] font-black leading-[1.35] animate-fadeUp [animation-delay:.08s] sm:text-4xl md:mx-0 md:mt-5 md:text-4xl lg:text-5xl xl:text-6xl">
            اصنع فيديوهات تجعل
            <br />
            <span className="text-brand">
              جمهورك يتوقف عن التمرير
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/85 animate-fadeUp [animation-delay:.16s] sm:text-base md:mx-0 md:mt-5 md:leading-7">
            مونتاج احترافي وموشن جرافيك سينمائي لبناء هوية بصرية قوية وزيادة
            تفاعل حساباتك وصفحاتك.
          </p>

          <a
            href="#works"
            className="btn mx-auto mt-5 inline-flex !py-3 backdrop-blur md:mx-0 md:mt-6"
          >
            <Icon name="play" className="h-4 w-4" />
            شاهد أعمالي
          </a>
        </div>

        {/* Desktop Portrait */}
        <div className="relative mt-6 hidden aspect-[1065/1600] w-[clamp(18rem,30vw,25rem)] shrink-0 overflow-hidden rounded-3xl border border-brand/20 bg-white/[0.02] md:block">
          <Image
            src="/profile-Photoroom.png"
            alt="جمعه - مونتير فيديو ومصمم موشن جرافيك"
            fill
            priority
            sizes="(max-width: 1023px) 288px, 30vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}