import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { Tooltip } from '../../components';
import { humanize, nFormatter } from '../../lib';

interface CommentProps {
  onCommentToggle: ()=>void;
  commentCount: number
}

export const CommentButton: FC<CommentProps> = ({ onCommentToggle, commentCount}) => {
  const count = commentCount
    
  const iconClassName =  'w-[17px] sm:w-[20px]'
    

  return (
    <div className="flex items-center space-x-1 text-blue-500">
      <motion.button whileTap={{ scale: 0.9 }} aria-label="Comment">
        
          <div className="rounded-full p-1.5 hover:bg-blue-300/20"
          onClick={onCommentToggle}
          >
            <Tooltip
              placement="top"
              content={count > 0 ? `${humanize(count)} Comments` : `Comment`}
              withDelay
            >
              < ChatBubbleLeftIcon className={iconClassName} />
            </Tooltip>
          </div>
      </motion.button>
      {count > 0  && (
        <span className="text-[11px] sm:text-xs">{nFormatter(count)}</span>
      )}
    </div>
  );
};

