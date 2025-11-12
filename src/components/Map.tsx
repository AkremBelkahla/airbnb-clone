/**
 * Interactive map component using React Leaflet
 * Dynamically imported for client-side only rendering
 */

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Listing } from "@/lib/types";

// Fix default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  listings: Listing[];
}

export function Map({ listings }: MapProps) {
  // Calculate map center (average of all listings)
  const center: [number, number] = listings.length > 0
    ? [
        listings.reduce((sum, l) => sum + l.lat, 0) / listings.length,
        listings.reduce((sum, l) => sum + l.lng, 0) / listings.length,
      ]
    : [48.8566, 2.3522]; // Paris default

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-lg border border-border shadow-card">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.map((listing) => (
          <Marker key={listing.id} position={[listing.lat, listing.lng]}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{listing.title}</p>
                <p className="text-muted-foreground">
                  {listing.city}, {listing.country}
                </p>
                <p className="mt-1 font-bold text-primary">{listing.price}€/nuit</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
