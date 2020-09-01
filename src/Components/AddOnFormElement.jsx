import React from 'react';
import { SortableContainer, SortableElement, arrayMove, sortableHandle } from 'react-sortable-hoc';


// Used React sortable hoc to implement the sortable behaviour
class AddOnFormElement extends React.Component {
  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.state = {
      items: [],
      currentValue: '',
    };
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  }

  onAddItem() {
    const items = this.state.items;

    if (!this.state.currentValue) {
      return;
    }
    items.push(this.state.currentValue);
    this.setState({ items: items, currentValue: '' });
    this.props.onAddOnFormElement(items, this.props.id);
  }

  deleteItem(e) {
    e.preventDefault();
    if (!e.target.classList.contains('closeIcon')) {
      return;
    }
    const newList = this.state.items.filter((el, index) => index !== parseInt(e.target.dataset.index));
    this.props.onAddOnFormElement(newList, this.props.id);
    this.setState({ items: newList });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.makeListEmpty && nextProps.makeListEmpty) {
      this.setState({ items: [] });
    }
  }

  render() {
    return (
      <div onClick={this.deleteItem.bind(this)}>
        <SortableList useDragHandle={true} items={this.state.items} onSortEnd={this.onSortEnd.bind(this)} />
        <input
          type="text"
          placeholder={this.props.placeholder}
          id={this.props.id}
          value={this.state.currentValue}
          className={this.props.class}
          onChange={(e) => {
            this.setState({ currentValue: e.target.value });
          }}
        />
        <input type="button" value="Add" onClick={(e) => this.onAddItem()} />
      </div>
    );
  }
}

const SortableItem = SortableElement(({ value: data }) => (
  <li title="Use draghandle to drag and sort items">
    <DragHandle />
    <span className="index">{data.index + 1}</span>
    {data.value}
    <span data-index={data.index} className="closeIcon" />
  </li>
));
const DragHandle = sortableHandle(() => <span>::</span>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem onClick={(e) => console.log(e)} key={`item-${index}`} index={index} value={{ value, index }} />
      ))}
    </ul>
  );
});

export default AddOnFormElement;
