import { UpcomingEvent } from "../components/UpcomingEvent"




export const Home: React.FC = () => {

    return <>
    <div className="w-full mx-auto max-w-[1400px] mt-20 ">
     <div className="py-20 text-center">
           <h1 className="offwhite text-3xl">WELCOME TO MY MMA site</h1>
        <p className="offwhite-darker">Here are the fights for the upcoming event. Each fight has a dedicated page (comment section). Be respectful and have fun!</p>
        
     </div>
      <UpcomingEvent />

    
    </div>
    </>
}