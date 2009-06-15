// ==========================================================================
// Project:   Tasks
// Copyright: ©2009 Eloqua
// ==========================================================================
/*globals Tasks sc_require */

sc_require('models/record');

/** @class

  A Project with Tasks 

  @extends Tasks.Record
  @version 0.1
*/

Tasks.Project = Tasks.Record.extend(
/** @scope Tasks.User.prototype */ {

  timeLeft: SC.Record.attr(Number), // the amount of time left before Project completion, used for load balancing
  tasks: SC.Record.attr(Array) // an array of Task ids in the Project

});