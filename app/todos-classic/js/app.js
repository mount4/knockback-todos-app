// Generated by CoffeeScript 1.3.3
(function() {
  var ENTER_KEY;

  ENTER_KEY = 13;

  window.app = {
    settings: {},
    collections: {}
  };

  window.TodoApp = function(view_model, element) {
    var router;
    app.collections.todos = new TodoCollection();
    app.collections.todos.fetch();
    app.settings.list_filter_mode = ko.observable('');
    view_model.todos = kb.collectionObservable(app.collections.todos, {
      view_model: TodoViewModel
    });
    view_model.tasks_exist = ko.computed(function() {
      return view_model.todos().length;
    });
    view_model.title = ko.observable('');
    view_model.onAddTodo = function(view_model, event) {
      if (!$.trim(view_model.title()) || (event.keyCode !== ENTER_KEY)) {
        return true;
      }
      app.collections.todos.create({
        title: $.trim(view_model.title())
      });
      return view_model.title('');
    };
    view_model.all_completed = ko.computed({
      read: function() {
        return !view_model.todos.collection().remainingCount();
      },
      write: function(completed) {
        return view_model.todos.collection().completeAll(completed);
      }
    });
    view_model.remaining_text = ko.computed(function() {
      return "<strong>" + (view_model.todos.collection().remainingCount()) + "</strong> " + (view_model.todos.collection().remainingCount() === 1 ? 'item' : 'items') + " left";
    });
    view_model.clear_text = ko.computed(function() {
      var count;
      if ((count = view_model.todos.collection().completedCount())) {
        return "Clear completed (" + count + ")";
      } else {
        return '';
      }
    });
    view_model.onDestroyCompleted = function() {
      return app.collections.todos.destroyCompleted();
    };
    router = new Backbone.Router;
    router.route('', null, function() {
      return app.settings.list_filter_mode('');
    });
    router.route('active', null, function() {
      return app.settings.list_filter_mode('active');
    });
    router.route('completed', null, function() {
      return app.settings.list_filter_mode('completed');
    });
    return Backbone.history.start();
  };

}).call(this);