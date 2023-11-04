
import { ReactNode } from 'react'
import { cn } from '../../lib'

interface CardBodyProps {
	children: ReactNode
	noPadding?: boolean
	className?: string
}
export const CardBody =({ children, noPadding, className }: CardBodyProps)=> {
	return (
		<div className={cn(noPadding ? 'p-0' : 'px-4 py-3', className)}>
			{children}
		</div>
	)
}
