# Instagram Smart Grid Slicer

A minimal but polished web app that automatically slices large mural images into perfectly aligned Instagram posts that look seamless both in the grid preview and as individual posts.

## Problem Solved

Instagram now uses a vertical-first 3:4 layout in the profile grid, and also supports 3:4 feed posts (for example 1080×1440 px). To build seamless murals that still align perfectly in this new grid, you need to slice your large artwork into tiles that exactly match this 3:4 ratio.

If you upload mismatched sizes (like older 4:5-only exports), Instagram may letterbox or crop in ways that break your mural alignment.

## Solution

This app slices your mural into perfectly aligned 3:4 tiles that match the updated Instagram grid:

### Constants

- `POST_W = 1080` (individual post width)
- `POST_H = 1440` (individual post height, 3:4)
- `GRID_W = 1080` (profile grid display width, 3:4)
- `GRID_H = 1440` (profile grid display height, 3:4)

### Algorithm

1. Normalize the mural to `POST_W * columns` by `POST_H * rows` (3:4 tiles).
2. Slice the mural into equal 1080×1440 rectangles in left→right, top→bottom order.
3. Optionally upscale each tile for higher-resolution exports.
4. Export each slice as a high‑quality JPEG or PNG.

There is also an optional **Legacy 4:5 smart mode** which uses the original algorithm:

- 1080×1350 posts with a 1015×1350 &quot;safe width&quot; for the profile grid.
- A 1015×1350 slice is centered on a 1080×1350 background taken from precise mural regions, so your mural is seamless both in the grid and when each post is opened, just like the original version of this app.

## Features

- **Drag & Drop Upload**: Easy image upload with validation
- **Smart Auto-Detection**: Intelligently detects grid dimensions with tolerance for small variations
- **Manual Override**: Adjust columns/rows manually if needed
- **Preview Grid**: See exactly how your mural will look
- **Posting Order**: Clear numbering for correct posting sequence
- **High Quality Export**: Maximum JPEG quality (100%) for crisp results
- **ZIP Download**: All slices packaged for easy download

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Image Processing**: Sharp
- **ZIP Generation**: Archiver

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload**: Drag and drop or click to upload your mural image
2. **Configure**: Adjust grid dimensions if needed (auto-detected by default)
3. **Process**: Click "Generate Instagram Slices" to create the slices
4. **Preview**: Review the grid preview and individual posts
5. **Download**: Download the ZIP file with all slices
6. **Post**: Upload to Instagram in numerical order (1, 2, 3, etc.)

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── upload/route.ts      # Image upload endpoint
│   │   ├── process/route.ts     # Image processing endpoint
│   │   └── download/route.ts    # ZIP download endpoint
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── components/
│   ├── ImageUploader.tsx        # File upload component
│   ├── GridControls.tsx         # Grid configuration
│   ├── PreviewGrid.tsx          # Preview with posting order
│   └── DownloadButton.tsx       # Download functionality
└── lib/
    └── slicer.ts                # Core slicing algorithm
```

## Algorithm Details

The core algorithm for the new 3:4 grid is intentionally simple and robust:

```typescript
// For each tile (row, col) on a normalized mural:
const left = col * POST_W;   // 1080
const top = row * POST_H;    // 1440

// Extract a 3:4 tile directly
const tile = extract(mural, left, top, POST_W, POST_H);
```

Because both the profile grid and the feed now share the same 3:4 ratio, each exported slice appears exactly the same in the grid as it does in the feed post — no extra padding or hidden “safe width” is required.

## License

MIT License - see LICENSE file for details.
