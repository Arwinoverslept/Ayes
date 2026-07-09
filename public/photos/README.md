# 📸 Where to drop Chriselle's photos

Place her photos in **this folder** (`public/photos/`).

The site references them by filename in **`src/data/birthdayData.js`**.
By default the gallery and timeline show soft placeholder slots. To use real
photos:

1. Copy the image files into this folder, e.g.:
   ```
   public/photos/memory-1.jpg
   public/photos/memory-2.jpg
   public/photos/timeline-2025.jpg
   ```

2. Open `src/data/birthdayData.js` and set the `src` fields to match, e.g.:
   ```js
   photos: [
     { src: "/photos/memory-1.jpg", caption: "That perfect afternoon" },
     ...
   ]
   ```

That's it — no other code changes are needed. Any photo left as `null`
automatically shows a pretty placeholder instead.

### Tips
- **Recommended size:** ~1200px on the long edge keeps things sharp and fast.
- **Formats:** `.jpg`, `.png`, and `.webp` all work. `.webp` is smallest.
- Filenames are case-sensitive on some hosts — keep them lowercase to be safe.
