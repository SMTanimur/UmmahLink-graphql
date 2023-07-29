/* eslint-disable no-useless-escape */
/* eslint-disable no-misleading-character-class */
const RESTRICTED_SYMBOLS = '☑️✓✔✅';

export const Regex = {
  url: /(http|https):\/\/([\w+.?])+([\w!#$%&'()*+,./:;=?@\\^~\-]*)?/g,
  mention: /(@[a-z\d-_.]{1,31})/g,
  hashtag: /(#\w*[A-Za-z]\w*)/g,
  ethereumAddress: /^(0x)?[\da-f]{40}$/i,
  handle: /^[\da-z]+$/g,
  allHandles: /([\s+])@(\S+)/g,
  santiizeHandle: /[^\d .A-Za-z]/g,
  profileNameValidator: new RegExp('^[^' + RESTRICTED_SYMBOLS + ']+$'),
  profileNameFilter: new RegExp('[' + RESTRICTED_SYMBOLS + ']', 'gu'),
  gm: /\bgm\b/i
};
export const UserAvatarUrl =
  'https://res.cloudinary.com/smtanimur/image/upload/v1658841812/mushfiqTanim/user_qcrqny_kcgfes.svg';

  export const convertHttps = (url?: string) => {
    if (!url) return '';
  
    if (url.startsWith('http://')) {
      return 'https' + url.substring(4);
    }
  
    return url;
  }
