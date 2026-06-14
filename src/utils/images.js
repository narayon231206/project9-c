export const FALLBACK_FACILITY_IMAGE =
  'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=1000';

export const isHttpUrl = (value) => /^https?:\/\//i.test(value || '');

export const getSafeImageSrc = (value, fallback = FALLBACK_FACILITY_IMAGE) => {
  return isHttpUrl(value) ? value : fallback;
};

export const handleImageFallback = (event, fallback = FALLBACK_FACILITY_IMAGE) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallback;
};
