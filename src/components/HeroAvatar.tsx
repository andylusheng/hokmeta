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
  )
}
