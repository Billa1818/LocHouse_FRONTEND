import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/Category";
import RecentListings from "../components/RecentListings";
import WhyChooseSection from "../components/WhyChooseSection";
import OwnerBanner from "../components/OwnerBanner";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection/>
<RecentListings/>
<WhyChooseSection/>
<OwnerBanner/>


    </div>
  );
}

export default Home;
