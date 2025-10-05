import React, { useState } from 'react'
import { HelpCircle } from 'lucide-react'

interface TooltipProps {
	content: string
	children?: React.ReactNode
	className?: string
}

export function Tooltip({ content, children, className = '' }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<div className='relative inline-block'>
			<button
				type='button'
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
				onFocus={() => setIsVisible(true)}
				onBlur={() => setIsVisible(false)}
				onClick={(e) => {
					e.preventDefault()
					setIsVisible(!isVisible)
				}}
				className={`inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ${className}`}
				aria-label='Więcej informacji'
			>
				{children || <HelpCircle className='w-4 h-4' />}
			</button>

			{isVisible && (
				<div className='absolute z-50 w-64 p-3 text-xs text-white bg-gray-900 rounded-lg shadow-lg bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none'>
					<div className='relative'>
						{content}
						{/* Strzałka */}
						<div className='absolute top-full left-1/2 transform -translate-x-1/2 -mt-1'>
							<div className='border-4 border-transparent border-t-gray-900'></div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
