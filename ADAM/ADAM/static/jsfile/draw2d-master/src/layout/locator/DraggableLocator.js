import draw2d from '../../packages'


/**
 * @class
 *
 * A DraggableLocator is used to place figures relative to the parent top left corner. It is
 * possible to move a child node via drag&drop.
 *
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.DraggableLocator = draw2d.layout.locator.Locator.extend(
  /** @lends draw2d.layout.locator.DraggableLocator.prototype */
  {
  
  NAME: "draw2d.layout.locator.DraggableLocator",

  /**
   * Constructs a locator with associated parent.
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },

  bind: function (parent, child) {
    // override the parent implementation to avoid
    // that the child is "!selectable" and "!draggable"

    // Don't redirect the selection handling to the parent
    // Using the DraggableLocator provides the ability to the children
    // that they are selectable and draggable. Remove the SelectionAdapter from the parent
    // assignment.
    child.setSelectionAdapter(() => child)
  },

  unbind: function (parent, child) {
    // use default
    child.setSelectionAdapter(null)
  }
})
