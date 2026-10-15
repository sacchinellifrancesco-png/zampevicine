const React = require('react');
const { View } = require('react-native-web');

function MapView({ style, initialRegion, region, children }) {
  const [realPos, setRealPos] = React.useState(null);

  React.useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setRealPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => console.log("GPS bloccato:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Priorità: 1. GPS vero 2. Posizione che passa l'app 3. Terni come fallback
  const lat = realPos?.lat || initialRegion?.latitude || region?.latitude || 42.5637;
  const lng = realPos?.lng || initialRegion?.longitude || region?.longitude || 12.6444;

  const d = 0.02;
  const bbox = `${lng-d},${lat-d},${lng+d},${lat+d}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return React.createElement(View, { style: [{ flex: 1, height: 400, borderRadius: 24, overflow: 'hidden' }, style] },
    React.createElement('iframe', {
      src: src,
      style: { width: '100%', height: '100%', border: 0 },
      title: 'mappa'
    })
  );
}

const Dummy = (p) => React.createElement(View, null, p.children);
MapView.Marker = Dummy; MapView.Polyline = Dummy; MapView.Polygon = Dummy;
MapView.Circle = Dummy; MapView.Callout = Dummy; MapView.UrlTile = Dummy;
MapView.Overlay = Dummy;
MapView.PROVIDER_GOOGLE = 'google'; MapView.PROVIDER_DEFAULT = 'default';
MapView.Animated = MapView; MapView.AnimatedRegion = function() {};

module.exports = MapView;
module.exports.default = MapView;
module.exports.Marker = Dummy;
module.exports.PROVIDER_GOOGLE = 'google';
