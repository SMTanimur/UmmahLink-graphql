"use client"
import {  UsersIcon } from '@heroicons/react/24/outline';

import Profiles from './Profiles';
import { FC } from 'react';
import { GridItemEight, GridItemFour, GridLayout, Sidebar } from '~ui';
type SearchProps = {

  query: string;
  type: string;
};
const SearchComponent:FC<SearchProps> = ({query,type}) => {
  const searchText = Array.isArray(query)
    ? encodeURIComponent(query.join(' '))
    : encodeURIComponent(query|| '');

    console.log(query,type,"query,type")



  // if (!query.q || !['pubs', 'profiles'].includes(query.type as string)) {
  //   return <Custom404 />;
  // }

  return (
    <>
      <GridLayout>
        <GridItemFour>
          <Sidebar
            items={[
             
              {
                title: `Profiles`,
                icon: <UsersIcon className="h-4 w-4" />,
                url: `/search?q=${searchText}&type=profiles`,
                active: type === 'profiles'
              }
            ]}
          />
        </GridItemFour>
        <GridItemEight>
          {type === 'profiles' && <Profiles query={query} />}
          {/* {query.type === 'pubs' && <Publications query={query.q} />} */}
        </GridItemEight>
      </GridLayout>
    </>
  );
};

export default SearchComponent
