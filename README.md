# Instagram Smart Grid Slicer

A minimal but polished web app that automatically slices large mural images into perfectly aligned Instagram posts that look seamless both in the grid preview and as individual posts.

## Problem Solved

Instagram has an inconsistency between individual posts and the profile grid:

- **Individual posts**: 1080×1350 px
- **Profile grid**: ~1015×1350 px (shrinks by 65px width)

This mismatch breaks seamless murals when viewed in the profile grid.

## Solution

This app uses a precise algorithm with Instagram's exact constants to ensure perfect alignment:

### Constants

- `POST_W = 1080` (individual post width)
- `POST_H = 1350` (individual post height)
- `GRID_W = 1015` (grid display width)
- `GRID_H = 1350` (grid display height)
- `LEFT_PAD = 32` (left padding for centering)
- `RIGHT_PAD = 33` (right padding for centering)

### Algorithm

1. Calculate the center position for each tile in the mural
2. Extract a 1015×1350 slice centered at that position (grid dimensions)
3. Extract a 1080×1350 background centered at that position
4. Place the 1015×1350 slice onto the 1080×1350 background (32px left offset)
5. Export as 1080×1350 JPEG files
6. Output in left→right, top→bottom posting order

## Features

- **Drag & Drop Upload**: Easy image upload with validation
- **Auto-Detection**: Automatically detects optimal grid dimensions
- **Manual Override**: Adjust columns/rows manually if needed
- **Preview Grid**: See exactly how your mural will look
- **Posting Order**: Clear numbering for correct posting sequence
- **High-Res Export**: Optional 2x scaling for better quality
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

The core algorithm ensures perfect Instagram grid consistency:

```typescript
// For each tile (row, col):
const centerX = col * POST_W + POST_W / 2;  // Center position
const centerY = row * POST_H + POST_H / 2;

// Extract 1015×1350 slice centered at this position
const sliceLeft = centerX - GRID_W / 2;
const sliceTop = centerY - GRID_H / 2;
const slice = extract(mural, sliceLeft, sliceTop, GRID_W, GRID_H);

// Extract 1080×1350 background centered at this position
const backgroundLeft = centerX - POST_W / 2;
const backgroundTop = centerY - POST_H / 2;
const background = extract(mural, backgroundLeft, backgroundTop, POST_W, POST_H);

// Center slice on background (32px left offset)
const final = composite(background, slice, LEFT_PAD, 0);
```

This ensures that when Instagram shrinks the 1080×1350 post to 1015×1350 in the grid, it shows exactly the right portion of your mural.

## License

MIT License - see LICENSE file for details.
