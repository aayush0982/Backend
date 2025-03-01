import { checkUser } from "@/actions/home";
import BestSeller from "@/components/bestseller";
import Hero from "@/components/hero";
import LatestCollection from "@/components/latestcollection";
import OurPolicy from "@/components/ourpolicy";


const Home = async()=> {
  const user = await checkUser()
  console.log(user)
  return (
    <div className="pt-24 px-24">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  );
}

export default Home;