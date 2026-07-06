<?php

namespace App\Services;

use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Log;

class ImageUploadService
{
    /**
     * Upload and optimize an image.
     *
     * @param UploadedFile $file
     * @param string $folder Directory under public storage (e.g., 'products', 'gallery')
     * @param int|null $width Target width for scaling
     * @param int|null $height Target height for scaling
     * @return string Relational path in storage (e.g., 'products/abc123xyz.jpg')
     */
    public function upload(UploadedFile $file, string $folder, int $width = null, int $height = null): string
    {
        // Ensure folder directory exists inside public disk
        if (! Storage::disk('public')->exists($folder)) {
            Storage::disk('public')->makeDirectory($folder);
        }

        // Generate clean random filename
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $targetPath = $folder . '/' . $fileName;

        try {
            // Attempt to optimize and resize using Intervention Image
            if (class_exists(ImageManager::class)) {
                $manager = new ImageManager(new Driver());
                $image = $manager->read($file->getRealPath());

                // Resize / scale image while preserving aspect ratio
                if ($width || $height) {
                    $image->scale(width: $width, height: $height);
                } else {
                    // Default max width optimization for regular uploads
                    $image->scale(width: 1200);
                }

                // Compress and encode as JPEG (or keep original format if preferred)
                $extension = strtolower($file->getClientOriginalExtension());
                $encoded = match ($extension) {
                    'png' => $image->toPng(),
                    'webp' => $image->toWebp(80),
                    'gif' => $image->toGif(),
                    default => $image->toJpeg(80),
                };

                // Save to Laravel Public Storage disk
                Storage::disk('public')->put($targetPath, (string)$encoded);

                return $targetPath;
            }
        } catch (Exception $e) {
            // Log warning but fallback to standard Laravel upload if Intervention fails
            Log::warning("Intervention Image optimization failed: " . $e->getMessage() . ". Falling back to standard storage.");
        }

        // Fallback: Standard Laravel upload
        $path = $file->storeAs($folder, $fileName, 'public');

        return $path;
    }

    /**
     * Delete an image from storage.
     *
     * @param string|null $path
     * @return bool
     */
    public function delete(?string $path): bool
    {
        if ($path && Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }

        return false;
    }
}
