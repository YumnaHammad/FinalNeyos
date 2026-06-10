import React, { useEffect, useState } from 'react'
import HeroSection from '../../components/SpaceOccupancy/HeroSection'
import Contact from '../../components/Contact'
import FeatureTiles  from '../../components/SpaceOccupancy/FeatureTiles '

const SpaceOccupancy = () => {
  const [section1Data, setSection1Data] = useState(null);

  const fetchSection1Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-space/section-1"
      );
      const data = await response.json();
      setSection1Data(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching section 1 data:", error);
    }
  };

  useEffect(() => {
    fetchSection1Data();
  }, []);

  return (
    <div >
      <HeroSection section1Data={section1Data} />
      <FeatureTiles />
      <Contact/>
    </div>
  )
}

export default SpaceOccupancy
