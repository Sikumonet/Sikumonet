import React from "react";

export default function ButtonComponent(props: {
  name: string;
  handleAction: any;
  isButtonDisabled?: boolean;
}) {
  return (
    <React.Fragment>
      <button
        className="w-full h-14 bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-2xl hover:bg-blue-600 transition duration-300"
        type="button"
        onClick={props.handleAction}
        disabled={props.isButtonDisabled || false}
      >
        {props.name}
      </button>
    </React.Fragment>
  );
}
