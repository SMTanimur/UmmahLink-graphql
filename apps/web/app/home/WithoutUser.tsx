/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {ArrowRightIcon}from '@heroicons/react/24/outline'
import Link from 'next/link'
function WithoutUser() {
  return (
    <section className="antialiased h-screen pt-6 bg-white bg-gradient-to-b from-white to-gray-200 dark:bg-gray-800 dark:bg-gradient-to-t dark:from-gray-800 dark:to-black">
			<div className="px-12 mx-auto md:mt-16 max-w-7xl ">
				<div className="flex flex-col  items-center w-full py-10 lg:space-x-10 lg:flex-row">
					<div className="relative z-10 w-full space-y-10 lg:w-1/2">
						<h1 className="text-5xl font-bold sm:text-7xl xl:text-7xl tracking-tighter">
							Capture and share the world&apos;s moments
						</h1>
						<p className="text-base text-gray-500 sm:text-lg">
							Welcome to UmmahLink. A social media platform made for people
							like you! Come, share and see what others are up to!
						</p>
						<div className="flex flex-col items-center w-full space-x-5 lg:flex-row">
							<Link
								href={'/signup'}
								className="w-full px-4 py-6 text-xl font-medium text-center text-white bg-brand-700 shadow-xl xl:px-12 xl:text-2xl lg:w-auto hover:bg-brand-800 rounded"
							>
								<span className="flex space-x-2 items-center justify-center">
											<p>Sign Up</p> <ArrowRightIcon className='h-6 w-7' />{' '}
								</span>
							</Link>
						</div>
					</div>
					<div className="relative z-0 w-full mt-8 lg:w-1/2">
						<img
							src="https://res.cloudinary.com/dogecorp/image/upload/q_69/v1635767865/Saly-1245_eqly7l.png"
							className="transform xl:translate-x-20 lg:ml-0 lg:scale-125"
							alt="Illustration showing a social media website on a mobile device."
						/>
					</div>
				</div>
			</div>
		</section>
  )
}

export default WithoutUser