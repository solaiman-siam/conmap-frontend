import { useEffect, useState } from "react";

export default function MapAutocomplete() {


  const [location, setLocation] = useState(null);


  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
      });

      const input = document.getElementById("pac-input");

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        fields: ["geometry", "name"],
      });

      autocomplete.bindTo("bounds", map);

      const marker = new window.google.maps.Marker({
        map,
        anchorPoint: new window.google.maps.Point(0, -29),
      });

      

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation({ lat, lng });
        

        if (!place.geometry || !place.geometry.location) {
          alert("No location found.");
          return;
        }


        map.setCenter(place.geometry.location);
        map.setZoom(15);
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
      });
    };




    // Attach to global for callback
    window.initMap = initMap;

    // Check if script is already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div>
      <input
        id="pac-input"
        type="text"
        placeholder="Search for a place"
        style={{
          width: "300px",
          padding: "10px",
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
        }}
      />

      <div>
      <div
        id="map"
        style={{ width: "100%", height: "500px", marginTop: "50px" }}
      ></div>
      </div>
    </div>
  );
}
