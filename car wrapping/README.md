# WrapPro - Car Wrapping Company Website

A modern, professional website for a car wrapping and vehicle branding company based in South Africa.

## Features

- **Dark Automotive Theme** - Bold, premium design with high-contrast accents
- **Fully Responsive** - Mobile-first design that works on all devices
- **Multiple Pages**:
  - Homepage with hero section and service previews
  - Services page with detailed offerings
  - Portfolio/Gallery with filtering and lightbox
  - About Us page with company story
  - Pricing/Quote page with contact form
  - Contact page with map integration
- **Interactive Elements**:
  - Portfolio filtering by vehicle type
  - Before/after image slider
  - FAQ accordion
  - Mobile navigation menu
  - Smooth scrolling
  - Form validation
- **WhatsApp Integration** - Floating chat button
- **SEO Optimized** - Meta tags and semantic HTML
- **Fast Loading** - Optimized CSS and JavaScript

## File Structure

```
car-wrapping/
├── index.html          # Homepage
├── services.html       # Services page
├── portfolio.html      # Portfolio/Gallery
├── about.html         # About Us
├── pricing.html       # Get a Quote
├── contact.html       # Contact page
├── style.css          # Main stylesheet
├── main.js            # JavaScript functionality
└── README.md          # This file
```

## Customization Guide

### 1. Update Contact Information

Replace the placeholder contact details in all HTML files:

- **Phone**: `+27 11 123 4567` → Your actual phone number
- **Email**: `info@wrappro.co.za` → Your actual email
- **Address**: Update in `contact.html` and footer sections
- **WhatsApp**: Update the WhatsApp link in the floating button

### 2. Add Real Images

Replace image placeholders with actual photos:

- Hero section background image/video
- Portfolio gallery images
- Team member photos
- Workshop/process images
- Client logos

**Example for images:**
```html
<!-- Replace this -->
<div class="image-placeholder">Image Description</div>

<!-- With this -->
<img src="images/your-image.jpg" alt="Description">
```

### 3. Update Google Maps

In `contact.html`, replace the Google Maps iframe with your actual location:

1. Go to [Google Maps](https://www.google.com/maps)
2. Find your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in `contact.html`

### 4. Customize Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --accent-red: #e63946;      /* Primary accent color */
    --accent-yellow: #ffd60a;   /* Secondary accent */
    --accent-blue: #00d4ff;     /* Tertiary accent */
    /* ... */
}
```

### 5. Update Social Media Links

In the footer sections, update social media links:

```html
<a href="YOUR_INSTAGRAM_URL" aria-label="Instagram">...</a>
<a href="YOUR_FACEBOOK_URL" aria-label="Facebook">...</a>
<a href="YOUR_YOUTUBE_URL" aria-label="YouTube">...</a>
```

### 6. Connect Forms to Backend

Currently, forms show alerts. To connect to a backend:

1. Update the form submission handlers in `js/main.js`
2. Replace the alert with actual API calls:

```javascript
fetch('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    // Handle success
})
.catch(error => {
    // Handle error
});
```

### 7. Add Real Portfolio Images

1. Create an `images/portfolio/` folder
2. Add your portfolio images
3. Update `portfolio.html` with actual image paths:

```html
<img src="images/portfolio/project1.jpg" alt="Project Description">
```

### 8. Update Company Information

- Company name: Search and replace "WrapPro" if needed
- Years of experience: Update in trust badges
- Statistics: Update numbers in badges and stats sections
- Testimonials: Replace with real customer reviews

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize Images**: Use WebP format and compress images before uploading
2. **Minify CSS/JS**: Use minified versions for production
3. **CDN**: Consider using a CDN for faster loading
4. **Caching**: Implement browser caching headers
5. **Lazy Loading**: Images are set up for lazy loading

## SEO Checklist

- ✅ Meta descriptions on all pages
- ✅ Semantic HTML structure
- ✅ Alt text for images (add when you add real images)
- ✅ Proper heading hierarchy
- ✅ Mobile-friendly design
- ⚠️ Add sitemap.xml
- ⚠️ Add robots.txt
- ⚠️ Submit to Google Search Console

## Next Steps

1. Replace placeholder content with real information
2. Add actual images and photos
3. Set up form backend (email service or database)
4. Configure Google Maps with your location
5. Test on multiple devices
6. Set up hosting and domain
7. Submit to search engines

## Support

For questions or customization help, refer to the code comments or contact your developer.

---

**Built with ❤️ for WrapPro Car Wrapping**

