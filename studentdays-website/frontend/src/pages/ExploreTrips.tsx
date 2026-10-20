import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { TripReferenceCard } from '../components/TripReferenceCard';
import { BookingModal } from '../components/BookingModal';
import { Trip } from '../types';
import { AUTHENTIC_TRIPS, AuthenticTrip } from '../data/tripsData';
import { Search, MapPin } from 'lucide-react';

export const ExploreTrips: React.FC = () => {
  const [trips] = useState<AuthenticTrip[]>(AUTHENTIC_TRIPS);
  const [search, setSearch] = useState<string>('');
  const [destinationFilter, setDestinationFilter] = useState<string>('');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const destinations = ['All Destinations', 'Kerala', 'Gokarna', 'Dandeli', 'Araku', 'Manali'];

  // Filter trips based on search and destination (Gokarna is removed from visible listings per Change 2B)
  const filteredTrips = trips
    .filter((t) => t.id !== 'gokarna-dandeli-expedition' && t.slug !== 'gokarna-dandeli-expedition')
    .filter((t) => {
      const matchesSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.destination.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());

      const matchesDest =
        !destinationFilter ||
        t.destination.toLowerCase().includes(destinationFilter.toLowerCase()) ||
        t.title.toLowerCase().includes(destinationFilter.toLowerCase());

      return matchesSearch && matchesDest;
    });

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '95vh', background: 'radial-gradient(120% 70% at 50% 0, #0b2a66, #030a1a 70%)' }}>
      <div className="wrap">
        {/* Back Button matching reference HTML */}
        <BackButton to="/" />

        {/* Header from Image 1 */}
        <div className="ctop" style={{ marginBottom: '32px' }}>
          <span className="pill">Upcoming trips</span>
          <h1 className="hl">Trip Near To You</h1>
          <p className="sub-lead">
            Pick your crew, pick your route and let us handle the rest.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '16px 20px',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
            <Search size={18} color="rgba(255,255,255,0.6)" />
            <input
              type="text"
              className="form-input"
              placeholder="Search by trip name or destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', padding: '6px 0', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {destinations.map((d) => {
              const val = d === 'All Destinations' ? '' : d;
              const isSelected = destinationFilter === val;
              return (
                <button
                  key={d}
                  onClick={() => setDestinationFilter(val)}
                  className={`glass sm ${isSelected ? 'blue' : ''}`}
                  style={{ fontSize: '13px', padding: '6px 14px' }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trips Grid matching Image 1 UI */}
        {filteredTrips.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '500px', margin: '40px auto' }}>
            <MapPin size={40} color="#FFD23F" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '22px', color: '#ffffff', marginBottom: '8px' }}>No Trips Found</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '20px' }}>
              We couldn't find any trips matching "{search}".
            </p>
            <button
              onClick={() => {
                setSearch('');
                setDestinationFilter('');
              }}
              className="glass"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="tg">
            {filteredTrips.map((t) => (
              <TripReferenceCard
                key={t.id}
                trip={t}
                onSelect={(selected) => setSelectedTrip(selected)}
              />
            ))}
          </div>
        )}

        {/* Lets Go ! Button from Image 1 */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link
            to="/contact"
            className="glass blue"
            style={{
              padding: '16px 36px',
              fontSize: '17px',
              fontWeight: 800,
              boxShadow: '0 10px 36px rgba(30, 107, 255, 0.65)'
            }}
          >
            Lets Go !
          </Link>
        </div>
      </div>

      {/* Booking / Details Modal */}
      {selectedTrip && (
        <BookingModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </div>
  );
};
