import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "May 2025 Workshop Photos — Her Web Impact",
  description: "Photos from our May 2025 Digital Skills Course for Women across both Cardiff cohorts.",
}

const photos = [
  { src: "/images/IMG_1256.jpg", alt: "Participants working on laptops during the digital skills workshop" },
  { src: "/images/IMG_1254.jpg", alt: "Workshop session at Women's Connect First, Cardiff" },
  { src: "/images/IMG_2354.jpg", alt: "Participant receiving her digital skills certificate" },
  { src: "/images/IMG_2352.jpg", alt: "Participant receiving her digital skills certificate" },
  { src: "/images/IMG_2349.jpg", alt: "Participant receiving her digital skills certificate" },
]

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#EEE7FF]">
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] hover:underline mb-8"
        >
          ← Back to Her Web Impact
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          May 2025 Workshop Photos
        </h1>
        <p className="text-gray-600 mb-10">
          Our Digital Skills Course for Women — delivered across two cohorts in Cardiff, funded by the National Lottery Community Fund.
        </p>

        <div className="columns-1 sm:columns-2 gap-4 space-y-4">
          {photos.map((photo) => (
            <div key={photo.src} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={1000}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-white border border-[#B86BFF]/25 p-6 text-center shadow-sm">
          <p className="font-extrabold text-gray-900 text-lg mb-1">Congratulations to all our graduates! 🎉</p>
          <p className="text-gray-600 text-sm">Thank you to everyone who took part and to the National Lottery Community Fund for making it possible.</p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6D28D9] transition-colors"
          >
            Back to Her Web Impact
          </Link>
        </div>

      </div>
    </main>
  )
}
