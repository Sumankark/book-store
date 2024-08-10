import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentlyAdded = () => {
  const [book, setBook] = useState();
  useEffect(() => {
    const fetch = async () => {};
  }, []);
  return <div className="mt-4 px-4 text-zinc-800 ">Recently Added Books</div>;
};

export default RecentlyAdded;
