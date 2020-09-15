/**
 * @class draw2d.shape.node.Start
 *
 * A generic Node which has an OutputPort. Mainly used for demo and examples.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     let figure =  new draw2d.shape.node.Start({color: "#3d3d3d"});
 *
 *     canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.basic.Rectangle
 */
import draw2d from '../../packages'

draw2d.shape.node.Start = draw2d.shape.basic.Rectangle.extend({

  NAME: "draw2d.shape.node.Start",
  DEFAULT_COLOR: new draw2d.util.Color("#4D90FE"),

  /**
   * @constructor
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({
      bgColor: this.DEFAULT_COLOR,
      color: this.DEFAULT_COLOR.darker(),
      width: 50,
      height: 50
    }, attr), setter, getter)
    this.createPort("output")
    this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())
    this.createPort("output")
  }

})
