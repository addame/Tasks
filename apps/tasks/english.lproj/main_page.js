// ==========================================================================
// Project: Tasks
// ==========================================================================
/*globals CoreTasks Tasks sc_require */
sc_require('views/welcome');
sc_require('views/summary');
sc_require('views/task');
/** @namespace

  This page lays out the Tasks application user interface.
  
  @extends SC.Object
  @author Suvajit Gupta
  @author Joshua Holt
*/

Tasks.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    
    childViews: 'topView middleView bottomView'.w(),
    
    topView: SC.View.design(SC.Border, {
      layout: { top: 0, left: 0, right: 0, height: 42 },
      backgroundColor: '#DDD',
      borderStyle: SC.BORDER_BOTTOM,
      childViews: [
      
      SC.LabelView.design({
        layout: { centerY: 0, height: 35, left: 2, width: 35 },
        classNames: ['tasks-logo']
      }),
      
      SC.LabelView.design({
        layout: { centerY: 5, height: 30, left: 45, width: 115 },
        fontWeight: SC.BOLD_WEIGHT,
        controlSize: SC.LARGE_CONTROL_SIZE,
        value: "_Tasks".loc() + " v" + Tasks.VERSION
      }),
      
      Tasks.WelcomeView.design({
        layout: { centerY: 2, height: 30, left: 160, width: 95 },
        textAlign: SC.ALIGN_RIGHT,
        controlSize: SC.SMALL_CONTROL_SIZE,
        valueBinding: 'CoreTasks.user'
      }),
      
      SC.ButtonView.design({
        layout: { centerY: 0, height: 24, left: 265, width: 50 },
        title: "_User:".loc(),
        titleMinWidth: 0,
        toolTip: 'Manage Users',
        target: 'Tasks',
        action: 'openUserManager'
      }),

      SC.SelectFieldView.design({
        layout: { centerY: 0, height: 24, left: 320, width: 150 },
        nameKey: 'loginName',
        emptyName: "_Everyone".loc(), // FIXME: [JH2] fix empty line after this item in dropdown
        // TODO: [SG] Bind to user controller.
        // objects: CoreTasks.User.FIXTURES,
        valueBinding: 'Tasks.assignmentsController.assigneeSelection',
        disableSort: YES
      }),

      SC.TextFieldView.design({
        layout: { centerY: 0, height: 16, left: 485, width: 250 },
        hint: "_SearchHint".loc(),
        valueBinding: 'Tasks.assignmentsController.searchFilter'
      }),
      
      SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 195, width: 60 },
        title:  "_Import".loc(),
        titleMinWidth: 0,
        toolTip: 'Import Projects/Tasks from a file',
        target: 'Tasks',
        action: 'importData'
      }),

      SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 130, width: 60 },
        title:  "_Export".loc(),
        titleMinWidth: 0,
        toolTip: 'Export Projects/Tasks to a file',
        target: 'Tasks',
        action: 'exportData'
      }),
      
      SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 75, width: 50 },
        title: "_Save".loc(),
        titleMinWidth: 0,
        // TODO: [SG] add isEnabledBinding to track changes
        toolTip: 'Save Projects/Tasks',
        target: 'Tasks',
        action: 'saveData'
      }),
      
      SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 40, width: 30 },
        title: "?",
        titleMinWidth: 0,
        toolTip: 'Help',
        target: 'Tasks',
        action: 'showHelp'
      }),
      
      SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 5, width: 30 },
        title: "X",
        titleMinWidth: 0,
        toolTip: 'Exit',
        target: 'Tasks',
        action: 'exit'
      })
      
      ]
      
    }),
    
    middleView: SC.SplitView.design({
      layout: { top: 42, bottom: 42, left: 0, right: 0 },
      defaultThickness: 100,
      topLeftMaxThickness: 250,
      topLeftMinThickness: 200,
      
      topLeftView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        borderStyle: SC.BORDER_GRAY,

        contentView: SC.ListView.design({
          contentValueKey: 'displayName',
          contentBinding: 'Tasks.projectsController.arrangedObjects',
          selectionBinding: 'Tasks.projectsController.selection',
          localize: YES,
          hasContentIcon: YES,
          contentIconKey:  'icon',
          isEditable: YES,
          canEditContent: true,
          canReorderContent: true,
          canDeleteContent: true,
          destroyOnRemoval: YES
        })
      }),
      
      bottomRightView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        borderStyle: SC.BORDER_GRAY,

        contentView: SC.SourceListView.design({
          contentValueKey: 'displayName',
          contentBinding: 'Tasks.tasksController.arrangedObjects',
          selectionBinding: 'Tasks.tasksController.selection',
          localize: YES,
          hasContentIcon: YES,
          contentIconKey: 'icon',
          isEditable: YES,
          canEditContent: true,
          canReorderContent: true,
          canDeleteContent: true,
          destroyOnRemoval: YES,
          exampleView: Tasks.TaskView
        })
      })
    }),

    projectsList: SC.outlet('middleView.topLeftView.childViews.0.contentView'),
    tasksList: SC.outlet('middleView.bottomRightView.childViews.0.contentView'),
    
    bottomView: SC.View.design(SC.Border, {
      layout: { bottom: 0, left: 0, right: 0, height: 42 },
      childViews: 'projectsToolbarView tasksToolbarView'.w(),
      backgroundColor: '#DDD',
      borderStyle: SC.BORDER_TOP,
      
      projectsToolbarView: SC.View.design({
        layout: { top: 0, left: 0, bottom: 0, width: 250 },
        childViews: [
        
        SC.ButtonView.design({
          layout: { centerY: 0, left: 5, height: 24, width: 30 },
          title: "+",
          titleMinWidth: 0,
          toolTip: 'Add Project',
          target: 'Tasks',
          action: 'addProject'
        }),

        SC.ButtonView.design({
          layout: { centerY: 0, left: 40, height: 24, width: 30 },
          title: "-",
          titleMinWidth: 0,
          isEnabledBinding: 'Tasks.projectsController.isDeletable',
          toolTip: 'Delete Project',
          target: 'Tasks',
          action: 'deleteProject'
        }),
        
        Tasks.SummaryView.design({
          layout: { centerY: 2, left: 110, height: 24, width: 90 },
          valueBinding: 'Tasks.assignmentsController.length'
        })
        
        ]
        
      }),
      
      tasksToolbarView: SC.View.design({
        layout: { top: 0, left: 260, bottom: 0, right: 0 },
        childViews: [

        SC.ButtonView.design({
          layout: { centerY: 0, height: 24, left: 5, width: 30 },
          title:  "+",
          titleMinWidth: 0,
          toolTip: 'Add Task',
          target: 'Tasks',
          action: 'addTask'
        }),

        SC.ButtonView.design({
          layout: { centerY: 0, height: 24, left: 40, width: 30 },
          title:  "-",
          titleMinWidth: 0,
          isEnabledBinding: 'Tasks.tasksController.hasSelection',
          toolTip: 'Delete Task',
          target: 'Tasks',
          action: 'deleteTask'
        }),
        
        SC.SeparatorView.design({
          layoutDirection: SC.LAYOUT_VERTICAL,
          layout: { top: 5, bottom: 5, left: 85, width: 4 }
        }),

        SC.RadioView.design({
          layout: { centerY: 2, height: 21, left: 105, width: 180 },
          escapeHTML: NO,
          items: [
            { title: '<span class=tasks-priority-high>' + CoreTasks.TASK_PRIORITY_HIGH.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_PRIORITY_HIGH },
            { title: '<span class=tasks-priority-medium>' + CoreTasks.TASK_PRIORITY_MEDIUM.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_PRIORITY_MEDIUM },
            { title: '<span class=tasks-priority-low>' + CoreTasks.TASK_PRIORITY_LOW.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_PRIORITY_LOW }
          ],
          itemTitleKey: 'title',
          itemValueKey: 'value',
          valueBinding: 'Tasks.taskController.priority',
          isEnabledBinding: 'Tasks.tasksController.hasSelection',
          layoutDirection: SC.LAYOUT_HORIZONTAL
        }),
        
        SC.SeparatorView.design({
          layoutDirection: SC.LAYOUT_VERTICAL,
          layout: { top: 5, bottom: 5, left: 280, width: 4 }
        }),

        SC.RadioView.design({
          layout: { centerY: 2, height: 21, left: 295, width: 240 },
          escapeHTML: NO,
          items: [
            { title: '<span class=tasks-status-planned>' + CoreTasks.TASK_STATUS_PLANNED.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_STATUS_PLANNED },
            { title: '<span class=tasks-status-active>' + CoreTasks.TASK_STATUS_ACTIVE.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_STATUS_ACTIVE },
            { title: '<span class=tasks-status-done>' + CoreTasks.TASK_STATUS_DONE.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_STATUS_DONE },
            { title: '<span class=tasks-status-risky>' + CoreTasks.TASK_STATUS_RISKY.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_STATUS_RISKY }
          ],
          itemTitleKey: 'title',
          itemValueKey: 'value',
          valueBinding: 'Tasks.taskController.status',
          isEnabledBinding: 'Tasks.tasksController.hasSelection',
          layoutDirection: SC.LAYOUT_HORIZONTAL
        }),
        
        SC.SeparatorView.design({
          layoutDirection: SC.LAYOUT_VERTICAL,
          layout: { top: 5, bottom: 5, left: 540, width: 4 }
        }),

        SC.RadioView.design({
          layout: { centerY: 2, height: 21, left: 555, width: 220 },
          escapeHTML: NO,
          items: [
            { title: '<span class=tasks-validation-untested>' + CoreTasks.TASK_VALIDATION_UNTESTED.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_VALIDATION_UNTESTED },
            { title: '<span class=tasks-validation-passed>' + CoreTasks.TASK_VALIDATION_PASSED.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_VALIDATION_PASSED },
            { title: '<span class=tasks-validation-failed>' + CoreTasks.TASK_VALIDATION_FAILED.loc() + '</span>&nbsp;',
              value: CoreTasks.TASK_VALIDATION_FAILED }
          ],
          itemTitleKey: 'title',
          itemValueKey: 'value',
          valueBinding: 'Tasks.taskController.validation',
          isEnabledBinding: 'Tasks.tasksController.hasSelection',
          layoutDirection: SC.LAYOUT_HORIZONTAL
        })
        
        ]
        
      })
      
    })
  })
});
