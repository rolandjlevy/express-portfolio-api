const $ = (el) => document.querySelector(el);

const sortable = new Sortable(sortableList, {
  animation: 150,
  ghostClass: 'sortable-ghost',
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag",
  onSort: function (e) {
    getOrder(); 
  },
});

let order = [];

const getOrder = () => {
  order = sortable.toArray().map(updateOrder);
  $('#order').value = JSON.stringify(order);
}

const updateOrder = (id, index) => ({ id, sortOrder:index + 1});