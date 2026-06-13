import React, { useEffect, useState } from 'react'
import Contact from '../../components/Contact'
import FeatureTiles from '../../components/SpaceOccupancy/FeatureTiles '
import SolutionDetailLayout from '../../components/Solution/SolutionDetailLayout';
import { getSolutionMeta } from '../../utils/getSolutionMeta';

const META = getSolutionMeta('/solution/smartSpace');

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
    <SolutionDetailLayout
      title={section1Data?.heading || META.label}
      subtitle={section1Data?.description || section1Data?.paragraph || META.desc}
      image={section1Data?.image || META.heroImage}
      badge={META.groupTitle}
    >
      <FeatureTiles />
      <Contact />
    </SolutionDetailLayout>
  )
}

export default SpaceOccupancy
