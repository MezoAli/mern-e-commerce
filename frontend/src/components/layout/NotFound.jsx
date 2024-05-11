import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <img
        alt="not_found"
        src="/images/404.svg"
        className="h-[550px] w-[550px]"
      />
      <Button variant="auth">
        <Link to="/">Back to home page</Link>
      </Button>
    </div>
  );
};

export default NotFound;
