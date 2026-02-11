import React, { useState, useRef, cloneElement } from "react";

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";

const Tooltip = ({ tooltipContent, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(10),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const elem = cloneElement(children, {
    ref: refs.setReference,
    ...getReferenceProps(),
  });

  return (
    <>
      {elem}
      <FloatingPortal>
        {isOpen && (
          <div
            className="w-max rounded-md bg-gray-800 px-3 py-2 text-xs text-white"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {tooltipContent}
            <FloatingArrow context={context} ref={arrowRef} />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
