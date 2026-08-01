import Image from "next/image";

interface ImageBlockProps {
  id: string;

  src: string;

  alt: string;

  caption?: string;

  width?: number;

  height?: number;
}

export function ImageBlock({
  id,
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: ImageBlockProps) {
  return (
    <figure
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900"
    >
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 960px"
          className="h-auto w-full object-cover"
        />
      </div>

      {caption && (
        <figcaption className="border-t border-slate-800 px-4 py-3 text-sm leading-6 text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}