// Generated by CoffeeScript 1.3.3
(function() {
  var ENTER_KEY;

  ENTER_KEY = 13;

  window.app = {
    settings: {},
    collections: {}
  };

  window.TodoApp = function(view_model, element) {
    var router, tooltip_visible;
    kb.locale_manager.setLocale('en');
    kb.locale_change_observable = kb.triggeredObservable(kb.locale_manager, 'change');
    app.collections.todos = new TodoCollection();
    app.collections.todos.fetch();
    app.collections.priorities = new PriorityCollection();
    app.settings = new SettingsViewModel([new Backbone.ModelRef(app.collections.priorities, 'high'), new Backbone.ModelRef(app.collections.priorities, 'medium'), new Backbone.ModelRef(app.collections.priorities, 'low')], kb.locale_manager.getLocales());
    view_model.todos = kb.collectionObservable(app.collections.todos, {
      view_model: TodoViewModel,
      sort_attribute: 'title'
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
        title: $.trim(this.title()),
        priority: app.settings.default_priority()
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
    Backbone.history.start();
    view_model.input_placeholder_text = kb.observable(kb.locale_manager, {
      key: 'placeholder_create'
    });
    view_model.input_tooltip_text = kb.observable(kb.locale_manager, {
      key: 'tooltip_create'
    });
    view_model.priority_color = ko.computed(function() {
      return app.settings.default_priority_color();
    });
    view_model.tooltip_visible = ko.observable(false);
    tooltip_visible = view_model.tooltip_visible;
    view_model.onSelectPriority = function(view_model, event) {
      event.stopPropagation();
      tooltip_visible(false);
      return app.settings.default_priority(ko.utils.unwrapObservable(view_model.priority));
    };
    view_model.onToggleTooltip = function() {
      return view_model.tooltip_visible(!view_model.tooltip_visible());
    };
    view_model.sort_mode = ko.computed(function() {
      var new_mode;
      new_mode = app.settings.selected_list_sorting();
      switch (new_mode) {
        case 'label_title':
          return view_model.todos.sortAttribute('title');
        case 'label_created':
          return view_model.todos.sortedIndex(function(models, model) {
            return _.sortedIndex(models, model, function(test) {
              return kb.utils.wrappedModel(test).get('created_at').valueOf();
            });
          });
        case 'label_priority':
          return view_model.todos.sortedIndex(function(models, model) {
            return _.sortedIndex(models, model, function(test) {
              return app.settings.priorityToRank(kb.utils.wrappedModel(test).get('priority'));
            });
          });
      }
    });
    view_model.complete_all_text = kb.observable(kb.locale_manager, {
      key: 'complete_all'
    });
    view_model.remaining_text_key = ko.computed(function() {
      if (view_model.todos.collection().remainingCount() === 1) {
        return 'remaining_template_s';
      } else {
        return 'remaining_template_pl';
      }
    });
    view_model.remaining_text = kb.observable(kb.locale_manager, {
      key: view_model.remaining_text_key,
      args: function() {
        return view_model.todos.collection().remainingCount();
      }
    });
    view_model.clear_text_key = ko.computed(function() {
      if (view_model.todos.collection().completedCount() === 0) {
        return null;
      } else {
        if (view_model.todos.collection().completedCount() === 1) {
          return 'clear_template_s';
        } else {
          return 'clear_template_pl';
        }
      }
    });
    view_model.clear_text = kb.observable(kb.locale_manager, {
      key: view_model.clear_text_key,
      args: function() {
        return view_model.todos.collection().completedCount();
      }
    });
    view_model.instructions_text = kb.observable(kb.locale_manager, {
      key: 'instructions'
    });
    return _.delay((function() {
      app.collections.priorities.fetch({
        success: function(collection) {
          if (!collection.get('high')) {
            collection.create({
              id: 'high',
              color: '#bf30ff'
            });
          }
          if (!collection.get('medium')) {
            collection.create({
              id: 'medium',
              color: '#98acff'
            });
          }
          if (!collection.get('low')) {
            return collection.create({
              id: 'low',
              color: '#38ff6a'
            });
          }
        }
      });
      $('.colorpicker').mColorPicker({
        imageFolder: $.fn.mColorPicker.init.imageFolder
      });
      return $('.colorpicker').bind('colorpicked', function() {
        var model;
        model = app.collections.priorities.get($(this).attr('id'));
        if (model) {
          return model.save({
            color: $(this).val()
          });
        }
      });
    }), 1000);
  };

}).call(this);