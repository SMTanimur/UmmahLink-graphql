"use client"

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Avatar, ICurrentUser, Menu, MenuItem } from "~ui"
import {HomeIcon,SparklesIcon,Cog6ToothIcon,ArrowLeftIcon} from '@heroicons/react/24/outline'

interface ProfileDropdownProps {
	user: Partial<ICurrentUser>
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {



	return (
		<Menu
			dropdown={
				<>
					<MenuItem
						href={'/feed/all'}
						icon={<HomeIcon className="w-5 h-5" />}
					>
						Home
					</MenuItem>
					<MenuItem
						href={`/profile/${user.username}`}
						icon={<SparklesIcon className="w-5 h-5" />}
					>
						My Profile
					</MenuItem>
					<MenuItem
						href={`/account/settings`}
						icon={<Cog6ToothIcon className="w-5 h-5" />}
					>
						Profile settings
					</MenuItem>
					<MenuItem
						// onClick={() => signout()}
						icon={<ArrowLeftIcon className="w-5 h-5" />}
					>
						Signout
					</MenuItem>
				</>
			}
			dropdownClassName="mr-5 mt-6"
		>
			<Avatar rounded url={user.avatar!} />
		</Menu>
	)
}
