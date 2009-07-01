// ==========================================================================
// Project: Tasks
// ==========================================================================
/*globals Tasks */

/** 

  This controller tracks the selected Task in the detail list

  @extends SC.ObjectController
	@author Suvajit Gupta
*/
Tasks.taskController = SC.ObjectController.create(
/** @scope Tasks.projectController.prototype */ {
  
  contentBinding: 'Tasks.tasksController.selection'

});
