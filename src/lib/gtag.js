const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

const pageView = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export { GA_TRACKING_ID, pageView, event };
