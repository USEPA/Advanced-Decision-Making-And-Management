import draw2d from '../../packages'


/**
 * @class
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.line.LineSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend(
  /** @lends draw2d.policy.line.LineSelectionFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.line.LineSelectionFeedbackPolicy",

  /**
   * Creates a new selection feedback policy for a line or connection
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   * 
   * Called by the framework of the Policy should show a resize handle for the given shape
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   * @param {Boolean} [isPrimarySelection]
   */
  onSelect: function (canvas, figure, isPrimarySelection) {
    if (figure.selectionHandles.isEmpty()) {
      figure.selectionHandles.add(new draw2d.shape.basic.LineStartResizeHandle(figure))
      figure.selectionHandles.add(new draw2d.shape.basic.LineEndResizeHandle(figure))

      figure.selectionHandles.each( (i, e) => {
        e.setDraggable(figure.isResizeable())
        e.show(canvas)
      })
    }
    this.moved(canvas, figure)
  },

  /**
   * 
   * Callback method if the figure has been moved.
   *
   * @template
   */
  moved: function (canvas, figure) {
    figure.selectionHandles.each( (i, e) => e.relocate())
  }

})
