"use client"

import React, { forwardRef, MutableRefObject, useEffect } from "react";
import { useProfileQuery } from "../../hooks";
import { Image } from "../../components";
import { UserAvatarUrl } from "../../data";


interface IProps {
    isLoading: boolean;
    isSubmitting: boolean;
    isUpdateMode: boolean;
    [prop: string]: any;
}

const CommentInput = forwardRef<HTMLInputElement, IProps>((props, ref) => {
    const { isUpdateMode, isSubmitting, isLoading, ...rest } = props;
     const {data}=useProfileQuery()

    useEffect(() => {
        ref && (ref as MutableRefObject<HTMLInputElement>).current.focus();
    }, [ref])

    return (
        <div className={`flex items-center gap-3 w-full`}>
            {!isUpdateMode && <Image
            src={
              data?.me?.avatar?.avatarUrl
                ? data?.me?.avatar?.avatarUrl
                : UserAvatarUrl
            }
            className="h-[50px] w-[50px] cursor-pointer rounded-full bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-[60px] sm:w-[60px]"
            height={60}
            width={60}
            alt={data?.me?.username}
            data-testid="profile-avatar"
          />}
            <div className="flex-grow">
                <input
                    {...rest}
                    className={`${isSubmitting && isLoading && 'opacity-50'} dark:bg-indigo-950 dark:!border-gray-800 dark:text-white w-full rounded-full`}
                    type="text"
                    readOnly={isLoading || isSubmitting}
                    ref={ref}
                />
                {isUpdateMode && <span className="text-xs text-gray-500 ml-2">Press Esc to Cancel</span>}
            </div>
        </div>
    );
});

export default CommentInput;
