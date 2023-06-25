// import { CogIcon } from "@heroicons/react/24/outline";
// import { UserWithoutPassword } from "@social-zone/graphql";
// import { useTheme } from "next-themes";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FC, useState } from "react";
// import { Button, Image, LightBox } from "~ui";


// interface DetailsProps {
//   profile: UserWithoutPassword;
  
// }

// const Details: FC<DetailsProps> = ({ profile}) => {
//   const currentProfile = useAppStore((state) => state.currentProfile);
//   const [showMutualFollowersModal, setShowMutualFollowersModal] =
//     useState(false);
//   const [expandedImage, setExpandedImage] = useState<string | null>(null);
//   const { allowed: staffMode } = useStaffMode();
//   const { resolvedTheme } = useTheme();
//   const router = useRouter();

//   const { persistProfile } = useMessageDb();
//   const setSelectedTab = useMessageStore((state) => state.setSelectedTab);

//   const onMessageClick = () => {
//     if (!currentProfile) {
//       return;
//     }
//     const conversationId = buildConversationId(currentProfile.id, profile.id);
//     const conversationKey = buildConversationKey(
//       profile.ownedBy,
//       conversationId
//     );
//     persistProfile(conversationKey, profile);
//     const selectedTab: TabValues = profile.isFollowedByMe
//       ? MessageTabs.Lens
//       : MessageTabs.Requests;
//     setSelectedTab(selectedTab);
//     router.push(`/messages/${conversationKey}`);
//   };

 

//   const followType = profile?.followModule?.__typename;

//   return (
//     <div className="mb-4 space-y-5 px-5 sm:px-0">
//       <div className="relative -mt-24 h-32 w-32 sm:-mt-32 sm:h-52 sm:w-52">
//         <Image
//           onClick={() => setExpandedImage(getAvatar(profile, EXPANDED_AVATAR))}
//           src={getAvatar(profile)}
//           className="h-32 w-32 cursor-pointer rounded-xl bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-52 sm:w-52"
//           height={128}
//           width={128}
//           alt={formatHandle(profile?.handle)}
//           data-testid="profile-avatar"
//         />
//         <LightBox
//           show={Boolean(expandedImage)}
//           url={expandedImage}
//           onClose={() => setExpandedImage(null)}
//         />
//       </div>
//       <div className="space-y-1 py-2">
//         <div className="flex items-center gap-1.5 text-2xl font-bold">
//           <div className="truncate" data-testid="profile-name">
//             {sanitizeDisplayName(profile?.name) ??
//               formatHandle(profile?.handle)}
//           </div>
//           {/* {isVerified(profile?.id) && (
//             <Tooltip content={t`Verified`}>
//               <BadgeCheckIcon
//                 className="text-brand h-6 w-6"
//                 data-testid="profile-verified-badge"
//               />
//             </Tooltip>
//           )} */}
//         </div>
//         <div
//           className="flex items-center space-x-3"
//           data-testid="profile-handle"
//         >
//           {profile?.name ? (
//             <Slug
//               className="text-sm sm:text-base"
//               slug={formatHandle(profile?.handle)}
//               prefix="@"
//             />
//           ) : (
//             <Slug
//               className="text-sm sm:text-base"
//               slug={formatAddress(profile?.ownedBy)}
//             />
//           )}
//           {currentProfile &&
//             currentProfile?.id !== profile?.id &&
//             profile?.isFollowing && (
//               <div className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
//                 <Trans>Follows you</Trans>
//               </div>
//             )}
//         </div>
//       </div>
//       {profile?.info && (
//         <div
//           className="markup linkify text-md mr-0 break-words sm:mr-10"
//           data-testid="profile-bio"
//         >
//           <Markup>{profile?.info?.bio}</Markup>
//         </div>
//       )}
//       <div className="space-y-5">
//         <Followerings profile={profile} />
//         <div>
//           {currentProfile?.id === profile?.id ? (
//             <Link href="/settings">
//               <Button
//                 variant="secondary"
//                 icon={<CogIcon className="h-5 w-5" />}
//                 outline
//               >
//                 <Trans>Edit Profile</Trans>
//               </Button>
//             </Link>
//           ) : followType !== 'RevertFollowModuleSettings' ? (
//             following ? (
//               <div className="flex space-x-2">
//                 <Unfollow
//                   profile={profile}
//                   setFollowing={setFollowing}
//                   showText
//                 />
//                 {followType === 'FeeFollowModuleSettings' && (
//                   <SuperFollow
//                     profile={profile}
//                     setFollowing={setFollowing}
//                     again
//                   />
//                 )}
//                 {currentProfile && <Message onClick={onMessageClick} />}
//               </div>
//             ) : followType === 'FeeFollowModuleSettings' ? (
//               <div className="flex space-x-2">
//                 <SuperFollow
//                   profile={profile}
//                   setFollowing={setFollowing}
//                   followUnfollowSource={FollowUnfollowSource.PROFILE_PAGE}
//                   showText
//                 />
//                 {currentProfile && <Message onClick={onMessageClick} />}
//               </div>
//             ) : (
//               <div className="flex space-x-2">
//                 <Follow
//                   profile={profile}
//                   setFollowing={setFollowing}
//                   followUnfollowSource={FollowUnfollowSource.PROFILE_PAGE}
//                   showText
//                 />
//                 {currentProfile && <Message onClick={onMessageClick} />}
//               </div>
//             )
//           ) : null}
//         </div>
//         {/* {currentProfile?.id !== profile?.id && (
//           <>
//             <MutualFollowers
//               setShowMutualFollowersModal={setShowMutualFollowersModal}
//               profile={profile}
//             />
//             <Modal
//               title={t`Followers you know`}
//               icon={<UsersIcon className="text-brand h-5 w-5" />}
//               show={showMutualFollowersModal}
//               onClose={() => setShowMutualFollowersModal(false)}
//             >
//               <MutualFollowersList profileId={profile?.id} />
//             </Modal>
//           </>
//         )} */}
//       </div>
//       <Badges profile={profile} />
      
//     </div>
//   );
// };

// export default Details;
