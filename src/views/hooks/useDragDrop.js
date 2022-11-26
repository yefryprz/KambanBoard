import { useCallback } from "react";

const useDragDrop = () => {
  const DragEvent = useCallback((ev, data) => {
    ev.dataTransfer.setData("text", JSON.stringify(data));
  }, []);

  const DropEvent = useCallback((ev, transferTicket) => {
    ev.preventDefault();

    if (!ev.target.dataset.status) return;

    var data = JSON.parse(ev.dataTransfer.getData("text"));
    data.status = ev.target.dataset.status;

    transferTicket(data);
  }, []);

  return { DragEvent, DropEvent };
};

export default useDragDrop;
