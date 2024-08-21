import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import List from "./List";
import { ListNoteItem } from "./ListNoteItem";

export const ListContent = ({ note, forSingleNote, setNote, isCreating }) => {
  const [showCompletedItems, setShowCompletedItems] = useState(false);

  const incompleteItems = note?.listContent.length > 0 && note?.listContent?.filter((item) => !item.isComplete) || [];
  const completeItems = note?.listContent.length > 0 && note?.listContent?.filter((item) => item.isComplete) || [];

  const renderListNoteItems = (items) =>
    items.map((item) => (
      <ListNoteItem
        key={item.id}
        item={item}
        setNote={setNote}
        forSingleNote={forSingleNote}
        isCreating={isCreating}
        note={note}
      />
    ));

  return (
    <div className="font-custom">
      <div>{renderListNoteItems(incompleteItems)}</div>
      {(forSingleNote || isCreating) && <List note={note} setNote={setNote} />}
      <div className="text-headerColor">

        {completeItems.length > 0 && (
          <>
            <div className="border-b border-borderColor mx-6 mb-3.5 mt-1.5" />
            {(forSingleNote || isCreating) && (
              <div
                className="px-6 py-1 flex items-center cursor-pointer hover:text-textColor"
                onClick={() => setShowCompletedItems(!showCompletedItems)}
              >
                <IoIosArrowDown size={14} />
                <p className="pl-3.5 text-base">
                  {completeItems.length} Complete Items
                </p>
              </div>
            )}
          </>
        )}
        
        {(forSingleNote || isCreating) && showCompletedItems && renderListNoteItems(completeItems)}
        {(forSingleNote === undefined && isCreating === undefined && (!forSingleNote && !isCreating)) && renderListNoteItems(completeItems)}
      </div>
    </div>
  );
};