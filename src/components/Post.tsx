import { Link } from 'react-router-dom'
import PostIcon from '../assets/icons/PostIcon';
import EyeIcon from '../assets/icons/EyeIcon';
import { TPost } from '../types';

const Post = ({ postData: { id, title, body } }: TPost) => {
  return (
    <Link to={`/post/${id}`}>
      <li className="py-3 sm:py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <PostIcon />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {title}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {body}
            </p>
          </div>
          <div className="flex-shrink-0">
            <EyeIcon />
          </div>
        </div>
      </li>
    </Link>
  );
};

export default Post;
