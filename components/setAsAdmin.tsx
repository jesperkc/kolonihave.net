"use client";

const SetAsAdmin = ({ func }) => {
  return (
    <button
      className="button"
      onClick={() => {
        func();
      }}
    >
      Sæt som admin
    </button>
  );
};

export default SetAsAdmin;
