import draw2d from '../../packages'


/**
 * @class
 *
 * A RightLocator is used to place figures to the right of a parent shape.
 *
 *
 *
 * @example
 *
 *
 *    // create a basic figure and add a Label/child via API call
 *    //
 *    var end = new draw2d.shape.node.End();
 *    end.add(new draw2d.shape.basic.Label({text:"Right Label"}), new draw2d.layout.locator.RightLocator({
 *         margin: 10 // distance to the parent shape
 *    }));
 *    canvas.add( end, 50,50);
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.RightLocator = draw2d.layout.locator.Locator.extend(
  /** @lends draw2d.layout.locator.RightLocator.prototype */
  {
  
  NAME: "draw2d.layout.locator.RightLocator",

  /**
   * Constructs a locator with associated parent.
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    this.margin = (attr && ("margin" in attr)) ? attr.margin : 5
  },


  /**
   * 
   * Relocates the given Figure.
   *
   * @param {Number} index child index of the target
   * @param {draw2d.Figure} target The figure to relocate
   **/
  relocate: function (index, target) {
    var parent = target.getParent()
    var boundingBox = parent.getBoundingBox()

    // I made a wrong decision in the port handling: anchor point
    // is in the center and not topLeft. Now I must correct this flaw here, and there, and...
    // shit happens.
    var offset = (parent instanceof draw2d.Port) ? boundingBox.h / 2 : 0

    if (target instanceof draw2d.Port) {
      target.setPosition(boundingBox.w, (boundingBox.h / 2) - offset)
    }
    else {
      var targetBoundingBox = target.getBoundingBox()
      target.setPosition(boundingBox.w + this.margin, (boundingBox.h / 2) - (targetBoundingBox.h / 2) - offset)
    }
  }
})
