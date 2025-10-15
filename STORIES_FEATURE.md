# Photo Stories Feature

Instagram-style photo stories with auto-slideshow on your homepage! 🎉

## Features

✅ **Auto-slideshow carousel** - Stories rotate every 5 seconds
✅ **Click to navigate** - Each story can link to a custom URL or detail page
✅ **Dashboard management** - Upload, edit, and delete stories from `/dashboard`
✅ **Responsive design** - Works beautifully on mobile and desktop
✅ **Progress indicators** - Visual progress bars show slideshow timing
✅ **Thumbnail navigation** - Click thumbnails to jump to specific stories

## How to Use

### 1. Access Dashboard
Navigate to `/dashboard` in your browser to manage stories.

### 2. Upload a Story
- Click "Add Story" button
- Fill in the form:
  - **Image**: Upload an image (max 5MB recommended)
  - **Title**: Story title (required)
  - **Description**: Optional description
  - **Custom Link**: Optional URL (leave empty to use default detail page)
  - **Order**: Display order (lower numbers appear first)
  - **Show on homepage**: Toggle visibility

### 3. View Stories
Stories will automatically appear below your bio-poem on the homepage.

## Database Schema

The `stories` table includes:
- `id`: Auto-increment primary key
- `title`: Story title
- `description`: Optional description
- `image`: Image URL or base64 data
- `link`: Optional custom URL
- `order`: Display order
- `is_show`: Visibility toggle
- `created_at`: Creation timestamp
- `updated_at`: Update timestamp

## API Endpoints

### GET `/api/stories`
Fetches all visible stories ordered by `order` field.

### POST `/api/stories`
Creates a new story. Requires `title` and `image`.

### PUT `/api/stories?id={id}`
Updates an existing story.

### DELETE `/api/stories?id={id}`
Deletes a story by ID.

## Image Upload Notes

⚠️ **Current Implementation**: Uses base64 encoding (works but has size limits)

### For Production (Recommended):
Consider integrating with a cloud storage service:
- **Cloudinary**: Easy image optimization and CDN
- **AWS S3**: Scalable and cost-effective
- **Vercel Blob**: Native Vercel integration
- **Uploadthing**: Simple file upload API

### Example with Cloudinary:
```typescript
// services/cloudinary.ts
export async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_preset');
  
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
    { method: 'POST', body: formData }
  );
  
  const data = await response.json();
  return data.secure_url;
}
```

## Customization

### Change Slideshow Duration
Edit `Stories.tsx` line 23:
```typescript
const interval = setInterval(() => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
}, 5000); // Change 5000 to your preferred milliseconds
```

### Change Image Aspect Ratio
Edit `Stories.tsx` line 59:
```typescript
<div className='relative h-[400px] w-full...'>
  // Change h-[400px] to your preferred height
```

## Troubleshooting

### "413 Body exceeded 1mb limit" Error
✅ **Fixed!** The API now supports up to 10MB uploads.

### Stories Not Showing
- Check that `is_show` is set to `true`
- Verify stories exist in the database
- Check browser console for errors

### Image Not Loading
- Ensure image URL is valid
- For base64 images, check size isn't too large
- Verify image format is supported (jpg, png, webp, etc.)

## Tech Stack

- **Frontend**: Next.js, React, Framer Motion, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM (PostgreSQL)
- **Notifications**: Sonner (toast messages)
- **Animations**: Framer Motion

## Files Created/Modified

```
src/
├── common/types/stories.ts               (NEW)
├── modules/
│   ├── home/components/
│   │   ├── Stories.tsx                   (NEW)
│   │   └── Introduction.tsx              (MODIFIED)
│   └── dashboard/components/
│       └── Stories/                      (NEW)
│           ├── StoriesManager.tsx
│           ├── StoryUploadForm.tsx
│           └── index.ts
├── pages/
│   ├── api/stories.ts                    (NEW)
│   ├── stories/[id].tsx                  (NEW)
│   ├── index.tsx                         (MODIFIED)
│   └── _app.tsx                          (MODIFIED)
├── services/stories.ts                   (NEW)
└── prisma/schema.prisma                  (MODIFIED)
```

Enjoy your new Instagram-style stories feature! 🚀






