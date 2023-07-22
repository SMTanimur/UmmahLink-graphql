import React, { ElementType, MouseEvent } from 'react'
import { CardBody  } from './CardBody'

import { cn } from '../../lib'
import { CardFooter } from './CardFooter'



interface CardProps {
	noPadding?: boolean
	children: React.ReactNode
	as?: ElementType;
	className?: string;
  forceRounded?: boolean;
  dataTestId?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
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
	forceRounded = false,
  dataTestId = '',
  onClick,
	className,
}: CardProps) {
	return (
		<Tag
		className={cn(
			forceRounded ? 'rounded-xl' : 'rounded-none sm:rounded-xl',
			'border bg-white dark:border-gray-700 dark:bg-black',
        container ? 'mx-auto' : '',
				rounded && `rounded-${rounded}`,
				shadow !== 'none' && `shadow-${shadow}`,
			className
		)}
		data-testid={dataTestId}
		onClick={onClick}
	>
		{children}
	</Tag>
	)
}

Card.Body = CardBody
Card.Footer = CardFooter