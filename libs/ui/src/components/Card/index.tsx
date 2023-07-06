
import React, { ElementType } from 'react'
import { CardBody  } from './CardBody'

import { cn } from '../../lib'
import { CardFooter } from './CardFooter'



interface CardProps {
	noPadding?: boolean
	children: React.ReactNode
	as?: ElementType;
	className?: string
	container?: boolean
	rounded?: 'sm' | 'md' | 'lg' | 'xl'
	shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
}

export function Card({
	children,
	container = true,
	as: Tag = 'div',
	rounded = 'sm',
	shadow = 'none',
	className,
}: CardProps) {
	return (
		<Tag
			className={cn(
				'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 ',
				container ? 'mx-auto' : '',
				rounded && `rounded-${rounded}`,
				shadow !== 'none' && `shadow-${shadow}`,
				className
			)}
		>
			{children}
		</Tag>
	)
}

Card.Body = CardBody
Card.Footer = CardFooter
