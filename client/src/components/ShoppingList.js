import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux"; //allows to get state from redux into react
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types"; // whenever we have component properties in react, put them inside propTypes as a form of validation

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired, // actions from redux are stored as props
    item: PropTypes.object.isRequired, // represents our state
    isAuthenticated: PropTypes.bool
  };

  // React lifecycle method, componentDidMount used for API requests or calling an action (e.g. getItem)
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item; // Use destructuring to access our state, refer to reducer. Items is the array inside the state.
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item, // item: refers to the item: in rootReducer
  isAuthenticated: state.auth.isAuthenticated
});

// connect takes two things, mapstatetprops and any actions we want to use e.g. getItems
export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
