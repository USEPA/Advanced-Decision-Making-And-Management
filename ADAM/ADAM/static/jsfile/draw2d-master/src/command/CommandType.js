import draw2d from '../packages'


/**
 * @class
 *
 * EditPolicies should determine an Figures editing capabilities.
 * It is possible to implement an Figure such that it handles all editing
 * responsibility.<br>
 * However, it is much more flexible and object-oriented to use
 * EditPolicies. Using policies, you can pick and choose the editing behavior for
 * an Figure without being bound to its class hierarchy. Code reuse is increased,
 * and code management is easier.
 *
 * @author Andreas Herz
 */

draw2d.command.CommandType = Class.extend(
  /** @lends draw2d.command.CommandType.prototype */
  {

  NAME: "draw2d.command.CommandType",

  /**
   * Create a new edit policy object
   *
   * @param {String} policy
   */
  init: function (policy) {
    this.policy = policy
  },

  /**
   * 
   * Return the String representation of the policy
   *
   * @returns {String}
   **/
  getPolicy: function () {
    return this.policy
  }
})

draw2d.command.CommandType.DELETE = "DELETE"
draw2d.command.CommandType.MOVE = "MOVE"
draw2d.command.CommandType.CONNECT = "CONNECT"
draw2d.command.CommandType.MOVE_BASEPOINT = "MOVE_BASEPOINT"
draw2d.command.CommandType.MOVE_VERTEX = "MOVE_VERTEX"
draw2d.command.CommandType.MOVE_VERTICES = "MOVE_VERTICES"
draw2d.command.CommandType.MOVE_GHOST_VERTEX = "MOVE_GHOST_VERTEX"
draw2d.command.CommandType.RESIZE = "RESIZE"
draw2d.command.CommandType.RESET = "RESET"
draw2d.command.CommandType.ROTATE = "ROTATE"


