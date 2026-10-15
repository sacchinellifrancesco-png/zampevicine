const React = require('react');
const { View } = require('react-native-web');

function Mock(name) {
  const C = (props) => React.createElement(View, { style: [{ flex: 1, backgroundColor: '#e5e7eb' }, props.style] }, props.children);
  C.displayName = name;
  return C;
}

const MapView = Mock('MapView');
const Marker = Mock('Marker');
const Polyline = Mock('Polyline');
const Polygon = Mock('Polygon');
const Circle = Mock('Circle');
const Callout = Mock('Callout');
const UrlTile = Mock('UrlTile');
const Overlay = Mock('Overlay');

MapView.Marker = Marker;
MapView.Polyline = Polyline;
MapView.Polygon = Polygon;
MapView.Circle = Circle;
MapView.Callout = Callout;
MapView.UrlTile = UrlTile;
MapView.Overlay = Overlay;
MapView.PROVIDER_GOOGLE = 'google';
MapView.PROVIDER_DEFAULT = 'default';
MapView.Animated = MapView;
MapView.AnimatedRegion = function() {};

module.exports = MapView;
module.exports.default = MapView;
module.exports.Marker = Marker;
module.exports.Polyline = Polyline;
module.exports.Polygon = Polygon;
module.exports.Circle = Circle;
module.exports.Callout = Callout;
module.exports.UrlTile = UrlTile;
module.exports.Overlay = Overlay;
module.exports.PROVIDER_GOOGLE = 'google';
module.exports.PROVIDER_DEFAULT = 'default';
module.exports.Animated = MapView;
module.exports.AnimatedRegion = function() {};
