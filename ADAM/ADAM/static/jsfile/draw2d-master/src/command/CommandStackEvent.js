import draw2d from '../packages'


/**
 * @class
 * Event class which will be fired for every CommandStack operation. Required for CommandStackListener.
 */
draw2d.command.CommandStackEvent = Class.extend(
  /** @lends draw2d.command.CommandStackEvent.prototype */
  {

  NAME: "draw2d.command.CommandStackEvent",

  /**
   * Create a new CommandStack objects which can be execute via the CommandStack.
   *
   * @param {draw2d.command.Command} command the related command
   * @param {Number} details the current state of the command execution
   *
   */
  init: function (stack, command, details, action) {
    this.stack = stack
    this.command = command
    this.details = details // deprecated
    this.action = action
  },


  /**
   *
   * Return the corresponding stack of the event.
   *
   * @returns {draw2d.command.CommandStack}
   **/
  getStack: function () {
    return this.stack
  },


  /**
   *
   * Returns null or a Command if a command is relevant to the current event.
   *
   * @returns {draw2d.command.Command}
   **/
  getCommand: function () {
    return this.command
  },

  /**
   *
   * Returns an integer identifying the type of event which has occurred.
   * Defined by {@link draw2d.command.CommandStack}.
   *
   * @returns {Number}
   **/
  getDetails: function () {
    return this.details
  },


  /**
   *
   * Returns true if this event is fired after the stack having changed.
   *
   * @returns {Boolean} true if post-change event
   **/
  isPostChangeEvent: function () {
    return 0 !== (this.getDetails() & draw2d.command.CommandStack.POST_MASK)
  },

  /**
   *
   * Returns true if this event is fired prior to the stack changing.
   *
   * @returns {Boolean} true if pre-change event
   **/
  isPreChangeEvent: function () {
    return 0 !== (this.getDetails() & draw2d.command.CommandStack.PRE_MASK)
  }
})
