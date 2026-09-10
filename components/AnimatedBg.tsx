const images = [
  'https://img.freepik.com/free-photo/digital-art-with-city-landscape-architecture_23-2151065702.jpg',
  'https://i.pinimg.com/736x/d9/5a/ed/d95aed10b9e7cd5ae58e01db19883552.jpg',
  'https://images.wallpapersden.com/image/download/black-and-white-snow-winter-night_bGpuZW6UmZqaraWkpJRmbmdlrWZnamg.jpg',
  'https://wallpaper.dog/large/17061716.jpg',
  'https://wallpaper.dog/large/10847083.jpg',
  'https://wallpaper.dog/large/17061733.jpg',
  'https://e1.pxfuel.com/desktop-wallpaper/183/125/desktop-wallpaper-black-moon-17-mb-dark-forest-with-moon.jpg',
]

interface Props {
  overlay?: string
}

export default function AnimatedBg({ overlay = 'rgba(10,10,10,0.55)' }: Props) {
  return (
    <>
      <div className="bg-slide fixed inset-0 z-0 pointer-events-none">
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" />
        ))}
      </div>
      {/* Многослойный оверлей: тёмный сверху, прозрачный в центре, тёмный снизу */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(10,10,10,0.75) 0%,
              ${overlay} 30%,
              ${overlay} 70%,
              rgba(10,10,10,0.85) 100%
            )
          `,
        }}
      />
    </>
  )
}
