/* eslint-disable @typescript-eslint/no-non-null-assertion */

"use client"
import Link from 'next/link'
import { cn } from '../../lib'
import type { Props as ButtonOrLinkProps } from '../ButtonOrLink'
import ButtonOrLink from '../ButtonOrLink'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'

import {
	ElementType,
	ComponentProps,
	Fragment,
	ReactElement,
	ReactNode,
} from 'react'

type MenuItemProps = ButtonOrLinkProps & {
	icon?: ReactElement
}

export function MenuItem({
	icon,
	className,
	children,
	...props
}: MenuItemProps) {
	const Icon = icon
	return (
		<HeadlessMenu.Item>
			{({ active }) => (
				<Link
				  href={ props.href ?  String(props.href!) : ''}
					{...props}
					className={cn(
						active
							? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200'
							: 'dark:text-gray-200',
						'flex items-center w-full px-4 py-2 text-sm leading-5 text-left '
					)}
				>
					<span className={cn('flex items-center', className)}>
						{icon && (
							<div className="mr-2 text-lg text-gray-700 dark:text-white">
								{Icon}
							</div>
						)}
						{children}
					</span>
				</Link>
			)}
		</HeadlessMenu.Item>
	)
}

type Props<T extends ElementType> = ComponentProps<T> & {
	as?: ElementType
	dropdown?: ReactNode
	className?: string
	children?: ReactNode
	position?: 'left' | 'right'
	contentWidth?: boolean
	dropdownClassName?: string
}

export function Menu<TTag extends ElementType<any>>({
	as,
	dropdown,
	children,
	className,
	dropdownClassName,
	...props
}: Props<TTag>) {
	return (
		<div className="flex flex-col relative">
			<HeadlessMenu>
				{({ open }) => (
					<>
						<HeadlessMenu.Button
							as={as}
							className={cn('focus:outline-none', className)}
							{...props}
						>
							{children}
						</HeadlessMenu.Button>

						<Transition
							show={open}
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<HeadlessMenu.Items
								static
								className={cn(
									'z-20 overflow-hidden origin-top-right absolute right-5 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none',
									dropdownClassName
								)}
							>
								{dropdown}
							</HeadlessMenu.Items>
						</Transition>
					</>
				)}
			</HeadlessMenu>
		</div>
	)
}
