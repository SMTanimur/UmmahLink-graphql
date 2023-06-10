"use client"
import { ReactNode } from 'react'
import { cn } from '../../lib'

interface CardFooterProps {
	children: ReactNode
	className?: string
}

export const  CardFooter =({ children, className }: CardFooterProps) =>{
	return (
		<footer
			className={cn(
				'py-4 px-5 lg:px-6 w-full text-sm bg-gray-100 dark:bg-gray-700 overflow-hidden',
				className
			)}
		>
			{children}
		</footer>
	)
}
