const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);
const statusMessage = (msg) => $('#update-status').textContent = msg;
const toggleUpdateButtons = (state) => {
  $$('.update-btn').forEach(item => item.disabled = state);
}

const sortable = new Sortable(sortableList, {
  animation: 150,
  ghostClass: 'sortable-ghost',
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag",
  handle: '.handle', 
  onSort: function (e) { updateProps(); },
});

let order = [];

const updateProps = () => {
  order = sortable.toArray().map((id, index) => {
    const active = $(`#project-${id} > input[type=checkbox]`).checked;
    return { id, active, sortOrder:index + 1};
  });
  $('#order').value = JSON.stringify(order);
  toggleUpdateButtons(false);
  statusMessage('Changes pending...');  
}

$('#sort-order-form').addEventListener('submit', (e) => {
  toggleUpdateButtons(true);
  statusMessage('');
})

$$('input[type=checkbox]').forEach(item => {
  item.addEventListener('click', (e) => updateProps());
});