// Generated by CoffeeScript 1.3.3
(function() {

  window.FooterViewModel = function(todos) {
    var _this = this;
    this.todos = kb.collectionObservable(todos);
    this.todos.collection().bind('change', function() {
      return _this.todos.valueHasMutated();
    });
    this.remaining_text_key = ko.computed(function() {
      if (todos.remainingCount() === 1) {
        return 'remaining_template_s';
      } else {
        return 'remaining_template_pl';
      }
    });
    this.remaining_text = kb.observable(kb.locale_manager, {
      key: this.remaining_text_key,
      args: function() {
        return _this.todos.collection().remainingCount();
      }
    });
    this.clear_text_key = ko.computed(function() {
      if (_this.todos.collection().completedCount() === 0) {
        return null;
      } else {
        if (todos.completedCount() === 1) {
          return 'clear_template_s';
        } else {
          return 'clear_template_pl';
        }
      }
    });
    this.clear_text = kb.observable(kb.locale_manager, {
      key: this.clear_text_key,
      args: function() {
        return _this.todos.collection().completedCount();
      }
    });
    this.onDestroyCompleted = function() {
      return todos.destroyCompleted();
    };
    this.instructions_text = kb.observable(kb.locale_manager, {
      key: 'instructions'
    });
    return this;
  };

}).call(this);
