// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
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
    window.app = {
      viewmodels: {},
      collections: {}
    };
    app.viewmodels.settings = new SettingsViewModel();
    app.collections.todos = new TodoCollection();
    app.viewmodels.header = new HeaderViewModel(app.collections.todos);
    app.viewmodels.todos = new TodosViewModel(app.collections.todos);
    app.viewmodels.footer = new FooterViewModel(app.collections.todos);
    ko.applyBindings(app.viewmodels, $('#todoapp')[0]);
    new AppRouter();
    Backbone.history.start();
    return app.collections.todos.fetch();
  });

}).call(this);