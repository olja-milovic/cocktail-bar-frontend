function sendToGoogleAnalytics({name, delta, id}) {
	// gtag is defined in public/index.html
	// eslint-disable-next-line no-undef
	gtag('event', name, {
		event_category: 'Web Vitals',
		// The `id` value will be unique to the current page load. When sending
		// multiple values from the same page (e.g. for CLS), Google Analytics can
		// compute a total by grouping on this ID (note: requires `eventLabel` to
		// be a dimension in your report).
		event_label: id,
		// Google Analytics metrics must be integers, so the value is rounded.
		// For CLS the value is first multiplied by 1000 for greater precision
		// (note: increase the multiplier for greater precision if needed).
		value: Math.round(name === 'CLS' ? delta * 1000 : delta),
		// Use a non-interaction event to avoid affecting bounce rate.
		non_interaction: true,
	});
}

import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
	getCLS(sendToGoogleAnalytics);
	getFID(sendToGoogleAnalytics);
	getFCP(sendToGoogleAnalytics);
	getLCP(sendToGoogleAnalytics);
	getTTFB(sendToGoogleAnalytics);
});
