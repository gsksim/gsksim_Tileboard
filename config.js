/*
 This is an example configuration file.

 COPY OR RENAME THIS FILE TO config.js.

 Make sure you use real IDs from your HA entities.
*/


var CONFIG = {
   customTheme: CUSTOM_THEMES.COMPACT, // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MATERIAL, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
   transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
   entitySize: ENTITY_SIZES.BIG, //SMALL, BIG are available
   tileSize: 150,
   tileMargin: 6,
   serverUrl: "http://192.168.x.xxx:8123",
   wsUrl: "ws://192.168.x.xxx:8123/api/websocket",
   //authToken: "xxxxxxxxxxxxxxxxx", // optional: make an long live token and put it here
   //googleApiKey: "XXXXXXXXXX", // Required if you are using Google Maps for device tracker
   debug: false, // Prints entities and state change info to the console.
   doorEntryTimeout: 90,
   // next fields are optional
   events: [
      {
         command: 'open_doorentry',
         action: function(eventData) {
            this.$scope.openDoorEntry(doorentry, doorentry.id);
         }
      },
      {
         command: 'notify',
         action: function(e) {
            Noty.addObject(e);
         }
      },
      {
         command: 'play_sound',
         action: function(e) {
           playSound(e.sound_url);
         }
       },
       {
         command: 'tts',
         action: function(eventData) {
           if (typeof fully !== undefined) {
             fully.stopScreensaver();
             fully.bringToForeground();
             fully.textToSpeech(eventData.text);
           }
         }
       },
       {
         command: 'screen_on',
         action: function(e) {
           if (typeof fully !== undefined) {
             fully.stopScreensaver();
             fully.bringToForeground();
           }
         },
       }
   ],
   timeFormat: 12,
   menuPosition: MENU_POSITIONS.BOTTOM, // or BOTTOM
   hideScrollbar: false, // horizontal scrollbar
   groupsAlign: GROUP_ALIGNS.HORIZONTALLY, // or VERTICALLY

   header: { // https://github.com/resoai/TileBoard/wiki/Header-configuration
      styles: {
         padding: '30px 130px 0',
         fontSize: '25px'
      },
      right: [{
         type: HEADER_ITEMS.WEATHER,
         styles: {
            margin: '0 0 0'
         },
         icon: '&sensor.dark_sky_icon.state',
         icons: {
            'clear-day': 'clear',
            'clear-night': 'nt-clear',
            'cloudy': 'cloudy',
            'rain': 'rain',
            'sleet': 'sleet',
            'snow': 'snow',
            'wind': 'hazy',
            'fog': 'fog',
            'partly-cloudy-day': 'partlycloudy',
            'partly-cloudy-night': 'nt-partlycloudy'
         },
         fields: {
            summary: '&sensor.dark_sky_summary.state',
            temperature: '&sensor.dark_sky_temperature.state',
            temperatureUnit: '&sensor.dark_sky_temperature.attributes.unit_of_measurement',
         }
      }],
      left: [
         {
            type: HEADER_ITEMS.DATETIME,
            dateFormat: 'EEEE, LLLL dd', //https://docs.angularjs.org/api/ng/filter/date
         }
      ]
   },

  screensaver: {// optional. https://github.com/resoai/TileBoard/wiki/Screensaver-configuration
      timeout: 300, // after 5 mins of inactive
      slidesTimeout: 60, // 10s for one slide
      styles: { fontSize: '40px' },
      leftBottom: [{ type: SCREENSAVER_ITEMS.DATETIME }], // put datetime to the left-bottom of screensaver
//      rightTop: [{ type: SCREENSAVER_ITEMS.WEATHER }],
      slides: [
       /*  {
            bg: 'images/bg2.png',
            rightTop: [ // put text to the 2nd slide
               {
                  type: SCREENSAVER_ITEMS.CUSTOM_HTML,
                  html: 'Welcome to the <b>TileBoard</b>',
                  styles: { fontSize: '40px' }
               }
            ]
         }, */

         { bg: 'sspics/20180922_164256.jpg' },
         { bg: 'sspics/20190111_191257.jpg' },
         { bg: 'sspics/20190114_121719.jpg' },
         { bg: 'sspics/0D0A5317.jpg' },
         { bg: 'sspics/0D0A5323.jpg' },
         { bg: 'sspics/0D0A5332.jpg' },
         { bg: 'sspics/0D0A5347.jpg' }
      ]
   },
   pages: [
      {
         title: 'Main page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-home-assistant', // home icon
         groupMarginCss: '10px 16px',
         groups: [
            {
               title: 'Main',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 1,
                     id: "climate.living_room_nest",
                     title: 'Main' + ' - ' + '&sensor.living_room_thermostat_nest_hvac_state.state',
                     type: TYPES.CLIMATE,
                     unit: '°C',
                     state: false // hidding state
                     //state: function (item, entity) {
                      //  return 'Current '
                      //     + entity.attributes.current_temperature
                      //     + '°C';
                   //  }
                  },
                  {
                        position: [1, 0], // [x, y]
                        width: 1,
                        type: TYPES.SENSOR,
                        id: 'sensor.living_room_thermostat_nest_temperature',
                        title: 'Home',
                        subtitle: 'Humidity: ' + '&sensor.living_room_thermostat_nest_humidity.state' + '%',
                        state: false // hidding state
                  },
                  {
                     position: [0, 1], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Smoke',
                     id: 'binary_sensor.smoke_detectors',
                     states: {on: 'Detected', off: 'Clear'},
                     icons: {on: "mdi-alert", off: "mdi-shield-check"},
                     //state: false // hidding state
                  },
                  {
                     position: [1, 1], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Carbon Monoxide',
                     id: 'binary_sensor.carbon_monoxide_detectors',
                     states: {on: 'Detected', off: 'Clear'},
                     icons: {on: "mdi-alert", off: "mdi-shield-check"},
                     //state: false // hidding state
                  },
                  {
                     position: [0, 2],
                     width: 2,
                     type: TYPES.ALARM,
                     id: "alarm_control_panel.home_alarm",
                     //id: { state: 'disarmed' }, // replace it with real string id
                     title: 'Home Alarm' + ' - ' + '&sensor.home_alarm_keypad.state',
                     customStyles: function(item, entity){
                        if (entity.state === 'disarmed') {
                        return {'backgroundColor': '#3FBF7F',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#BF3F3F',
                           };
                             }
                       },
                     icons: {
                        disarmed: 'mdi-bell-off',
                        pending: 'mdi-bell',
                        armed_home: 'mdi-bell-plus',
                        armed_away: 'mdi-bell',
                        triggered: 'mdi-bell-ring'
                     },
                     states: {
                        disarmed: 'Disarmed',
                        pending: 'Pending',
                        armed_home: 'Armed home',
                        armed_away: 'Armed away',
                        triggered: 'Triggered'
                     }
                  }
               ]
            },
            {
               title: 'Lights',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 1,
                     type: TYPES.SWITCH,
                     id: "switch.front_light",
                     //id: {state: 'off'}, // replace it with real string id (e.g. "switch.lights")
                     states: {on: 'On', off: 'Off'},
                     //state: function (item, entity) {return entity.state},
                     title: 'Front Light',
                     icons: {on: "mdi-lightbulb-on", off: "mdi-lightbulb"}
                  },
                  {
                     position: [0, 1],
                     width: 1,
                     type: TYPES.SWITCH,
                     id: "switch.outdoor_light",
                     states: {on: 'On', off: 'Off'},
                     title: 'Outdoor Lights',
                     icons: {on: "mdi-lightbulb-on", off: "mdi-lightbulb"}
                  },
                  {
                     position: [1, 0],
                     width: 1,
                     type: TYPES.SWITCH,
                     id: "switch.living_room_light",
                     states: {on: 'On', off: 'Off'},
                     //state: function (item, entity) {return entity.state},
                     title: 'Living Room Light',
                     //icons: {on: "mdi-lightbulb-on", off: "mdi-lightbulb"}
                     icon: 'mdi-floor-lamp'
                  },
                  {
                     position: [1, 1],
                     width: 1,
                     type: TYPES.LIGHT,
                     id: "light.smartdimmer2",
                     states: {on: 'On', off: 'Off'},
                     title: 'Family Room Light',
                     icons: {on: "mdi-lightbulb-on", off: "mdi-lightbulb"},
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 255,
                           min: 0,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 588,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [0, 2], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR,
                     id: 'sensor.co2_sensor',
                     title: 'Carbon Dioxide',
                     //subtitle: 'Humidity: ' + '&sensor.basement_humidity.state' + '%',
                     state: false, // hidding state
                     customStyles: {'background-color':'#D9B23F'}
                  }
               ]
            },
            {
               title: 'Status',
               width: 1,
               height: 3,
               items: [
                  {
                     position: [0, 0], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR,
                     id: 'sensor.basement_temperature',
                     title: 'Basement',
                     subtitle: 'Humidity: ' + '&sensor.basement_humidity.state' + '%',
                     state: false // hidding state
                  },
                  {
                     position: [0, 1], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: '&sensor.furnace_filter_status_template.state',
                     subtitle: 'Furnace Filter Status',
                     id: 'sensor.furnace_filter_status_template',
                     states: {Clear: 'Clear', Change: 'Change'},
                     icons: {Clear: "mdi-shield-check", Change: "mdi-alert"},
                     state: false, // hidding state
                     customStyles: {'background-color':'#3FBF96'}
                  },
                  {
                     position: [0, 2], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR,
                     id: 'sensor.tv_on_today',
                     title: 'Television',
                     subtitle: 'Watched Today',
                     state: false // hidding state
                  }
               ]
            },
            {
               title: 'Garage',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0], // [x, y]
                     width: 1,
                     type: TYPES.COVER_TOGGLE,
                     title: 'Garage Door 1',
                     id: 'cover.double',
                     states: {open: 'Opened', closed: 'Closed', unknown: 'Unknown'},
                     icons: {open: "mdi-garage-open", closed: "mdi-garage", unknown: "mdi-garage-alert"},
                     state: false, // hidding state
                     customStyles: function(item, entity){
                        if (entity.state === 'closed') {
                        return {'backgroundColor': '#27B80D',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#B80D0D',
                           };
                             }
                       }
                  },
                  {
                     position: [1, 0], // [x, y]
                     width: 1,
                     type: TYPES.COVER_TOGGLE,
                     title: 'Garage Door 2',
                     id: 'cover.single',
                     states: {open: 'Opened', closed: 'Closed', unknown: 'Unknown'},
                     icons: {open: "mdi-garage-open", closed: "mdi-garage", unknown: "mdi-garage-alert"},
                     state: false, // hidding state
                     customStyles: function(item, entity){
                        if (entity.state === 'closed') {
                        return {'backgroundColor': '#27B80D',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#B80D0D',
                           };
                             }
                       }
                  },
                  {
                     position: [0, 1],
                     width: 1,
                     height: 1,
                     type: TYPES.SENSOR,
                     title: 'Garage',
                     subtitle: 'Humidity: ' + '&sensor.tele_humidity.state' + '&sensor.tele_humidity.attributes.unit_of_measurement',
                     id: 'sensor.tele_temperature',
                     state: false // hidding state
                  },
                  {
                     position: [1, 1],
                     width: 1,
                     type: TYPES.SWITCH,
                     id: "switch.garage_light",
                     states: {on: 'On', off: 'Off'},
                     //state: function (item, entity) {return entity.state},
                     title: 'Garage Light',
                     icons: {on: "mdi-lightbulb-on", off: "mdi-lightbulb"}
                  },
                  {
                     position: [0, 2], // [x, y]
                     width: 2,
                     type: TYPES.SENSOR,
                     id: {},
                     title: '&sensor.garbage_templated.state',
                     //subtitle: '&calendar.8_adirondack_cres_brampton.attributes.description',
                     state: '&sensor.garbage_date_templated.state',
                     //backgroundColor: '#75735C',
                     bg: function(item, entity){
                        if (this.states['sensor.garbage_templated'].state === 'Garbage and organics') {
                              return '/local/tileboard/images/ORG_GRB.png'; }
                        else if (this.states['sensor.garbage_templated'].state === 'Recycling, organics, and yard waste') {
                           return '/local/tileboard/images/ORG_RCY_YRD.png'; }
                        else if (this.states['sensor.garbage_templated'].state === 'Garbage, organics, and yard waste') {
                           return '/local/tileboard/images/ORG_GRB_YRD.png'; }
                        else if (this.states['sensor.garbage_templated'].state === 'Recycling and organics') {
                           return '/local/tileboard/images/ORG_RCY.png'; }
                        else if (this.states['sensor.garbage_templated'].state === 'Recycling, battery pickup day, organics, and yard waste') {
                           return '/local/tileboard/images/ORG_RCY_YRD.png'; }
                        else if (this.states['sensor.garbage_templated'].state === 'Garbage, garbage exemption day, and organics') {
                           return '/local/tileboard/images/ORG_GRB.png'; }
                        else if (this.states['sensor.garbage_templated'].state === 'Recycling, tree pickup, and organics') {
                           return '/local/tileboard/images/ORG_RCY.png'; }
                        else {
                        return '/local/tileboard/images/ORG.png';
                             }
                       }
                  }

               ]
            }
         ]
      },
      {
         title: 'Camera page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-video',
         groups: [
            {
               title: 'Cameras',
               width: 6,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     id: 'camera.front_porch',
                     type: TYPES.CAMERA_THUMBNAIL,
                     bgSize: 'cover',
                     width: 2,
                     height: 2,
                     state: false,
                     fullscreen: {
                        type: TYPES.CAMERA,
                        refresh: function () { // can also be a function
                           return 3000 + Math.random() * 1000
                        },
                        bgSize: 'contain'
                     },
                     refresh: function () { // can also be a function
                        return 3000 + Math.random() * 1000
                     }
                  },
                  {
                     position: [2, 0],
                     id: 'camera.driveway',
                     type: TYPES.CAMERA_THUMBNAIL,
                     bgSize: 'cover',
                     width: 2,
                     height: 2,
                     state: false,
                     fullscreen: {
                        type: TYPES.CAMERA,
                        refresh: function () { // can also be a function
                           return 3000 + Math.random() * 1000
                        },
                        bgSize: 'contain'
                     },
                     refresh: function () { // can also be a function
                        return 3000 + Math.random() * 1000
                     }
                  },
                  {
                     position: [4, 0],
                     id: 'camera.side_entrance',
                     type: TYPES.CAMERA_THUMBNAIL,
                     bgSize: 'cover',
                     width: 2,
                     height: 2,
                     state: false,
                     fullscreen: {
                        type: TYPES.CAMERA,
                        refresh: function () { // can also be a function
                           return 3000 + Math.random() * 1000
                        },
                        bgSize: 'contain'
                     },
                     refresh: function () { // can also be a function
                        return 3000 + Math.random() * 1000
                     }
                  }

               ]
            }
         ]
      },
      {
         title: 'Security page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-security',
         groups: [
            {
               title: 'Motion',
               width: 1,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 1,
                     title: 'Front Motion',
                     type: TYPES.SENSOR_ICON,
                     id: 'binary_sensor.front_motion', // using empty object for an unknown id
                     states: {on: 'Detected', off: 'Clear'},
                     icons: {on: "mdi-run", off: "mdi-walk"},
                     state: false, // disable state element
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#F28211',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#47C421',
                           };
                             }
                       }
                  },
                  {
                     position: [0, 1],
                     width: 1,
                     title: 'Back Motion',
                     type: TYPES.SENSOR_ICON,
                     id: 'binary_sensor.back_motion', // using empty object for an unknown id
                     states: {on: 'Detected', off: 'Clear'},
                     icons: {on: "mdi-run", off: "mdi-walk"},
                     state: false, // disable state element
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#F28211',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#47C421',
                           };
                             }
                       }
                  },
                  {
                     position: [0, 2],
                     width: 1,
                     title: 'Basement Motion',
                     type: TYPES.SENSOR_ICON,
                     id: 'binary_sensor.basement_motion', // using empty object for an unknown id
                     states: {on: 'Detected', off: 'Clear'},
                     icons: {on: "mdi-run", off: "mdi-walk"},
                     state: false, // disable state element
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#F28211',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#47C421',
                           };
                             }
                       }
                  }
               ]
            },
            {
               title: 'Doors',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Front Door',
                     id: 'binary_sensor.front_door',
                     states: {on: 'Opened', off: 'Closed'},
                     icons: {on: "mdi-door-open", off: "mdi-door-closed"},
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#D2223C',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#136F99',
                           };
                             }
                       }
                     //state: false // hidding state
                  },
                  {
                     position: [1, 0], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Garage Door',
                     id: 'binary_sensor.garage_door',
                     states: {on: 'Opened', off: 'Closed'},
                     icons: {on: "mdi-door-open", off: "mdi-door-closed"},
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#D2223C',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#136F99',
                           };
                             }
                       }
                  },
                  {
                     position: [0, 1],
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Back Door',
                     id: 'binary_sensor.back_door',
                     states: {on: 'Opened', off: 'Closed'},
                     icons: {on: "mdi-door-open", off: "mdi-door-closed"},
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#D2223C',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#136F99',
                           };
                             }
                       }
                  },
                  {
                     position: [1, 1],
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Side Door',
                     id: 'binary_sensor.side_door',
                     states: {on: 'Opened', off: 'Closed'},
                     icons: {on: "mdi-door-open", off: "mdi-door-closed"},
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#D2223C',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#136F99',
                           };
                             }
                       }
                  },
                  {
                     position: [0, 2],
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Basement Door',
                     id: 'binary_sensor.basement_door',
                     states: {on: 'Opened', off: 'Closed'},
                     icons: {on: "mdi-door-open", off: "mdi-door-closed"},
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#D2223C',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#136F99',
                           };
                             }
                       }
                  }
               ]
            },
            {
               title: 'Windows',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Living Room Window',
                     id: 'binary_sensor.living_room_window',
                     states: {on: 'Opened', off: 'Closed'},
                     icons: {on: "mdi-window-open", off: "mdi-window-closed"},
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#D2223C',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#16877D',
                           };
                             }
                       }
                  },
                  {
                     position: [1, 0], // [x, y]
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Dining Room Window',
                     id: 'binary_sensor.dining_room_window',
                     states: {on: 'Opened', off: 'Closed'},
                     icons: {on: "mdi-window-open", off: "mdi-window-closed"},
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#D2223C',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#16877D',
                           };
                             }
                       }
                  },
                  {
                     position: [0, 1],
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Family Room Window',
                     id: 'binary_sensor.family_room_window',
                     states: {on: 'Opened', off: 'Closed'},
                     icons: {on: "mdi-window-open", off: "mdi-window-closed"},
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#D2223C',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#16877D',
                           };
                             }
                       }
                  },
                  {
                     position: [1, 1],
                     width: 1,
                     type: TYPES.SENSOR_ICON,
                     title: 'Kitchen and Powder',
                     id: 'binary_sensor.kitchen_and_powder',
                     states: {on: 'Opened', off: 'Closed'},
                     icons: {on: "mdi-window-open", off: "mdi-window-closed"},
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {
                        return {'backgroundColor': '#D2223C',
                         };
                         }
                            else {
                              return { 'backgroundColor': '#16877D',
                           };
                             }
                       }
                  }
               ]
            }
         ]
      },
      {
         title: 'Media page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-youtube',
         groups: [
            {
               title: 'Media',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 2,
                     title: 'Family Room TV',
                     id: 'media_player.sony_tv', // using empty object for an unknown id
                     type: TYPES.MEDIA_PLAYER,
                     hideSource: false,
                     hideMuteButton: false,
                     state: false,
                     //state: '@attributes.media_title',
                     subtitle: '@attributes.media_title',
                     bgSuffix: '@attributes.entity_picture',
                  },
                  {
                     position: [0, 1],
                     width: 2,
                     title: 'Bedroom Speaker',
                     id: 'media_player.googlehome2344', // using empty object for an unknown id
                     type: TYPES.MEDIA_PLAYER,
                     hideSource: false,
                     hideMuteButton: false,
                     state: false,
                     //state: '@attributes.media_title',
                     subtitle: '@attributes.media_title',
                     bgSuffix: '@attributes.entity_picture',
                  },
                  {
                     position: [0, 2],
                     width: 2,
                     title: 'Bedroom TV',
                     id: 'media_player.bedroom_tv', // using empty object for an unknown id
                     type: TYPES.MEDIA_PLAYER,
                     hideSource: false,
                     hideMuteButton: false,
                     state: false,
                     //state: '@attributes.media_title',
                     subtitle: '@attributes.media_title',
                     bgSuffix: '@attributes.entity_picture',
                  }
               ]
            },
            {
               title: 'Radio',
               width: 4,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 1,
                     title: 'Hindi Hits',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.station_1',
                     //icons: {on: 'mdi-numeric-1-circle',off: 'mdi-numeric-1-circle-outline'},
                     state: false,
                     bg: '/local/tileboard/images/Bollywood.jpg',
                     customStyles: function (item, entity) {
                        if (entity.state === 'off') {
                           return { 'opacity': '0.6', 'filter': 'grayscale()', };
                           }
                        else {
                           return { 'opacity': '1', 'filter': '',};
                           }
                        }
                  },
                  {
                     position: [1, 0],
                     width: 1,
                     title: '',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.station_2',
                     //icons: {on: 'mdi-numeric-2-circle',off: 'mdi-numeric-2-circle-outline'},
                     state: false,
                     bg: '/local/tileboard/images/spice-fm.jpg',
                     customStyles: function (item, entity) {
                        if (entity.state === 'off') {
                           return { 'opacity': '0.6', 'filter': 'grayscale()', };
                           }
                        else {
                           return { 'opacity': '1', 'filter': '',};
                           }
                        }
                  },
                  {
                     position: [2, 0],
                     width: 1,
                     title: '',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.station_3',
                     //icons: {on: 'mdi-numeric-3-circle',off: 'mdi-numeric-3-circle-outline'},
                     state: false,
                     bg: '/local/tileboard/images/Mirchi-Love.jpg',
                     customStyles: function (item, entity) {
                        if (entity.state === 'off') {
                           return { 'opacity': '0.6', 'filter': 'grayscale()', };
                           }
                        else {
                           return { 'opacity': '1', 'filter': '',};
                           }
                        }
                  },
                  {
                     position: [3, 0],
                     width: 1,
                     title: '',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.station_4',
                     //icons: {on: 'mdi-numeric-4-circle',off: 'mdi-numeric-4-circle-outline'},
                     state: false,
                     bg: '/local/tileboard/images/teluguhits.jpg',
                     customStyles: function (item, entity) {
                        if (entity.state === 'off') {
                           return { 'opacity': '0.6', 'filter': 'grayscale()', };
                           }
                        else {
                           return { 'opacity': '1', 'filter': '',};
                           }
                        }
                  }
               ]
            }
         ]
      },
      {
         title: 'Garden page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-flower',
         groups: [
            {
               title: 'Sprinklers',
               width: 6,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 1,
                     title: 'Mode',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.garden_auto_water',
                     icons: {on: 'mdi-alpha-a-box',off: 'mdi-alpha-m-box'},
                     state: false
                  },
                  {
                     position: [1, 0],
                     width: 2,
                     height: 1,
                     title: 'Status',
                     id: {}, // since we are binding each list item to different sensor, so we simply use an empty object
                     type: TYPES.TEXT_LIST,
                     state: false,
                     list: [
                        {
                           title: 'Watering Mode',
                           icon: 'mdi-play-circle-outline',
                           value: '&sensor.auto_watering_status.state'
                        },
                        {
                           title: 'Watering Status',
                           icon: 'mdi-barley',
                           value: '&sensor.watering_status.state'
                        },
                        {
                           title: 'Watering Time',
                           icon: 'mdi-alarm',
                           value: '&input_datetime.sprinkler_time.state'
                        },
                        {
                           title: 'Duration',
                           icon: 'mdi-camera-timer',
                           value: '&sensor.sprinkler_set_duration.state'
                        }
                     ]
                  },
                  {
                     position: [3, 0],
                     id: 'input_number.sprinkler_set_duration',
                     type: TYPES.SLIDER,
                     title: '',
                     unit: 'mins',
                     state: false,
                     bottom: true, // puts slider on bottom
                     slider: {
                        max: 30,
                        min: 2,
                        step: 2,
                        request: {
                           type: "call_service",
                           domain: "input_number",
                           service: "set_value",
                           field: "value"
                        }
                     }
                  },
                  {
                     position: [4, 0],
                     width: 2,
                     height: 1,
                     type: TYPES.INPUT_DATETIME,
                     state: false,
                     id: "input_datetime.sprinkler_time"
                  },
                  {
                     position: [1, 2],
                     width: 1,
                     title: '',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.zone_1',
                     icons: {on: 'mdi-numeric-1-circle',off: 'mdi-numeric-1-circle-outline'},
                     state: false,
                     hidden: function() { return this.parseFieldValue("&input_boolean.garden_auto_water.state") === "on" },
                     customStyles: function (item, entity) {
                        if (entity.state === 'off') {
                           return {'backgroundColor': '#114092', };
                           }
                        else {
                           return { 'backgroundColor': '#4D79C5',};
                           }
                        }
                  },
                  {
                     position: [2, 2],
                     width: 1,
                     title: '',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.zone_2',
                     icons: {on: 'mdi-numeric-2-circle',off: 'mdi-numeric-2-circle-outline'},
                     state: false,
                     hidden: function() { return this.parseFieldValue("&input_boolean.garden_auto_water.state") === "on" },
                     customStyles: function (item, entity) {
                        if (entity.state === 'off') {
                           return {'backgroundColor': '#114092', };
                           }
                        else {
                           return { 'backgroundColor': '#4D79C5',};
                           }
                        }
                  },
                  {
                     position: [3, 2],
                     width: 1,
                     title: '',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.zone_3',
                     icons: {on: 'mdi-numeric-3-circle',off: 'mdi-numeric-3-circle-outline'},
                     state: false,
                     hidden: function() { return this.parseFieldValue("&input_boolean.garden_auto_water.state") === "on" },
                     customStyles: function (item, entity) {
                        if (entity.state === 'off') {
                           return {'backgroundColor': '#114092', };
                           }
                        else {
                           return { 'backgroundColor': '#4D79C5',};
                           }
                        }
                  },
                  {
                     position: [4, 2],
                     width: 1,
                     title: '',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.zone_4',
                     icons: {on: 'mdi-numeric-4-circle',off: 'mdi-numeric-4-circle-outline'},
                     state: false,
                     hidden: function() { return this.parseFieldValue("&input_boolean.garden_auto_water.state") === "on" },
                     customStyles: function (item, entity) {
                        if (entity.state === 'off') {
                           return {'backgroundColor': '#114092', };
                           }
                        else {
                           return { 'backgroundColor': '#4D79C5',};
                           }
                        }
                  },
                  {
                     position: [5, 2],
                     width: 1,
                     title: '',
                     //classes: [CLASS_BIG],
                     type: TYPES.INPUT_BOOLEAN,
                     id: 'input_boolean.zone_5',
                     icons: {on: 'mdi-numeric-5-circle',off: 'mdi-numeric-5-circle-outline'},
                     state: false,
                     hidden: function() { return this.parseFieldValue("&input_boolean.garden_auto_water.state") === "on" },
                     customStyles: function (item, entity) {
                        if (entity.state === 'off') {
                           return {'backgroundColor': '#114092', };
                           }
                        else {
                           return { 'backgroundColor': '#4D79C5',};
                           }
                        }
                  },
               ]
            }
         ]
      },
      {
         title: 'System page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-server-network',
         groups: [
            {
               title: 'System Health',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 2,
                     height: 1,
                     title: 'HA Server',
                     id: {}, // since we are binding each list item to different sensor, so we simply use an empty object
                     type: TYPES.TEXT_LIST,
                     state: false,
                     customStyles: {'background-color':'#3F3FBF'},
                     list: [
                        {
                           title: 'CPU Usage',
                           icon: 'mdi-memory',
                           value: '&sensor.processor_use.state' + '%'
                        },
                        {
                           title: 'Memory Usage',
                           icon: 'mdi-memory',
                           value: '&sensor.memory_use_percent.state' + '%'
                        },
                        {
                           title: 'CPU Temperature',
                           icon: 'mdi-oil-temperature',
                           value: '&sensor.cpu_temperature.state' + '°C'
                        },
                        {
                           title: 'Disk Space Used',
                           icon: 'mdi-harddisk',
                           value: '&sensor.disk_use_percent_home.state'+ '%'
                        }
                     ]
                  }
               ]
            }
         ]
      }
   ],
}
//const urlParams = new URLSearchParams(window.location.search);
//const token = urlParams.get('token');
//if (token) {
//  CONFIG.authToken = token;
//}
var doorentry = {
   position: [0, 3],
   type: TYPES.DOOR_ENTRY,
   id: {},
   icon: 'mdi-phone',
   title: 'Door entry',
   state: false,
   layout: {
       camera: {
           type: TYPES.CAMERA,
           id: 'camera.front_porch',
           //refresh: 1500,
           bgSize: 'cover',
           refresh: function () { // can also be a function
            return 3000 + Math.random() * 1000}
       },
       page: {},
       tiles: []
}
};