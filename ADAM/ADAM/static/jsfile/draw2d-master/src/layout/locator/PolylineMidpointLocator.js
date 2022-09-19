import draw2d from '../../packages'


/**
 * @class
 *
 * A PolylineMidpointLocator is used to place figures at the midpoint of a routed
 * connection. <br>
 * If the connection did have an odd count of points the figure is located in the center vertex of the polyline.<br>
 * On an even count of junction point, the figure will be center on the middle segment of the ploy line.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.ManhattanMidpointLocator
 */
draw2d.layout.locator.PolylineMidpointLocator = draw2d.layout.locator.ManhattanMidpointLocator.extend(
  /** @lends draw2d.layout.locator.PolylineMidpointLocator.prototype */
  {

  NAME: "draw2d.layout.locator.PolylineMidpointLocator",

  /**
   * Constructs a ManhattanMidpointLocator with associated Connection c.
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   *
   * Relocates the given Figure.
   *
   * @param {Number} index child index of the target
   * @param {draw2d.Figure} target The figure to relocate
   **/
  relocate: function (index, target) {
    var conn = target.getParent()
    var points = conn.getVertices()

    // it has an event count of points -> use the manhattan algorithm...this is working
    // well in this case
    if (points.getSize() % 2 === 0) {
      this._super(index, target)
    }
    // odd count of points. take the center point as fulcrum
    else {
      var index = Math.floor(points.getSize() / 2)
      var p1 = points.get(index)
      target.setPosition(p1.x - (target.getWidth() / 2), p1.y - (target.getHeight() / 2))
    }
  }
})
