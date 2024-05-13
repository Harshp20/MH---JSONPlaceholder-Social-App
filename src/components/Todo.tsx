import CheckIcon from '../assets/icons/CheckIcon';
import ClipBoardIcon from '../assets/icons/ClipBoardIcon';
import CrossIcon from '../assets/icons/CrossIcon';
import { TodoProps } from '../types';

const Todo = ({ todoData: { title, completed } }: TodoProps) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <ClipBoardIcon />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {title}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {completed}
          </p>
        </div>
        <div className="flex-shrink-0">
          {completed ? <CheckIcon /> : <CrossIcon /> }
        </div>
      </div>
    </li>
  );
};

export default Todo;
