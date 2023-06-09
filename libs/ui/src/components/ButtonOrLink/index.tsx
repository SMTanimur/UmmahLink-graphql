/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
"use client"
import { ComponentPropsWithRef, forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface Styles {
	ignoreStyles?: boolean
	fullWidth?: boolean
	rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
	className?: string
}

export type ButtonOrLinkProps = ComponentPropsWithRef<'button'> &
	ComponentPropsWithRef<'a'> &
	Styles

export interface Props extends ButtonOrLinkProps {
	preserveRedirect?: boolean
}

const ButtonOrLink = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(
	({ href, preserveRedirect, ...props }, ref) => {
	
			return <Link href={href!}></Link>
		
	}
)

ButtonOrLink.displayName = 'ButtonOrLink'
export default ButtonOrLink
