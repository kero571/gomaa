"use client";
import { Field, Group, IconSelect, ImageField, ListEditor, Uploader, ICONS, SOCIAL_ICONS, ghost } from "./ui";
import { videoPoster } from "@/lib/cloudinary";

// set(key, valueOrFn) comes from the dashboard. These helpers build field setters.
const upd = (set, key, field) => (v) => set(key, (prev) => ({ ...prev, [field]: v }));
const updSec = (set, name, field) => (v) =>
  set("sections", (prev) => ({ ...prev, [name]: { ...prev[name], [field]: v } }));

function SecTexts({ c, set, name, fields }) {
  return (
    <>
      {fields.map(([f, label, multiline]) => (
        <Field key={f} label={label} value={c.sections[name][f]} onChange={updSec(set, name, f)} multiline={multiline} />
      ))}
    </>
  );
}

function HeroTab({ c, set }) {
  const h = (f) => upd(set, "hero", f);
  return (
    <Group title="أول الصفحة (الهيرو)">
      <Field label="الاسم في القائمة (إنجليزي)" value={c.brand} onChange={(v) => set("brand", v)} ltr />
      <Field label="الشارة الصغيرة فوق العنوان" value={c.hero.badge} onChange={h("badge")} ltr />
      <Field label="العنوان - السطر الأول" value={c.hero.title1} onChange={h("title1")} />
      <Field label="العنوان - السطر الملوّن" value={c.hero.title2} onChange={h("title2")} />
      <Field label="الوصف" value={c.hero.text} onChange={h("text")} multiline />
      <Field label="نص الزرار الأول" value={c.hero.primaryBtn} onChange={h("primaryBtn")} />
      <Field label="نص الزرار التاني" value={c.hero.secondaryBtn} onChange={h("secondaryBtn")} />
      <ImageField label="صورة الهيرو" value={c.hero.image} fallback="/profile-Photoroom.png" onChange={h("image")} />
    </Group>
  );
}

function AboutTab({ c, set }) {
  const a = (f) => upd(set, "about", f);
  return (
    <div className="grid gap-4">
      <Group title="نبذة عني">
        <Field label="عنوان القسم" value={c.about.title} onChange={a("title")} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="كلمة قبل الاسم" value={c.about.intro} onChange={a("intro")} />
          <Field label="الاسم (بيظهر بلون مميز)" value={c.about.name} onChange={a("name")} />
        </div>
        <Field label="باقي النص (بعد الاسم)" value={c.about.text} onChange={a("text")} multiline rows={5} />
        <ImageField label="الصورة الصغيرة" value={c.about.image} fallback="/profile.png" onChange={a("image")} />
      </Group>
      <Group title="المهارات">
        <ListEditor
          items={c.skills}
          onChange={(v) => set("skills", v)}
          itemLabel="مهارة"
          addLabel="إضافة مهارة"
          newItem={() => ({ icon: "film", label: "" })}
          render={(it, patch) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <IconSelect label="الأيقونة" value={it.icon} onChange={(v) => patch({ icon: v })} options={ICONS} />
              <Field label="النص" value={it.label} onChange={(v) => patch({ label: v })} />
            </div>
          )}
        />
      </Group>
    </div>
  );
}

function StatsTab({ c, set }) {
  return (
    <Group title="الإحصائيات">
      <ListEditor
        items={c.stats}
        onChange={(v) => set("stats", v)}
        itemLabel="رقم"
        addLabel="إضافة إحصائية"
        newItem={() => ({ value: "", label: "" })}
        render={(it, patch) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="الرقم (مثال: 150+)" value={it.value} onChange={(v) => patch({ value: v })} />
            <Field label="الوصف" value={it.label} onChange={(v) => patch({ label: v })} />
          </div>
        )}
      />
    </Group>
  );
}

function WorkItem({ w, patch }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
      <video
        src={w.src}
        poster={w.cover || undefined}
        controls
        preload="none"
        playsInline
        className="aspect-[9/16] h-56 rounded-xl bg-black object-cover"
      />
      <div className="grid content-start gap-3">
        <div className="flex flex-wrap gap-2">
          <Uploader label="استبدال الفيديو" accept="video/*" onDone={(r) => patch({ src: r.url, cover: videoPoster(r.url) })} />
          <Uploader label="رفع صورة مصغرة" accept="image/*" onDone={(r) => patch({ cover: r.url })} />
          <button type="button" className={ghost} onClick={() => patch({ cover: videoPoster(w.src) })}>
            صورة تلقائية من الفيديو
          </button>
        </div>
        <details className="text-xs">
          <summary className="cursor-pointer text-white/60">الروابط (متقدم)</summary>
          <div className="mt-3 grid gap-3">
            <Field label="رابط الفيديو" value={w.src} onChange={(v) => patch({ src: v })} ltr />
            <Field label="رابط الصورة المصغرة" value={w.cover} onChange={(v) => patch({ cover: v })} ltr />
          </div>
        </details>
      </div>
    </div>
  );
}

function WorksTab({ c, set }) {
  return (
    <div className="grid gap-4">
      <Group title="عنوان القسم">
        <SecTexts c={c} set={set} name="works" fields={[["eyebrow", "العنوان الصغير"], ["title", "العنوان"], ["button", "نص زرار 'الأعمال كاملة'"]]} />
        <Field label="رابط 'الأعمال كاملة' (سيبه فاضي لو مش عايز الزرار)" value={c.worksLink} onChange={(v) => set("worksLink", v)} ltr />
      </Group>
      <Group title={`الفيديوهات (${c.works.length})`}>
        <Uploader
          label="+ رفع فيديوهات جديدة (تقدر تختار أكتر من واحد)"
          accept="video/*"
          multiple
          onDone={(r) =>
            set("works", (prev) => [
              { id: Date.now() + Math.floor(Math.random() * 1000), src: r.url, cover: videoPoster(r.url) },
              ...prev,
            ])
          }
        />
        <ListEditor
          items={c.works}
          onChange={(v) => set("works", v)}
          itemLabel="فيديو"
          render={(w, patch) => <WorkItem w={w} patch={patch} />}
        />
      </Group>
    </div>
  );
}

