import { Controller } from "stimulus"
import { toggleClass, itemPath, clearSelection } from "helpers/index"
import { updateActionMenu, removeButtons  } from "helpers/action_menu"

export default class extends Controller {
  static targets = ["card", "failuremodeForm", "causeForm", "effectForm", "delete", "actionMenu", "background"]

  initialize() {
    const selectedItemType = this.data.get("selected-item-type")
    const selectedItemId = parseInt(this.data.get("selected-item-id"))
  }

  connect() {
    console.log("--> edit fmea controller connected")
   }

   createFailureMode () {
    // need to overwrite the id of the parent element in the modal form with the correct value
    this.failuremodeFormTarget.value = this.selectedItemId;
  }

   createCause () {
    // need to overwrite the id of the parent element in the modal form with the correct value
    this.causeFormTarget.value = this.selectedItemId;
  }

   createEffect () {
    // need to overwrite the id of the parent element in the modal form with the correct value
    this.effectFormTarget.value = this.selectedItemId;
  }

   delete () {
    // need to write the delete path for the selected item
    this.deleteTarget.attributes.href.value = `/${itemPath(this.selectedItemType)}s/${this.selectedItemId}`
  }

  select() {
    // Write the current selection to the DOM
    this.selectedItemType = event.currentTarget.dataset.cardType;
    this.selectedItemId = event.currentTarget.dataset.id;

    if (this.selectedItemType === "") {
      clearSelection(this.cardTargets);
    } else {
      // Apply the focus logic
      toggleClass(event.currentTarget, this.cardTargets);
      updateActionMenu(this.selectedItemType, this.actionMenuTarget, this.cardTargets)
    }
  };

  manageButtons() {
    removeButtons(this.cardTargets, this.actionMenuTarget);
  }

  // Getters and setters
  get selectedItemId() {
    return parseInt(this.data.get("selected-item-id"))
  }
  set selectedItemId(value) {
    this.data.set("selected-item-id", value);
  }
  get selectedItemType() {
    return this.data.get("selected-item-type");
  }
  set selectedItemType(value) {
    this.data.set("selected-item-type", value);
  }
};
