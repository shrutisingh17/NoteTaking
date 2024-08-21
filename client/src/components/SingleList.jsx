import React from "react";
import { RxCross2 } from "react-icons/rx";


export const SingleList = () => {
  return (
    <div className="pb-2 text-sm">
      <div className="max-h-completeMaxH">
        {/* {note?.listContent?.map((item) =>
            item.isComplete && ( */}
        <div key={item.id} className="flex py-1 pr-4">
            <div className="flex justify-center items-center">
                <div
                id={`check-box-${item.id}`}
                className="relative cursor-pointer w-4 h-4 border-2 border-gray-400 rounded"
                onClick={() => handleCheckboxChange(note._id, item.id)}
                >
                {item.isComplete && (
                    <div className="h-4 w-4 text-gray-400 ">
                    <FaCheck size={12} />
                    </div>
                )}
                </div>
                <div className="pl-3 overflow-hidden overflow-ellipsis text-sm font-normal leading-5">
                    {item.task}
                </div>
            </div>
            <div className="h-6 w-6 absolute right-3">
                <RxCross2 />
            </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};
