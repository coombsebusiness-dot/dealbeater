import Image from "next/image";

interface GalleryImage {
  id: string;

  src: string;

  alt: string;

  caption?: string;
}

interface GalleryBlockProps {
  id: string;

  heading?: string;

  images: GalleryImage[];
}

export function GalleryBlock({
  id,
  heading,
  images,
}: GalleryBlockProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      className="scroll-mt-24 space-y-4"
    >
      {heading && (
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {heading}
        </h3>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <figure
            key={image.id}
            className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {image.caption && (
              <figcaption className="border-t border-slate-800 px-4 py-3 text-sm leading-6 text-slate-400">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}