function ServicesTab({ c, set }) {
  return (
    <div className="grid gap-4">
      <Group title="عنوان القسم">
        <SecTexts c={c} set={set} name="services" fields={[["eyebrow", "العنوان الصغير"], ["title", "العنوان"], ["text", "الوصف", true]]} />
      </Group>
      <Group title="الخدمات">
        <ListEditor
          items={c.services}
          onChange={(v) => set("services", v)}
          itemLabel="خدمة"
          addLabel="إضافة خدمة"
          newItem={() => ({ icon: "film", title: "", text: "" })}
          render={(it, patch) => (
            <div className="grid gap-3">
              <IconSelect label="الأيقونة" value={it.icon} onChange={(v) => patch({ icon: v })} options={ICONS} />
              <Field label="اسم الخدمة" value={it.title} onChange={(v) => patch({ title: v })} />
              <Field label="الوصف" value={it.text} onChange={(v) => patch({ text: v })} multiline />
            </div>
          )}
        />
      </Group>
    </div>
  );
}

function StepsTab({ c, set }) {
  return (
    <div className="grid gap-4">
      <Group title="عنوان القسم">
        <SecTexts c={c} set={set} name="process" fields={[["eyebrow", "العنوان الصغير"], ["title", "العنوان"]]} />
      </Group>
      <Group title="الخطوات">
        <ListEditor
          items={c.steps}
          onChange={(v) => set("steps", v)}
          itemLabel="خطوة"
          addLabel="إضافة خطوة"
          newItem={() => ({ title: "", text: "" })}
          render={(it, patch) => (
            <div className="grid gap-3">
              <Field label="عنوان الخطوة" value={it.title} onChange={(v) => patch({ title: v })} />
              <Field label="الوصف" value={it.text} onChange={(v) => patch({ text: v })} multiline />
            </div>
          )}
        />
      </Group>
    </div>
  );
}

function FaqTab({ c, set }) {
  return (
    <div className="grid gap-4">
      <Group title="عنوان القسم">
        <SecTexts c={c} set={set} name="faq" fields={[["eyebrow", "العنوان الصغير"], ["title", "العنوان"]]} />
      </Group>
      <Group title="الأسئلة">
        <ListEditor
          items={c.faqs}
          onChange={(v) => set("faqs", v)}
          itemLabel="سؤال"
          addLabel="إضافة سؤال"
          newItem={() => ({ q: "", a: "" })}
          render={(it, patch) => (
            <div className="grid gap-3">
              <Field label="السؤال" value={it.q} onChange={(v) => patch({ q: v })} />
              <Field label="الإجابة" value={it.a} onChange={(v) => patch({ a: v })} multiline />
            </div>
          )}
        />
      </Group>
    </div>
  );
}

function ContactTab({ c, set }) {
  const k = (f) => upd(set, "contact", f);
  return (
    <Group title="قسم التواصل">
      <Field label="العنوان الصغير" value={c.contact.eyebrow} onChange={k("eyebrow")} />
      <Field label="العنوان" value={c.contact.title} onChange={k("title")} />
      <Field label="الوصف" value={c.contact.text} onChange={k("text")} multiline />
      <Field label="نص زرار واتساب" value={c.contact.button} onChange={k("button")} />
      <Field label="رقم واتساب (بكود الدولة، بدون + مثال: 201159150080)" value={c.contact.whatsapp} onChange={k("whatsapp")} ltr />
      <Field label="الرسالة الجاهزة اللي تظهر عند العميل" value={c.contact.message} onChange={k("message")} multiline />
    </Group>
  );
}

function FooterTab({ c, set }) {
  return (
    <div className="grid gap-4">
      <Group title="حسابات السوشيال">
        <ListEditor
          items={c.socials}
          onChange={(v) => set("socials", v)}
          itemLabel="حساب"
          addLabel="إضافة حساب"
          newItem={() => ({ icon: "instagram", label: "", href: "" })}
          render={(it, patch) => (
            <div className="grid gap-3">
              <IconSelect label="الأيقونة" value={it.icon} onChange={(v) => patch({ icon: v })} options={SOCIAL_ICONS} />
              <Field label="الاسم" value={it.label} onChange={(v) => patch({ label: v })} ltr />
              <Field label="الرابط" value={it.href} onChange={(v) => patch({ href: v })} ltr />
            </div>
          )}
        />
      </Group>
      <Group title="الفوتر">
        <Field label="نص الحقوق" value={c.footerText} onChange={(v) => set("footerText", v)} />
      </Group>
    </div>
  );
}

export const TABS = [
  { id: "hero", label: "الرئيسية", Comp: HeroTab },
  { id: "about", label: "نبذة عني", Comp: AboutTab },
  { id: "stats", label: "الإحصائيات", Comp: StatsTab },
  { id: "works", label: "الأعمال", Comp: WorksTab },
  { id: "services", label: "الخدمات", Comp: ServicesTab },
  { id: "steps", label: "خطوات العمل", Comp: StepsTab },
  { id: "faq", label: "الأسئلة", Comp: FaqTab },
  { id: "contact", label: "التواصل", Comp: ContactTab },
  { id: "footer", label: "السوشيال والفوتر", Comp: FooterTab },
];
