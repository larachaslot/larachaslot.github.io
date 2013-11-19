(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    var App, Galery, app, galery;
    App = (function() {

      function App() {
        this["switch"] = __bind(this["switch"], this);

        this.navigate = __bind(this.navigate, this);
        this.$activeScreen = $('.screen').first();
        this.$lastActiveScreen = $('.screen').last();
        this["switch"]();
        this.on();
      }

      App.prototype.on = function() {
        return $('#nav').on('click', 'a', this.navigate);
      };

      App.prototype.navigate = function(e) {
        var $a, newScreen;
        e.preventDefault();
        $a = $(e.target || $(e.srcElement));
        newScreen = $a.attr('href');
        if(('#' + this.$activeScreen.attr('id')) == newScreen) {
          return;
        }
        this.$lastActiveScreen = this.$activeScreen;
        this.$activeScreen = $(newScreen);
        return this["switch"]();
      };

      App.prototype["switch"] = function() {
        this.$activeScreen.removeClass('visuallyhidden');
        return this.$lastActiveScreen.addClass('visuallyhidden');
      };

      return App;

    })();
    Galery = (function() {

      function Galery(element) {
        this["switch"] = __bind(this["switch"], this);

        this.on = __bind(this.on, this);

        this.resize = __bind(this.resize, this);

        this.next = __bind(this.next, this);

        this.prev = __bind(this.prev, this);
        this.$el = $(element);
        this.$slides = this.$el.find('.slides');
        this.$slides.children().hide();
        this.$lastActive = this.$slides.children().last();
        this.$active = this.$slides.children().first();
        this.window = {
          height: $(window).height(),
          width: $(window).width(),
          headerHeight: $('#header').outerHeight()
        };
        this.on();
        this.resize();
        this["switch"](false);
      }

      Galery.prototype.prev = function() {
        this.$lastActive = this.$active;
        if (this.$active.prev().length) {
          this.$active = this.$active.prev();
          return this["switch"]();
        } else {
          this.$active = this.$slides.children().last();
          return this["switch"]();
        }
      };

      Galery.prototype.next = function() {
        this.$lastActive = this.$active;
        if (this.$active.next().length) {
          this.$active = this.$active.next();
          return this["switch"]();
        } else {
          this.$active = this.$slides.children().first();
          return this["switch"]();
        }
      };

      Galery.prototype.resize = function() {
        var maxHeight;
        maxHeight = this.window.height - (this.window.headerHeight + 80);
        return $('.photo img').css('max-height', maxHeight);
      };

      Galery.prototype.on = function() {
        var app,
          _this = this;
        this.$el.on('click', '.slide-next', this.next);
        this.$el.on('click', '.slide-prev', this.prev);
        app = this;
        this.$el.find('#navigator').on('click', 'a', function(e) {
          e.preventDefault();
          app.$lastActive = app.$active;
          app.$active = $($(this).attr('href'));
          return app["switch"]();
        });
        $(window).on('resize', this.resize);
        return $(window).on('keyup', function(e) {
          switch (e.keyCode) {
            case 37:
              return _this.prev();
            case 39:
              return _this.next();
          }
        });
      };

      Galery.prototype["switch"] = function(animate) {
        if (animate == null) {
          animate = true;
        }
        if (animate) {
          this.$lastActive.hide();
          return this.$active.fadeIn();
        } else {
          this.$lastActive.hide();
          return this.$active.show();
        }
      };

      return Galery;

    })();
    galery = new Galery('#photos');
    return app = new App();
  });

}).call(this);
