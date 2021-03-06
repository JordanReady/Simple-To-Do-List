$(document).ready(function(){
//Get all tasks and append to the todo list
    var getAllTasks = function () {
        $.ajax({
            type: 'GET',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=221',
            dataType: 'json',
            success: function (response, textStatus) {
                $('#todo-list').empty();
                response.tasks.forEach(function (task) {
                    $('#todo-list').append('<div class="row task-row ' + task.completed + '"><p class="col-xs-8">' + task.content + '</p><button class="delete btn-danger" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
            });
            },
            error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
            }
        });       
    }
//Create a task function
    var createTask = function () {
        $.ajax({
            type: 'POST',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=221',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                task: {
                    content: $('#new-task-content').val()
                }
            }),
            success: function (response, textStatus) {
                $('#new-task-content').val(''); 
                getAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }
    $('#create-task').on('submit', function  (e) {
        e.preventDefault();
        createTask();
    })

//Delete a task function
    var deleteTask = function (id) {
        $.ajax({
            type: 'DELETE',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=221',
            success: function (response, textStatus) {
                getAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }

        });
    }
    $(document).on('click', '.delete', function () {
        deleteTask($(this).data('id'))
    });

//Mark a task as complete
    var markTaskComplete = function (id) {
        $.ajax({
            type: 'PUT',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=221',
            dataType: 'json',
            success: function (response, textStatus) {
                getAllTasks();
            },
            error: function (response, textStatus) {
                console.log(response);
            }
        });
    }
    $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
            markTaskComplete($(this).data('id'));
        } else {
            markTaskActive($(this).data('id'));
          }
    });

//Mark a task as active
    var markTaskActive = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=221',
          dataType: 'json',
          success: function (response, textStatus) {
            getAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }
//Filter buttons
    var filter = 'all';
    $('#active').on('click', function (e) {
        e.preventDefault();
        filter = 'active';
        filterTasks();
    });
    $('#complete').on('click', function (e) {
        e.preventDefault();
        filter = 'complete';
        filterTasks();
    });
    $('#all').on('click', function (e) {
        e.preventDefault();
        filter = 'all';
        filterTasks();
    });

//Filter tasks function
var filterTasks = function () {
    $('p').each(function(task) {
        if (filter === 'active') {
            $('.true').addClass('hide');
            $('.false').removeClass('hide');
        };
        if (filter === 'complete') {
            $('.false').addClass('hide');
            $('.true').removeClass('hide');
        };
        if (filter === 'all') {
            $('.true').removeClass('hide');
            $('.false').removeClass('hide');
        }
        
    });
}



    getAllTasks();
}); 