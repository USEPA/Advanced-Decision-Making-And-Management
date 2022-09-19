import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.ArrowLeft();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.ArrowLeft = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.ArrowLeft.prototype */
  {

  NAME: "draw2d.shape.icon.ArrowLeft",

  /**
   *
   * Creates a new icon element which are not assigned to any canvas.
   *
   * @param {Object} attr the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({width: 50, height: 50}, attr), setter, getter)
  },

  /**
   * @private
   * @returns {Object} the raphaelJS path object
   */
  createSet: function () {
    return this.canvas.paper.path("M24.316,5.318L6.684,15.5l17.632,10.182V5.318L24.316,5.318z")
  }
})

