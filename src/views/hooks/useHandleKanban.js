import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const useHandleKanban = (key) => {
  const [store, SetStore] = useState([]);
  const [currentTicket, SetCurrentTicket] = useState({});
  const [filterData, SetFilterData] = useState([]);
  const [loading, SetLoading] = useState(false);

  const [modalOpen, SetModalOpen] = useState({
    newModal: false,
    editModal: false,
    deleModal: false,
    confirmModal: false,
  });

  useEffect(() => {
    SetStore(getTickets());
  }, []);

  useEffect(() => {
    SetFilterData(store);
  }, [store]);

  const Status = useRef([
    { key: "To Do", value: "To Do" },
    { key: "In Progress", value: "In Progress" },
    { key: "Done", value: "Done" },
  ]);

  const initialValue = useRef({
    id: "",
    title: "",
    tags: "",
    description: "",
    assignee: "",
    status: "",
    dueDate: Date(),
  });

  const schemaForm = Yup.object().shape({
    title: Yup.string().required("Campo requerido"),
    tags: Yup.string().required("Campo requerido"),
    description: Yup.string().required("Campo requerido"),
    assignee: Yup.string().required("Campo requerido"),
    dueDate: Yup.date().required("Campo requerido"),
  });

  const toggleModal = (modalType, ticket) => {
    SetModalOpen({ ...modalOpen, [modalType]: !modalOpen[modalType] });
    if (ticket) SetCurrentTicket(ticket);
  };

  const filter = useCallback(
    (filterText) => {
      const { value } = filterText.target;

      if (!value) {
        return SetFilterData(store);
      }

      var filterResult = filterData.filter((x) =>
        `${x.title} ${x.tags} ${x.assignee}`
          .toLowerCase()
          .includes(value.toLowerCase())
      );

      SetFilterData(filterResult);
    },
    [store]
  );

  const submitForm = useCallback((value, isNew) => {
    setTimeout(() => {
      if (isNew) {
        value = { ...value, status: "To Do", id: uuidv4() };
        saveTicket(value);
      } else {
        updateTicket(value);
      }

      SetStore(getTickets());
      SetLoading(false);
    }, 5000);

    SetLoading(true);
    SetModalOpen({ ...modalOpen, newModal: false, editModal: false });
  }, []);

  const saveTicket = useCallback((value) => {
    let storedData = JSON.parse(localStorage.getItem(key));

    if (storedData) {
      storedData.push(value);
      localStorage.setItem("tickets", JSON.stringify(storedData));
      return;
    }

    localStorage.setItem("tickets", JSON.stringify([value]));
  }, []);

  const updateTicket = useCallback((value) => {
    let storedData = JSON.parse(localStorage.getItem(key));

    var ticketIndex = storedData.findIndex((x) => x.id === value.id);
    storedData[ticketIndex] = value;

    localStorage.setItem("tickets", JSON.stringify(storedData));
    SetCurrentTicket({});
  }, []);

  const transferTicket = useCallback((value) => {
    let storedData = JSON.parse(localStorage.getItem(key));

    var ticketIndex = storedData.findIndex((x) => x.id === value.id);
    storedData[ticketIndex] = value;

    localStorage.setItem("tickets", JSON.stringify(storedData));
    SetStore(getTickets());
  }, []);

  const deleteTicket = useCallback(() => {
    setTimeout(() => {
      let storedData = JSON.parse(localStorage.getItem(key));

      var ticketIndex = storedData.findIndex((x) => x.id === currentTicket.id);
      storedData.splice(ticketIndex, 1);

      localStorage.setItem("tickets", JSON.stringify(storedData));
      SetStore(getTickets());

      SetLoading(false);
      SetModalOpen({ ...modalOpen, confirmModal: true });
    }, 5000);

    SetModalOpen({ ...modalOpen, deleModal: false });
    SetLoading(true);
  }, []);

  const getTickets = useCallback(() => {
    let tickets = JSON.parse(localStorage.getItem(key));
    return tickets;
  });

  return {
    filterData,
    modalOpen,
    currentTicket,
    initialValue,
    schemaForm,
    loading,
    Status,
    filter,
    toggleModal,
    submitForm,
    deleteTicket,
    transferTicket,
  };
};

export default useHandleKanban;
