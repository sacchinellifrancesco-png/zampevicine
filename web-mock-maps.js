const React = require('react');
const { View, Text } = require('react-native-web');

function MapView({ style, initialRegion, region, children }) {
  const lat = (initialRegion && initialRegion.latitude) || (region && region.latitude) || 42.5637;
  const lng = (initialRegion && initialRegion.longitude) || (region && region.longitude) || 12.6444;
  const d = 0.05;
  const bbox = `${lng-d},${lat-d},${lng+d},${lat+d}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return React.createElement(View, { style: [{ flex: 1, height: 350, borderRadius: 24, overflow: 'hidden', backgroundColor: '#e5e7eb' }, style] },
    React.createElement('iframe', {
      src: src,
      style: { width: '100%', height: '100%', border: 0 },
      loading: 'lazy',
      title: 'mappa'
    })
  );
}

const Dummy = (p) => React.createElement(View, null, p.children);
MapView.Marker = Dummy;
MapView.Polyline = Dummy;
MapView.Polygon = Dummy;
MapView.Circle = Dummy;
MapView.Callout = Dummy;
MapView.UrlTile = Dummy;
MapView.Overlay = Dummy;
MapView.PROVIDER_GOOGLE = 'google';
MapView.PROVIDER_DEFAULT = 'default';
MapView.Animated = MapView;
MapView.AnimatedRegion = function() {};

module.exports = MapView;
module.exports.default = MapView;
module.exports.Marker = Dummy;
module.exports.Polyline = Dummy;
module.exports.Polygon = Dummy;
module.exports.Circle = Dummy;
module.exports.Callout = Dummy;
module.exports.UrlTile = Dummy;
module.exports.Overlay = Dummy;
module.exports.PROVIDER_GOOGLE = 'google';
module.exports.PROVIDER_DEFAULT = 'default';
module.exports.Animated = MapView;
module.exports.AnimatedRegion = function() {};
