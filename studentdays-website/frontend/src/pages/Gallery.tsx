import React, { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { GalleryImage } from '../types';
import { STATIC_GALLERY_IMAGES } from '../data/galleryData';
import { IMAGES } from '../config/images';
import { MapPin } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const allImages: GalleryImage[] = STATIC_GALLERY_IMAGES;

  const tags = ['All', 'Nature', 'Sunrise', 'Houseboat', 'Campfire', 'Trek', 'Friends'];

  const filteredImages = selectedTag === 'All'
    ? allImages
    : allImages.filter((img) => img.tags?.some((t: string) => t.toLowerCase() === selectedTag.toLowerCase()));

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '90vh', background: 'radial-gradient(120% 80% at 50% 0, #0b2a66, #030a1a 70%)' }}>
      <div className="wrap">
        <BackButton to="/" />
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px auto' }}>
          <span className="badge badge-yellow" style={{ marginBottom: '12px' }}>Visual Archive</span>
          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', color: '#ffffff', marginBottom: '14px' }}>
            Stories Shot Like Films.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', margin: '0 0 24px 0' }}>
            Real students, real expeditions, and raw memories. Explore frames from past StudentDays trips across India.
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`glass ${selectedTag === tag ? 'blue' : ''}`}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="memories-wall" style={{ marginTop: '20px' }}>
          {filteredImages.map((img, idx) => {
            const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg'];
            const rot = rotations[idx % rotations.length];
            return (
              <figure key={img.id} className="polaroid" style={{ transform: `rotate(${rot})` }}>
                <img
                  src={img.imageUrl}
                  alt={img.caption}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = IMAGES.heroAlternate;
                  }}
                />
                <figcaption>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#111' }}>{img.caption}</div>
                  {img.tripLocation && (
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <MapPin size={11} />
                      <span>{img.tripLocation}</span>
                    </div>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
