'use client'
import { Crown, Mail } from 'lucide-react'
import Image from 'next/image'

interface TeamCardProps {
  name: string
  role: string
  avatarUrl: string
  email?: string
  isCurrentUser?: boolean
}

const TeamCard = ({ name, role, avatarUrl, email, isCurrentUser = false }: TeamCardProps) => {
  return (
    <div className={`relative bg-white rounded-xl px-6 py-5 flex flex-col items-center gap-3 border transition-shadow hover:shadow-sm
      ${isCurrentUser ? 'border-primary ring-1 ring-primary bg-primary-fade/20' : 'border-gray-100'}`}
    >
      {/* Crown badge for current user */}
      {isCurrentUser && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white rounded-full p-1">
          <Crown size={14} fill="white" />
        </div>
      )}

      {/* Avatar */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100">
          <Image
            src={avatarUrl}
            alt={name}
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Online indicator */}
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
      </div>

      {/* Name & Role */}
      <div className="text-center">
        <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
          {name}
          {isCurrentUser && (
            <span className="block text-primary text-[13px] font-medium">(You)</span>
          )}
        </h3>
        <p className="text-[13px] text-gray-500 mt-0.5">{role}</p>
      </div>

      {/* Mail button */}
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-fade text-primary-text hover:bg-primary hover:text-white transition-colors"
        aria-label={`Email ${name}`}
      >
        <Mail size={15} />
      </button>
    </div>
  )
}

export default TeamCard