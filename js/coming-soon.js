/*
 * Coming soon script */

(function ($) {

    /* Default settings
     * ======================================================= */
    var defaultSettings = {

        /* Bg border options */
        bg_border_width_desktop: 20,    // Change the body border width on desktop view. Value is in px unit.
        bg_border_width_mobile : 10,    // Change the body border width on mobile view. Value is in px unit.
        bg_border_color        : [      // Change the body border color. Insert the color name or color hex code.
            '#ffffff',                  // First slide color
            '#ffffff',                  // Second slide color
            '#ffffff'                   // Third slide color
        ],
        body_bg_color          : [       // Change the body background color. Insert the color name or color hex code.
            '#242b41',              // First slide color
            '#242b41',              // Second slide color
            '#242b41'               // Third slide color
        ],
        body_image_opacity     : 0.15,   // Change the body image opacity. Value start from (0 to 1).

        /* Bg pattern options */
        bg_pattern_show   : true,   // Options (true, false). Show or hide the body background pattern.
        bg_pattern_URL    : [       // Change the body background pattern.
            'images/pattern.png',   // First slide color
            'images/pattern.png',   // Second slide color
            'images/pattern.png'    // Third slide color
        ],
        bg_pattern_opacity: 0.04,   // Change the pattern opacity. Value start from (0 to 1).

        /* Counter options */

        // <div class="cs-counter" data-timer="900"></div>
        // <div class="cs-counter" data-date="2014-01-01 00:00:00"></div>

        counter_selector: '.cs-counter',    // Counter html selector
        start           : true,            // Options (true, false). Start or stop the counter.
        animation       : "smooth",         // Options (ticks, smooth). Counter circle animation.
        use_background  : false,            // Options (true, false). Counter background show or hide.
        circle_bg_color : "#ffffff",        // Circle background color.
        bg_width        : 5,                // Circle background width.
        fg_width        : 0.010,            // Value start from (0 to 1). Circle width
        total_duration  : "Auto",           // "Auto", "Years", "Months", "Days", "Hours"
        direction       : "Clockwise",      // "Clockwise", "Counter-clockwise" or "Both"
        start_angle     : 0,                // This should be an integer value between 0 and 360. 0 is from the top, 90 from the right, 180 from the bottom and 270 from the left.
        count_past_zero : true,             // Options (true, false). Stop the counter when total time complete. When data used its on
        time            : {                 // Change the time color
            Days   : {color: "#D22630"},    // First counter
            Hours  : {color: "#D22630"},    // Second counter
            Minutes: {color: "#D22630"},    // Third counter
            Seconds: {color: "#D22630"}     // Fourth counter 
        },

        /* Vertical slider options */
        navigation                       : true,    // Options (true, false). Show or hide the navigation.
        navigationIcons                  : [        // Change the navigation icons. Use also use font icons and image icons
            // '<img src="images/pagination-1.png">',              // First button image example
            '<i class="fa fa-home"></i>',              // First button font icons example
            '<i class="fa fa-cog"></i>',              // Second button
            '<i class="fa fa-phone"></i>'               // Third button
        ],
        navigationPosition               : 'right', // Options (right, left). Change the navigation position.
        navigationTooltips               : false,   // not used
        showActiveTooltip                : false,   // not used
        css3                             : true,    // not used
        scrollingSpeed                   : 1000,    // Change the slider scrolling speed. Value is in milliseconds.
        loopBottom                       : true,    // Options (true, false). Loop the slider at bottom of the screen.
        loopTop                          : false,   // Options (true, false). Loop the slider at top of the screen.
        scrollOverflow                   : false,    // Options (true, false). On off the content overflow on desktop view
        continuousVertical               : false,   // Options (true, false). Endless loop. This option works if the above two options set false.
        touchSensitivity                 : 15,      // Touch sensitivity. Value is in milliseconds.
        normalScrollElementTouchThreshold: 5,       // Touch Threshold. Value is in milliseconds.
        keyboardScrolling                : true,    // Options (true, false). Enable or disable the keyboard scrolling.
        verticalCentered                 : true,    // Options (true, false). Center the content vertically.
        responsiveWidth                  : 991,     // not used


        /* Responsive font options */
        responsive_font: true,         // Options (true, false). Make the body font responsive.

        /* Media query */
        media_query_max_width: '991px'  // Media query width. do not changed.

    };

    /* Plugin start */
    $.fn.comingSoon = function (settings) {
        settings = $.extend({}, defaultSettings, settings || {});
        return this.each(function () {

            // variables
            var $this = $(this), Canvas, Object;

            /* Constructor
             * ============================================ */
            Canvas = function () {

                // border selector
                this.border_selector = '.cs-bg-border';
                // pattern selector
                this.pattern_selector = '.cs-bg-pattern';
                // content selector
                this.content_selector = '.cs-content';
                // counter selector
                this.counter_selector = settings.counter_selector;
                // cs-wrapper
                this.cs_wrapper = $this.find('.cs-wrapper');
                // cs-slide
                this.cs_slides = this.cs_wrapper.find('.cs-slide.section');
            };

            /* Classes
             * =========================================== */

            /* Ajax contact form send emails
             * =========================================== */
            Canvas.prototype.contact_form = function () {

                // Get the form.
                var form = $this.find('.cs-form');
                // Set up an event listener for the contact form.
                $(form).submit(function (event) {

                    // Stop the browser from submitting the form.
                    event.preventDefault();

                    // this
                    var self = $(this);

                    // Serialize the form data.
                    var formData = self.serialize();

                    // show the progress bar
                    self.find('button[type=submit] span').addClass('active');

                    // Submit the form using AJAX.
                    $.ajax({
                        type: 'POST',
                        url : self.attr('action'),
                        data: formData
                    })
                        .done(function (response) {
                            // Set the message text.
                            self.find('.cs-form-error').text(response);
                            setTimeout(function () {
                                self.find('.cs-form-error').text('');
                            }, 4000);
                            // Clear the form.
                            self.find('input[type=text]').val('');
                            self.find('input[type=email]').val('');
                            self.find('textarea').val('');

                            // hide the progress bar
                            self.find('button[type=submit] span').removeClass('active');
                        })
                        .fail(function (data) {
                            // Set the message text.
                            if (data.responseText !== '') {
                                // $(formMessages).text(data.responseText);
                                self.find('.cs-form-error').text('Error');
                                setTimeout(function () {
                                    self.find('.cs-form-error').text('');
                                }, 4000);
                            }
                            // hide the progress bar
                            self.find('button[type=submit] span').removeClass('active');
                        });
                    // debug
                    //console.log(formData);
                });
            };

            /* Responsive font plugin
             * =========================================== */
            Canvas.prototype.responsive_font_plugin = function () {

                // check if the responsive font options is true
                if (settings.responsive_font === true) {

                    // responsive font function
                    $.fn.fontFlex = function (min, max, mid) {

                        var $this = this;

                        $(window).resize(function () {

                            var size = window.innerWidth / mid;

                            if (size < min) size = min;
                            if (size > max) size = max;

                            $this.css('font-size', size + 'px');

                        }).trigger('resize');
                    };

                    // Responsive font size
                    $('body').fontFlex(12, 100, 100);
                }

            };

            /* Append divs
             * =========================================== */
            Canvas.prototype.append_selectors = function () {

                // body border
                this.cs_slides.prepend('<div class="cs-bg-border"></div>');

                // body image
                // this.cs_slides.prepend('<div class="cs-bg-image"></div>');

                // // If this options is true then append the div
                if (settings.bg_pattern_show === true) {
                    <!-- background pattern -->
                    this.cs_slides.prepend('<div class="cs-bg-pattern"></div>');
                }

            };

            /* Vertical slider plugin
             * =========================================== */
            Canvas.prototype.vertical_slider = function (self) {

                // variable
                self = this;

                function initialization(scrollOverflow) {

                    // Apply this plugin in .cs-wrapper selector
                    $this.find(self.cs_wrapper).fullpage({
                        //Navigation
                        // menu              : '#menu',
                        // lockAnchors       : true,
                        // anchors           : ['firstPage', 'secondPage'],
                        navigation        : settings.navigation, // true,
                        navigationPosition: settings.navigationPosition, // 'right',
                        navigationTooltips: settings.navigationTooltips, // ['firstSlide', 'secondSlide'],
                        showActiveTooltip : settings.showActiveTooltip, // false,
                        // slidesNavigation  : true,
                        // slidesNavPosition : 'bottom',

                        //Scrolling
                        css3                             : settings.css3, // true,
                        scrollingSpeed                   : settings.scrollingSpeed, // 1000,
                        // autoScrolling                    : true,
                        // fitToSection                     : false,
                        // fitToSectionDelay                : 1000,
                        // scrollBar                        : false,
                        // easing                           : 'easeInOutCubic',
                        // easingcss3                       : 'ease',
                        loopBottom                       : settings.loopBottom, // true,
                        loopTop                          : settings.loopTop, // false,
                        // loopHorizontal                   : true,
                        continuousVertical               : settings.continuousVertical, // false,
                        // normalScrollElements             : '#element1, .element2',
                        scrollOverflow                   : scrollOverflow, // true,
                        scrollOverflowOptions            : {
                            scrollbars    : true,
                            mouseWheel    : true,
                            hideScrollbars: false,
                            fadeScrollbars: true,
                            disableMouse  : false
                        },
                        touchSensitivity                 : settings.touchSensitivity, // 15,
                        normalScrollElementTouchThreshold: settings.normalScrollElementTouchThreshold, // 5,

                        //Accessibility
                        keyboardScrolling: settings.keyboardScrolling, // true,
                        // animateAnchor    : false,
                        // recordHistory    : false,

                        //Design
                        // controlArrows   : true,
                        verticalCentered: settings.verticalCentered, // true,
                        sectionsColor   : settings.body_bg_color, //['#242b41'],
                        // paddingTop      : '20px',
                        // paddingBottom   : '20px',
                        // fixedElements   : '#header, .footer',
                        responsiveWidth : settings.responsiveWidth, // 991
                        // responsiveHeight: 600

                        //Custom selectors
                        // sectionSelector: '.section',
                        // slideSelector  : '.slide',

                        afterLoad: function (anchorLink, index) {

                            // counter
                            var counter = 1;

                            // count the number of slides
                            self.cs_slides.each(function () {
                                // console.log(counter);

                                // check if the slide and counter is true
                                if (index == counter) {

                                    // add class active
                                    $(this).find('[data-reveal]').addClass('active');
                                }

                                // increment
                                counter++;
                            })
                        }
                    });

                }

                // check if the desktop view
                if (this.media_selector.css('display') === 'block') {

                    initialization(settings.scrollOverflow);

                    // mobile view
                } else {

                    initialization(false);
                }

            };

            /* Vertical slider plugin navigation append
             * ============================================= */
            Canvas.prototype.vertical_slider_navigation = function (pagination_selector, position_set) {

                // check if the desktop view
                if (this.media_selector.css('display') === 'block') {

                    position_set = settings.bg_border_width_desktop;

                    // mobile view
                } else {
                    position_set = settings.bg_border_width_mobile;
                }

                // variable
                pagination_selector = '#fp-nav, .fp-slidesNav';

                // find the vertical slider pagination and append the images
                $(pagination_selector).find('ul li a').each(function (index) {
                    if ($(this).find('.vIcons').length === 0) {
                        $(this).append('<div class="vIcons">' + settings.navigationIcons[index] + '</div>');
                    }
                });

                // right space
                $('#fp-nav.right').css({
                    'right': position_set + 'px'
                });

                // left space
                $('#fp-nav.left').css({
                    'left': position_set + 'px'
                })

            };

            /* Append div for media query
             * ========================================== */
            Canvas.prototype.mediaQuery = function () {

                // Append the div with in container used for media query
                $this.prepend('<div class="cs-coming-soon-mediaQuery"></div>');
            };

            /* Body background image
             * =========================================== */
            Canvas.prototype.body_background = function (body_image) {

                // media query selector
                this.media_selector = $this.find('.cs-coming-soon-mediaQuery');

                // variable
                body_image = this.cs_slides.find('.cs-bg-image');

                // body image opacity apply
                body_image.css('opacity', settings.body_image_opacity);

            };

            /* Counter plugin
             * =========================================== */
            Canvas.prototype.counter_plugin = function () {

                // options documentation

                // create a stop watch
                // <div class="example" data-timer="900"></div>

                // counter plugin initialize
                $this.find(this.counter_selector).TimeCircles({
                    start          : settings.start,
                    animation      : settings.animation,
                    circle_bg_color: settings.circle_bg_color,
                    use_background : settings.use_background,
                    fg_width       : settings.fg_width,
                    bg_width       : settings.bg_width,
                    total_duration : settings.total_duration,
                    direction      : settings.direction,
                    start_angle    : settings.start_angle,
                    count_past_zero: settings.count_past_zero,
                    time           : {
                        Days   : {color: settings.time.Days.color},
                        Hours  : {color: settings.time.Hours.color},
                        Minutes: {color: settings.time.Minutes.color},
                        Seconds: {color: settings.time.Seconds.color}
                    }

                    // start          : true, // options (true, false)
                    // animation      : "smooth", // options (ticks, smooth)
                    // circle_bg_color: "#D22630",
                    // use_background : true,
                    // fg_width       : 0.01,
                    // bg_width       : 1.2,
                    // total_duration : "Auto", // "Auto", "Years", "Months", "Days", "Hours"
                    // direction      : "Clockwise",   // "Clockwise", "Counter-clockwise" or "Both"
                    // start_angle    : 0, //  This should be an integer value between 0 and 360. 0 is from the top, 90 from the right, 180 from the bottom and 270 from the left.
                    // time           : {
                    //     Days   : {color: "#D22630"},
                    //     Hours  : {color: "#D22630"},
                    //     Minutes: {color: "#D22630"},
                    //     Seconds: {color: "#D22630"}
                    // }
                }).rebuild();
            };

            /* Content function
             * =========================================== */
            Canvas.prototype.content_section = function (padding_set) {

                // check if the desktop view
                if (this.media_selector.css('display') === 'block') {

                    padding_set = settings.bg_border_width_desktop;

                    // mobile view
                } else {
                    padding_set = settings.bg_border_width_mobile;
                }

                // apply content padding according to border width
                $this.find(this.content_selector).css({
                    paddingLeft  : padding_set + 'px',
                    paddingRight : padding_set + 'px',
                    paddingTop   : padding_set + 40 + 'px',
                    paddingBottom: padding_set + 30 + 'px'
                })
            };

            /* body pattern function
             * =========================================== */
            Canvas.prototype.bg_pattern = function () {

                // patten show or hide
                if (settings.bg_pattern_show === true) {

                    // pattern opacity and image URL apply
                    this.cs_slides.find(this.pattern_selector).css({

                        // opacity
                        opacity: settings.bg_pattern_opacity
                    });

                    // body pattern
                    this.cs_slides.find(this.pattern_selector).each(function (index) {
                        $(this).css('backgroundImage', 'url(' + settings.bg_pattern_URL[index] + ')');
                    });

                    // show the patten
                    this.cs_slides.find(this.pattern_selector).show(0);
                } else {

                    // hide the pattern
                    this.cs_slides.find(this.pattern_selector).hide(0);
                }

            };

            /* body border function
             * =========================================== */
            Canvas.prototype.bg_border = function (border_width) {

                // check if the desktop view
                if (this.media_selector.css('display') === 'block') {

                    border_width = settings.bg_border_width_desktop;

                    // mobile view
                } else {
                    border_width = settings.bg_border_width_mobile;
                }

                // border width
                $this.find(this.border_selector).css({
                    borderWidth: border_width + 'px'
                });

                // border color apply
                $this.find(this.border_selector).each(function (index) {
                    $(this).css({
                        borderTopColor   : settings.bg_border_color[index],
                        borderLeftColor  : settings.bg_border_color[index],
                        borderRightColor : settings.bg_border_color[index],
                        borderBottomColor: settings.bg_border_color[index]
                    });
                });

            };

            /* Media query
             * =================================================== */
            Canvas.prototype.media_screen = function (self) {

                // variables
                self = this;

                // JS media query
                window.matchMedia('screen and (max-width: ' + settings.media_query_max_width + ')')
                    .addListener(function (mql) {
                        if (mql.matches) {
                            // Media query does match
                            // call functions
                            // console.log('mobile');
                            self.bg_border();
                            self.vertical_slider();
                            self.content_section();
                            self.vertical_slider_navigation();

                        } else {
                            // Media query does not match anymore
                            // call functions
                            // console.log('desktop');
                            self.bg_border();
                            self.vertical_slider();
                            self.content_section();
                            self.vertical_slider_navigation();
                        }
                    });
            };

            // Call object
            Object = new Canvas();

            // Call functions
            Object.append_selectors();
            Object.mediaQuery();
            Object.body_background();
            Object.bg_border();
            Object.bg_pattern();
            Object.content_section();
            Object.counter_plugin();
            Object.vertical_slider();

            // Update functions on screen resize
            Object.media_screen();

            // counter plugin initialize on windows resize
            $(window).resize(function () {
                Object.counter_plugin();
            });

            // Call responsive font plugin
            Object.responsive_font_plugin();
            Object.vertical_slider_navigation();
            Object.contact_form();

        });
    };

    /*global $, jQuery, document*/
}(jQuery));