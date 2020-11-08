const updateActionMenu = (itemType, actionMenu, elements) => {

  // grab buttons
  const functionButton = actionMenu.querySelector('#add-function-button');
  const failureModeButton = actionMenu.querySelector('#add-failure-mode-button');
  const causeButton = actionMenu.querySelector('#add-cause-button');
  const effectButton = actionMenu.querySelector('#add-effect-button');
  const deleteButton = actionMenu.querySelector('#delete-button');
  const clearSelectionButton = actionMenu.querySelector('#clear-selection-button');

  // Apply show/hide logic
  if (itemType === "function") {
    functionButton.classList.remove("hidden-button")
    failureModeButton.classList.remove("hidden-button")
    causeButton.classList.add("hidden-button")
    effectButton.classList.add("hidden-button")
    deleteButton.classList.remove("hidden-button")
    clearSelectionButton.classList.remove("hidden-button")
  };
  if (itemType === "failuremode") {
    functionButton.classList.add("hidden-button")
    failureModeButton.classList.add("hidden-button")
    causeButton.classList.remove("hidden-button")
    effectButton.classList.remove("hidden-button")
    deleteButton.classList.remove("hidden-button")
    clearSelectionButton.classList.remove("hidden-button")
  };
  if (itemType === "cause") {
    functionButton.classList.add("hidden-button")
    failureModeButton.classList.add("hidden-button")
    causeButton.classList.add("hidden-button")
    effectButton.classList.add("hidden-button")
    deleteButton.classList.remove("hidden-button")
    clearSelectionButton.classList.remove("hidden-button")
  };
  if (itemType === "effect") {
    functionButton.classList.add("hidden-button")
    failureModeButton.classList.add("hidden-button")
    causeButton.classList.add("hidden-button")
    effectButton.classList.add("hidden-button")
    deleteButton.classList.remove("hidden-button")
    clearSelectionButton.classList.remove("hidden-button")
  };
};

const removeButtons = (elements, actionMenu) => {
  // grab buttons
  const functionButton = actionMenu.querySelector('#add-function-button');
  const failureModeButton = actionMenu.querySelector('#add-failure-mode-button');
  const causeButton = actionMenu.querySelector('#add-cause-button');
  const effectButton = actionMenu.querySelector('#add-effect-button');
  const deleteButton = actionMenu.querySelector('#delete-button');
  const clearSelectionButton = actionMenu.querySelector('#clear-selection-button');

  // Listen to all mouseclicks
  document.addEventListener("click", (event) => {
    let anItemIsSelected = false;

  // Check if there are any selected elements
    elements.forEach((e) => {
      if (e.classList.contains(`selected-${e.dataset.cardType}`)) {
        anItemIsSelected = true;
      };
    });

  // remove the delete button if there isn't any selected element

    if (anItemIsSelected === false) {
      functionButton.classList.remove("hidden-button")
      failureModeButton.classList.add("hidden-button")
      causeButton.classList.add("hidden-button")
      effectButton.classList.add("hidden-button")
      deleteButton.classList.add("hidden-button")
      clearSelectionButton.classList.add("hidden-button")
    };
  });
};


export { updateActionMenu, removeButtons }
