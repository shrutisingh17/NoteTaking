import React, { useEffect } from "react";
import { NoteSection } from "./NoteSection";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MasonryGrid = ({ notes }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry
        columnsCount={3}
        gutter="6px"
        style={{ maxWidth: "750px", margin: "auto" }}
      >
        {notes?.map((note) => (
          <div key={note._id}>
            <NoteSection note={note} />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryGrid;
