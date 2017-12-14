/**
 * Helper method to check if element is hidden, since we cannot use :visible without jQuery
 * @param {HTMLElement} element The element to check for visibility
 * @returns {boolean} true if element is hidden
 * @private
 */
function elementIsHidden(element) {
  return element.offsetWidth === 0 && element.offsetHeight === 0;
}

/**
 * Get the element from an option object
 *
 * @method getElementFromObject
 * @param Object attachTo
 * @returns {Element}
 * @private
 */
function getElementFromObject(attachTo) {
  const op = attachTo.element;

  if (op instanceof HTMLElement) {
    return op;
  }

  return document.querySelector(op);
}

/**
 * Get the element from an option string
 *
 * @method getElementFromString
 * @param element the string in the step configuration
 * @returns {Element} the element from the string
 * @private
 */
function getElementFromString(element) {
  const attachTo = element.split(' ');

  attachTo.pop();
  const selector = attachTo.join(' ');

  return document.querySelector(selector);
}

/**
 * Taken from introjs https://github.com/usablica/intro.js/blob/master/intro.js#L1092-1124
 * Get an element position on the page
 * Thanks to `meouw`: http://stackoverflow.com/a/442474/375966
 * @private
 */
function getElementPosition(element) {
  const elementPosition = {
    height: element.offsetHeight,
    width: element.offsetWidth
  };

  // calculate element top and left
  let x = 0;
  let y = 0;

  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  }

  elementPosition.top = y;
  elementPosition.left = x;
  return elementPosition;
}

/**
 * Helper method to remove an element without jQuery
 * @param {string} selector The CSS selector for the element to remove
 * @private
 */
function removeElement(selector) {
  const element = document.querySelector(selector);

  if (element instanceof HTMLElement) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Set position of the highlighted element
 *
 * @param currentElement The element that belongs to the step
 * @param highlightElement The cloned element that is above the overlay
 * @private
 */
function setPositionForHighlightElement({ currentElement, highlightElement }) {
  const elementPosition = getElementPosition(currentElement);

  highlightElement.style.position = 'absolute';
  highlightElement.style.left = `${elementPosition.left}px`;
  highlightElement.style.top = `${elementPosition.top}px`;
  highlightElement.style.width = `${elementPosition.width}px`;
  highlightElement.style.height = `${elementPosition.height}px`;
  highlightElement.style['z-index'] = 10002;
}

export {
  elementIsHidden,
  getElementFromObject,
  getElementFromString,
  getElementPosition,
  removeElement,
  setPositionForHighlightElement
};
