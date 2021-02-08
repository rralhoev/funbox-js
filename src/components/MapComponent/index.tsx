/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './MapComponent.scss';
import { mapApiKey, ipstackAPI } from '../../../apikeys';

interface Location {
	latitude: number,
	longitude: number
}

export interface MapCoords {
	center: {
		lat: number,
		lng: number,
	}
	zoom: number
}

interface MapProps {
	value: MapCoords,
	onChange: (location: MapCoords) => void
}

export function MapComponent({ value, onChange }:MapProps) {
	const containerStyle = {
		width: '100%',
		height: '300px',
		margin: '20px 0 0',
	};

	const setLocation = (location: Location) => {
		onChange({
			center: {
				lat: location.latitude,
				lng: location.longitude,
			},
			zoom: 11,
		});
	}

	useEffect(() => {
		if (navigator.geolocation && value.center.lat === 0) {
			navigator.geolocation.getCurrentPosition((position) => setLocation(position.coords),
				() => {
					fetch(`http://api.ipstack.com/check?access_key=${ipstackAPI}&format=1`)
					.then(res => res.json())
					.then(data => setLocation(data));
				});
		}
	}, []);

	function onChangeMarkerPosition(position:any) {
		const newPosition = {
			center: {
				lat: position.latLng.lat(),
				lng: position.latLng.lng(),
			},
			zoom: 11,
		};
		onChange(newPosition);
	}

	return (
		<LoadScript googleMapsApiKey={mapApiKey}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={value.center}
				zoom={value.zoom}
			>
				<Marker
					position={value.center}
					onDragEnd={(position) => onChangeMarkerPosition(position)}
					draggable
				/>
			</GoogleMap>
		</LoadScript>
	);
}
