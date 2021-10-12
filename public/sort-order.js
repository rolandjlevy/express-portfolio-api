const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);
const setSubmitState = (state, msg) => {
  $$('.update-btn').forEach(item => item.disabled = state);
  $('#update-status').textContent = msg;
}

const sortable = new Sortable(sortableList, {
  animation: 150,
  ghostClass: 'sortable-ghost',
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag",
  handle: '.handle', 
  onSort: function (e) { updateProps(); },
});

const updateProps = () => {
  const order = sortable.toArray().map((id, index) => {
    const active = $(`#project-${id} input[type=checkbox]`).checked;
    const category = $(`#project-${id} input[type=hidden]`).value;
    return { id, active, sortOrder:index + 1, category};
  });
  $('#order').value = JSON.stringify(order);
  setSubmitState(false, 'Changes pending...');
}

$('#sort-order-form').addEventListener('submit', (e) => {
  setSubmitState(true, '');
})

$$('input[type=checkbox]').forEach(item => {
  item.addEventListener('click', (e) => updateProps());
});