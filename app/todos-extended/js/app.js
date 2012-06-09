// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    kb.locale_manager.setLocale('en');
    kb.locale_change_observable = kb.triggeredObservable(kb.locale_manager, 'change');
    ko.bindingHandlers.dblclick = {
      init: function(element, value_accessor) {
        return $(element).dblclick(ko.utils.unwrapObservable(value_accessor()));
      }
    };
    ko.bindingHandlers.block = {
      update: function(element, value_accessor) {
        return element.style.display = ko.utils.unwrapObservable(value_accessor()) ? 'block' : 'none';
      }
    };
    ko.bindingHandlers.selectAndFocus = {
      init: function(element, value_accessor, all_bindings_accessor) {
        ko.bindingHandlers.hasfocus.init(element, value_accessor, all_bindings_accessor);
        return ko.utils.registerEventHandler(element, 'focus', function() {
          return element.select();
        });
      },
      update: function(element, value_accessor) {
        var _this = this;
        ko.utils.unwrapObservable(value_accessor());
        return _.defer(function() {
          return ko.bindingHandlers.hasfocus.update(element, value_accessor);
        });
      }
    };
    ko.bindingHandlers.placeholder = {
      update: function(element, value_accessor, all_bindings_accessor, view_model) {
        return $(element).attr('placeholder', ko.utils.unwrapObservable(value_accessor()));
      }
    };
    window.app = {
      viewmodels: {},
      collections: {}
    };
    app.collections.priorities = new PriorityCollection();
    app.viewmodels.settings = new SettingsViewModel([new Backbone.ModelRef(app.collections.priorities, 'high'), new Backbone.ModelRef(app.collections.priorities, 'medium'), new Backbone.ModelRef(app.collections.priorities, 'low')], kb.locale_manager.getLocales());
    app.collections.todos = new TodoCollection();
    app.viewmodels.header = new HeaderViewModel(app.collections.todos);
    app.viewmodels.todos = new TodosViewModel(app.collections.todos);
    app.viewmodels.footer = new FooterViewModel(app.collections.todos);
    ko.applyBindings(app.viewmodels, $('#todoapp')[0]);
    new AppRouter();
    Backbone.history.start();
    app.collections.todos.fetch();
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
  });

}).call(this);
