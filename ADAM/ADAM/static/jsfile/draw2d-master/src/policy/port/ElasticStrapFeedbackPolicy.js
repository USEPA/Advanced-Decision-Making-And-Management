import draw2d from '../../packages'


/**
 * @class
 *
 * A draw2d.policy.SelectionFeedbackPolicy that is sensitive to the canvas selection. Subclasses will typically
 * decorate the {@link draw2d.Figure figure} with things like selection handles and/or focus feedback.
 * <br>
 * If you want to change the handle visibility for a figure, then you should use SelectionFeedbackPolicy to do that.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.port.ElasticStrapFeedbackPolicy = draw2d.policy.port.PortFeedbackPolicy.extend(
  /** @lends draw2d.policy.port.ElasticStrapFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.port.ElasticStrapFeedbackPolicy",

  /**
   * Creates a new Router object
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
    this.connectionLine = null
  },

  /**
   *
   * Called by the framework if the related shape has init a drag&drop
   * operation
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   * @returns {Boolean} return <b>false</b> to send a veto to the drag operation
   */
  onDragStart: function (canvas, figure, x, y, shiftKey, ctrlKey) {
    this.connectionLine = new draw2d.shape.basic.Line()
    this.connectionLine.setCanvas(canvas)
    this.connectionLine.getShapeElement()

    this.onDrag(canvas, figure)

    return true
  },


  /**
   *
   * Called by the framework during drag a figure.
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   */
  onDrag: function (canvas, figure) {
    let x1 = figure.ox + figure.getParent().getAbsoluteX()
    let y1 = figure.oy + figure.getParent().getAbsoluteY()

    this.connectionLine.setStartPosition(x1, y1)
    this.connectionLine.setEndPosition(figure.getAbsoluteX(), figure.getAbsoluteY())
  },

  /**
   *
   * Called by the framework if the drag drop operation ends.
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   * @param {Number} x the x-coordinate of the mouse event
   * @param {Number} y the y-coordinate of the mouse event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   */
  onDragEnd: function (canvas, figure, x, y, shiftKey, ctrlKey) {
    this.connectionLine.setCanvas(null)
    this.connectionLine = null
  },

  onHoverEnter: function (canvas, draggedFigure, hoverFiger) {
    this.connectionLine.setGlow(true)
    hoverFiger.setGlow(true)
  },

  onHoverLeave: function (canvas, draggedFigure, hoverFiger) {
    hoverFiger.setGlow(false)
    this.connectionLine.setGlow(false)
  }


})
