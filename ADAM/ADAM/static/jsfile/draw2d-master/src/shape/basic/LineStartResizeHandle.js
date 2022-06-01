import draw2d from '../../packages'


/**
 * @class
 * Selection handle for connections and normal lines.
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.LineResizeHandle
 */
draw2d.shape.basic.LineStartResizeHandle = draw2d.shape.basic.LineResizeHandle.extend(
  /** @lends draw2d.shape.basic.LineStartResizeHandle.prototype */
  {

  NAME: "draw2d.shape.basic.LineStartResizeHandle",

  /**
   *
   */
  init: function (figure) {
    this._super({owner: figure, index: 0})
  },

  /**
   * Returns the Port below the ResizeHandle
   *
   * @returns {draw2d.Port}
   */
  getRelatedPort: function () {
    if (this.owner instanceof draw2d.Connection)
      return this.owner.getSource()

    return null
  },

  /**
   * Returns the Port on the opposite side of the ResizeHandle
   *
   * @returns {draw2d.Port}
   */
  getOppositePort: function () {
    if (this.owner instanceof draw2d.Connection)
      return this.owner.getTarget()

    return null
  },

  /**
   * 
   * Called from the framework during a drag&drop operation
   *
   * @param {Number} dx the x difference between the start of the drag drop operation and now
   * @param {Number} dy the y difference between the start of the drag drop operation and now
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   * @returns {Boolean}
   **/
  onDrag: function (dx, dy, dx2, dy2) {
    this._super(dx, dy, dx2, dy2)

    let objPos = this.owner.getStartPoint()
    objPos.translate(dx2, dy2)

    if (this.command !== null) {
      this.command.updatePosition(objPos)

    }
    this.owner.setStartPoint(objPos)

    this.owner.isMoving = true

    return true
  },

  /**
   * 
   * Resize handle has been drop on a InputPort/OutputPort.
   *
   * @param {draw2d.Port} dropTarget
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   **/
  onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {
    this.owner.isMoving = false

    // The ResizeHandle of a Connection has been dropped on a Port
    // This will enforce a ReconnectCommand
    if (this.owner instanceof draw2d.Connection && this.command !== null) {
      this.command.setNewPorts(dropTarget, this.owner.getTarget())
      this.getCanvas().getCommandStack().execute(this.command)
    }
    this.command = null
  },

  /**
   * 
   * Controls the location of the resize handle
   **/
  relocate: function () {
    let resizeWidthHalf = this.getWidth() / 2
    let resizeHeightHalf = this.getHeight() / 2

    let anchor = this.owner.getStartPoint()

    this.setPosition(anchor.x - resizeWidthHalf, anchor.y - resizeHeightHalf)

    return this
  }
})
