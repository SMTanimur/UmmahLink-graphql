'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { IUser, Pagination } from '@social-zone/graphql';

import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ChangeEvent, FC } from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { Card, Input, Spinner, cn, useSearchUserProfile } from '~ui';
import UserProfile from '../../(subpages)/user/[username]/components/UserProfile';

interface SearchProps {
  hideDropdown?: boolean;
  onProfileSelected?: (profile: any) => void;
  placeholder?: string;
  modalWidthClassName?: string;
}

const Search: FC<SearchProps> = ({
  hideDropdown = false,
  onProfileSelected,
  placeholder = `Search…`,
  modalWidthClassName = 'max-w-md',
}) => {
  const { push } = useRouter();
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useOnClickOutside(dropdownRef, () => setSearchText(''));

  const { data, isLoading: searchUsersLoading } = useSearchUserProfile(
    searchText as string
  );

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const keyword = evt.target.value;
    setSearchText(keyword);
    if (pathname !== '/search' && !hideDropdown) {
      // searchUsers({
      //   variables: {
      //     request: {
      //       type: SearchRequestTypes.Profile,
      //       query: keyword,
      //       customFilters: [CustomFiltersTypes.Gardeners],
      //       limit: 8
      //     }
      //   }
      // });
    }
  };

  const handleKeyDown = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    push(`/search?q=${encodeURIComponent(searchText)}&type=profiles`);
    setSearchText('');
  };

  // const searchResult = searchUsersData?.search as ProfileSearchResult;
  // const isProfileSearchResult =
  //   searchResult && searchResult.hasOwnProperty('items');
  const profiles = data?.searchUser 

  return (
    <div
      aria-hidden="true"
      className="w-full"
      data-testid="global-search"
    >
      <form onSubmit={handleKeyDown}>
        <Input
          type="text"
          className="px-3 py-2 text-sm !w-[350px]"
          placeholder={placeholder}
          value={searchText}
          iconLeft={<MagnifyingGlassIcon />}
          iconRight={
            <XMarkIcon
              className={cn(
                'cursor-pointer',
                searchText ? 'visible' : 'invisible'
              )}
              onClick={() => setSearchText('')}
            />
          }
          onChange={handleSearch}
        />
      </form>
      {pathname !== '/search' && !hideDropdown && searchText.length > 0 && (
        <div
          className={cn(
            'absolute mt-2 flex w-[94%] flex-col',
            modalWidthClassName
          )}
          ref={dropdownRef}
          data-testid="search-profiles-dropdown"
        >

      <Card className="max-h-[80vh] overflow-y-auto py-2 w-full" >
        {searchUsersLoading ? (
          <div className="space-y-2 px-4 py-2 text-center text-sm font-bold">
            <Spinner size="sm" className="mx-auto" />
            <div>
              <span>Searching users</span>
            </div>
          </div>
        ) : (
          <>
            {profiles?.map((profile: IUser) => (
              <div
                key={profile?.username}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  if (onProfileSelected) {
                    onProfileSelected(profile);
                  }
                  setSearchText('');
                }}
                data-testid={`search-profile-${profile?.username}`}
                aria-hidden="true"
              >
                <UserProfile
                  linkToProfile={!onProfileSelected}
                  profile={profile as any}
                  showUserPreview={false}
                />
              </div>
            ))}
            {profiles?.length == 0 && (
              <div className="px-4 py-2">
                <span>No matching users</span>
              </div>
            )}
          </>
        )}
      </Card>
      </div>
      )}
    </div>
  );
};

export default Search;
