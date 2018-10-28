$(function () {
	var Maps;
	var Routes;
	var App;
	var Utils;
	Utils = {
		settings: {
				debug: false
		},
		clickEvent: 'click',
		log: function(what) {
				if ( Utils.settings.debug && window.console ) {
						console.log(what);
				}
		}
	};

	//  Для быстрого использования
	var clickEvent = Utils.clickEvent,
						_log = Utils.log;
	Maps = {
		load: function() {
				_log( "Map: load script" );
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
						'callback=initMap&key=AIzaSyAMpt8DoMGTZgznlwnvnvw3XGwgNx-9Kms';
				document.body.appendChild(script);
		},
		initSettings: function() {
				_log( "Map: init settings" );
				this.map = null;
				this.marker = null;
				this.settings = {
						zoom: 12,
                        center: new google.maps.LatLng(44.937692, 39.196133),                        
						mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                  "featureType": "administrative",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "color": "#444444"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#f2f2f2"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "labels",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#d5d5d5"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#d6d6d6"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#d6d6d6"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#6c9c5a"
                      },
                      {
                          "visibility": "on"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "labels",
                  "stylers": [
                      {
                          "color": "#6c9c5a"
                      },
                  ]
              }
            ],
						scrollwheel: false,
						mapTypeControl: false,
						panControl: true,
						panControlOptions: {
								position: google.maps.ControlPosition.LEFT_CENTER
						},
						zoomControl: true,
						zoomControlOptions: {
								position: google.maps.ControlPosition.LEFT_CENTER
						},
						scaleControl: false,
						streetViewControl: true
				};
		},
		init: function() {
				_log( "Map: init Map" );
				Maps.initSettings();
				Maps.map = new google.maps.Map(document.getElementById('map'),
						Maps.settings);
				Maps.marker = new google.maps.Marker({
						map: Maps.map,
						draggable: false,
						position: new google.maps.LatLng(60.011695, 30.256744)
				});
		}
	};
	//  Функция для обратного вызова карт при асинхронной загрузке
	window.initMap = function() {
		Maps.init();
	};
	Routes = {
		init: function() {
			_log( "Routes: init" );
				Maps.load();
		}
	};
	App = {
			init: function() {
					Routes.init();
			}
	};
	if ($('#map').length) {
    App.init();
  }
});