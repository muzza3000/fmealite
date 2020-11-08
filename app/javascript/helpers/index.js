// This method 'isChild' returns true/fals depending on whetever an element is the child of another.

const isChild = (element, compared_e ) => {
  const classChild = compared_e.dataset.cardType;
  const classParent = element.dataset.cardType;
  if ((classChild === "failuremode")&&(classParent==="function")) {
    return ( element.dataset.id === compared_e.dataset.parentId );
  } else if ((classChild === "cause")&&(classParent==="failuremode")) {
    return ( element.dataset.id === compared_e.dataset.parentId );
  } else if ((classChild === "effect")&&(classParent==="failuremode")) {
    return ( element.dataset.id === compared_e.dataset.parentId );
  } else {
    return false;
  };
};

// This method 'parentFind' returns the instance of the parent of an element.

const parentFind = (element, elements) => {
  const classChild = element.dataset.cardType;
  let classParent = null;
  let parent = null;


  if ((classChild === "effect")||(classChild === "cause")) {
    classParent = "failuremode";
  } else if (classChild === "failuremode") {
    classParent = "function";
  };

  elements.forEach((e) => {
    if ((element.dataset.parentId === e.dataset.id) && (e.dataset.cardType === classParent)) {
      parent = e;
    };
  });

  return parent
};


// This method 'toggleClass' does correctly toggle the classes 'disselected' & 'selected'.

const toggleClass = (element, elements) => {
  // 1. We put the border-property on the selected element
  element.classList.toggle(`selected-${element.dataset.cardType}`);
  // 2. Then we remove the selected property of all other elements
  elements.forEach((e) => {
    if (e !== element) {
      e.classList.remove(`selected-${e.dataset.cardType}`);
    };
  });

  // 3. Then we add the 'disselected' class to all elements which are not direct children of the element.
  if(!(element.classList.contains(`selected-${element.dataset.cardType}`))) {
      elements.forEach((e) => {
        e.classList.remove("disselected");
      });
  } else {
      elements.forEach((e) => {
        e.classList.remove("disselected");
        if ((!(isChild(element, e)))&&(element != e)) {
          e.classList.add("disselected");
        };
      });

    // 4. Then we go ahead and whitelist the grandchildren of the element as well.
      elements.forEach((e) => {
        const parent = parentFind(e, elements);
        if (!(parent === null)) {
          const grandparent = parentFind(parent, elements);
          if (!(grandparent === null)) {
            if (grandparent.classList.contains(`selected-${element.dataset.cardType}`)) {
              e.classList.remove("disselected");
            };
          };
        };
      });
  };
};

const clearSelection = (cards) => {
  cards.forEach((card) => {
    card.classList.remove("disselected");
    card.classList.remove(`selected-${card.dataset.cardType}`);
  })
};


const itemPath = (itemType) => {
  if (itemType === "failuremode") {
    return "failure_mode";
  } else {
    return itemType;
  };
};


export { toggleClass, itemPath, clearSelection }
