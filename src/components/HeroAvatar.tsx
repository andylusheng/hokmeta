import Image from 'next/image'

interface HeroAvatarProps {
  avatar: string
  name: string
  size?: 'sm' | 'md' | 'lg'
}

export default function HeroAvatar({ avatar, name, size = 'md' }: HeroAvatarProps) {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 64
  }

  return (
    <div className="relative group">
      <div className={`relative rounded-full overflow-hidden border-2 border-gray-700`}
           style={{ width: sizeMap[size], height: sizeMap[size] }}>
        <Image
          src={avatar}
          alt={`${name} hero icon`}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface border border-border rounded text-sm text-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {name}
      </div>
    </div>
  )
}
