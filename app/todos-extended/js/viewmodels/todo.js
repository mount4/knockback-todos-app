// Generated by CoffeeScript 1.3.3
(function() {

  window.TodoViewModel = function(model) {
    var tooltip_visible,
      _this = this;
    this.editing = ko.observable(false);
    this.completed = kb.observable(model, {
      key: 'completed',
      read: (function() {
        return model.completed();
      }),
      write: (function(completed) {
        return model.completed(completed);
      })
    }, this);
    this.title = kb.observable(model, {
      key: 'title',
      write: (function(title) {
        if ($.trim(title)) {
          model.save({
            title: $.trim(title)
          });
        } else {
          _.defer(function() {
            return model.destroy();
          });
        }
        return _this.editing(false);
      })
    }, this);
    this.onDestroyTodo = function() {
      return model.destroy();
    };
    this.onCheckEditBegin = function() {
      if (!_this.editing() && !_this.completed()) {
        _this.editing(true);
        return $('.todo-input').focus();
      }
    };
    this.onCheckEditEnd = function(view_model, event) {
      if ((event.keyCode === 13) || (event.type === 'blur')) {
        $('.todo-input').blur();
        return _this.editing(false);
      }
    };
    this.created_at = model.get('created_at');
    this.completed_at = kb.observable(model, {
      key: 'completed',
      localizer: LongDateLocalizer
    });
    this.completed_text = ko.computed(function() {
      var completed_at;
      completed_at = _this.completed_at();
      if (!!completed_at) {
        return "" + (kb.locale_manager.get('label_completed')) + ": " + completed_at;
      } else {
        return '';
      }
    });
    this.priority_color = kb.observable(model, {
      key: 'priority',
      read: function() {
        return app_settings.getColorByPriority(model.get('priority'));
      }
    });
    this.tooltip_visible = ko.observable(false);
    tooltip_visible = this.tooltip_visible;
    this.onSelectPriority = function(view_model, event) {
      event.stopPropagation();
      tooltip_visible(false);
      return model.save({
        priority: ko.utils.unwrapObservable(this.priority)
      });
    };
    this.onToggleTooltip = function() {
      return _this.tooltip_visible(!_this.tooltip_visible());
    };
    this.complete_all_text = kb.observable(kb.locale_manager, 'complete_all');
  };

}).call(this);
