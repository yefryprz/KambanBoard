import { Card, Row, Column } from "@styles/general";

const CardComponent = ({ item, editFn, deleteFn, dragFn }) => {
  return (
    <Card draggable="true" onDragStart={(e) => dragFn(e, item)}>
      <Row>
        <h3 className="title">{item.title}</h3>
      </Row>
      <p className="description">{item.description}</p>
      <Row>
        <Column padding="0px" color="white">
          <strong>Assignee:</strong> {item.assignee}
        </Column>
        <Column padding="0px" color="white">
          <strong>Due Date:</strong> {item.dueDate}
        </Column>
        <Column padding="0px" color="white">
          <strong>Labels:</strong> {item.tags}
        </Column>
      </Row>
      <Row>
        <Column padding="0px" color="white">
          <button type="button" onClick={editFn}>
            Edit
          </button>
        </Column>
        <Column padding="0px" color="white">
          <button type="button" onClick={deleteFn}>
            Delete
          </button>
        </Column>
      </Row>
    </Card>
  );
};

export default CardComponent;
