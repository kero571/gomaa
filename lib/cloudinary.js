// Poster image taken from the first frame of a Cloudinary video (9:16, small, auto format).
export function videoPoster(url) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/video/upload/")) return "";
  return url
    .replace("/upload/", "/upload/so_2,c_fill,ar_9:16,w_480,q_auto,f_auto/")
    .replace(/\.[a-z0-9]+(\?.*)?$/i, ".jpg");
}

// Unsigned browser upload (image or video). Needs an unsigned upload preset.
export function uploadToCloudinary(file, onProgress) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  return new Promise((resolve, reject) => {
    if (!cloud || !preset) return reject(new Error("إعدادات Cloudinary ناقصة في ملف .env"));
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", preset);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloud}/auto/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      let data = {};
      try { data = JSON.parse(xhr.responseText); } catch {}
      if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
        resolve({ url: data.secure_url, type: data.resource_type });
      } else {
        reject(new Error(data?.error?.message || "فشل الرفع"));
      }
    };
    xhr.onerror = () => reject(new Error("مشكلة في الاتصال أثناء الرفع"));
    xhr.send(fd);
  });
}
