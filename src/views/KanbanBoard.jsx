import { Formik, Form } from "formik";
import { Board, BoardTitle, Row, Column } from "@styles/general";
import CardComponent from "@components/cards/card.component.jsx";
import Modal from "@components/modal/modal.component.jsx";
import { FormInput, FormSelect } from "@components/controls/";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useHandleKanban from "./hooks/useHandleKanban";
import useDragDrop from "./hooks/useDragDrop";

const KanbanBoard = () => {
  const {
    Status,
    filterData,
    modalOpen,
    loading,
    initialValue,
    schemaForm,
    currentTicket,
    filter,
    toggleModal,
    submitForm,
    deleteTicket,
    transferTicket,
  } = useHandleKanban("tickets");

  const { DragEvent, DropEvent } = useDragDrop();

  return (
    <>
      <Board>
        <h1>ION HH</h1>
        <BoardTitle>
          <label>Buscar Ticket: </label>
          <input type="text" onInput={filter} />
          <button
            disabled={loading}
            onClick={() => toggleModal("newModal")}
            type="button"
            style={{ marginLeft: "10px" }}
          >
            Crear Ticket
          </button>
        </BoardTitle>
        <Row>
          <Column
            id="todo"
            data-status="To Do"
            onDrop={(e) => DropEvent(e, transferTicket)}
            onDragOver={(e) => e.preventDefault()}
          >
            <h5>To Do</h5>
            {filterData?.map(
              (ticket) =>
                ticket.status == "To Do" &&
                (loading ? (
                  <Skeleton count={1} height={100} />
                ) : (
                  <CardComponent
                    key={ticket.id}
                    item={ticket}
                    dragFn={DragEvent}
                    editFn={() => toggleModal("editModal", ticket)}
                    deleteFn={() => toggleModal("deleModal", ticket)}
                  />
                ))
            )}
          </Column>
          <Column
            id="progress"
            data-status="In Progress"
            onDrop={(e) => DropEvent(e, transferTicket)}
            onDragOver={(e) => e.preventDefault()}
          >
            <h5>In Progress</h5>
            {filterData?.map(
              (ticket) =>
                ticket.status == "In Progress" &&
                (loading ? (
                  <Skeleton count={1} height={100} />
                ) : (
                  <CardComponent
                    key={ticket.id}
                    item={ticket}
                    dragFn={DragEvent}
                    editFn={() => toggleModal("editModal", ticket)}
                    deleteFn={() => toggleModal("deleModal", ticket)}
                  />
                ))
            )}
          </Column>
          <Column
            id="done"
            data-status="Done"
            onDrop={(e) => DropEvent(e, transferTicket)}
            onDragOver={(e) => e.preventDefault()}
          >
            <h5>Done</h5>
            {filterData?.map(
              (ticket) =>
                ticket.status == "Done" &&
                (loading ? (
                  <Skeleton count={1} height={100} />
                ) : (
                  <CardComponent
                    key={ticket.id}
                    item={ticket}
                    dragFn={DragEvent}
                    editFn={() => toggleModal("editModal", ticket)}
                    deleteFn={() => toggleModal("deleModal", ticket)}
                  />
                ))
            )}
          </Column>
        </Row>
      </Board>

      <Modal isOpen={modalOpen.newModal}>
        <Formik
          initialValues={initialValue.current}
          validationSchema={schemaForm}
          onSubmit={(values) => submitForm(values, true)}
        >
          {() => (
            <Form>
              <Row>
                <Column color="white">
                  <label>Title:</label>
                  <FormInput className="input-form" name="title" type="text" />
                </Column>
                <Column color="white">
                  <label>Tags:</label>
                  <FormInput className="input-form" name="tags" type="text" />
                </Column>
              </Row>
              <Row>
                <Column color="white">
                  <label>Description:</label>
                  <FormInput
                    className="input-form"
                    name="description"
                    type="text"
                  />
                </Column>
              </Row>
              <Row>
                <Column color="white">
                  <label>Assignee:</label>
                  <FormInput
                    className="input-form"
                    name="assignee"
                    type="text"
                  />
                </Column>
                <Column color="white">
                  <label>Due Date:</label>
                  <FormInput
                    type="date"
                    className="input-form"
                    name="dueDate"
                  />
                </Column>
              </Row>
              <Row>
                <Column color="white">
                  <button type="submit">Submit</button>
                </Column>
                <Column color="white">
                  <button type="button" onClick={() => toggleModal("newModal")}>
                    Cancel
                  </button>
                </Column>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal isOpen={modalOpen.editModal}>
        <Formik
          initialValues={initialValue.current}
          validationSchema={schemaForm}
          onSubmit={(values) => submitForm(values, false)}
        >
          {() => (
            <Form>
              <Row>
                <FormInput
                  name="id"
                  type="hidden"
                  defaultValue={currentTicket.id}
                />
                <Column color="white">
                  <label>Title:</label>
                  <FormInput
                    className="input-form"
                    name="title"
                    type="text"
                    defaultValue={currentTicket.title}
                  />
                </Column>
                <Column color="white">
                  <label>Tags:</label>
                  <FormInput
                    className="input-form"
                    name="tags"
                    type="text"
                    defaultValue={currentTicket.tags}
                  />
                </Column>
              </Row>
              <Row>
                <Column color="white">
                  <label>Description:</label>
                  <FormInput
                    className="input-form"
                    name="description"
                    type="text"
                    defaultValue={currentTicket.description}
                  />
                </Column>
              </Row>
              <Row>
                <Column color="white">
                  <label>Assignee:</label>
                  <FormInput
                    className="input-form"
                    name="assignee"
                    type="text"
                    defaultValue={currentTicket.assignee}
                  />
                </Column>
                <Column color="white">
                  <label>Due Date:</label>
                  <FormInput
                    type="date"
                    className="input-form"
                    name="dueDate"
                    defaultValue={currentTicket.dueDate}
                  />
                </Column>
              </Row>
              <Row>
                <Column color="white">
                  <label>Status:</label>
                  <FormSelect
                    options={Status.current}
                    id="status"
                    name="status"
                    defaultValue={currentTicket.status}
                  />
                </Column>
              </Row>
              <Row>
                <Column color="white">
                  <button type="submit">Submit</button>
                </Column>
                <Column color="white">
                  <button
                    type="button"
                    onClick={() => toggleModal("editModal")}
                  >
                    Cancel
                  </button>
                </Column>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal isOpen={modalOpen.deleModal}>
        <h3>You want to remove this ticket?</h3>
        <Row>
          <Column color="white">
            <button onClick={deleteTicket}>Yes</button>
          </Column>
          <Column color="white">
            <button onClick={() => toggleModal("deleModal")}>No</button>
          </Column>
        </Row>
      </Modal>

      <Modal isOpen={modalOpen.confirmModal}>
        <h3>Ticket deleted successfully</h3>
        <Column color="white">
          <button onClick={() => toggleModal("confirmModal")}>Ok</button>
        </Column>
      </Modal>
    </>
  );
};

export default KanbanBoard;
